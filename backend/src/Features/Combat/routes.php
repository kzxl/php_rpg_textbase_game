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
        $body = (array)($request->getParsedBody() ?: json_decode((string)$request->getBody(), true) ?: []);
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

    $app->post('/api/combat/resolve-loot', function (Request $request, Response $response) {
        $body = (array)($request->getParsedBody() ?: json_decode((string)$request->getBody(), true) ?: []);
        $playerId = $body['playerId'] ?? '';
        $action = $body['action'] ?? ''; // 'swap', 'claim', 'discard_loot'
        $discardItemId = $body['discardItemId'] ?? null;
        $pendingItemData = $body['pendingItem'] ?? null;

        $player = loadPlayer($playerId);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        if (!$pendingItemData && !empty($player->pendingLoot)) {
            $pendingItemData = $player->pendingLoot;
        }

        if ($action === 'discard_loot') {
            $player->pendingLoot = null;
            savePlayer($playerId, $player);
            return jsonResponse($response, [
                'success' => true,
                'message' => 'Đã bỏ qua chiến lợi phẩm rơi trên mặt đất.',
                'player' => $player->toArray(),
            ]);
        }

        if (!$pendingItemData || empty($pendingItemData['name'])) {
            return jsonResponse($response, ['error' => 'Không tìm thấy chiến lợi phẩm cần xử lý!'], 400);
        }

        $newItem = \App\Models\Item::fromArray($pendingItemData);

        if ($action === 'claim') {
            if (count($player->inventory) >= $player->getMaxInventorySize()) {
                return jsonResponse($response, ['error' => 'Túi đồ vẫn đầy, không thể thu nạp trực tiếp! Hãy hoán đổi hoặc bỏ bớt đồ.'], 400);
            }
            $player->inventory[] = $newItem;
            $player->pendingLoot = null;
            savePlayer($playerId, $player);
            return jsonResponse($response, [
                'success' => true,
                'message' => "Đã thu nạp {$newItem->name} vào Càn Khôn Túi!",
                'player' => $player->toArray(),
            ]);
        }

        if ($action === 'swap') {
            if (!$discardItemId) {
                return jsonResponse($response, ['error' => 'Vui lòng chọn vật phẩm trong túi để vứt bỏ!'], 400);
            }

            $foundIdx = -1;
            $discardedName = '';
            foreach ($player->inventory as $idx => $invItem) {
                if ($invItem->id === $discardItemId) {
                    $foundIdx = $idx;
                    $discardedName = $invItem->name;
                    break;
                }
            }

            if ($foundIdx === -1) {
                return jsonResponse($response, ['error' => 'Vật phẩm chọn để vứt không tìm thấy trong túi!'], 404);
            }

            // Remove selected item and push new item
            array_splice($player->inventory, $foundIdx, 1);
            $player->inventory[] = $newItem;
            $player->pendingLoot = null;

            savePlayer($playerId, $player);
            return jsonResponse($response, [
                'success' => true,
                'message' => "Đã vứt bỏ [{$discardedName}] và thu nạp [{$newItem->name}] thành công!",
                'player' => $player->toArray(),
            ]);
        }

        return jsonResponse($response, ['error' => 'Hành động không hợp lệ'], 400);
    });

    $app->get('/api/data/monsters', function (Request $request, Response $response) {
        return jsonResponse($response, ['monsters' => (new MonsterSystem())->getAll()]);
    });
};
