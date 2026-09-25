<?php

namespace App\Services;

use App\Models\Player;
use App\Models\Item;
use App\Systems\ItemSystem;

/**
 * Service responsible for equipment blacksmithing and forging (Đúc Khí).
 * Processes raw ores, mob components, and spiritual catalysts into
 * weapons, armors, shields, and mystical accessories.
 */
class ForgingService
{
    /**
     * Predefined canonical forging recipes by tier.
     */
    public const FORGING_RECIPES = [
        // --- TIER 1: Luyện Khí ---
        'forge_thiet_kiem' => [
            'id' => 'forge_thiet_kiem',
            'name' => 'Thiết Kiếm',
            'type' => 'equipment',
            'slot' => 'weapon',
            'baseType' => 'sword',
            'tier' => 1,
            'rarity' => 'common',
            'itemLevel' => 3,
            'cost' => 20,
            'successRate' => 95,
            'materials' => [
                ['id' => 'mat_thiet_khoang_tho', 'amount' => 3, 'name' => 'Thiết Khoáng Thô'],
                ['id' => 'mat_da_tho', 'amount' => 2, 'name' => 'Da Thô']
            ],
            'description' => 'Kiếm rèn từ quặng sắt thô và chuôi bọc da thú, vũ khí cơ bản nhập môn.'
        ],
        'forge_da_giap' => [
            'id' => 'forge_da_giap',
            'name' => 'Thô Bì Hộ Giáp',
            'type' => 'equipment',
            'slot' => 'body',
            'baseType' => 'armor',
            'tier' => 1,
            'rarity' => 'common',
            'itemLevel' => 3,
            'cost' => 20,
            'successRate' => 95,
            'materials' => [
                ['id' => 'mat_da_tho', 'amount' => 4, 'name' => 'Da Thô'],
                ['id' => 'mat_xuong_vun', 'amount' => 2, 'name' => 'Xương Vụn']
            ],
            'description' => 'Hộ giáp may từ da thú dẻo dai bọc mảnh xương cứng gia cố phòng ngự.'
        ],
        'forge_xuong_thuan' => [
            'id' => 'forge_xuong_thuan',
            'name' => 'Bạch Cốt Khiên',
            'type' => 'equipment',
            'slot' => 'shield',
            'baseType' => 'shield',
            'tier' => 1,
            'rarity' => 'common',
            'itemLevel' => 4,
            'cost' => 25,
            'successRate' => 90,
            'materials' => [
                ['id' => 'mat_xuong_vun', 'amount' => 5, 'name' => 'Xương Vụn'],
                ['id' => 'quang_dong', 'amount' => 2, 'name' => 'Quặng Đồng']
            ],
            'description' => 'Tấm khiên ghép từ xương cốt yêu thú kiên cố viền đồng thau.'
        ],
        'forge_tru_vat_gioi' => [
            'id' => 'forge_tru_vat_gioi',
            'name' => 'Trữ Vật Giới Chỉ',
            'type' => 'equipment',
            'slot' => 'ring',
            'baseType' => 'tru_vat_gioi',
            'tier' => 1,
            'rarity' => 'uncommon',
            'itemLevel' => 5,
            'cost' => 50,
            'successRate' => 85,
            'materials' => [
                ['id' => 'mat_khong_gian_manh', 'amount' => 2, 'name' => 'Mảnh Vỡ Không Gian'],
                ['id' => 'quang_dong', 'amount' => 3, 'name' => 'Quặng Đồng']
            ],
            'description' => 'Nhẫn đúc chứa không gian thứ nguyên sơ khai, gia tăng sức chứa túi đồ.'
        ],

        // --- TIER 2: Trúc Cơ ---
        'forge_tinh_gang_kiem' => [
            'id' => 'forge_tinh_gang_kiem',
            'name' => 'Tinh Cương Kiếm',
            'type' => 'equipment',
            'slot' => 'weapon',
            'baseType' => 'sword',
            'tier' => 2,
            'rarity' => 'uncommon',
            'itemLevel' => 10,
            'cost' => 60,
            'successRate' => 85,
            'materials' => [
                ['id' => 'quang_bac', 'amount' => 4, 'name' => 'Quặng Bạc'],
                ['id' => 'mat_kim_loai_linh', 'amount' => 3, 'name' => 'Kim Loại Linh']
            ],
            'description' => 'Kiếm luyện từ bạc tinh chất cùng kim loại linh khí, sắc bén dị thường.'
        ],
        'forge_linh_giap' => [
            'id' => 'forge_linh_giap',
            'name' => 'Giáp Thiết Trùng',
            'type' => 'equipment',
            'slot' => 'body',
            'baseType' => 'armor',
            'tier' => 2,
            'rarity' => 'uncommon',
            'itemLevel' => 10,
            'cost' => 70,
            'successRate' => 85,
            'materials' => [
                ['id' => 'mat_kim_loai_linh', 'amount' => 4, 'name' => 'Kim Loại Linh'],
                ['id' => 'mat_vo_cung', 'amount' => 3, 'name' => 'Vỏ Cứng']
            ],
            'description' => 'Hộ giáp tôi luyện từ vỏ giáp côn trùng thiết giáp kết hợp linh kim.'
        ],
        'forge_hoa_linh_dao' => [
            'id' => 'forge_hoa_linh_dao',
            'name' => 'Hỏa Linh Đao',
            'type' => 'equipment',
            'slot' => 'weapon',
            'baseType' => 'saber',
            'tier' => 2,
            'rarity' => 'rare',
            'itemLevel' => 12,
            'cost' => 90,
            'successRate' => 80,
            'materials' => [
                ['id' => 'mat_tinh_hoa', 'amount' => 3, 'name' => 'Tinh Hỏa'],
                ['id' => 'mat_kim_loai_linh', 'amount' => 4, 'name' => 'Kim Loại Linh'],
                ['id' => 'mat_long_hoa', 'amount' => 2, 'name' => 'Lông Hỏa']
            ],
            'description' => 'Trọng đao nung trong tinh hoa ngọn lửa hồ ly, chém ra mang nhiệt hỏa khí.'
        ],
        'forge_bang_phach_hai' => [
            'id' => 'forge_bang_phach_hai',
            'name' => 'Băng Phách Hài',
            'type' => 'equipment',
            'slot' => 'feet',
            'baseType' => 'boots',
            'tier' => 2,
            'rarity' => 'uncommon',
            'itemLevel' => 10,
            'cost' => 65,
            'successRate' => 85,
            'materials' => [
                ['id' => 'mat_bang_phach_thach', 'amount' => 3, 'name' => 'Băng Phách Thạch'],
                ['id' => 'mat_da_ran', 'amount' => 3, 'name' => 'Da Rắn']
            ],
            'description' => 'Chiếc hài nhẹ nhàng đính tinh thể băng, di chuyển như lướt trên mặt tuyết.'
        ],

        // --- TIER 3: Kim Đan ---
        'forge_huyet_lang_kiem' => [
            'id' => 'forge_huyet_lang_kiem',
            'name' => 'Huyết Lang Vương Kiếm',
            'type' => 'equipment',
            'slot' => 'weapon',
            'baseType' => 'sword',
            'tier' => 3,
            'rarity' => 'rare',
            'itemLevel' => 20,
            'cost' => 160,
            'successRate' => 75,
            'materials' => [
                ['id' => 'mat_rang_soi_vuong', 'amount' => 2, 'name' => 'Răng Sói Vương'],
                ['id' => 'mat_huyet_tinh', 'amount' => 3, 'name' => 'Huyết Tinh'],
                ['id' => 'mat_thiet_huyet_khoang', 'amount' => 4, 'name' => 'Thiết Huyết Quặng']
            ],
            'description' => 'Thanh hung kiếm rèn từ nanh vuốt Huyết Lang Vương, khát máu và uy áp.'
        ],
        'forge_thiet_huyet_giap' => [
            'id' => 'forge_thiet_huyet_giap',
            'name' => 'Thiết Huyết Huyền Giáp',
            'type' => 'equipment',
            'slot' => 'body',
            'baseType' => 'armor',
            'tier' => 3,
            'rarity' => 'rare',
            'itemLevel' => 20,
            'cost' => 180,
            'successRate' => 75,
            'materials' => [
                ['id' => 'mat_thiet_huyet_khoang', 'amount' => 6, 'name' => 'Thiết Huyết Quặng'],
                ['id' => 'mat_huyet_tinh', 'amount' => 3, 'name' => 'Huyết Tinh'],
                ['id' => 'mat_tinh_thach', 'amount' => 3, 'name' => 'Tinh Thạch']
            ],
            'description' => 'Huyền giáp dày cộm tôi luyện bằng máu và sát khí Thiết Huyết Sơn.'
        ],
        'forge_loi_tinh_thuong' => [
            'id' => 'forge_loi_tinh_thuong',
            'name' => 'Lôi Kiếp Thần Thương',
            'type' => 'equipment',
            'slot' => 'weapon',
            'baseType' => 'spear',
            'tier' => 3,
            'rarity' => 'epic',
            'itemLevel' => 22,
            'cost' => 220,
            'successRate' => 70,
            'materials' => [
                ['id' => 'mat_loi_tinh_thach', 'amount' => 4, 'name' => 'Lôi Kiếp Thạch'],
                ['id' => 'mat_loi_vu', 'amount' => 3, 'name' => 'Lôi Vũ'],
                ['id' => 'huyen_thiet', 'amount' => 3, 'name' => 'Huyền Thiết']
            ],
            'description' => 'Trường thương tích tụ uy năng sấm chớp, mỗi đường kích đều phát ra tiếng lôi minh.'
        ],
        'forge_hu_khong_gioi' => [
            'id' => 'forge_hu_khong_gioi',
            'name' => 'Hư Không Nạp Giới',
            'type' => 'equipment',
            'slot' => 'ring',
            'baseType' => 'tru_vat_gioi',
            'tier' => 3,
            'rarity' => 'rare',
            'itemLevel' => 22,
            'cost' => 280,
            'successRate' => 70,
            'materials' => [
                ['id' => 'mat_hu_khong_tinh', 'amount' => 2, 'name' => 'Hư Không Tinh'],
                ['id' => 'quang_vang', 'amount' => 4, 'name' => 'Quặng Vàng'],
                ['id' => 'mat_tinh_thach', 'amount' => 3, 'name' => 'Tinh Thạch']
            ],
            'description' => 'Nạp giới cao cấp nạm tinh thể hư không, cơi nới không gian túi trữ vật cực lớn.'
        ],

        // --- TIER 4: Nguyên Anh ---
        'forge_thien_thach_dai_dao' => [
            'id' => 'forge_thien_thach_dai_dao',
            'name' => 'Thiên Ngoại Huyền Đao',
            'type' => 'equipment',
            'slot' => 'weapon',
            'baseType' => 'saber',
            'tier' => 4,
            'rarity' => 'epic',
            'itemLevel' => 35,
            'cost' => 500,
            'successRate' => 60,
            'materials' => [
                ['id' => 'mat_thien_thach', 'amount' => 4, 'name' => 'Thiên Thạch'],
                ['id' => 'mat_ba_vuong_nanh', 'amount' => 2, 'name' => 'Nanh Bá Vương'],
                ['id' => 'huyen_thiet', 'amount' => 5, 'name' => 'Huyền Thiết']
            ],
            'description' => 'Bảo đao rèn từ đá trời rơi xuống vực sâu, nặng tựa ngàn cân, trảm đoạn thiết thạch.'
        ],
        'forge_tinh_tieu_bao' => [
            'id' => 'forge_tinh_tieu_bao',
            'name' => 'Tinh Tiêu Bát Quái Bào',
            'type' => 'equipment',
            'slot' => 'body',
            'baseType' => 'armor',
            'tier' => 4,
            'rarity' => 'epic',
            'itemLevel' => 35,
            'cost' => 600,
            'successRate' => 60,
            'materials' => [
                ['id' => 'mat_tinh_tieu_thach', 'amount' => 5, 'name' => 'Tinh Tiêu Thạch'],
                ['id' => 'mat_loi_de_vu', 'amount' => 3, 'name' => 'Lôi Đế Vũ'],
                ['id' => 'mat_tran_phap_tan_phien', 'amount' => 2, 'name' => 'Tàn Phiến Trận Đồ']
            ],
            'description' => 'Đạo bào thêu dệt từ lông vũ Lôi Đế và bụi tinh tú, hộ thể trước vạn kiếp ma lôi.'
        ],

        // --- TIER 5: Hóa Thần & Chí Tôn ---
        'forge_ban_nguyen_than_kiem' => [
            'id' => 'forge_ban_nguyen_than_kiem',
            'name' => 'Bản Nguyên Tru Tiên Kiếm',
            'type' => 'equipment',
            'slot' => 'weapon',
            'baseType' => 'sword',
            'tier' => 5,
            'rarity' => 'legendary',
            'itemLevel' => 50,
            'cost' => 2000,
            'successRate' => 45,
            'materials' => [
                ['id' => 'ban_nguyen_tinh', 'amount' => 2, 'name' => 'Bản Nguyên Tinh'],
                ['id' => 'mat_hon_don_khi', 'amount' => 2, 'name' => 'Hỗn Độn Khí Tinh'],
                ['id' => 'mat_hon_nguyen_chau', 'amount' => 1, 'name' => 'Hỗn Nguyên Đạo Châu']
            ],
            'description' => 'Thần kiếm đúc từ bản nguyên vũ trụ thủa hồng hoang, khai thiên lập địa, nhất kiếm định càn khôn.'
        ],
        'forge_huyet_ma_than_giap' => [
            'id' => 'forge_huyet_ma_than_giap',
            'name' => 'Huyết Ma Bất Hoại Thần Giáp',
            'type' => 'equipment',
            'slot' => 'body',
            'baseType' => 'armor',
            'tier' => 5,
            'rarity' => 'legendary',
            'itemLevel' => 50,
            'cost' => 2500,
            'successRate' => 40,
            'materials' => [
                ['id' => 'mat_huyet_ma_ban_giap', 'amount' => 3, 'name' => 'Huyết Ma Bản Giáp'],
                ['id' => 'ban_nguyen_tinh', 'amount' => 2, 'name' => 'Bản Nguyên Tinh'],
                ['id' => 'mat_cuu_u_hac_thuy', 'amount' => 2, 'name' => 'Cửu U Hắc Thủy']
            ],
            'description' => 'Ma thần giáp thượng cổ bất diệt, kháng cự mọi đòn sát thương chí mạng.'
        ]
    ];

