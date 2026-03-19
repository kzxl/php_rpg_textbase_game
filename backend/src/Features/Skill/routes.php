<?php

/**
 * Skill Feature — Thần Thông (learn skills).
 */

use Slim\Psr7\Request;
use Slim\Psr7\Response;
use App\Systems\SkillSystem;

return function ($app) {
    $app->post('/api/player/{id}/learn-skill', function (Request $request, Response $response, array $args) {
        $id = $args['id'];
        $player = loadPlayer($id);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        $body = $request->getParsedBody();
        $skillId = $body['skillId'] ?? '';

        $skillSystem = new SkillSystem();
        $skill = $skillSystem->getById($skillId);
        if (!$skill) return jsonResponse($response, ['error' => 'Skill not found'], 404);

        $player->learnSkill($skill);
        
        // Auto-equip passives that are NOT movement
        $isPassive = ($skill['type'] ?? '') === 'passive';
        $isMovement = in_array('movement', $skill['tags'] ?? []) || in_array('thân pháp', $skill['tags'] ?? []);
        if ($isPassive && !$isMovement) {
            foreach ($player->skills as $k => $ps) {
                if ((is_array($ps) ? ($ps['id'] ?? '') : $ps) === $skill['id']) {
                    if (is_array($player->skills[$k])) $player->skills[$k]['isEquipped'] = true;
                    else $player->skills[$k] = ['id' => $skill['id'], 'isEquipped' => true];
                }
            }
        }

        savePlayer($id, $player);
        \App\Core\PlayerRepository::saveSkills($id, $player);

        return jsonResponse($response, [
            'message' => "Đã giác ngộ {$skill['name']}",
            'player' => $player->toArray(),
        ]);
    });

    // Trang bị / Tháo gỡ Kỹ Năng
    $app->post('/api/player/{id}/equip-skill', function (Request $request, Response $response, array $args) {
        $id = $args['id'];
        $player = loadPlayer($id);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        $body = $request->getParsedBody();
        $skillId = $body['skillId'] ?? '';
        $equip = (bool)($body['equip'] ?? true);

        $skillSystem = new SkillSystem();
        $allSkills = $skillSystem->getAll();
        
        // Find player skill
        $pIndex = null;
        foreach ($player->skills as $k => $ps) {
            $sid = is_array($ps) ? ($ps['id'] ?? '') : $ps;
            if ($sid === $skillId) { $pIndex = $k; break; }
        }
        if ($pIndex === null) return jsonResponse($response, ['error' => 'Chưa lĩnh hội kỹ năng này'], 400);

        if (!$equip) {
            // Unequip
            if (is_array($player->skills[$pIndex])) $player->skills[$pIndex]['isEquipped'] = false;
            savePlayer($id, $player);
            \App\Core\PlayerRepository::saveSkills($id, $player);
            return jsonResponse($response, ['message' => 'Đã tháo gỡ thành công', 'player' => $player->toArray()]);
        }

        // Equip Check Limits
        $targetMaster = null;
        foreach ($allSkills as $ms) { if ($ms['id'] === $skillId) { $targetMaster = $ms; break; } }
        if (!$targetMaster) return jsonResponse($response, ['error' => 'Kỹ năng xảo trá, không tồn tại.'], 400);

        $isPassive = ($targetMaster['type'] ?? '') === 'passive';
        $isMovement = in_array('movement', $targetMaster['tags'] ?? []) || in_array('thân pháp', $targetMaster['tags'] ?? []);

        if ($isPassive && !$isMovement) {
            // Passives can be equipped unlimited
            if (is_array($player->skills[$pIndex])) $player->skills[$pIndex]['isEquipped'] = true;
        } else {
            // Count current equipped
            $activeCount = 0;
            $movementCount = 0;
            foreach ($player->skills as $ps) {
                if (!empty($ps['isEquipped'])) {
                    $sid = is_array($ps) ? ($ps['id'] ?? '') : $ps;
                    $m2 = null;
                    foreach ($allSkills as $ms) { if ($ms['id']===$sid) { $m2 = $ms; break; } }
                    if ($m2) {
                        $m2Passive = ($m2['type'] ?? '') === 'passive';
                        $m2Movement = in_array('movement', $m2['tags'] ?? []) || in_array('thân pháp', $m2['tags'] ?? []);
                        if ($m2Movement) $movementCount++;
                        elseif (!$m2Passive) $activeCount++;
                    }
                }
            }

            if ($isMovement && $movementCount >= 1) {
                return jsonResponse($response, ['error' => 'Chỉ được trang bị 1 Thân Pháp cùng lúc. Hãy tháo cái cũ ra.'], 400);
            }
            if (!$isPassive && !$isMovement && $activeCount >= 2) {
                return jsonResponse($response, ['error' => 'Chỉ được trang bị tối đa 2 Chiêu Thức chiến đấu cùng lúc.'], 400);
            }

            if (is_array($player->skills[$pIndex])) $player->skills[$pIndex]['isEquipped'] = true;
            else $player->skills[$pIndex] = ['id' => $skillId, 'isEquipped' => true];
        }

        savePlayer($id, $player);
        \App\Core\PlayerRepository::saveSkills($id, $player);
        return jsonResponse($response, ['message' => 'Lắp vào thành công!', 'player' => $player->toArray()]);
    });

    $app->get('/api/data/skills', function (Request $request, Response $response) {
        return jsonResponse($response, ['skills' => (new SkillSystem())->getAll()]);
    });
};
