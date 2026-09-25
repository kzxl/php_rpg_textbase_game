<?php

/**
 * Crafting, Forging, and Equipment Enhancement Endpoints.
 * Standard Technical English implementation conforming to R_PUB and architectural standards.
 */

use Slim\Psr7\Request;
use Slim\Psr7\Response;
use App\Core\GameDataRepository;
use App\Services\ForgingService;
use App\Services\EnhancementService;
use App\Models\Item;

return function ($app) {

    // =========================================================================
    // 1. ALCHEMY & MEDICINE RECIPES
    // =========================================================================

    /**
     * Retrieve all alchemical medicine recipes from repository.
     */
    $app->get('/api/recipes', function (Request $request, Response $response) {
        return jsonResponse($response, ['recipes' => GameDataRepository::getRecipes()]);
    });

    /**
     * Execute medicine crafting (Luyện Đan).
     */
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
                $sid = is_array($ps) ? ($ps['id'] ?? '') : $ps;
                if ($sid === $skillId) {
                    $lvl = is_array($ps) ? ($ps['level'] ?? 1) : 1;
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

        // Pre-check inventory limits for Item recipes
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
        $lvlSuccessBonus = (int) floor($craftLvl / 5);
        $critChance = $craftLvl >= 76 ? 8 : ($craftLvl >= 51 ? 5 : ($craftLvl >= 26 ? 3 : 0));
        $matReturnRate = $craftLvl >= 76 ? 0.20 : ($craftLvl >= 51 ? 0.10 : ($craftLvl <= 10 ? 0.50 : 0));

        // Bonus Success Rate from Tinh Chế skill
        $baseRate = $recipe['successRate'] ?? 100;
        $bonus = $lvlSuccessBonus;
        foreach ($player->skills as $ps) {
            $sid = is_array($ps) ? ($ps['id'] ?? '') : $ps;
            if ($sid === 'tinh_che') {
                $lvl = is_array($ps) ? ($ps['level'] ?? 1) : 1;
                $bonus += $lvl * 2;
                $player->gainSkillXp('tinh_che', 5 * ($recipe['tier'] ?? 1));
                break;
            }
        }
        $finalRate = min(100, $baseRate + $bonus);

        // Crafting XP gain
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

        // Determine quality
        $quality = 'normal';
        $qualityLabel = '';
        $qualityBonus = 0;
        if ($critChance > 0 && mt_rand(1, 100) <= $critChance) {
            if ($craftLvl >= 76 && mt_rand(1, 100) <= 20) {
                $quality = 'divine';
                $qualityLabel = '🌟 THIÊN PHẨM';
                $qualityBonus = 50;
            } else {
                $quality = 'supreme';
                $qualityLabel = '✨ CỰC PHẨM';
                $qualityBonus = 25;
            }
        } elseif (mt_rand(1, 100) <= 20 + $craftLvl / 2) {
            $quality = 'refined';
            $qualityLabel = '💎 TINH PHẨM';
            $qualityBonus = 10;
        }

        $targetId = $recipe['target'];
        $msg = 'Luyện đan thành công!';

        if ($isItem) {
            $itemSystem = new \App\Systems\ItemSystem();
            $item = $itemSystem->createItem($targetId);
            if ($item) {
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

    // =========================================================================
    // 2. EQUIPMENT FORGING (Đúc Khí)
    // =========================================================================

    /**
     * Retrieve list of all equipment forging recipes.
     */
    $app->get('/api/forging/recipes', function (Request $request, Response $response) {
        $recipes = ForgingService::getAllRecipes();
        return jsonResponse($response, ['recipes' => $recipes]);
    });

    /**
     * Execute equipment forging for a player.
     */
    $app->post('/api/player/{id}/forge', function (Request $request, Response $response, array $args) {
        $id = $args['id'];
        $player = loadPlayer($id);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        $body = json_decode($request->getBody()->getContents(), true);
        $recipeId = $body['recipeId'] ?? '';
        if (empty($recipeId)) {
            return jsonResponse($response, ['error' => 'Vui lòng chọn công thức đúc khí!'], 400);
        }

        $result = ForgingService::forgeItem($player, $recipeId);
        if (!$result['success']) {
            return jsonResponse($response, $result, 400);
        }

        savePlayer($id, $player);
        return jsonResponse($response, $result);
    });

    // =========================================================================
    // 3. EQUIPMENT ENHANCEMENT (Cường Hóa Trang Bị +1 đến +12)
    // =========================================================================

    /**
     * Preview enhancement requirements and chances for a specified item.
     */
    $app->get('/api/player/{id}/enhance-preview', function (Request $request, Response $response, array $args) {
        $id = $args['id'];
        $player = loadPlayer($id);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        $queryParams = $request->getQueryParams();
        $itemId = $queryParams['itemId'] ?? '';
        if (empty($itemId)) {
            return jsonResponse($response, ['error' => 'Thiếu itemId cần tra cứu'], 400);
        }

        $targetItem = null;
        foreach ($player->equipment as $item) {
            if ($item instanceof Item && $item->getId() === $itemId) {
                $targetItem = $item;
                break;
            }
        }
        if (!$targetItem) {
            foreach ($player->inventory as $item) {
                if ($item instanceof Item && $item->getId() === $itemId) {
                    $targetItem = $item;
                    break;
                }
            }
        }

        if (!$targetItem) {
            return jsonResponse($response, ['error' => 'Trang bị không tìm thấy!'], 404);
        }

        $config = EnhancementService::getEnhanceConfig($targetItem);
        $playerStones = $player->materials[$config['stoneItemId'] ?? 'da_cuong_hoa'] ?? 0;

        return jsonResponse($response, [
            'item' => $targetItem->toArray(),
            'config' => $config,
            'playerGold' => $player->gold,
            'playerStones' => $playerStones
        ]);
    });

    /**
     * Execute enhancement attempt on an item.
     */
    $app->post('/api/player/{id}/enhance', function (Request $request, Response $response, array $args) {
        $id = $args['id'];
        $player = loadPlayer($id);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        $body = json_decode($request->getBody()->getContents(), true);
        $itemId = $body['itemId'] ?? '';
        if (empty($itemId)) {
            return jsonResponse($response, ['error' => 'Vui lòng chọn trang bị cần cường hóa!'], 400);
        }

        $result = EnhancementService::enhanceItem($player, $itemId);
        if (!$result['success']) {
            return jsonResponse($response, $result, 400);
        }

        savePlayer($id, $player);
        return jsonResponse($response, $result);
    });
};