    /**
     * Get all forging recipes.
     *
     * @return array
     */
    public static function getAllRecipes(): array
    {
        return array_values(self::FORGING_RECIPES);
    }

    /**
     * Get recipe by identifier.
     *
     * @param string $id
     * @return array|null
     */
    public static function getRecipeById(string $id): ?array
    {
        return self::FORGING_RECIPES[$id] ?? null;
    }

    /**
     * Execute equipment forging for a player.
     *
     * @param Player $player
     * @param string $recipeId
     * @return array
     */
    public static function forgeItem(Player $player, string $recipeId): array
    {
        $recipe = self::getRecipeById($recipeId);
        if (!$recipe) {
            return [
                'success' => false,
                'error' => 'Công thức Đúc Khí không tồn tại!'
            ];
        }

        // 1. Inventory capacity check
        if (count($player->inventory) >= $player->getMaxInventorySize()) {
            return [
                'success' => false,
                'error' => 'Càn Khôn Túi đã đầy! Vui lòng dọn dẹp hoặc trang bị thêm túi trữ vật trước khi đúc khí.'
            ];
        }

        // 2. Gold / Spirit Stones check
        if ($player->gold < $recipe['cost']) {
            return [
                'success' => false,
                'error' => "Không đủ Linh Thạch! Cần {$recipe['cost']} Linh Thạch để nhóm lửa lò rèn."
            ];
        }

        // 3. Materials check
        $materials = $recipe['materials'] ?? [];
        foreach ($materials as $m) {
            $mId = $m['id'];
            $reqAmt = $m['amount'];
            $playerAmt = $player->materials[$mId] ?? 0;
            if ($playerAmt < $reqAmt) {
                $matName = $m['name'] ?? $mId;
                return [
                    'success' => false,
                    'error' => "Thiếu nguyên liệu rèn: {$matName} (Cần {$reqAmt}, hiện có {$playerAmt})!"
                ];
            }
        }

        // 4. Deduct gold and materials
        $player->gold -= $recipe['cost'];
        foreach ($materials as $m) {
            $mId = $m['id'];
            $player->materials[$mId] -= $m['amount'];
            if ($player->materials[$mId] <= 0) {
                unset($player->materials[$mId]);
            }
        }

        // 5. Compute Success Rate factoring Crafting Level & Tinh Chế skill
        $craftLvl = $player->craftingLevel;
        $lvlSuccessBonus = (int) floor($craftLvl / 4); // +1% per 4 levels
        
        $skillBonus = 0;
        foreach ($player->skills as $ps) {
            $sid = is_array($ps) ? ($ps['id'] ?? '') : $ps;
            if ($sid === 'tinh_che') {
                $sLevel = is_array($ps) ? ($ps['level'] ?? 1) : 1;
                $skillBonus = $sLevel * 2;
                $player->gainSkillXp('tinh_che', 8 * ($recipe['tier'] ?? 1));
                break;
            }
        }

        $finalRate = min(100, $recipe['successRate'] + $lvlSuccessBonus + $skillBonus);
        $roll = mt_rand(1, 100);

        // 6. Grant Crafting XP (Always gained)
        $craftXpGain = 15 + (($recipe['tier'] ?? 1) * 10);
        $player->craftingXp += $craftXpGain;
        $xpToNext = $player->craftingLevel * 50;
        $craftLevelUp = false;
        while ($player->craftingXp >= $xpToNext && $player->craftingLevel < 100) {
            $player->craftingXp -= $xpToNext;
            $player->craftingLevel++;
            $xpToNext = $player->craftingLevel * 50;
            $craftLevelUp = true;
        }

        // 7. Check Failure
        if ($roll > $finalRate) {
            // Material salvage for experienced craftsmen
            $salvaged = [];
            $salvageRate = $craftLvl >= 76 ? 0.25 : ($craftLvl >= 50 ? 0.15 : ($craftLvl <= 10 ? 0.50 : 0));
            if ($salvageRate > 0) {
                foreach ($materials as $m) {
                    $retAmt = (int) floor($m['amount'] * $salvageRate);
                    if ($retAmt > 0) {
                        $player->materials[$m['id']] = ($player->materials[$m['id']] ?? 0) + $retAmt;
                        $salvaged[] = "{$m['name']} x{$retAmt}";
                    }
                }
            }

            $failMsg = "💥 RÈN ĐÚC THẤT BẠI! Lò tôi luyện quá nhiệt, phôi quặng vỡ nát!";
            if (!empty($salvaged)) {
                $failMsg .= " (Nhờ trình độ Luyện Khí, thu hồi lại: " . implode(', ', $salvaged) . ")";
            }

            return [
                'success' => false,
                'forged' => false,
                'message' => $failMsg,
                'craftLevelUp' => $craftLevelUp,
                'craftingLevel' => $player->craftingLevel,
                'craftXpGain' => $craftXpGain,
                'player' => $player->toArray()
            ];
        }

        // 8. Determine Crafting Quality (Phàm Phẩm, Tinh Phẩm, Cực Phẩm, Thiên Phẩm)
        $quality = 'normal';
        $qualityLabel = 'Phàm Phẩm';
        $qualityColor = '#94a3b8';
        $qualityBonusPct = 0;
        $targetRarity = $recipe['rarity'] ?? 'common';

        $critChance = $craftLvl >= 76 ? 12 : ($craftLvl >= 50 ? 8 : ($craftLvl >= 25 ? 4 : 1));
        $qRoll = mt_rand(1, 100);

        if ($qRoll <= $critChance) {
            if ($craftLvl >= 75 && mt_rand(1, 100) <= 25) {
                $quality = 'divine';
                $qualityLabel = '🌟 THIÊN PHẨM';
                $qualityColor = '#f59e0b';
                $qualityBonusPct = 50;
                // Upgrade rarity if not legendary
                if ($targetRarity === 'rare') $targetRarity = 'epic';
                elseif ($targetRarity === 'epic') $targetRarity = 'legendary';
            } else {
                $quality = 'supreme';
                $qualityLabel = '✨ CỰC PHẨM';
                $qualityColor = '#a855f7';
                $qualityBonusPct = 30;
                if ($targetRarity === 'uncommon') $targetRarity = 'rare';
            }
        } elseif ($qRoll <= 25 + (int)($craftLvl / 3)) {
            $quality = 'refined';
            $qualityLabel = '💎 TINH PHẨM';
            $qualityColor = '#38bdf8';
            $qualityBonusPct = 15;
        }

        // 9. Generate Item Model with scaled affixes
        $itemSystem = new ItemSystem();
        $baseItemLevel = $recipe['itemLevel'] ?? 1;
        $slot = $recipe['slot'] ?? 'weapon';
        $baseType = $recipe['baseType'] ?? $slot;

        // Generate affixes appropriate for the resulting rarity
        $affixes = $itemSystem->generateAffixes($targetRarity, $slot, $baseItemLevel);

        // Apply quality bonus to rolled affixes
        if ($qualityBonusPct > 0) {
            foreach ($affixes as &$affix) {
                if (isset($affix['value'])) {
                    $affix['value'] = (int) round($affix['value'] * (1.0 + $qualityBonusPct / 100));
                }
            }
        }

        // Special bonus for storage rings (Trữ Vật Giới Chỉ)
        if ($baseType === 'tru_vat_gioi') {
            $capacity = match($recipe['tier']) {
                1 => 10,
                3 => 25,
                default => 10
            };
            if ($qualityBonusPct > 0) {
                $capacity += (int)round($capacity * ($qualityBonusPct / 100));
            }
            array_unshift($affixes, [
                'type' => 'flat',
                'stat' => 'inventory_slots',
                'value' => $capacity,
                'name' => "Sức Chứa Túi +{$capacity}",
                'tier' => $recipe['tier']
            ]);
        }

        $itemId = $recipe['id'] . '_' . bin2hex(random_bytes(3));
        $itemName = $recipe['name'];
        if ($quality !== 'normal') {
            $itemName = "[{$qualityLabel}] " . $itemName;
        }

        $forgedItem = new Item(
            id: $itemId,
            name: $itemName,
            baseType: $baseType,
            slot: $slot,
            rarity: $targetRarity,
            affixes: $affixes,
            itemLevel: $baseItemLevel,
            enhanceLevel: 0
        );

        // 10. Add forged item to player inventory
        $player->addToInventory($forgedItem);

        $successMsg = "🎉 ĐÚC KHÍ ĐẠI THÀNH! Luyện thành công [{$itemName}] ({$qualityLabel})!";
        if ($craftLevelUp) {
            $successMsg .= " 🌟 Luyện Khí Thuật đột phá Cấp {$player->craftingLevel}!";
        }

        return [
            'success' => true,
            'forged' => true,
            'message' => $successMsg,
            'quality' => $quality,
            'qualityLabel' => $qualityLabel,
            'qualityColor' => $qualityColor,
            'item' => $forgedItem->toArray(),
            'craftLevelUp' => $craftLevelUp,
            'craftingLevel' => $player->craftingLevel,
            'craftXpGain' => $craftXpGain,
            'player' => $player->toArray()
        ];
    }
}
