<?php

declare(strict_types=1);

namespace App\Services;

use App\Core\Database;
use App\Models\Player;
use InvalidArgumentException;
use PDO;
use RuntimeException;
use Throwable;

/**
 * BazaarService — Concurrency-Safe Player Marketplace Subsystem.
 *
 * Implements Algorithm 1 from docs/MULTIPLAYER_ARCHITECTURE_SPEC.md:
 * - Anti-Buy-Mugging: Proceeds routed to seller's Escrow Mailbox (pending_escrow in player_states).
 * - Multi-Table Deterministic Locking DAG (Tier 2 listings -> Tier 3 wallets/states -> Tier 4 items -> Tier 5 ledger).
 * - Progressive Sales Tax Sinks: 3% (<10k), 5% (10k-100k), 8% (100k-1M), 12% (>=1M).
 * - Phantom Stock and Zero-Double-Spending guarantees via pessimistic row locks.
 */
class BazaarService
{
    private PDO $pdo;

    public function __construct(?PDO $pdo = null)
    {
        $this->pdo = $pdo ?? Database::pdo();
    }

    /**
     * Compute Progressive Sales Tax Rate based on transaction gross total.
     * Specification Section 5.1:
     * - < 10,000: 3.0%
     * - 10,000 to 99,999: 5.0%
     * - 100,000 to 999,999: 8.0%
     * - >= 1,000,000: 12.0%
     */
    public static function getProgressiveTaxRate(int $totalPrice): float
    {
        if ($totalPrice < 10000) {
            return 3.00;
        }
        if ($totalPrice < 100000) {
            return 5.00;
        }
        if ($totalPrice < 1000000) {
            return 8.00;
        }
        return 12.00;
    }

