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
                return jsonResponse($response, ['error' => "Không đủ linh thảo nguyên liệu!"], 400);
            }
        }

        // Deduct materials & gold
        $player->gold -= $cost;
        foreach ($mats as $m) {
            $mid = $m['id'];
            $player->materials[$mid] -= $m['amount'];
            if ($player->materials[$mid] <= 0) unset($player->materials[$mid]);
        }

        // Bonus Success Rate from Tinh Chế
        $baseRate = $recipe['successRate'] ?? 100;
        $bonus = 0;
        foreach ($player->skills as $ps) {
            $sid = is_array($ps) ? ($ps['id']??'') : $ps;
            if ($sid === 'tinh_che') {
                $lvl = is_array($ps) ? ($ps['level']??1) : 1;
                $bonus = $lvl * 2; // +2% success chance per level
                // Grant XP
                $player->gainSkillXp('tinh_che', 5 * ($recipe['tier'] ?? 1));
                break;
            }
        }
        $finalRate = min(100, $baseRate + $bonus);

        // Roll success
        if (mt_rand(1, 100) > $finalRate) {
            savePlayer($id, $player);
            return jsonResponse($response, [
                'success' => false,
                'message' => 'Luyện đan thất bại, lò nổ tung! Mất sạch nguyên liệu.',
                'player' => $player->toArray()
            ]);
        }

        // Success!
        $targetId = $recipe['target'];
        $player->medicines[$targetId] = ($player->medicines[$targetId] ?? 0) + 1;
        
        savePlayer($id, $player);

        return jsonResponse($response, [
            'success' => true,
            'message' => 'Luyện đan thành công! Thu được 1 viên Đan Dược mới.',
            'player' => $player->toArray()
        ]);
    });
};
