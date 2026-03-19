<?php

/**
 * Combat Feature — Encounter monsters, fight.
 */

use Slim\Psr7\Request;
use Slim\Psr7\Response;
use App\Core\CombatEngine;
use App\Systems\MonsterSystem;

return function ($app) {
    $app->post('/api/combat/full', function (Request $request, Response $response) {
        $body = $request->getParsedBody();
        $playerId = $body['playerId'] ?? '';
        $trackedMonsterId = $body['trackedMonsterId'] ?? null;
        $monsterId = $body['monsterId'] ?? null;

        $player = loadPlayer($playerId);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        // Block combat while hospitalized
        if ($player->isHospitalized()) {
            $remain = $player->hospitalRemaining();
            return jsonResponse($response, [
                'error' => "Đang tịnh dưỡng! Còn {$remain}s.",
                'player' => $player->toArray(),
            ], 400);
        }

        $monsterSystem = new MonsterSystem();
        $monster = null;
        $trackedInstance = null;
        $trackedIndex = -1;

        if ($trackedMonsterId) {
            // Find in player's tracked list
            foreach ($player->trackedMonsters as $i => $tm) {
                if (($tm['instance_id'] ?? null) == $trackedMonsterId) {
                    $trackedInstance = $tm;
                    $trackedIndex = $i;
                    break;
                }
            }
            if ($trackedInstance) {
                $monster = $monsterSystem->spawn($trackedInstance['monster_id'], $player->level);
                if ($monster) {
                    $monster->currentHp = (int)$trackedInstance['current_hp'];
                }
            }
        } elseif ($monsterId) {
            $monster = $monsterSystem->spawn($monsterId, $player->level);
        }

        if (!$monster) return jsonResponse($response, ['error' => 'Monster not found'], 404);

        $combat = new CombatEngine();
        $result = $combat->fullCombat($player, $monster);

        // Sync HP back to tracked list and Database
        if ($trackedInstance) {
            $pdo = \App\Core\Database::pdo();
            if ($result['outcome'] === 'win' || $monster->currentHp <= 0) {
                // Kill monster
                $pdo->prepare("DELETE FROM player_tracked_monsters WHERE id = ?")->execute([$trackedMonsterId]);
                array_splice($player->trackedMonsters, $trackedIndex, 1);

                // Phase 9: Update quest progress for kill-type quests
                $npcsData = \App\Core\GameDataRepository::getNpcs();
                $questNotifs = $player->updateQuestProgress('kill', $trackedInstance['monster_id'], 1, $npcsData);
                if (!empty($questNotifs)) {
                    $result['questNotifications'] = $questNotifs;
                }
                \App\Core\PlayerRepository::saveQuests($playerId, $player->activeQuests);

                // Ngọc Giản (Map Item) drop chance after combat win
                $dungeonData = json_decode(file_get_contents(__DIR__ . '/../../../data/dungeons.json'), true);
                $mapItems = $dungeonData['mapItems'] ?? [];
                foreach ($mapItems as $mi) {
                    if (mt_rand(1, 100) <= ($mi['dropChance'] ?? 0)) {
                        $player->materials[$mi['id']] = ($player->materials[$mi['id']] ?? 0) + 1;
                        $result['mapDrop'] = ['id' => $mi['id'], 'name' => $mi['name'], 'icon' => $mi['icon']];
                        break; // Only one map drop per fight
                    }
                }
            } else {
                // Flee / Stalemate -> update HP
                $pdo->prepare("UPDATE player_tracked_monsters SET current_hp = ? WHERE id = ?")->execute([$monster->currentHp, $trackedMonsterId]);
                $player->trackedMonsters[$trackedIndex]['current_hp'] = $monster->currentHp;
            }
        }

        savePlayer($playerId, $player);
        return jsonResponse($response, $result);
    });

    $app->get('/api/data/monsters', function (Request $request, Response $response) {
        return jsonResponse($response, ['monsters' => (new MonsterSystem())->getAll()]);
    });
};
