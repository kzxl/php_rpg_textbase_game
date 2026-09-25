<?php

namespace App\Services;

use App\Models\Player;
use App\Models\Item;

/**
 * Service responsible for equipment enhancement (+1 to +12).
 * Handles success rates, material consumption, down-ranking risks,
 * and stat recalculation.
 */
class EnhancementService
{
    public const MAX_ENHANCE_LEVEL = 12;

    /**
     * Compute enhancement configuration for an item at a specific target level.
     *
     * @param Item $item
     * @return array
     */
    public static function getEnhanceConfig(Item $item): array
    {
        $currentLvl = $item->getEnhanceLevel();
        if ($currentLvl >= self::MAX_ENHANCE_LEVEL) {
            return [
                'canEnhance' => false,
                'isMaxLevel' => true,
                'currentLevel' => $currentLvl,
                'nextLevel' => $currentLvl,
                'successRate' => 0,
                'goldCost' => 0,
                'stonesRequired' => 0,
                'risk' => 'none',
                'description' => 'Trang bị đã đạt cảnh giới Cường Hóa tối đa (+12)!'
            ];
        }

        $nextLvl = $currentLvl + 1;
        $ilvl = max(1, $item->getItemLevel());

        // Success rates and failure risks
        if ($nextLvl <= 3) {
            $successRate = 100;
            $stones = 1;
            $gold = 50 * $nextLvl;
            $risk = 'safe'; // 100% success
        } elseif ($nextLvl <= 6) {
            $successRates = [4 => 80, 5 => 70, 6 => 60];
            $successRate = $successRates[$nextLvl] ?? 60;
            $stones = 2;
            $gold = 100 * $nextLvl;
            $risk = 'safe_fail'; // Failure does not downgrade
        } elseif ($nextLvl <= 9) {
            $successRates = [7 => 45, 8 => 35, 9 => 25];
            $successRate = $successRates[$nextLvl] ?? 25;
            $stones = 3;
            $gold = 250 * $nextLvl;
            $risk = 'downgrade'; // Failure downgrades 1 level
        } else {
            $successRates = [10 => 20, 11 => 15, 12 => 10];
            $successRate = $successRates[$nextLvl] ?? 10;
            $stones = 4;
            $gold = 600 * $nextLvl;
            $risk = 'downgrade'; // Failure downgrades 1 level
        }

        // Scale gold slightly with item level tier
        $gold = (int) round($gold * (1.0 + ($ilvl - 1) * 0.05));

        return [
            'canEnhance' => true,
            'isMaxLevel' => false,
            'currentLevel' => $currentLvl,
            'nextLevel' => $nextLvl,
            'successRate' => $successRate,
            'goldCost' => $gold,
            'stonesRequired' => $stones,
            'risk' => $risk,
            'stoneItemId' => 'da_cuong_hoa',
            'stoneItemName' => 'Đá Cường Hóa'
        ];
    }

    /**
     * Execute an enhancement attempt on an item owned by a player.
     *
     * @param Player $player
     * @param string $itemId
     * @return array
     */
    public static function enhanceItem(Player $player, string $itemId): array
    {
        // 1. Locate the item in equipped slots or inventory
        $targetItem = null;
        $location = null;
        $slotKey = null;

        foreach ($player->equipment as $slot => $item) {
            if ($item instanceof Item && $item->getId() === $itemId) {
                $targetItem = $item;
                $location = 'equipped';
                $slotKey = $slot;
                break;
            }
        }

        if (!$targetItem) {
            foreach ($player->inventory as $idx => $item) {
                if ($item instanceof Item && $item->getId() === $itemId) {
                    $targetItem = $item;
                    $location = 'inventory';
                    $slotKey = $idx;
                    break;
                }
            }
        }

        if (!$targetItem) {
            return [
                'success' => false,
                'error' => 'Trang bị không tồn tại trong túi đồ hoặc trên người!'
            ];
        }

        $config = self::getEnhanceConfig($targetItem);
        if (!$config['canEnhance']) {
            return [
                'success' => false,
                'error' => $config['description'] ?? 'Trang bị không thể cường hóa thêm.'
            ];
        }

        // 2. Validate Gold
        if ($player->gold < $config['goldCost']) {
            return [
                'success' => false,
                'error' => "Không đủ Linh Thạch! Cần {$config['goldCost']} Linh Thạch để tế luyện."
            ];
        }

        // 3. Validate Enhancement Stones
        $stoneId = $config['stoneItemId'];
        $playerStones = $player->materials[$stoneId] ?? 0;
        if ($playerStones < $config['stonesRequired']) {
            return [
                'success' => false,
                'error' => "Không đủ Đá Cường Hóa! Cần {$config['stonesRequired']} viên (Hiện có: {$playerStones})."
            ];
        }

        // 4. Deduct resources
        $player->gold -= $config['goldCost'];
        $player->materials[$stoneId] -= $config['stonesRequired'];
        if ($player->materials[$stoneId] <= 0) {
            unset($player->materials[$stoneId]);
        }

        // 5. Roll Enhancement Outcome
        $roll = mt_rand(1, 100);
        $isSuccess = ($roll <= $config['successRate']);
        $oldLevel = $targetItem->getEnhanceLevel();

        if ($isSuccess) {
            $newLevel = $oldLevel + 1;
            $targetItem->setEnhanceLevel($newLevel);
            $outcome = 'success';
            $message = "✨ CƯỜNG HÓA THÀNH CÔNG! [{$targetItem->name}] đã đột phá lên +{$newLevel}!";
        } else {
            if ($config['risk'] === 'downgrade') {
                $newLevel = max(0, $oldLevel - 1);
                $targetItem->setEnhanceLevel($newLevel);
                $outcome = 'downgraded';
                $message = "💥 CƯỜNG HÓA THẤT BẠI! Linh khí phản phệ, [{$targetItem->name}] bị rớt xuống +{$newLevel}.";
            } else {
                $newLevel = $oldLevel;
                $outcome = 'failed';
                $message = "💨 Cường hóa thất bại! May mắn linh khí ổn định, cấp độ trang bị giữ nguyên (+{$oldLevel}).";
            }
        }

        // 6. Recalibrate Player Derived Stats if equipped
        $player->recalcDerived();

        return [
            'success' => true,
            'outcome' => $outcome,
            'isSuccess' => $isSuccess,
            'message' => $message,
            'roll' => $roll,
            'successRate' => $config['successRate'],
            'oldLevel' => $oldLevel,
            'newLevel' => $newLevel,
            'item' => $targetItem->toArray(),
            'player' => $player->toArray()
        ];
    }
}
