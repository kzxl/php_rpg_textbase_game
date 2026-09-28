<?php

declare(strict_types=1);

namespace App\Features\Housing;

use App\Core\Database;
use App\Models\Player;
use PDO;
use RuntimeException;

/**
 * Housing Service: High-performance business logic for Cave Abodes (Động Phủ),
 * medicinal gardens (Dược Viên), formations (Trận Pháp), and player rentals.
 */
class HousingService
{
    private PDO $pdo;

    public function __construct(?PDO $pdo = null)
    {
        $this->pdo = $pdo ?? Database::pdo();
    }

    /**
     * Get complete housing details for a player, including garden progress & formation status.
     */
    public function getHousingDetails(string $playerId): array
    {
        // 1. Check owned housing
        $stmt = $this->pdo->prepare("SELECT * FROM player_housing WHERE player_id = ?");
        $stmt->execute([$playerId]);
        $housing = $stmt->fetch(PDO::FETCH_ASSOC);

        // 2. Check if renting another player's abode
        $isRenting = false;
        $rentedFrom = null;
        if (!$housing) {
            $rStmt = $this->pdo->prepare("
                SELECT r.*, p.name AS owner_name, h.tier AS owner_tier
                FROM housing_rentals r
                JOIN players p ON p.id = r.owner_id
                JOIN player_housing h ON h.player_id = r.owner_id
                WHERE r.renter_id = ? AND r.status = 'rented'
            ");
            $rStmt->execute([$playerId]);
            $rentedRental = $rStmt->fetch(PDO::FETCH_ASSOC);
            if ($rentedRental) {
                $isRenting = true;
                $rentedFrom = $rentedRental;
                // Grant tier bonuses corresponding to owner's tier
                $tier = (int)$rentedRental['owner_tier'];
                $tierInfo = HousingConstants::TIERS[$tier] ?? HousingConstants::TIERS[1];
                $passiveBonuses = $this->calculatePassiveBonuses($playerId, $tier);

                return [
                    'owned' => false,
                    'isRenting' => true,
                    'rentalInfo' => $rentedRental,
                    'tier' => $tier,
                    'tierInfo' => $tierInfo,
                    'gardenSlots' => [],
                    'maxSlots' => 0,
                    'nextTier' => null,
                    'tiers' => HousingConstants::TIERS,
                    'gardenHerbs' => HousingConstants::GARDEN_HERBS,
                    'formations' => [],
                    'dailyUpkeep' => (int)$rentedRental['daily_fee'],
                    'maintenanceDue' => false,
                    'lastMaintenance' => $rentedRental['rented_at'],
                    'passiveBonuses' => $passiveBonuses,
                ];
            }

            return [
                'owned' => false,
                'isRenting' => false,
                'tier' => 0,
                'tierInfo' => null,
                'gardenSlots' => [],
                'maxSlots' => 0,
                'nextTier' => HousingConstants::TIERS[1],
                'tiers' => HousingConstants::TIERS,
                'gardenHerbs' => HousingConstants::GARDEN_HERBS,
                'formations' => [],
                'dailyUpkeep' => 0,
                'maintenanceDue' => false,
                'lastMaintenance' => null,
                'passiveBonuses' => [
                    'hpRegenBonus' => 0,
                    'energyRegenBonus' => 0,
                    'staminaMaxBonus' => 0,
                    'gardenSpeedBonus' => 0.0,
                    'breakthroughBonus' => 0,
                ],
            ];
        }

        $tier = (int)$housing['tier'];
        $tierInfo = HousingConstants::TIERS[$tier] ?? HousingConstants::TIERS[1];
        $maxSlots = $tierInfo['gardenSlots'];

        // 3. Process formations
        $fStmt = $this->pdo->prepare("SELECT formation_id, level, active FROM housing_formations WHERE player_id = ?");
        $fStmt->execute([$playerId]);
        $playerFormations = [];
        while ($row = $fStmt->fetch(PDO::FETCH_ASSOC)) {
            $playerFormations[$row['formation_id']] = [
                'level' => (int)$row['level'],
                'active' => (bool)$row['active'],
            ];
        }

        $formationsDisplay = [];
        $totalDailyUpkeep = 0;
        $gardenSpeedBonus = 0.0;

        foreach (HousingConstants::FORMATIONS as $fId => $fDef) {
            $curLevel = $playerFormations[$fId]['level'] ?? 0;
            $isActive = $playerFormations[$fId]['active'] ?? false;
            $nextLevel = $curLevel + 1;
            $maxed = $curLevel >= $fDef['maxLevel'];

            $nextCost = !$maxed ? ($fDef['upgradeCosts'][$curLevel] ?? 0) : 0;
            $nextDailyCost = !$maxed ? ($fDef['dailyCosts'][$curLevel] ?? 0) : 0;
            $currentDailyCost = $curLevel > 0 ? ($fDef['dailyCosts'][$curLevel - 1] ?? 0) : 0;

            if ($curLevel > 0 && $isActive) {
                $totalDailyUpkeep += $currentDailyCost;
                if ($fId === 'linh_dien_tran') {
                    $gardenSpeedBonus += ($fDef['bonusPerLevel']['gardenSpeedBonus'] ?? 0) * $curLevel;
                }
            }

            $formationsDisplay[$fId] = array_merge($fDef, [
                'currentLevel' => $curLevel,
                'active' => $isActive,
                'canBuild' => $tier >= $fDef['requiredTier'],
                'maxed' => $maxed,
                'nextCost' => $nextCost,
                'nextDailyCost' => $nextDailyCost,
                'currentDailyCost' => $currentDailyCost,
            ]);
        }

        // 4. Check maintenance due
        $lastMaint = $housing['last_maintenance'] ?? null;
        $lastMaintDate = $lastMaint ? date('Y-m-d', strtotime($lastMaint)) : null;
        $today = date('Y-m-d');
        $maintenanceDue = ($lastMaintDate !== $today && $totalDailyUpkeep > 0);

        // 5. Garden slots progress calculation
        $rawGarden = json_decode($housing['garden_slots'] ?? '[]', true) ?: [];
        $now = time();
        $gardenSlots = [];

        for ($i = 0; $i < $maxSlots; $i++) {
            $slot = $rawGarden[$i] ?? null;
            if ($slot && !empty($slot['herb'])) {
                $herbId = $slot['herb'];
                $herbDef = HousingConstants::GARDEN_HERBS[$herbId] ?? null;
                $plantedAt = (int)($slot['planted_at'] ?? $now);
                $baseGrowth = (int)($herbDef['growthTime'] ?? 300);
                // Apply Linh Điền Trận speedup (e.g. -30% time)
                $effectiveGrowth = max(30, (int)round($baseGrowth * (1.0 - min(0.6, $gardenSpeedBonus))));
                $readyAt = $plantedAt + $effectiveGrowth;
                $isReady = $now >= $readyAt;
                $remaining = max(0, $readyAt - $now);
                $progressPct = min(100, (int)round((($now - $plantedAt) / max(1, $effectiveGrowth)) * 100));

                $gardenSlots[$i] = [
                    'slotIndex' => $i,
                    'herb' => $herbId,
                    'herbName' => $herbDef['name'] ?? $herbId,
                    'tier' => $herbDef['tier'] ?? 1,
                    'plantedAt' => $plantedAt,
                    'growthTime' => $effectiveGrowth,
                    'remainingSeconds' => $remaining,
                    'progressPercent' => $progressPct,
                    'ready' => $isReady,
                ];
            } else {
                $gardenSlots[$i] = [
                    'slotIndex' => $i,
                    'herb' => null,
                    'herbName' => 'Trống',
                    'tier' => 0,
                    'plantedAt' => 0,
                    'growthTime' => 0,
                    'remainingSeconds' => 0,
                    'progressPercent' => 0,
                    'ready' => false,
                ];
            }
        }

        // 6. Calculate total passive bonuses
        $passiveBonuses = $this->calculatePassiveBonuses($playerId, $tier, $formationsDisplay);

        return [
            'owned' => true,
            'isRenting' => false,
            'tier' => $tier,
            'tierInfo' => $tierInfo,
            'nextTier' => isset(HousingConstants::TIERS[$tier + 1])
                ? array_merge(HousingConstants::TIERS[$tier + 1], ['tier' => $tier + 1])
                : null,
            'tiers' => HousingConstants::TIERS,
            'gardenSlots' => $gardenSlots,
            'maxSlots' => $maxSlots,
            'gardenHerbs' => HousingConstants::GARDEN_HERBS,
            'formations' => $formationsDisplay,
            'dailyUpkeep' => $totalDailyUpkeep,
            'maintenanceDue' => $maintenanceDue,
            'lastMaintenance' => $lastMaint,
            'passiveBonuses' => $passiveBonuses,
        ];
    }

    /**
     * Buy new housing or upgrade to next tier.
     */
    public function buyOrUpgradeHousing(string $playerId, Player $player): array
    {
        $stmt = $this->pdo->prepare("SELECT tier FROM player_housing WHERE player_id = ?");
        $stmt->execute([$playerId]);
        $existing = $stmt->fetch(PDO::FETCH_ASSOC);

        $targetTier = $existing ? ((int)$existing['tier'] + 1) : 1;
        if (!isset(HousingConstants::TIERS[$targetTier])) {
            throw new RuntimeException('Động Phủ đã đạt cấp bậc cảnh giới tối đa (Thiên Cung)!');
        }

        $tierInfo = HousingConstants::TIERS[$targetTier];
        $cost = $tierInfo['cost'];

        if ($player->gold < $cost) {
            $act = $existing ? 'nâng cấp' : 'khởi tạo';
            throw new RuntimeException("Không đủ Linh Thạch! Cần {$cost} Linh Thạch để {$act}.");
        }

        $player->gold -= $cost;

        if ($existing) {
            $upStmt = $this->pdo->prepare("UPDATE player_housing SET tier = ? WHERE player_id = ?");
            $upStmt->execute([$targetTier, $playerId]);
            $action = 'nâng cấp';
        } else {
            $inStmt = $this->pdo->prepare("
                INSERT INTO player_housing (player_id, tier, garden_slots, daily_upkeep, last_maintenance)
                VALUES (?, ?, '[]', 0, NOW())
            ");
            $inStmt->execute([$playerId, $targetTier]);
            $action = 'khởi tạo';
        }

        return [
            'success' => true,
            'action' => $action,
            'tier' => $targetTier,
            'tierInfo' => $tierInfo,
            'message' => "Đã {$action} [{$tierInfo['name']}] thành công! Hồi phục Khí Huyết +{$tierInfo['hpRegen']}/tick, mở rộng {$tierInfo['gardenSlots']} khoảnh linh điền.",
            'player' => $player->toArray(),
        ];
    }

    /**
     * Plant a medicinal herb into a specified garden slot.
     */
    public function plantHerb(string $playerId, string $herbId, int $slotIndex): array
    {
        if (!isset(HousingConstants::GARDEN_HERBS[$herbId])) {
            throw new RuntimeException('Loại linh thảo không tồn tại trong truyền thừa!');
        }

        $stmt = $this->pdo->prepare("SELECT * FROM player_housing WHERE player_id = ?");
        $stmt->execute([$playerId]);
        $housing = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$housing) {
            throw new RuntimeException('Đạo hữu chưa khai mở Động Phủ!');
        }

        $tier = (int)$housing['tier'];
        $maxSlots = HousingConstants::TIERS[$tier]['gardenSlots'] ?? 1;

        if ($slotIndex < 0 || $slotIndex >= $maxSlots) {
            throw new RuntimeException("Ô dược điền không hợp lệ! Động Phủ T{$tier} chỉ có {$maxSlots} ô.");
        }

        $garden = json_decode($housing['garden_slots'] ?? '[]', true) ?: [];

        // Check if slot is occupied and not ready
        if (isset($garden[$slotIndex]) && !empty($garden[$slotIndex]['herb'])) {
            $plantedAt = (int)($garden[$slotIndex]['planted_at'] ?? 0);
            $herbDef = HousingConstants::GARDEN_HERBS[$garden[$slotIndex]['herb']] ?? null;
            $growth = (int)($herbDef['growthTime'] ?? 300);
            if (time() < $plantedAt + $growth) {
                throw new RuntimeException('Ô đất này đang gieo trồng linh thảo, chưa thể gieo tiếp!');
            }
        }

        $garden[$slotIndex] = [
            'herb' => $herbId,
            'planted_at' => time(),
        ];

        $upStmt = $this->pdo->prepare("UPDATE player_housing SET garden_slots = ? WHERE player_id = ?");
        $upStmt->execute([json_encode($garden), $playerId]);

        $herbName = HousingConstants::GARDEN_HERBS[$herbId]['name'];
        return [
            'success' => true,
            'message' => "Đã gieo giống {$herbName} vào khoảnh đất số " . ($slotIndex + 1) . ".",
            'slotIndex' => $slotIndex,
            'herb' => $herbId,
        ];
    }

    /**
     * Harvest ready herbs from the medicinal garden and deposit into player materials.
     */
    public function harvestGarden(string $playerId, Player $player, ?int $targetSlot = null): array
    {
        $stmt = $this->pdo->prepare("SELECT * FROM player_housing WHERE player_id = ?");
        $stmt->execute([$playerId]);
        $housing = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$housing) {
            throw new RuntimeException('Đạo hữu chưa có Động Phủ để thu hoạch!');
        }

        $garden = json_decode($housing['garden_slots'] ?? '[]', true) ?: [];
        $now = time();
        $harvestedItems = [];
        $totalItems = 0;

        // Fetch speed bonus from formations
        $speedBonus = $this->getGardenSpeedBonus($playerId);

        foreach ($garden as $idx => $slot) {
            if ($targetSlot !== null && $idx !== $targetSlot) {
                continue;
            }

            if (empty($slot['herb'])) {
                continue;
            }

            $herbId = $slot['herb'];
            $herbDef = HousingConstants::GARDEN_HERBS[$herbId] ?? null;
            if (!$herbDef) {
                continue;
            }

            $plantedAt = (int)($slot['planted_at'] ?? $now);
            $baseGrowth = (int)($herbDef['growthTime'] ?? 300);
            $effectiveGrowth = max(30, (int)round($baseGrowth * (1.0 - min(0.6, $speedBonus))));

            if ($now >= $plantedAt + $effectiveGrowth) {
                // Determine harvest yield
                [$minQty, $maxQty] = $herbDef['qty'];
                $yield = random_int($minQty, $maxQty);

                if (!isset($player->materials) || !is_array($player->materials)) {
                    $player->materials = [];
                }
                $player->materials[$herbId] = ($player->materials[$herbId] ?? 0) + $yield;

                $harvestedItems[] = [
                    'herbId' => $herbId,
                    'herbName' => $herbDef['name'],
                    'quantity' => $yield,
                    'slotIndex' => $idx,
                ];
                $totalItems += $yield;

                // Clear harvested slot
                $garden[$idx] = null;
            }
        }

        if (empty($harvestedItems)) {
            throw new RuntimeException('Chưa có khoảnh linh điền nào đến kỳ thu hoạch!');
        }

        // Save updated garden and player
        $upStmt = $this->pdo->prepare("UPDATE player_housing SET garden_slots = ? WHERE player_id = ?");
        $upStmt->execute([json_encode($garden), $playerId]);

        $summary = implode(', ', array_map(fn($h) => "{$h['herbName']} x{$h['quantity']}", $harvestedItems));

        return [
            'success' => true,
            'message' => "Thu hoạch thành công: {$summary}! Đã chuyển thẳng vào Càn Khôn Túi.",
            'harvested' => $harvestedItems,
            'totalHarvested' => $totalItems,
            'player' => $player->toArray(),
        ];
    }

