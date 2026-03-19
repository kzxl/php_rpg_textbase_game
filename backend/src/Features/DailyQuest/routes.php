<?php
/**
 * Daily Quests — Nhiệm Vụ Hàng Ngày
 * Auto-generate 3 quests daily, track progress, reward on completion
 */
use Slim\Psr7\Request;
use Slim\Psr7\Response;
use App\Core\Database;

return function ($app) {

    $QUEST_TEMPLATES = [
        ['id' => 'kill_monsters', 'name' => 'Diệt Yêu Thú', 'desc' => 'Tiêu diệt {target} quái vật', 'target' => [5, 10, 15], 'goldReward' => [100, 250, 500], 'xpReward' => [50, 100, 200]],
        ['id' => 'earn_gold',    'name' => 'Thu Thập Linh Thạch', 'desc' => 'Kiếm {target} 💎', 'target' => [200, 500, 1000], 'goldReward' => [50, 100, 200], 'xpReward' => [30, 80, 150]],
        ['id' => 'craft_items',  'name' => 'Chế Tác', 'desc' => 'Chế tác {target} vật phẩm', 'target' => [1, 3, 5], 'goldReward' => [150, 300, 600], 'xpReward' => [60, 120, 250]],
        ['id' => 'explore_area', 'name' => 'Khám Phá', 'desc' => 'Khám phá {target} vùng đất', 'target' => [3, 5, 8], 'goldReward' => [80, 200, 400], 'xpReward' => [40, 100, 180]],
        ['id' => 'win_pvp',     'name' => 'Chiến Đấu PvP', 'desc' => 'Thắng {target} trận PvP', 'target' => [1, 3, 5], 'goldReward' => [200, 500, 1000], 'xpReward' => [80, 200, 400]],
        ['id' => 'use_medicine', 'name' => 'Dùng Đan Dược', 'desc' => 'Sử dụng {target} đan dược', 'target' => [2, 4, 6], 'goldReward' => [60, 150, 300], 'xpReward' => [30, 60, 120]],
        ['id' => 'harvest_herb', 'name' => 'Thu Hoạch Dược Thảo', 'desc' => 'Thu hoạch {target} dược thảo', 'target' => [3, 6, 10], 'goldReward' => [100, 250, 500], 'xpReward' => [40, 100, 200]],
    ];

    // === GET TODAY'S QUESTS ===
    $app->get('/api/player/{id}/daily-quests', function (Request $request, Response $response, array $args) use ($QUEST_TEMPLATES) {
        $id = $args['id'];
        $pdo = Database::pdo();
        $today = date('Y-m-d');

        // Check existing quests for today
        $stmt = $pdo->prepare("SELECT * FROM player_daily_quests WHERE player_id = ? AND quest_date = ?");
        $stmt->execute([$id, $today]);
        $quests = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        if (empty($quests)) {
            // Generate 3 random quests
            $shuffled = $QUEST_TEMPLATES;
            shuffle($shuffled);
            $selected = array_slice($shuffled, 0, 3);

            foreach ($selected as $qt) {
                $diffIdx = rand(0, 2); // easy/medium/hard
                $target = $qt['target'][$diffIdx];
                $questData = json_encode([
                    'name' => $qt['name'],
                    'desc' => str_replace('{target}', $target, $qt['desc']),
                    'goldReward' => $qt['goldReward'][$diffIdx],
                    'xpReward' => $qt['xpReward'][$diffIdx],
                    'difficulty' => ['Dễ', 'Trung Bình', 'Khó'][$diffIdx],
                ], JSON_UNESCAPED_UNICODE);

                $pdo->prepare("INSERT INTO player_daily_quests (player_id, quest_id, quest_data, target, quest_date) VALUES (?, ?, ?, ?, ?)")
                    ->execute([$id, $qt['id'] . '_' . $diffIdx, $questData, $target, $today]);
            }

            $stmt->execute([$id, $today]);
            $quests = $stmt->fetchAll(\PDO::FETCH_ASSOC);
        }

        // Parse quest data
        foreach ($quests as &$q) {
            $q['quest_info'] = json_decode($q['quest_data'], true);
        }

        $allDone = count(array_filter($quests, fn($q) => $q['completed'])) === count($quests);
        $allClaimed = count(array_filter($quests, fn($q) => $q['claimed'])) === count($quests);

        return jsonResponse($response, [
            'quests' => $quests,
            'allCompleted' => $allDone,
            'allClaimed' => $allClaimed,
            'bonusReward' => $allDone && !$allClaimed ? ['gold' => 500, 'xp' => 300] : null,
        ]);
    });

    // === UPDATE QUEST PROGRESS (called by other systems) ===
    $app->post('/api/player/{id}/daily-quests/progress', function (Request $request, Response $response, array $args) {
        $id = $args['id'];
        $body = $request->getParsedBody();
        $questType = $body['questType'] ?? '';
        $amount = max(1, (int)($body['amount'] ?? 1));

        $pdo = Database::pdo();
        $today = date('Y-m-d');

        // Update matching quests
        $stmt = $pdo->prepare("
            UPDATE player_daily_quests
            SET progress = LEAST(progress + ?, target),
                completed = CASE WHEN progress + ? >= target THEN 1 ELSE 0 END
            WHERE player_id = ? AND quest_date = ? AND quest_id LIKE ? AND completed = 0
        ");
        $stmt->execute([$amount, $amount, $id, $today, "{$questType}%"]);

        return jsonResponse($response, ['updated' => $stmt->rowCount()]);
    });

    // === CLAIM QUEST REWARD ===
    $app->post('/api/player/{id}/daily-quests/claim', function (Request $request, Response $response, array $args) {
        $id = $args['id'];
        $player = loadPlayer($id);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        $body = $request->getParsedBody();
        $questDbId = (int)($body['questId'] ?? 0);

        $pdo = Database::pdo();
        $stmt = $pdo->prepare("SELECT * FROM player_daily_quests WHERE id = ? AND player_id = ? AND completed = 1 AND claimed = 0");
        $stmt->execute([$questDbId, $id]);
        $quest = $stmt->fetch(\PDO::FETCH_ASSOC);
        if (!$quest) return jsonResponse($response, ['error' => 'Chưa hoàn thành hoặc đã nhận!'], 400);

        $info = json_decode($quest['quest_data'], true);
        $goldReward = (int)($info['goldReward'] ?? 0);
        $xpReward = (int)($info['xpReward'] ?? 0);

        $player->gold += $goldReward;
        $player->xp += $xpReward;
        savePlayer($id, $player);

        $pdo->prepare("UPDATE player_daily_quests SET claimed = 1 WHERE id = ?")->execute([$questDbId]);

        return jsonResponse($response, [
            'message' => "🎁 Nhận thưởng: +{$goldReward} 💎, +{$xpReward} EXP",
            'player' => $player->toArray(),
        ]);
    });
};
