<?php

/**
 * Tribulation Feature — Độ Kiếp Lôi Phạt (Lightning Tribulation)
 *
 * When player breakthroughs to major realms (tier 3, 5, 7),
 * they must face a Tribulation Boss. Thất bại = tụt cấp.
 * Gold cost + HP drain = major gold sink.
 */

use Slim\Psr7\Request;
use Slim\Psr7\Response;
use App\Core\CombatEngine;

return function ($app) {

    // Tribulation bosses for major breakthroughs
    $TRIBULATIONS = [
        3 => [
            'name' => 'Kim Đan Thiên Lôi',
            'description' => 'Thiên lôi thử thách kẻ đạt Kim Đan. Sát thương lôi điện kinh hoàng.',
            'stats' => ['hp' => 300, 'strength' => 20, 'speed' => 25, 'dexterity' => 18, 'defense' => 12],
            'effects' => [['type' => 'burn', 'chance' => 40, 'damage' => 8, 'duration' => 2]],
            'xpReward' => 500,
            'goldReward' => [100, 200],
            'goldCost' => 1000,
            'drops' => [
                ['itemId' => 'mat_loi_tinh', 'chance' => 80, 'qty' => [2, 4]],
                ['itemId' => 'tay_tuy_dan', 'chance' => 15, 'qty' => [1, 1], 'type' => 'medicine'],
            ],
        ],
        5 => [
            'name' => 'Hóa Thần Phong Lôi',
            'description' => 'Phong lôi kết hợp, thử thách ý chí người tu. Tốc độ cực nhanh.',
            'stats' => ['hp' => 800, 'strength' => 35, 'speed' => 40, 'dexterity' => 35, 'defense' => 20],
            'effects' => [
                ['type' => 'stun', 'chance' => 25, 'duration' => 1],
                ['type' => 'burn', 'chance' => 50, 'damage' => 15, 'duration' => 3],
            ],
            'xpReward' => 1500,
            'goldReward' => [300, 600],
            'goldCost' => 5000,
            'drops' => [
                ['itemId' => 'mat_thien_thach', 'chance' => 70, 'qty' => [3, 6]],
                ['itemId' => 'tay_tuy_dan', 'chance' => 30, 'qty' => [1, 1], 'type' => 'medicine'],
                ['itemId' => 'hoan_cot_dan', 'chance' => 10, 'qty' => [1, 1], 'type' => 'medicine'],
            ],
        ],
        7 => [
            'name' => 'Cửu Trùng Thiên Kiếp',
            'description' => 'Thiên kiếp cuối cùng. Vượt qua để trở thành Bán Thần.',
            'stats' => ['hp' => 2000, 'strength' => 60, 'speed' => 50, 'dexterity' => 50, 'defense' => 40],
            'effects' => [
                ['type' => 'curse', 'chance' => 50, 'stat' => 'defense', 'value' => -15, 'duration' => 3],
                ['type' => 'burn', 'chance' => 60, 'damage' => 25, 'duration' => 3],
                ['type' => 'stun', 'chance' => 30, 'duration' => 2],
            ],
            'xpReward' => 5000,
            'goldReward' => [1000, 2000],
            'goldCost' => 20000,
            'drops' => [
                ['itemId' => 'mat_thien_thach', 'chance' => 90, 'qty' => [5, 10]],
                ['itemId' => 'tay_tuy_dan', 'chance' => 50, 'qty' => [1, 2], 'type' => 'medicine'],
                ['itemId' => 'hoan_cot_dan', 'chance' => 25, 'qty' => [1, 1], 'type' => 'medicine'],
            ],
        ],
    ];

    // === CHECK TRIBULATION STATUS ===
    $app->get('/api/player/{id}/tribulation', function (Request $request, Response $response, array $args) use ($TRIBULATIONS) {
        $id = $args['id'];
        $player = loadPlayer($id);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        $tier = $player->realmTier;
        $nextTier = $tier + 1;
        $hasTribulation = isset($TRIBULATIONS[$nextTier]);

        return jsonResponse($response, [
            'currentTier' => $tier,
            'nextTier' => $nextTier,
            'hasTribulation' => $hasTribulation,
            'tribulation' => $hasTribulation ? [
                'name' => $TRIBULATIONS[$nextTier]['name'],
                'description' => $TRIBULATIONS[$nextTier]['description'],
                'goldCost' => $TRIBULATIONS[$nextTier]['goldCost'],
                'bossHp' => $TRIBULATIONS[$nextTier]['stats']['hp'],
            ] : null,
        ]);
    });

    // === FACE TRIBULATION ===
    $app->post('/api/player/{id}/tribulation/fight', function (Request $request, Response $response, array $args) use ($TRIBULATIONS) {
        $id = $args['id'];
        $player = loadPlayer($id);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        if ($player->isHospitalized()) return jsonResponse($response, ['error' => 'Đang tịnh dưỡng!'], 400);
        if ($player->isJailed()) return jsonResponse($response, ['error' => 'Đang ngồi tù!'], 400);

        $nextTier = $player->realmTier + 1;
        if (!isset($TRIBULATIONS[$nextTier])) {
            return jsonResponse($response, ['error' => 'Không có Thiên Kiếp ở cảnh giới này!'], 400);
        }

        $tribData = $TRIBULATIONS[$nextTier];
        
        // Gold cost (gold sink!)
        if ($player->gold < $tribData['goldCost']) {
            return jsonResponse($response, ['error' => "Cần {$tribData['goldCost']} 💎 Linh thạch để khởi động Độ Kiếp!"], 400);
        }
        $player->gold -= $tribData['goldCost'];

        // Create tribulation monster
        $monster = \App\Models\Monster::fromData([
            'id' => 'tribulation_' . $nextTier,
            'name' => $tribData['name'],
            'stats' => $tribData['stats'],
            'xpReward' => $tribData['xpReward'],
            'goldReward' => $tribData['goldReward'],
            'effects' => $tribData['effects'],
            'drops' => $tribData['drops'],
        ]);

        $engine = new CombatEngine();
        $result = $engine->fullCombat($player, $monster);

        if ($result['result'] === 'win') {
            // Process drops
            $loot = [];
            foreach ($tribData['drops'] as $drop) {
                if (mt_rand(1, 100) <= ($drop['chance'] ?? 0)) {
                    $qty = mt_rand($drop['qty'][0] ?? 1, $drop['qty'][1] ?? 1);
                    $dropType = $drop['type'] ?? 'material';
                    if ($dropType === 'medicine') {
                        $player->medicines[$drop['itemId']] = ($player->medicines[$drop['itemId']] ?? 0) + $qty;
                    } else {
                        $player->materials[$drop['itemId']] = ($player->materials[$drop['itemId']] ?? 0) + $qty;
                    }
                    $loot[] = "{$drop['itemId']} x{$qty}";
                }
            }

            $player->gold += mt_rand($tribData['goldReward'][0], $tribData['goldReward'][1]);

            savePlayer($id, $player);

            return jsonResponse($response, [
                'result' => 'success',
                'message' => "⚡ Thiên Kiếp [{$tribData['name']}] — ĐỘ KIẾP THÀNH CÔNG! Đã sẵn sàng đột phá!",
                'combatLog' => $result['log'],
                'loot' => $loot,
                'player' => $player->toArray(),
            ]);
        } else {
            // Failed — hospitalize
            $player->hospitalize(300); // 5 phút
            savePlayer($id, $player);

            return jsonResponse($response, [
                'result' => 'failed',
                'message' => "💀 Thiên Kiếp [{$tribData['name']}] — THẤT BẠI! Bị thiên lôi đánh trọng thương!",
                'combatLog' => $result['log'],
                'player' => $player->toArray(),
            ]);
        }
    });
};