    /**
     * Upgrade a defensive/auxiliary formation in the cave abode.
     */
    public function upgradeFormation(string $playerId, Player $player, string $formationId): array
    {
        $fDef = HousingConstants::FORMATIONS[$formationId] ?? null;
        if (!$fDef) {
            throw new RuntimeException('Trận pháp không tồn tại!');
        }

        $hStmt = $this->pdo->prepare("SELECT tier FROM player_housing WHERE player_id = ?");
        $hStmt->execute([$playerId]);
        $housing = $hStmt->fetch(PDO::FETCH_ASSOC);

        if (!$housing) {
            throw new RuntimeException('Cần có Động Phủ trước khi lập trận pháp!');
        }

        $tier = (int)$housing['tier'];
        if ($tier < $fDef['requiredTier']) {
            throw new RuntimeException("Cần Động Phủ đạt cấp T{$fDef['requiredTier']} ({$fDef['name']})!");
        }

        $fStmt = $this->pdo->prepare("SELECT level FROM housing_formations WHERE player_id = ? AND formation_id = ?");
        $fStmt->execute([$playerId, $formationId]);
        $existing = $fStmt->fetch(PDO::FETCH_ASSOC);

        $curLevel = $existing ? (int)$existing['level'] : 0;
        if ($curLevel >= $fDef['maxLevel']) {
            throw new RuntimeException('Trận pháp đã đạt cảnh giới đại viên mãn (MAX)!');
        }

        $cost = $fDef['upgradeCosts'][$curLevel] ?? 0;
        if ($player->gold < $cost) {
            throw new RuntimeException("Không đủ Linh Thạch! Cần {$cost} Linh Thạch để thăng cấp trận pháp.");
        }

        $player->gold -= $cost;
        $newLevel = $curLevel + 1;

        if ($existing) {
            $upStmt = $this->pdo->prepare("UPDATE housing_formations SET level = ?, active = 1 WHERE player_id = ? AND formation_id = ?");
            $upStmt->execute([$newLevel, $playerId, $formationId]);
        } else {
            $inStmt = $this->pdo->prepare("INSERT INTO housing_formations (player_id, formation_id, level, active) VALUES (?, ?, ?, 1)");
            $inStmt->execute([$playerId, $formationId, $newLevel]);
        }

        // Recalculate daily upkeep
        $this->syncDailyUpkeep($playerId);

        return [
            'success' => true,
            'message' => "Đã thăng cấp [{$fDef['name']}] lên Cấp {$newLevel}!",
            'formationId' => $formationId,
            'level' => $newLevel,
            'player' => $player->toArray(),
        ];
    }

