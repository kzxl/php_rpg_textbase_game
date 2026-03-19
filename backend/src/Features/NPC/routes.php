<?php

/**
 * NPC Feature — Kỳ Ngộ & Nhiệm Vụ Động (Dynamic Quests)
 * Uses GameDataRepository (DB) instead of JSON files.
 */

use Slim\Psr7\Request;
use Slim\Psr7\Response;
use App\Core\PlayerRepository;
use App\Core\GameDataRepository;

return function ($app) {

    $app->get('/api/npc/{npcId}', function (Request $request, Response $response, array $args) {
        $npc = GameDataRepository::getNpcById($args['npcId']);
        if (!$npc) return jsonResponse($response, ['error' => 'NPC không tồn tại'], 404);
        return jsonResponse($response, ['npc' => $npc]);
    });

    $app->get('/api/data/npcs', function (Request $request, Response $response) {
        return jsonResponse($response, ['npcs' => GameDataRepository::getNpcs()]);
    });

    $app->post('/api/player/{id}/accept-quest', function (Request $request, Response $response, array $args) {
        $id = $args['id'];
        $body = json_decode($request->getBody()->getContents(), true);
        $npcId = $body['npcId'] ?? null;
        $questId = $body['questId'] ?? null;
        if (!$npcId || !$questId) return jsonResponse($response, ['error' => 'Thiếu npcId hoặc questId'], 400);

        $player = loadPlayer($id);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        $npc = GameDataRepository::getNpcById($npcId);
        if (!$npc) return jsonResponse($response, ['error' => 'NPC không tồn tại'], 404);

        $validQuest = false;
        foreach ($npc['quests'] ?? [] as $quest) {
            if ($quest['id'] === $questId) { $validQuest = true; break; }
        }
        if (!$validQuest) return jsonResponse($response, ['error' => 'Nhiệm vụ không hợp lệ'], 400);

        $err = $player->acceptQuest($npcId, $questId);
        if ($err) return jsonResponse($response, ['error' => $err], 400);

        PlayerRepository::saveQuests($id, $player->activeQuests);

        return jsonResponse($response, [
            'success' => true,
            'message' => 'Đã nhận nhiệm vụ!',
            'player' => $player->toArray(),
        ]);
    });

    $app->post('/api/player/{id}/complete-quest', function (Request $request, Response $response, array $args) {
        $id = $args['id'];
        $body = json_decode($request->getBody()->getContents(), true);
        $questId = $body['questId'] ?? null;
        if (!$questId) return jsonResponse($response, ['error' => 'Thiếu questId'], 400);

        $player = loadPlayer($id);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        $questIdx = null;
        $questData = null;
        foreach ($player->activeQuests as $idx => $q) {
            if ($q['quest_id'] === $questId && $q['status'] === 'active') {
                $questIdx = $idx;
                $questData = $q;
                break;
            }
        }
        if ($questData === null) return jsonResponse($response, ['error' => 'Không tìm thấy nhiệm vụ đang hoạt động'], 400);

        $npc = GameDataRepository::getNpcById($questData['npc_id']);
        if (!$npc) return jsonResponse($response, ['error' => 'Dữ liệu NPC lỗi'], 500);

        $questDef = null;
        foreach ($npc['quests'] ?? [] as $quest) {
            if ($quest['id'] === $questId) { $questDef = $quest; break; }
        }
        if (!$questDef) return jsonResponse($response, ['error' => 'Dữ liệu nhiệm vụ lỗi'], 500);

        if ((int)$questData['progress'] < $questDef['amount']) {
            $remaining = $questDef['amount'] - (int)$questData['progress'];
            return jsonResponse($response, ['error' => "Chưa hoàn thành! Còn thiếu {$remaining}."], 400);
        }

        // Deduct collected materials
        if ($questDef['type'] === 'collect') {
            $targetMat = $questDef['target'];
            $neededAmount = $questDef['amount'];
            $playerHas = $player->materials[$targetMat] ?? 0;
            if ($playerHas < $neededAmount) {
                return jsonResponse($response, ['error' => "Không đủ vật phẩm! Cần {$neededAmount}, có {$playerHas}."], 400);
            }
            $player->materials[$targetMat] -= $neededAmount;
            if ($player->materials[$targetMat] <= 0) unset($player->materials[$targetMat]);
        }

        // Grant rewards
        $rewards = $questDef['rewards'] ?? [];
        $rewardMessages = [];

        if (isset($rewards['gold'])) {
            $player->gold += $rewards['gold'];
            $rewardMessages[] = "+{$rewards['gold']} 💎 Linh Thạch";
        }
        if (isset($rewards['xp'])) {
            $player->gainXp($rewards['xp']);
            $rewardMessages[] = "+{$rewards['xp']} ✨ Tu Vi";
        }
        if (isset($rewards['materials'])) {
            foreach ($rewards['materials'] as $matId => $qty) {
                $player->materials[$matId] = ($player->materials[$matId] ?? 0) + $qty;
                $rewardMessages[] = "+{$qty} {$matId}";
            }
        }
        if (isset($rewards['medicines'])) {
            foreach ($rewards['medicines'] as $medId => $qty) {
                $player->medicines[$medId] = ($player->medicines[$medId] ?? 0) + $qty;
                $rewardMessages[] = "+{$qty} {$medId}";
            }
        }

        // Skill chance
        $skillGained = null;
        if (isset($rewards['skillChance'])) {
            $sc = $rewards['skillChance'];
            if (mt_rand(1, 100) <= $sc['chance']) {
                $hasSkill = false;
                foreach ($player->skills as $s) {
                    if (($s['id'] ?? '') === $sc['id']) { $hasSkill = true; break; }
                }
                if (!$hasSkill) {
                    $skillDef = GameDataRepository::getSkillById($sc['id']);
                    if ($skillDef) {
                        $skillDef['level'] = 1;
                        $skillDef['currentXp'] = 0;
                        $skillDef['isEquipped'] = false;
                        $player->skills[$sc['id']] = $skillDef;
                        $pdo = \App\Core\Database::pdo();
                        $pdo->prepare("INSERT IGNORE INTO player_skills (player_id, skill_id, level, current_xp, is_equipped) VALUES (?, ?, 1, 0, 0)")
                            ->execute([$id, $sc['id']]);
                        $skillGained = $skillDef['name'] ?? $sc['id'];
                        $rewardMessages[] = "🎯 Lĩnh ngộ kỹ năng: {$skillGained}!";
                    }
                }
            }
        }

        $player->activeQuests[$questIdx]['status'] = 'completed';
        $player->activeQuests[$questIdx]['completed_at'] = time();

        savePlayer($id, $player);
        PlayerRepository::saveQuests($id, $player->activeQuests);

        return jsonResponse($response, [
            'success' => true,
            'message' => '✅ Hoàn thành nhiệm vụ! ' . implode(', ', $rewardMessages),
            'rewards' => $rewardMessages,
            'skillGained' => $skillGained,
            'player' => $player->toArray(),
        ]);
    });

    $app->get('/api/player/{id}/quests', function (Request $request, Response $response, array $args) {
        $id = $args['id'];
        $player = loadPlayer($id);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        $enriched = [];
        foreach ($player->activeQuests as $q) {
            if ($q['status'] !== 'active') continue;
            $entry = $q;
            $npc = GameDataRepository::getNpcById($q['npc_id']);
            if ($npc) {
                $entry['npcName'] = $npc['name'];
                $entry['npcIcon'] = $npc['icon'] ?? '🧓';
                foreach ($npc['quests'] ?? [] as $quest) {
                    if ($quest['id'] === $q['quest_id']) {
                        $entry['questName'] = $quest['name'];
                        $entry['questDescription'] = $quest['description'];
                        $entry['questType'] = $quest['type'];
                        $entry['questTarget'] = $quest['target'];
                        $entry['questAmount'] = $quest['amount'];
                        $entry['rewards'] = $quest['rewards'];
                        break;
                    }
                }
            }
            $enriched[] = $entry;
        }

        return jsonResponse($response, ['quests' => $enriched]);
    });
};
