<?php

/**
 * Crafting Feature — Hệ Thống Luyện Đan & Tập Tinh Chế
 * Uses GameDataRepository (DB) instead of JSON files.
 */

use Slim\Psr7\Request;
use Slim\Psr7\Response;
use App\Core\GameDataRepository;

return function ($app) {
    // Phase 8: Get list of recipes
    $app->get('/api/recipes', function (Request $request, Response $response) {
        return jsonResponse($response, ['recipes' => GameDataRepository::getRecipes()]);
    });

    // Phase 8: Craft Item
    $app->post('/api/player/{id}/craft', function (Request $request, Response $response, array $args) {
        $id = $args['id'];
        $body = json_decode($request->getBody()->getContents(), true);
        $recipeId = $body['recipeId'] ?? null;
        if (!$recipeId) return jsonResponse($response, ['error' => 'Vui lòng chọn công thức'], 400);

        $player = loadPlayer($id);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        $recipe = GameDataRepository::getRecipeById($recipeId);
        if (!$recipe) return jsonResponse($response, ['error' => 'Công thức không tồn tại'], 400);

        // Check requirements
        $reqs = $recipe['requirements'] ?? [];
        if (!empty($reqs['skill'])) {
            $skillId = $reqs['skill'];
            $skillLvl = $reqs['level'] ?? 1;
            
            $hasSkill = false;
            foreach ($player->skills as $ps) {
                $sid = is_array($ps) ? ($ps['id']??'') : $ps;
                if ($sid === $skillId) {
                    $lvl = is_array($ps) ? ($ps['level']??1) : 1;
                    if ($lvl >= $skillLvl) {
                        $hasSkill = true;
                    }
                    break;
                }
            }
            if (!$hasSkill) {
                return jsonResponse($response, ['error' => "Cần kỹ năng {$skillId} cấp {$skillLvl} để luyện chế!"], 400);
            }
        }

        // Check cost
        $cost = $recipe['cost'] ?? 0;
        if ($player->gold < $cost) return jsonResponse($response, ['error' => "Không đủ {$cost} linh thạch phí tổn!"], 400);

        // Check materials
        $mats = $recipe['materials'] ?? [];
        foreach ($mats as $m) {
            $mid = $m['id'];
            $mamt = $m['amount'];
            if (($player->materials[$mid] ?? 0) < $mamt) {
                return jsonResponse($response, ['error' => "Không đủ linh tinh nguyên liệu!"], 400);
            }
        }

        // PRE-CHECK Inventory limits for Item recipes
        $isItem = ($recipe['type'] ?? 'medicine') === 'item';
        if ($isItem) {
            if (count($player->inventory) >= $player->getMaxInventorySize()) {
                return jsonResponse($response, ['error' => "Túi đồ đã đầy, không thể chứa thêm sản phẩm luyện chế!"], 400);
            }
        }

        // Deduct materials & gold
        $player->gold -= $cost;
        foreach ($mats as $m) {
            $mid = $m['id'];
            $player->materials[$mid] -= $m['amount'];
            if ($player->materials[$mid] <= 0) unset($player->materials[$mid]);
        }

        // Crafting Level bonuses
        $craftLvl = $player->craftingLevel;
        $lvlSuccessBonus = (int) floor($craftLvl / 5); // +1% per 5 levels
        $critChance = $craftLvl >= 76 ? 8 : ($craftLvl >= 51 ? 5 : ($craftLvl >= 26 ? 3 : 0));
        $matReturnRate = $craftLvl >= 76 ? 0.20 : ($craftLvl >= 51 ? 0.10 : 0);

        // Bonus Success Rate from Tinh Chế skill
        $baseRate = $recipe['successRate'] ?? 100;
        $bonus = $lvlSuccessBonus;
        foreach ($player->skills as $ps) {
            $sid = is_array($ps) ? ($ps['id']??'') : $ps;
            if ($sid === 'tinh_che') {
                $lvl = is_array($ps) ? ($ps['level']??1) : 1;
                $bonus += $lvl * 2; // +2% success chance per skill level
                $player->gainSkillXp('tinh_che', 5 * ($recipe['tier'] ?? 1));
                break;
            }
        }
        $finalRate = min(100, $baseRate + $bonus);

        // Crafting XP gain (always, even on fail)
        $craftXpGain = 10 + (($recipe['tier'] ?? 1) * 5);
        $player->craftingXp += $craftXpGain;
        $xpToNext = $player->craftingLevel * 50;
        $craftLevelUp = false;
        while ($player->craftingXp >= $xpToNext && $player->craftingLevel < 100) {
            $player->craftingXp -= $xpToNext;
            $player->craftingLevel++;
            $xpToNext = $player->craftingLevel * 50;
            $craftLevelUp = true;
        }

        // Roll success
        if (mt_rand(1, 100) > $finalRate) {
            // Material return for high-level crafters
            $returnedMats = [];
            if ($matReturnRate > 0) {
                foreach ($mats as $m) {
                    $returned = (int) floor($m['amount'] * $matReturnRate);
                    if ($returned > 0) {
                        $player->materials[$m['id']] = ($player->materials[$m['id']] ?? 0) + $returned;
                        $returnedMats[] = "{$m['id']} x{$returned}";
                    }
                }
            }

            savePlayer($id, $player);
            $failMsg = 'Luyện đan thất bại, lò nổ tung! Mất sạch nguyên liệu.';
            if (!empty($returnedMats)) $failMsg .= ' (LĐT Lv.' . $player->craftingLevel . ' thu hồi 1 phần nguyên liệu)';
            return jsonResponse($response, [
                'success' => false,
                'message' => $failMsg,
                'craftLevelUp' => $craftLevelUp,
                'craftingLevel' => $player->craftingLevel,
                'craftXpGain' => $craftXpGain,
                'player' => $player->toArray()
            ]);
        }

        // === SUCCESS! Check for Đại Thành (Critical Craft) ===
        $quality = 'normal'; // Phàm Phẩm
        $qualityLabel = '';
        $qualityBonus = 0;
        if ($critChance > 0 && mt_rand(1, 100) <= $critChance) {
            if ($craftLvl >= 76 && mt_rand(1, 100) <= 20) {
                $quality = 'divine';   // Thiên Phẩm
                $qualityLabel = '🌟 THIÊN PHẨM';
                $qualityBonus = 50;    // +50% stat
            } else {
                $quality = 'supreme';  // Cực Phẩm
                $qualityLabel = '✨ CỰC PHẨM';
                $qualityBonus = 25;    // +25% stat
            }
        } elseif (mt_rand(1, 100) <= 20 + $craftLvl / 2) {
            $quality = 'refined';      // Tinh Phẩm
            $qualityLabel = '💎 TINH PHẨM';
            $qualityBonus = 10;        // +10% stat
        }

        // Create result
        $targetId = $recipe['target'];
        $msg = 'Luyện đan thành công!';

        if ($isItem) {
            $itemSystem = new \App\Systems\ItemSystem();
            $item = $itemSystem->createItem($targetId);
            if ($item) {
                // Apply quality bonus to item stats
                if ($qualityBonus > 0 && property_exists($item, 'affixes')) {
                    foreach ($item->affixes as &$affix) {
                        if (isset($affix['value'])) {
                            $affix['value'] = (int) round($affix['value'] * (1 + $qualityBonus / 100));
                        }
                    }
                }
                $player->addToInventory($item);
                $msg = "Chế tác thành công! Thu được {$item->name}.";
            } else {
                return jsonResponse($response, ['error' => 'Lỗi khởi tạo Item System'], 500);
            }
        } else {
            $player->medicines[$targetId] = ($player->medicines[$targetId] ?? 0) + ($quality !== 'normal' ? 2 : 1);
            if ($quality !== 'normal') $msg = "Luyện đan thành công! Thu được 2 viên (bonus {$qualityLabel})";
        }

        if ($qualityLabel) $msg = "🎇 ĐẠI THÀNH! {$qualityLabel}! " . $msg;
        if ($craftLevelUp) $msg .= " 🎉 Luyện Đan Thuật đạt Lv.{$player->craftingLevel}!";
        
        savePlayer($id, $player);

        return jsonResponse($response, [
            'success' => true,
            'message' => $msg,
            'quality' => $quality,
            'qualityLabel' => $qualityLabel,
            'craftLevelUp' => $craftLevelUp,
            'craftingLevel' => $player->craftingLevel,
            'craftXpGain' => $craftXpGain,
            'player' => $player->toArray()
        ]);
    });
};