    /**
     * Pay daily maintenance for formations.
     */
    public function payMaintenance(string $playerId, Player $player): array
    {
        $hStmt = $this->pdo->prepare("SELECT * FROM player_housing WHERE player_id = ?");
        $hStmt->execute([$playerId]);
        $housing = $hStmt->fetch(PDO::FETCH_ASSOC);

        if (!$housing) {
            throw new RuntimeException('Chưa có Động Phủ!');
        }

        $totalUpkeep = (int)$housing['daily_upkeep'];
        if ($totalUpkeep <= 0) {
            return [
                'success' => true,
                'message' => 'Động Phủ chưa có trận pháp nào cần nộp linh thạch duy trì.',
                'player' => $player->toArray(),
            ];
        }

        if ($player->gold < $totalUpkeep) {
            throw new RuntimeException("Không đủ Linh Thạch nộp phí duy trì! Cần {$totalUpkeep} Linh Thạch.");
        }

        $player->gold -= $totalUpkeep;

        // Reactivate formations and update timestamp
        $this->pdo->prepare("UPDATE housing_formations SET active = 1 WHERE player_id = ?")->execute([$playerId]);
        $this->pdo->prepare("UPDATE player_housing SET last_maintenance = NOW() WHERE player_id = ?")->execute([$playerId]);

        return [
            'success' => true,
            'message' => "Đã nộp {$totalUpkeep} Linh Thạch duy trì trận pháp hộ phủ thành công.",
            'player' => $player->toArray(),
        ];
    }

