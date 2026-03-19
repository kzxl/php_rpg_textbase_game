<?php
/**
 * PvP Arena — Đấu Trường (ELO rating, rank tiers, matchmaking, seasons)
 */
use Slim\Psr7\Request;
use Slim\Psr7\Response;
use App\Core\Database;
use App\Core\CombatEngine;

return function ($app) {
    $ENTRY_FEE = 50;
    $WIN_GOLD = 200;

    // === RANK TIERS ===
    $RANKS = [
        ['name' => 'Vô Danh',   'icon' => '🌑', 'min' => 0,    'color' => '#666'],
        ['name' => 'Võ Sinh',   'icon' => '🥋', 'min' => 1000, 'color' => '#5ba3cf'],
        ['name' => 'Võ Sĩ',    'icon' => '⚔️', 'min' => 1200, 'color' => '#6a8f3f'],
        ['name' => 'Đấu Sĩ',   'icon' => '🔥', 'min' => 1400, 'color' => '#d4a017'],
        ['name' => 'Đấu Sư',   'icon' => '💫', 'min' => 1600, 'color' => '#b06cff'],
        ['name' => 'Á Quân',    'icon' => '🥈', 'min' => 1800, 'color' => '#c0c0c0'],
        ['name' => 'Quán Quân', 'icon' => '👑', 'min' => 2000, 'color' => '#ff4500'],
    ];

    $getRank = function(int $rating) use ($RANKS) {
        $rank = $RANKS[0];
        foreach ($RANKS as $r) {
            if ($rating >= $r['min']) $rank = $r;
        }
        $rank['rating'] = $rating;
        // Next rank threshold
        $nextIdx = array_search($rank, $RANKS);
        $rank['nextThreshold'] = isset($RANKS[$nextIdx + 1]) ? $RANKS[$nextIdx + 1]['min'] : null;
        $rank['progress'] = $rank['nextThreshold'] 
            ? round(($rating - $rank['min']) / ($rank['nextThreshold'] - $rank['min']) * 100) 
            : 100;
        return $rank;
    };

    // === GET ARENA STATUS ===
    $app->get('/api/player/{id}/arena', function (Request $request, Response $response, array $args) use ($getRank, $RANKS) {
        $id = $args['id'];
        $pdo = Database::pdo();

        $stmt = $pdo->prepare("SELECT * FROM pvp_arena WHERE player_id = ?");
        $stmt->execute([$id]);
        $arena = $stmt->fetch(\PDO::FETCH_ASSOC);

        if (!$arena) {
            $pdo->prepare("INSERT INTO pvp_arena (player_id) VALUES (?)")->execute([$id]);
            $arena = ['rating' => 1000, 'wins' => 0, 'losses' => 0, 'streak' => 0, 'season' => 1];
        }

        $arena['rank'] = $getRank((int)$arena['rating']);

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

        // Top 10 with ranks
        $topStmt = $pdo->query("
            SELECT a.*, p.name FROM pvp_arena a
            JOIN players p ON p.id = a.player_id
            ORDER BY a.rating DESC LIMIT 10
        ");
        $top = $topStmt->fetchAll(\PDO::FETCH_ASSOC);
        foreach ($top as &$t) {
            $t['rank'] = $getRank((int)$t['rating']);
        }

        // Potential opponents (5 near your ELO for selection)
        $myRating = (int)($arena['rating'] ?? 1000);
        $oppStmt = $pdo->prepare("
            SELECT a.player_id, a.rating, p.name, p.level
            FROM pvp_arena a JOIN players p ON p.id = a.player_id
            WHERE a.player_id != ? AND ABS(a.rating - ?) <= 200
            ORDER BY RAND() LIMIT 5
        ");
        $oppStmt->execute([$id, $myRating]);
        $opponents = $oppStmt->fetchAll(\PDO::FETCH_ASSOC);
        foreach ($opponents as &$o) {
            $o['rank'] = $getRank((int)$o['rating']);
        }

        return jsonResponse($response, [
            'arena' => $arena,
            'history' => $history,
            'top10' => $top,
            'opponents' => $opponents,
            'ranks' => $RANKS,
            'entryFee' => 50,
            'winGold' => 200,
        ]);
    });

    // === FIGHT SPECIFIC OPPONENT ===
    $app->post('/api/player/{id}/arena/fight', function (Request $request, Response $response, array $args) use ($ENTRY_FEE, $WIN_GOLD, $getRank) {
        $id = $args['id'];
        $body = json_decode($request->getBody()->getContents(), true);
        $opponentId = $body['opponentId'] ?? null;

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
        $myData = $myArena->fetch(\PDO::FETCH_ASSOC);
        $myRating = (int)($myData['rating'] ?? 1000);
        $myStreak = (int)($myData['streak'] ?? 0);

        // Find opponent — specific or random
        if ($opponentId) {
            $oppStmt = $pdo->prepare("SELECT player_id, rating FROM pvp_arena WHERE player_id = ?");
            $oppStmt->execute([$opponentId]);
            $opp = $oppStmt->fetch(\PDO::FETCH_ASSOC);
        } else {
            $oppStmt = $pdo->prepare("
                SELECT a.player_id, a.rating FROM pvp_arena a
                WHERE a.player_id != ? AND ABS(a.rating - ?) <= 200
                ORDER BY RAND() LIMIT 1
            ");
            $oppStmt->execute([$id, $myRating]);
            $opp = $oppStmt->fetch(\PDO::FETCH_ASSOC);
            if (!$opp) {
                $oppStmt2 = $pdo->prepare("SELECT a.player_id, a.rating FROM pvp_arena a WHERE a.player_id != ? ORDER BY ABS(a.rating - ?) LIMIT 1");
                $oppStmt2->execute([$id, $myRating]);
                $opp = $oppStmt2->fetch(\PDO::FETCH_ASSOC);
            }
        }
        if (!$opp) return jsonResponse($response, ['error' => 'Không tìm được đối thủ!'], 400);

        $defender = loadPlayer($opp['player_id']);
        if (!$defender) return jsonResponse($response, ['error' => 'Đối thủ offline!'], 400);

        $player->gold -= $ENTRY_FEE;

        // Simulate combat
        $engine = new CombatEngine();
        $result = $engine->simulatePvP($player, $defender);
        $won = $result['winner'] === 'attacker';

        // ELO calculation with streak bonus
        $oppRating = (int)$opp['rating'];
        $expected = 1 / (1 + pow(10, ($oppRating - $myRating) / 400));
        $K = 32;
        // Streak bonus: 5+ win streak = +50% ELO gain
        $streakMul = ($won && $myStreak >= 4) ? 1.5 : 1.0;
        $ratingChange = (int)round($K * (($won ? 1 : 0) - $expected) * $streakMul);

        $newStreak = $won ? max(0, $myStreak) + 1 : min(0, $myStreak) - 1;

        // Gold bonus for streak
        $goldEarned = 0;
        $streakText = '';
        if ($won) {
            $goldEarned = $WIN_GOLD;
            if ($newStreak >= 5) {
                $streakBonus = (int)($WIN_GOLD * 0.5);
                $goldEarned += $streakBonus;
                $streakText = " 🔥x{$newStreak} (+{$streakBonus} 💎 streak bonus)";
            }
            $player->gold += $goldEarned;
            $pdo->prepare("UPDATE pvp_arena SET rating = rating + ?, wins = wins + 1, streak = ?, last_fight = NOW() WHERE player_id = ?")
                ->execute([$ratingChange, $newStreak, $id]);
            $pdo->prepare("UPDATE pvp_arena SET rating = GREATEST(100, rating - ?), losses = losses + 1, streak = LEAST(streak, 0) - 1, last_fight = NOW() WHERE player_id = ?")
                ->execute([abs($ratingChange), $opp['player_id']]);
        } else {
            $pdo->prepare("UPDATE pvp_arena SET rating = GREATEST(100, rating - ?), losses = losses + 1, streak = ?, last_fight = NOW() WHERE player_id = ?")
                ->execute([abs($ratingChange), $newStreak, $id]);
            $pdo->prepare("UPDATE pvp_arena SET rating = rating + ?, wins = wins + 1, streak = GREATEST(streak, 0) + 1, last_fight = NOW() WHERE player_id = ?")
                ->execute([abs($ratingChange), $opp['player_id']]);
        }

        // Log fight
        $pdo->prepare("INSERT INTO pvp_history (attacker_id, defender_id, winner_id, rating_change, gold_reward) VALUES (?, ?, ?, ?, ?)")
            ->execute([$id, $opp['player_id'], $won ? $id : $opp['player_id'], $ratingChange, $goldEarned]);

        savePlayer($id, $player);

        // Get updated rank
        $newRating = $myRating + $ratingChange;
        $newRank = $getRank($newRating);
        $oldRank = $getRank($myRating);
        $rankUp = $newRank['name'] !== $oldRank['name'] && $newRating > $myRating;

        return jsonResponse($response, [
            'won' => $won,
            'message' => $won
                ? "⚔️ Chiến thắng {$defender->name}! +{$goldEarned} 💎, ELO +{$ratingChange}{$streakText}"
                : "💀 Thua {$defender->name}! ELO {$ratingChange}",
            'opponent' => ['name' => $defender->name, 'level' => $defender->level, 'rating' => $oppRating, 'rank' => $getRank($oppRating)],
            'ratingChange' => $ratingChange,
            'newRating' => $newRating,
            'newRank' => $newRank,
            'rankUp' => $rankUp,
            'streak' => $newStreak,
            'goldEarned' => $goldEarned,
            'combatLog' => $result['log'] ?? [],
            'player' => $player->toArray(),
        ]);
    });
};
