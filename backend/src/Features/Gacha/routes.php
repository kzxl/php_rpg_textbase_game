<?php
/**
 * Gacha System — Thiên Cơ Đài (pity system, tiered pools)
 */
use Slim\Psr7\Request;
use Slim\Psr7\Response;
use App\Core\Database;
use App\Systems\ItemSystem;

return function ($app) {

    $POOLS = [
        'standard' => [
            'name' => '🎰 Thiên Cơ Đài Thường',
            'cost' => 300,
            'rates' => ['common' => 60, 'uncommon' => 25, 'rare' => 12, 'legendary' => 3],
            'pityRare' => 10, 'pityLegendary' => 50,
        ],
        'premium' => [
            'name' => '✨ Thiên Cơ Đài Cao Cấp',
            'cost' => 1000,
            'rates' => ['common' => 30, 'uncommon' => 35, 'rare' => 25, 'legendary' => 10],
            'pityRare' => 5, 'pityLegendary' => 25,
        ],
    ];

    // === GET POOLS ===
    $app->get('/api/gacha/pools', function (Request $request, Response $response) use ($POOLS) {
        return jsonResponse($response, ['pools' => $POOLS]);
    });

    // === GET PITY STATUS ===
    $app->get('/api/player/{id}/gacha/pity', function (Request $request, Response $response, array $args) use ($POOLS) {
        $pdo = Database::pdo();
        $stmt = $pdo->prepare("SELECT * FROM gacha_pity WHERE player_id = ?");
        $stmt->execute([$args['id']]);
        $pity = [];
        while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
            $pity[$row['pool_id']] = $row;
        }
        return jsonResponse($response, ['pity' => $pity]);
    });

    // === PULL GACHA ===
    $app->post('/api/player/{id}/gacha/pull', function (Request $request, Response $response, array $args) use ($POOLS) {
        $id = $args['id'];
        $player = loadPlayer($id);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        $body = $request->getParsedBody();
        $poolId = $body['poolId'] ?? 'standard';
        $pulls = min(10, max(1, (int)($body['pulls'] ?? 1)));

        if (!isset($POOLS[$poolId])) return jsonResponse($response, ['error' => 'Pool không tồn tại!'], 400);
        $pool = $POOLS[$poolId];
        $totalCost = $pool['cost'] * $pulls;

        if ($player->gold < $totalCost) {
            return jsonResponse($response, ['error' => "Cần {$totalCost} 💎! (x{$pulls} lần)"], 400);
        }

        $pdo = Database::pdo();
        // Get/create pity
        $pdo->prepare("INSERT IGNORE INTO gacha_pity (player_id, pool_id) VALUES (?, ?)")->execute([$id, $poolId]);
        $pityStmt = $pdo->prepare("SELECT * FROM gacha_pity WHERE player_id = ? AND pool_id = ?");
        $pityStmt->execute([$id, $poolId]);
        $pity = $pityStmt->fetch(\PDO::FETCH_ASSOC);

        $sinceRare = (int)($pity['pulls_since_rare'] ?? 0);
        $sinceLegendary = (int)($pity['pulls_since_legendary'] ?? 0);

        $itemSystem = new ItemSystem();
        $results = [];

        for ($i = 0; $i < $pulls; $i++) {
            $sinceRare++;
            $sinceLegendary++;

            // Determine rarity with pity
            $roll = rand(1, 100);
            $rarity = 'common';

            if ($sinceLegendary >= $pool['pityLegendary']) {
                $rarity = 'legendary';
            } elseif ($sinceRare >= $pool['pityRare']) {
                $rarity = 'rare';
            } else {
                $cumul = 0;
                foreach ($pool['rates'] as $r => $pct) {
                    $cumul += $pct;
                    if ($roll <= $cumul) { $rarity = $r; break; }
                }
            }

            // Reset pity counters
            if ($rarity === 'rare' || $rarity === 'legendary') $sinceRare = 0;
            if ($rarity === 'legendary') $sinceLegendary = 0;

            // Generate item
            $slots = ['weapon', 'helmet', 'armor', 'boots', 'ring1', 'accessory'];
            $slot = $slots[array_rand($slots)];
            $item = $itemSystem->generateItem($player->level, $rarity, $slot);
            $player->inventory[] = $item;

            $results[] = [
                'item' => $item->toArray(),
                'rarity' => $rarity,
            ];

            // Log
            $pdo->prepare("INSERT INTO gacha_history (player_id, pool_id, item_data, rarity, cost, pity_count) VALUES (?, ?, ?, ?, ?, ?)")
                ->execute([$id, $poolId, json_encode($item->toArray(), JSON_UNESCAPED_UNICODE), $rarity, $pool['cost'], $sinceLegendary]);
        }

        // Update pity
        $pdo->prepare("UPDATE gacha_pity SET pulls_since_rare = ?, pulls_since_legendary = ? WHERE player_id = ? AND pool_id = ?")
            ->execute([$sinceRare, $sinceLegendary, $id, $poolId]);

        $player->gold -= $totalCost;
        savePlayer($id, $player);

        $rarities = array_count_values(array_column($results, 'rarity'));
        $summary = implode(', ', array_map(fn($r, $c) => "{$c}x {$r}", array_keys($rarities), $rarities));

        return jsonResponse($response, [
            'message' => "🎰 Quay {$pulls} lần! Kết quả: {$summary} (-{$totalCost} 💎)",
            'results' => $results,
            'pity' => ['sinceRare' => $sinceRare, 'sinceLegendary' => $sinceLegendary],
            'player' => $player->toArray(),
        ]);
    });
};