    /**
     * List an item for sale on the Bazaar.
     *
     * @param string $sellerId
     * @param string $itemUid Item unique ID or row UID in player_items
     * @param int $unitPrice Price in Linh Thạch per unit
     * @param int $quantity Quantity to list
     * @return array Listing details
     */
    public function list(string $sellerId, string $itemUid, int $unitPrice, int $quantity = 1): array
    {
        if ($unitPrice <= 0) {
            throw new InvalidArgumentException("Đơn giá phải lớn hơn 0 Linh Thạch!");
        }
        if ($quantity <= 0) {
            throw new InvalidArgumentException("Số lượng rao bán phải lớn hơn 0!");
        }

        $this->pdo->beginTransaction();
        try {
            // Lock item row to prevent concurrent double-listing
            $stmtItem = $this->pdo->prepare("
                SELECT * FROM player_items 
                WHERE player_id = ? AND (item_uid = ? OR id = ?)
                FOR UPDATE
            ");
            $stmtItem->execute([$sellerId, $itemUid, $itemUid]);
            $item = $stmtItem->fetch(PDO::FETCH_ASSOC);

            if (!$item) {
                throw new RuntimeException("Vật phẩm không tồn tại trong hành trang!");
            }
            if ((int)$item['equipped'] === 1) {
                throw new RuntimeException("Không thể rao bán trang bị đang mặc trên người!");
            }
            if ((int)$item['quantity'] < $quantity) {
                throw new RuntimeException("Số lượng vật phẩm trong túi không đủ để rao bán!");
            }

            $totalPrice = $unitPrice * $quantity;
            $taxRate = self::getProgressiveTaxRate($totalPrice);

            // Deduct quantity from player_items
            $remainingQty = (int)$item['quantity'] - $quantity;
            if ($remainingQty <= 0) {
                $delStmt = $this->pdo->prepare("DELETE FROM player_items WHERE id = ?");
                $delStmt->execute([$item['id']]);
            } else {
                $upStmt = $this->pdo->prepare("UPDATE player_items SET quantity = ? WHERE id = ?");
                $upStmt->execute([$remainingQty, $item['id']]);
            }

            // Package item metadata for serialized listing
            $itemMeta = [
                'name' => $item['name'],
                'base_type' => $item['base_type'],
                'slot' => $item['slot'],
                'rarity' => $item['rarity'],
                'item_level' => (int)$item['item_level'],
                'category' => $item['category'],
                'stackable' => (bool)$item['stackable'],
                'sell_price' => (int)$item['sell_price'],
                'affixes' => json_decode($item['affixes'] ?? '[]', true) ?: [],
            ];

            // Insert into bazaar_listings
            $insert = $this->pdo->prepare("
                INSERT INTO bazaar_listings (seller_id, item_id, item_data, quantity, unit_price, tax_rate, status, version)
                VALUES (?, ?, ?, ?, ?, ?, 'active', 1)
            ");
            $insert->execute([
                $sellerId,
                $item['base_type'],
                json_encode($itemMeta, JSON_UNESCAPED_UNICODE),
                $quantity,
                $unitPrice,
                $taxRate,
            ]);

            $listingId = (int)$this->pdo->lastInsertId();
            $this->pdo->commit();

            return [
                'success' => true,
                'listing_id' => $listingId,
                'item_name' => $item['name'],
                'quantity' => $quantity,
                'unit_price' => $unitPrice,
                'total_price' => $totalPrice,
                'tax_rate' => $taxRate,
                'message' => "Đã niêm yết {$quantity}x [{$item['name']}] lên Phường Thị với giá {$unitPrice} Linh Thạch/món.",
            ];
        } catch (Throwable $e) {
            $this->pdo->rollBack();
            throw $e;
        }
    }

    /**
     * Buy an item from the Bazaar (Algorithm 1).
     *
     * @param string $buyerId
     * @param int $listingId
     * @param int $buyQuantity
     * @param int|null $expectedUnitPrice Client expected price for OCC safety
     * @return array Purchase receipt
     */
    public function buy(string $buyerId, int $listingId, int $buyQuantity = 1, ?int $expectedUnitPrice = null): array
    {
        if ($buyQuantity <= 0) {
            throw new InvalidArgumentException("Số lượng mua phải lớn hơn 0!");
        }

        $this->pdo->beginTransaction();
        try {
            // 1. Lock Bazaar Listing Row (Tier 2 in Global DAG)
            $stmtListing = $this->pdo->prepare("
                SELECT * FROM bazaar_listings 
                WHERE listing_id = ? 
                FOR UPDATE
            ");
            $stmtListing->execute([$listingId]);
            $listing = $stmtListing->fetch(PDO::FETCH_ASSOC);

            if (!$listing || $listing['status'] !== 'active') {
                throw new RuntimeException("Vật phẩm đã được người khác mua hoặc không còn mở bán!");
            }
            if ((int)$listing['quantity'] < $buyQuantity) {
                throw new RuntimeException("Số lượng trong kho không đủ (chỉ còn {$listing['quantity']} món)!");
            }
            if ($expectedUnitPrice !== null && (int)$listing['unit_price'] !== $expectedUnitPrice) {
                throw new RuntimeException("Giá vật phẩm đã thay đổi thành {$listing['unit_price']} Linh Thạch!");
            }

            $sellerId = $listing['seller_id'];
            if ($buyerId === $sellerId) {
                throw new RuntimeException("Không thể tự mua vật phẩm do chính mình niêm yết!");
            }

            $unitPrice = (int)$listing['unit_price'];
            $totalCost = $unitPrice * $buyQuantity;

            // 2. Lock Buyer & Seller in Deterministic Lexicographical Order (Tier 3 in Global DAG)
            $sortedIds = [$buyerId, $sellerId];
            sort($sortedIds, SORT_STRING);

            $stmtWallets = $this->pdo->prepare("
                SELECT id, gold FROM players WHERE id IN (?, ?) ORDER BY id ASC FOR UPDATE
            ");
            $stmtWallets->execute($sortedIds);
            $wallets = [];
            while ($w = $stmtWallets->fetch(PDO::FETCH_ASSOC)) {
                $wallets[$w['id']] = $w;
            }

            $stmtStates = $this->pdo->prepare("
                SELECT player_id, pending_escrow FROM player_states WHERE player_id IN (?, ?) ORDER BY player_id ASC FOR UPDATE
            ");
            $stmtStates->execute($sortedIds);
            $states = [];
            while ($s = $stmtStates->fetch(PDO::FETCH_ASSOC)) {
                $states[$s['player_id']] = $s;
            }

            // Verify buyer funds
            $buyerGold = (int)($wallets[$buyerId]['gold'] ?? 0);
            if ($buyerGold < $totalCost) {
                throw new RuntimeException("Không đủ Linh Thạch! Cần {$totalCost} Linh Thạch nhưng chỉ có {$buyerGold}.");
            }

            // 3. Unpack Item Metadata & Verify Buyer Inventory Capacity (Tier 4 in Global DAG)
            $itemMeta = json_decode($listing['item_data'] ?? '{}', true) ?: [];
            $isStack = !empty($itemMeta['stackable']);

            $stackRowId = null;
            if ($isStack) {
                $stmtStack = $this->pdo->prepare("
                    SELECT id, quantity FROM player_items 
                    WHERE player_id = ? AND base_type = ? AND equipped = 0
                    LIMIT 1 
                    FOR UPDATE
                ");
                $stmtStack->execute([$buyerId, $listing['item_id']]);
                if ($stackRow = $stmtStack->fetch(PDO::FETCH_ASSOC)) {
                    $stackRowId = (int)$stackRow['id'];
                }
            }

            // Check inventory capacity limit (100 slots)
            if ($stackRowId === null) {
                $stmtCount = $this->pdo->prepare("SELECT COUNT(*) FROM player_items WHERE player_id = ? AND equipped = 0");
                $stmtCount->execute([$buyerId]);
                $currentSlots = (int)$stmtCount->fetchColumn();
                $neededSlots = $isStack ? 1 : $buyQuantity;
                if ($currentSlots + $neededSlots > 100) {
                    throw new RuntimeException("Càn Khôn Túi không đủ chỗ trống! Cần {$neededSlots} ô trống.");
                }
            }

            // 4. Progressive Tax Calculation & Settlement (Bazaar Currency Sink)
            $taxRate = (float)$listing['tax_rate'];
            $feeAmount = (int)floor($totalCost * ($taxRate / 100.0));
            $sellerProceeds = $totalCost - $feeAmount;

            // Debit Buyer Wallet
            $this->pdo->prepare("UPDATE players SET gold = gold - ? WHERE id = ?")
                ->execute([$totalCost, $buyerId]);

            // Credit Seller Escrow Mailbox (Anti-Buy-Mug protection)
            $this->pdo->prepare("UPDATE player_states SET pending_escrow = pending_escrow + ?, version = version + 1 WHERE player_id = ?")
                ->execute([$sellerProceeds, $sellerId]);

            // 5. Decrement Stock or Mark Sold
            $remainingStock = (int)$listing['quantity'] - $buyQuantity;
            if ($remainingStock <= 0) {
                $this->pdo->prepare("UPDATE bazaar_listings SET quantity = 0, status = 'sold_out', version = version + 1 WHERE listing_id = ?")
                    ->execute([$listingId]);
            } else {
                $this->pdo->prepare("UPDATE bazaar_listings SET quantity = ?, version = version + 1 WHERE listing_id = ?")
                    ->execute([$remainingStock, $listingId]);
            }

            // 6. Transfer Item into Buyer Inventory (Tier 4)
            if ($stackRowId !== null) {
                $this->pdo->prepare("UPDATE player_items SET quantity = quantity + ? WHERE id = ?")
                    ->execute([$buyQuantity, $stackRowId]);
            } else {
                $insItem = $this->pdo->prepare("
                    INSERT INTO player_items (
                        player_id, item_uid, name, base_type, slot, rarity, item_level, category, quantity, sell_price, stackable, affixes, equipped
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)
                ");
                $newItemUid = substr(bin2hex(random_bytes(8)), 0, 16);
                $insItem->execute([
                    $buyerId,
                    $newItemUid,
                    $itemMeta['name'] ?? $listing['item_id'],
                    $itemMeta['base_type'] ?? $listing['item_id'],
                    $itemMeta['slot'] ?? 'material',
                    $itemMeta['rarity'] ?? 'common',
                    (int)($itemMeta['item_level'] ?? 1),
                    $itemMeta['category'] ?? 'material',
                    $buyQuantity,
                    (int)($itemMeta['sell_price'] ?? 1),
                    $isStack ? 1 : 0,
                    json_encode($itemMeta['affixes'] ?? []),
                ]);
            }

            // 7. Double-Entry Audit Ledger Row (Tier 5 in Global DAG)
            $audit = $this->pdo->prepare("
                INSERT INTO wallet_audit_ledger (
                    source_id, dest_id, gross_amount, tax_amount, net_amount, reference_type, reference_id, metadata
                ) VALUES (?, ?, ?, ?, ?, 'bazaar_buy', ?, ?)
            ");
            $meta = json_encode([
                'listing_id' => $listingId,
                'item_id' => $listing['item_id'],
                'item_name' => $itemMeta['name'] ?? $listing['item_id'],
                'quantity' => $buyQuantity,
                'unit_price' => $unitPrice,
                'tax_rate' => $taxRate,
            ], JSON_UNESCAPED_UNICODE);
            $audit->execute([$buyerId, $sellerId, $totalCost, $feeAmount, $sellerProceeds, (string)$listingId, $meta]);

            // Notification for seller
            if (function_exists('addPlayerEvent')) {
                addPlayerEvent(
                    $this->pdo,
                    $sellerId,
                    'bazaar_sold',
                    "💰 Đã bán {$buyQuantity}x [{$itemMeta['name']}]! Nhận +{$sellerProceeds} Linh Thạch trong Hộp Thư Thương Hội (Thuế {$taxRate}%: -{$feeAmount} 💎)."
                );
            }

            $this->pdo->commit();

            return [
                'success' => true,
                'listing_id' => $listingId,
                'item_name' => $itemMeta['name'] ?? $listing['item_id'],
                'quantity' => $buyQuantity,
                'unit_price' => $unitPrice,
                'total_cost' => $totalCost,
                'tax_paid' => $feeAmount,
                'seller_proceeds' => $sellerProceeds,
                'message' => "Giao dịch thành công! Đã nhận {$buyQuantity}x [{$itemMeta['name']}] vào Càn Khôn Túi.",
            ];
        } catch (Throwable $e) {
            $this->pdo->rollBack();
            throw $e;
        }
    }

    /**
     * Cancel an active listing and restore items to seller.
     */
    public function cancel(string $sellerId, int $listingId): array
    {
        $this->pdo->beginTransaction();
        try {
            $stmt = $this->pdo->prepare("SELECT * FROM bazaar_listings WHERE listing_id = ? FOR UPDATE");
            $stmt->execute([$listingId]);
            $listing = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$listing || $listing['status'] !== 'active') {
                throw new RuntimeException("Niêm yết không tồn tại hoặc không ở trạng thái mở bán!");
            }
            if ($listing['seller_id'] !== $sellerId) {
                throw new RuntimeException("Chỉ người bán mới có quyền hủy niêm yết!");
            }

            $itemMeta = json_decode($listing['item_data'] ?? '{}', true) ?: [];
            $quantity = (int)$listing['quantity'];
            $isStack = !empty($itemMeta['stackable']);

            // Restore into seller inventory
            $insItem = $this->pdo->prepare("
                INSERT INTO player_items (
                    player_id, item_uid, name, base_type, slot, rarity, item_level, category, quantity, sell_price, stackable, affixes, equipped
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)
            ");
            $newItemUid = substr(bin2hex(random_bytes(8)), 0, 16);
            $insItem->execute([
                $sellerId,
                $newItemUid,
                $itemMeta['name'] ?? $listing['item_id'],
                $itemMeta['base_type'] ?? $listing['item_id'],
                $itemMeta['slot'] ?? 'material',
                $itemMeta['rarity'] ?? 'common',
                (int)($itemMeta['item_level'] ?? 1),
                $itemMeta['category'] ?? 'material',
                $quantity,
                (int)($itemMeta['sell_price'] ?? 1),
                $isStack ? 1 : 0,
                json_encode($itemMeta['affixes'] ?? []),
            ]);

            // Update listing
            $this->pdo->prepare("UPDATE bazaar_listings SET status = 'cancelled', quantity = 0, version = version + 1 WHERE listing_id = ?")
                ->execute([$listingId]);

            $this->pdo->commit();

            return [
                'success' => true,
                'message' => "Đã hủy niêm yết và hoàn trả {$quantity}x [{$itemMeta['name']}] vào hành trang.",
            ];
        } catch (Throwable $e) {
            $this->pdo->rollBack();
            throw $e;
        }
    }

    /**
     * Browse active listings on the Bazaar.
     */
    public function browse(array $filters = []): array
    {
        $category = $filters['category'] ?? '';
        $search = trim($filters['search'] ?? '');
        $sort = $filters['sort'] ?? 'newest';
        $page = max(1, (int)($filters['page'] ?? 1));
        $limit = min(50, max(1, (int)($filters['limit'] ?? 20)));
        $offset = ($page - 1) * $limit;

        $where = ["b.status = 'active'"];
        $params = [];

        if ($search !== '') {
            $where[] = "(b.item_id LIKE ? OR JSON_UNQUOTE(JSON_EXTRACT(b.item_data, '$.name')) LIKE ?)";
            $params[] = "%{$search}%";
            $params[] = "%{$search}%";
        }

        if ($category !== '') {
            $where[] = "JSON_UNQUOTE(JSON_EXTRACT(b.item_data, '$.category')) = ?";
            $params[] = $category;
        }

        $orderBy = match ($sort) {
            'price_asc' => 'b.unit_price ASC, b.listing_id DESC',
            'price_desc' => 'b.unit_price DESC, b.listing_id DESC',
            'oldest' => 'b.listing_id ASC',
            default => 'b.listing_id DESC',
        };

        $whereSql = implode(' AND ', $where);

        $sql = "
            SELECT b.*, p.name as seller_name, p.level as seller_level
            FROM bazaar_listings b
            JOIN players p ON p.id = b.seller_id
            WHERE {$whereSql}
            ORDER BY {$orderBy}
            LIMIT {$limit} OFFSET {$offset}
        ";

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($params);
        $listings = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Count total
        $countSql = "SELECT COUNT(*) FROM bazaar_listings b WHERE {$whereSql}";
        $cStmt = $this->pdo->prepare($countSql);
        $cStmt->execute($params);
        $total = (int)$cStmt->fetchColumn();

        return [
            'listings' => array_map(function ($l) {
                return [
                    'listing_id' => (int)$l['listing_id'],
                    'seller_id' => $l['seller_id'],
                    'seller_name' => $l['seller_name'],
                    'seller_level' => (int)$l['seller_level'],
                    'item_id' => $l['item_id'],
                    'item_data' => json_decode($l['item_data'] ?? '{}', true) ?: [],
                    'quantity' => (int)$l['quantity'],
                    'unit_price' => (int)$l['unit_price'],
                    'tax_rate' => (float)$l['tax_rate'],
                    'version' => (int)$l['version'],
                    'created_at' => $l['created_at'],
                ];
            }, $listings),
            'total' => $total,
            'page' => $page,
            'limit' => $limit,
            'total_pages' => (int)ceil($total / $limit),
        ];
    }

    /**
     * Get listings for a specific seller.
     */
    public function getMyListings(string $sellerId): array
    {
        $stmt = $this->pdo->prepare("
            SELECT * FROM bazaar_listings 
            WHERE seller_id = ? AND status = 'active'
            ORDER BY listing_id DESC
        ");
        $stmt->execute([$sellerId]);
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return [
            'success' => true,
            'listings' => array_map(function ($l) {
                return [
                    'listing_id' => (int)$l['listing_id'],
                    'item_id' => $l['item_id'],
                    'item_data' => json_decode($l['item_data'] ?? '{}', true) ?: [],
                    'quantity' => (int)$l['quantity'],
                    'unit_price' => (int)$l['unit_price'],
                    'tax_rate' => (float)$l['tax_rate'],
                    'version' => (int)$l['version'],
                    'created_at' => $l['created_at'],
                ];
            }, $rows),
        ];
    }
}
