<?php
/**
 * PvP Arena — Đấu Trường (ELO rating, matchmaking, seasons)
 */
use Slim\Psr7\Request;
use Slim\Psr7\Response;
use App\Core\Database;
use App\Core\CombatEngine;

return function ($app) {
    $ENTRY_FEE = 50;
    $WIN_GOLD = 200;

    // === GET ARENA STATUS ===
    $app->get('/api/player/{id}/arena', function (Request $request, Response $response, array $args) {
        $id = $args['id'];
        $pdo = Database::pdo();

        $stmt = $pdo->prepare("SELECT * FROM pvp_arena WHERE player_id = ?");
        $stmt->execute([$id]);
        $arena = $stmt->fetch(\PDO::FETCH_ASSOC);

        if (!$arena) {
            $pdo->prepare("INSERT INTO pvp_arena (player_id) VALUES (?)")->execute([$id]);
            $arena = ['rating' => 1000, 'wins' => 0, 'losses' => 0, 'streak' => 0, 'season' => 1];
        }

        // Recent history
        $hStmt = $pdo->prepare("
            SELECT h.*, p1.name as attacker_name, p2.name as defender_name
            FROM pvp_history h
            JOIN players p1 ON p1.id = h.attacker_id
            JOIN players p2 ON p2.id = h.defender_id
            WHERE h.attacker_id = ? OR h.defender_id = ?
            ORDER BY h.created_at DESC LIMIT 10
        ");
        $hStmt->execute([$id, $id]);
        $history = $hStmt->fetchAll(\PDO::FETCH_ASSOC);

        // Top 10
        $topStmt = $pdo->query("
            SELECT a.*, p.name FROM pvp_arena a
            JOIN players p ON p.id = a.player_id
            ORDER BY a.rating DESC LIMIT 10
        ");
        $top = $topStmt->fetchAll(\PDO::FETCH_ASSOC);

        return jsonResponse($response, [
            'arena' => $arena,
            'history' => $history,
            'top10' => $top,
            'entryFee' => 50,
            'winGold' => 200,
        ]);
    });

    // === FIND OPPONENT & FIGHT ===
    $app->post('/api/player/{id}/arena/fight', function (Request $request, Response $response, array $args) use ($ENTRY_FEE, $WIN_GOLD) {
        $id = $args['id'];
        $player = loadPlayer($id);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        if ($player->gold < $ENTRY_FEE) {
            return jsonResponse($response, ['error' => "Cần {$ENTRY_FEE} 💎 phí vào đấu trường!"], 400);
        }

        $pdo = Database::pdo();

        // Ensure arena record
        $pdo->prepare("INSERT IGNORE INTO pvp_arena (player_id) VALUES (?)")->execute([$id]);
        $myArena = $pdo->prepare("SELECT * FROM pvp_arena WHERE player_id = ?");
        $myArena->execute([$id]);
        $myRating = (int)($myArena->fetch(\PDO::FETCH_ASSOC)['rating'] ?? 1000);

        // Find opponent within ±200 rating, exclude self
        $oppStmt = $pdo->prepare("
            SELECT a.player_id, a.rating FROM pvp_arena a
            WHERE a.player_id != ? AND ABS(a.rating - ?) <= 200
            ORDER BY RAND() LIMIT 1
        ");
        $oppStmt->execute([$id, $myRating]);
        $opp = $oppStmt->fetch(\PDO::FETCH_ASSOC);

        if (!$opp) {
            // Fallback: any opponent
            $oppStmt2 = $pdo->prepare("SELECT a.player_id, a.rating FROM pvp_arena a WHERE a.player_id != ? ORDER BY ABS(a.rating - ?) LIMIT 1");
            $oppStmt2->execute([$id, $myRating]);
            $opp = $oppStmt2->fetch(\PDO::FETCH_ASSOC);
        }
        if (!$opp) return jsonResponse($response, ['error' => 'Không tìm được đối thủ! Cần ít nhất 2 người chơi.'], 400);

        $defender = loadPlayer($opp['player_id']);
        if (!$defender) return jsonResponse($response, ['error' => 'Đối thủ offline!'], 400);

        $player->gold -= $ENTRY_FEE;

        // Simulate combat
        $engine = new CombatEngine();
        $result = $engine->simulatePvP($player, $defender);
        $won = $result['winner'] === 'attacker';

        // ELO calculation
        $oppRating = (int)$opp['rating'];
        $expected = 1 / (1 + pow(10, ($oppRating - $myRating) / 400));
        $K = 32;
        $ratingChange = (int)round($K * (($won ? 1 : 0) - $expected));

        if ($won) {
            $player->gold += $WIN_GOLD;
            $pdo->prepare("UPDATE pvp_arena SET rating = rating + ?, wins = wins + 1, streak = GREATEST(streak, 0) + 1, last_fight = NOW() WHERE player_id = ?")
                ->execute([$ratingChange, $id]);
            $pdo->prepare("UPDATE pvp_arena SET rating = GREATEST(100, rating - ?), losses = losses + 1, streak = LEAST(streak, 0) - 1, last_fight = NOW() WHERE player_id = ?")
                ->execute([abs($ratingChange), $opp['player_id']]);
        } else {
            $pdo->prepare("UPDATE pvp_arena SET rating = GREATEST(100, rating - ?), losses = losses + 1, streak = LEAST(streak, 0) - 1, last_fight = NOW() WHERE player_id = ?")
                ->execute([abs($ratingChange), $id]);
            $pdo->prepare("UPDATE pvp_arena SET rating = rating + ?, wins = wins + 1, streak = GREATEST(streak, 0) + 1, last_fight = NOW() WHERE player_id = ?")
                ->execute([abs($ratingChange), $opp['player_id']]);
        }

        // Log fight
        $pdo->prepare("INSERT INTO pvp_history (attacker_id, defender_id, winner_id, rating_change, gold_reward) VALUES (?, ?, ?, ?, ?)")
            ->execute([$id, $opp['player_id'], $won ? $id : $opp['player_id'], $ratingChange, $won ? $WIN_GOLD : 0]);

        savePlayer($id, $player);

        return jsonResponse($response, [
            'won' => $won,
            'message' => $won
                ? "⚔️ Chiến thắng {$defender->name}! +{$WIN_GOLD} 💎, ELO +{$ratingChange}"
                : "💀 Thua {$defender->name}! ELO {$ratingChange}",
            'opponent' => ['name' => $defender->name, 'level' => $defender->level, 'rating' => $oppRating],
            'ratingChange' => $ratingChange,
            'combatLog' => $result['log'] ?? [],
            'player' => $player->toArray(),
        ]);
    });
};