    /**
     * List player's cave abode room for rent in the bazaar.
     */
    public function listRental(string $ownerId, int $dailyFee): array
    {
        $hStmt = $this->pdo->prepare("SELECT tier FROM player_housing WHERE player_id = ?");
        $hStmt->execute([$ownerId]);
        $housing = $hStmt->fetch(PDO::FETCH_ASSOC);

        if (!$housing || (int)$housing['tier'] < 3) {
            throw new RuntimeException('Chỉ Động Phủ từ Thạch Các (T3) trở lên mới đủ điều kiện cho thuê phòng tu luyện!');
        }

        if ($dailyFee < 50 || $dailyFee > 10000) {
            throw new RuntimeException('Giá thuê mỗi ngày phải từ 50 đến 10,000 Linh Thạch!');
        }

        $chkStmt = $this->pdo->prepare("SELECT COUNT(*) FROM housing_rentals WHERE owner_id = ? AND status = 'available'");
        $chkStmt->execute([$ownerId]);
        if ((int)$chkStmt->fetchColumn() >= 2) {
            throw new RuntimeException('Đã niêm yết tối đa 2 phòng cho thuê cùng lúc!');
        }

        $ins = $this->pdo->prepare("
            INSERT INTO housing_rentals (owner_id, daily_fee, status)
            VALUES (?, ?, 'available')
        ");
        $ins->execute([$ownerId, $dailyFee]);

        return [
            'success' => true,
            'message' => "Đã niêm yết phòng tu luyện Động Phủ với giá {$dailyFee} Linh Thạch/ngày.",
        ];
    }

    /**
     * Get all available rooms for rent across all players.
     */
    public function getAvailableRentals(): array
    {
        $stmt = $this->pdo->query("
            SELECT r.id, r.owner_id, r.daily_fee, r.created_at,
                   p.name AS owner_name, p.level AS owner_level,
                   h.tier AS abode_tier
            FROM housing_rentals r
            JOIN players p ON p.id = r.owner_id
            JOIN player_housing h ON h.player_id = r.owner_id
            WHERE r.status = 'available'
            ORDER BY r.created_at DESC LIMIT 25
        ");

        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        foreach ($rows as &$row) {
            $t = (int)$row['abode_tier'];
            $row['tierName'] = HousingConstants::TIERS[$t]['name'] ?? 'Động Phủ';
            $row['hpRegen'] = HousingConstants::TIERS[$t]['hpRegen'] ?? 1;
            $row['breakthroughBonus'] = HousingConstants::TIERS[$t]['breakthroughBonus'] ?? 0;
        }

        return $rows;
    }

    /**
     * Rent a listed room from another player.
     */
    public function rentHouse(string $renterId, Player $player, int $rentalId): array
    {
        $rStmt = $this->pdo->prepare("SELECT * FROM housing_rentals WHERE id = ? AND status = 'available'");
        $rStmt->execute([$rentalId]);
        $rental = $rStmt->fetch(PDO::FETCH_ASSOC);

        if (!$rental) {
            throw new RuntimeException('Phòng này không còn khả dụng hoặc đã được thuê!');
        }

        if ($rental['owner_id'] === $renterId) {
            throw new RuntimeException('Không thể tự thuê Động Phủ của chính mình!');
        }

        // Check if already owning housing or renting
        $ownStmt = $this->pdo->prepare("SELECT id FROM player_housing WHERE player_id = ?");
        $ownStmt->execute([$renterId]);
        if ($ownStmt->fetch()) {
            throw new RuntimeException('Đạo hữu đã có Động Phủ riêng, không cần thuê!');
        }

        $curRent = $this->pdo->prepare("SELECT id FROM housing_rentals WHERE renter_id = ? AND status = 'rented'");
        $curRent->execute([$renterId]);
        if ($curRent->fetch()) {
            throw new RuntimeException('Đạo hữu đang thuê một phòng khác rồi!');
        }

        $fee = (int)$rental['daily_fee'];
        if ($player->gold < $fee) {
            throw new RuntimeException("Không đủ Linh Thạch! Cần {$fee} Linh Thạch cho ngày đầu.");
        }

        $player->gold -= $fee;

        // Pay 85% to owner, 15% heaven tax
        $ownerCut = (int)round($fee * 0.85);
        $this->pdo->prepare("UPDATE players SET gold = gold + ? WHERE id = ?")->execute([$ownerCut, $rental['owner_id']]);

        // Mark rental
        $up = $this->pdo->prepare("
            UPDATE housing_rentals
            SET renter_id = ?, status = 'rented', rented_at = NOW()
            WHERE id = ?
        ");
        $up->execute([$renterId, $rentalId]);

        return [
            'success' => true,
            'message' => "Thuê phòng thành công! Đã thanh toán {$fee} Linh Thạch cho ngày đầu.",
            'player' => $player->toArray(),
        ];
    }

    /**
     * Cancel an active rental listing or contract.
     */
    public function cancelRental(string $ownerId, int $rentalId): array
    {
        $stmt = $this->pdo->prepare("SELECT * FROM housing_rentals WHERE id = ? AND owner_id = ?");
        $stmt->execute([$rentalId, $ownerId]);
        $rental = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$rental) {
            throw new RuntimeException('Không tìm thấy bản niêm yết cho thuê!');
        }

        $this->pdo->prepare("UPDATE housing_rentals SET status = 'cancelled' WHERE id = ?")->execute([$rentalId]);

        return [
            'success' => true,
            'message' => 'Đã hủy niêm yết cho thuê phòng thành công.',
        ];
    }

    /**
     * Calculate passive stat & regen bonuses provided by housing tier and formations.
     */
    public function calculatePassiveBonuses(string $playerId, int $tier, ?array $formationsDisplay = null): array
    {
        $tierInfo = HousingConstants::TIERS[$tier] ?? null;
        $hpRegen = $tierInfo['hpRegen'] ?? 0;
        $btBonus = $tierInfo['breakthroughBonus'] ?? 0;

        $energyRegenBonus = 0;
        $staminaMaxBonus = 0;
        $gardenSpeedBonus = 0.0;

        if ($formationsDisplay !== null) {
            foreach ($formationsDisplay as $fId => $f) {
                if ($f['active'] && $f['currentLevel'] > 0) {
                    $lvl = $f['currentLevel'];
                    if ($fId === 'ho_the_tran') {
                        $hpRegen += ($f['bonusPerLevel']['hpRegenBonus'] ?? 0) * $lvl;
                    } elseif ($fId === 'tu_linh_tran') {
                        $energyRegenBonus += ($f['bonusPerLevel']['energyRegenBonus'] ?? 0) * $lvl;
                    } elseif ($fId === 'thu_linh_tran') {
                        $staminaMaxBonus += ($f['bonusPerLevel']['staminaMaxBonus'] ?? 0) * $lvl;
                    } elseif ($fId === 'linh_dien_tran') {
                        $gardenSpeedBonus += ($f['bonusPerLevel']['gardenSpeedBonus'] ?? 0) * $lvl;
                    }
                }
            }
        } else {
            // Query DB directly
            $fStmt = $this->pdo->prepare("SELECT formation_id, level FROM housing_formations WHERE player_id = ? AND active = 1");
            $fStmt->execute([$playerId]);
            while ($row = $fStmt->fetch(PDO::FETCH_ASSOC)) {
                $fId = $row['formation_id'];
                $lvl = (int)$row['level'];
                $fDef = HousingConstants::FORMATIONS[$fId] ?? null;
                if ($fDef) {
                    if ($fId === 'ho_the_tran') {
                        $hpRegen += ($fDef['bonusPerLevel']['hpRegenBonus'] ?? 0) * $lvl;
                    } elseif ($fId === 'tu_linh_tran') {
                        $energyRegenBonus += ($fDef['bonusPerLevel']['energyRegenBonus'] ?? 0) * $lvl;
                    } elseif ($fId === 'thu_linh_tran') {
                        $staminaMaxBonus += ($fDef['bonusPerLevel']['staminaMaxBonus'] ?? 0) * $lvl;
                    } elseif ($fId === 'linh_dien_tran') {
                        $gardenSpeedBonus += ($fDef['bonusPerLevel']['gardenSpeedBonus'] ?? 0) * $lvl;
                    }
                }
            }
        }

        return [
            'hpRegenBonus' => $hpRegen,
            'energyRegenBonus' => $energyRegenBonus,
            'staminaMaxBonus' => $staminaMaxBonus,
            'gardenSpeedBonus' => $gardenSpeedBonus,
            'breakthroughBonus' => $btBonus,
        ];
    }

    private function getGardenSpeedBonus(string $playerId): float
    {
        $stmt = $this->pdo->prepare("SELECT level FROM housing_formations WHERE player_id = ? AND formation_id = 'linh_dien_tran' AND active = 1");
        $stmt->execute([$playerId]);
        $lvl = (int)($stmt->fetchColumn() ?: 0);
        return $lvl * 0.15;
    }

    private function syncDailyUpkeep(string $playerId): void
    {
        $stmt = $this->pdo->prepare("SELECT formation_id, level FROM housing_formations WHERE player_id = ? AND active = 1");
        $stmt->execute([$playerId]);
        $total = 0;
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $fDef = HousingConstants::FORMATIONS[$row['formation_id']] ?? null;
            if ($fDef && $row['level'] > 0) {
                $total += $fDef['dailyCosts'][$row['level'] - 1] ?? 0;
            }
        }
        $this->pdo->prepare("UPDATE player_housing SET daily_upkeep = ? WHERE player_id = ?")->execute([$total, $playerId]);
    }
}
