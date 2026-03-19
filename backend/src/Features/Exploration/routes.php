<?php

/**
 * Exploration Feature — Khám Phá Area
 */

use Slim\Psr7\Request;
use Slim\Psr7\Response;

return function ($app) {
    // API to explore the current area
    $app->post('/api/player/{id}/explore', function (Request $request, Response $response, array $args) {
        $id = $args['id'];
        $player = loadPlayer($id);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        if ($player->hospitalRemaining() > 0) {
            return jsonResponse($response, ['error' => 'Đang trọng thương, không thể khám phá!'], 400);
        }
        if ($player->jailUntil > time()) {
            return jsonResponse($response, ['error' => 'Đang ngồi tù...'], 400);
        }
        if ($player->isTraveling()) {
            return jsonResponse($response, ['error' => 'Đang di chuyển, không thể khám phá.'], 400);
        }

        $areaId = $player->currentArea;
        $explorationFile = __DIR__ . '/../../../data/exploration.json';
        $rates = file_exists($explorationFile) ? json_decode(file_get_contents($explorationFile), true) : [];
        $areaData = $rates[$areaId] ?? null;

        if (!$areaData) {
            return jsonResponse($response, ['error' => 'Khu vực này hiện tĩnh mịch, không thể khám phá.'], 400);
        }

        $cost = $areaData['staminaCost'] ?? 10;
        if (!$player->spendStamina($cost)) {
            return jsonResponse($response, ['error' => 'Không đủ thể lực.'], 400);
        }

        // RNG Roll based on weights
        $rollRates = $areaData['rates'];
        // Compute total weight
        $totalWeight = array_reduce($rollRates, fn($acc, $r) => $acc + $r['weight'], 0);
        $randomVal = mt_rand(1, $totalWeight);
        
        $cumulative = 0;
        $selectedEvent = null;
        foreach ($rollRates as $r) {
            $cumulative += $r['weight'];
            if ($randomVal <= $cumulative) {
                $selectedEvent = $r;
                break;
            }
        }

        $eventResult = ['type' => 'nothing', 'message' => 'Bạn dạo quanh một vòng nhưng chỉ thấy gió lùa.'];
        
        if ($selectedEvent) {
            $type = $selectedEvent['type'];
            if ($type === 'monster') {
                // Find a monster from this area's tier
                $eventResult = ['type' => 'monster', 'message' => 'Bạn phát hiện dã thú! Chẩn bị chiến đấu!'];
                // Monster is randomly generated later via the Combat endpoint, we just notify FE
            } elseif ($type === 'material' && !empty($selectedEvent['pools'])) {
                $pool = $selectedEvent['pools'];
                $matId = $pool[array_rand($pool)];
                // Note: Need item system to actually add to inventory, currently player inventory is not fully persistent in DB for materials.
                // For now, we simulate finding.
                $eventResult = ['type' => 'material', 'message' => 'Bạn thu thập được ' . $matId . '.', 'itemId' => $matId];
            } elseif ($type === 'item' && !empty($selectedEvent['rarities'])) {
                $eventResult = ['type' => 'item', 'message' => 'Khám phá bí địa thấy một pháp bảo lấp lánh!'];
            } elseif ($type === 'npc' && !empty($selectedEvent['events'])) {
                $events = $selectedEvent['events'];
                $npcEvent = $events[array_rand($events)];
                
                if ($npcEvent === 'old_man_buff' || $npcEvent === 'ghost_encounter') {
                    $player->currentHp = $player->maxHp;
                    $eventResult = ['type' => 'npc', 'message' => 'Gặp một tiền bối chỉ điểm, khí huyết hồi phục toàn bộ!'];
                } elseif ($npcEvent === 'found_gold') {
                    $gold = mt_rand(5, 50);
                    $player->gold += $gold;
                    $eventResult = ['type' => 'npc', 'message' => "Tìm thấy $gold linh thạch rơi trên đường!"];
                } else {
                    $eventResult = ['type' => 'npc', 'message' => 'Ngộ ra một đạo lý mới giữa thiên nhiên.'];
                }
            }
        }

        savePlayer($id, $player);

        return jsonResponse($response, [
            'player' => $player->toArray(),
            'event' => $eventResult,
            'cost' => $cost
        ]);
    });
};
