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

            // Realm-based active skill slots: 3 base + bonus per tier
            $maxSlots = 3;
            if ($player->realmTier >= 3) $maxSlots++; // Kim Đan: 4
            if ($player->realmTier >= 5) $maxSlots++; // Hóa Thần: 5
            if ($player->realmTier >= 7) $maxSlots++; // Đại Thừa: 6
            if (!$isPassive && !$isMovement && $activeCount >= $maxSlots) {
                return jsonResponse($response, ['error' => "Tối đa {$maxSlots} Chiêu Thức (Cảnh Giới tầng {$player->realmTier}). Hãy tháo bớt."], 400);
            }

            if (is_array($player->skills[$pIndex])) $player->skills[$pIndex]['isEquipped'] = true;
            else $player->skills[$pIndex] = ['id' => $skillId, 'isEquipped' => true];
        }

        // Detect Ngũ Hành Combo
        $elementCounts = [];
        $ELEMENT_NAMES = ['fire' => 'Hỏa🔥', 'water' => 'Thủy💧', 'wood' => 'Mộc🌿', 'earth' => 'Thổ⛰️', 'metal' => 'Kim⚔️'];
        $ELEMENT_COMBOS = [
            'fire'  => ['name' => 'Phần Thiên', 'desc' => '+15% crit damage', 'stat' => 'critDamage', 'value' => 0.15],
            'water' => ['name' => 'Hải Triều', 'desc' => '+10% dodge chance', 'stat' => 'dodge', 'value' => 0.10],
            'wood'  => ['name' => 'Sinh Cơ', 'desc' => 'Regen 3% HP/turn', 'stat' => 'hpRegen', 'value' => 0.03],
            'earth' => ['name' => 'Sơn Thạch', 'desc' => '+15% defense', 'stat' => 'defense', 'value' => 0.15],
            'metal' => ['name' => 'Đoạn Kiếm', 'desc' => '+10% armor pen', 'stat' => 'armorPen', 'value' => 0.10],
        ];
        foreach ($player->skills as $ps) {
            if (!empty($ps['isEquipped'])) {
                $sid = is_array($ps) ? ($ps['id'] ?? '') : $ps;
                foreach ($allSkills as $ms) {
                    if ($ms['id'] === $sid && !empty($ms['element'])) {
                        $elementCounts[$ms['element']] = ($elementCounts[$ms['element']] ?? 0) + 1;
                    }
                }
            }
        }
        $activeCombo = null;
        foreach ($elementCounts as $elem => $count) {
            if ($count >= 2 && isset($ELEMENT_COMBOS[$elem])) {
                $combo = $ELEMENT_COMBOS[$elem];
                $combo['element'] = $elem;
                $combo['icon'] = $ELEMENT_NAMES[$elem] ?? $elem;
                $combo['triple'] = $count >= 3; // Triple combo = doubled passive
                if ($count >= 3) $combo['desc'] .= ' (x2)';
                $activeCombo = $combo;
                break;
            }
        }

        savePlayer($id, $player);
        \App\Core\PlayerRepository::saveSkills($id, $player);
        return jsonResponse($response, [
            'message' => 'Lắp vào thành công!' . ($activeCombo ? " ☯ Combo: {$activeCombo['name']}!" : ''),
            'player' => $player->toArray(),
            'activeCombo' => $activeCombo,
            'maxSlots' => $maxSlots,
        ]);
    });

    $app->get('/api/data/skills', function (Request $request, Response $response) {
        return jsonResponse($response, ['skills' => (new SkillSystem())->getAll()]);
    });
};
