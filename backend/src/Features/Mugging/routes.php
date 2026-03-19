<?php

/**
 * Mugging Feature — Cướp Đoạt Linh Thạch (Torn-style PVP Gold Theft)
 *
 * Mechanics:
 * - Attack another player to steal a % of their carried gold.
 * - Level difference gate: Cannot attack players ±10 levels away.
 * - Cooldown: 2 minutes between mugging attempts.
 * - Success/Fail based on STR vs DEF combat roll.
 * - On success: steal 5-15% of victim's gold.
 * - On fail: attacker takes damage + gets hospitalized briefly.
 * - Both sides get Event log entries.
 */

use Slim\Psr7\Request;
use Slim\Psr7\Response;
use App\Core\Database;
use App\Core\StatEngine;

return function ($app) {

    // === MUG A PLAYER ===
    $app->post('/api/player/{id}/mug', function (Request $request, Response $response, array $args) {
        $attackerId = $args['id'];
        $body = $request->getParsedBody();
        $victimId = $body['victimId'] ?? '';

        if (!$victimId || $attackerId === $victimId) {
            return jsonResponse($response, ['error' => 'Mục tiêu không hợp lệ!'], 400);
        }

        $attacker = loadPlayer($attackerId);
        if (!$attacker) return jsonResponse($response, ['error' => 'Kẻ tấn công không tồn tại'], 404);

        $victim = loadPlayer($victimId);
        if (!$victim) return jsonResponse($response, ['error' => 'Mục tiêu không tồn tại'], 404);

        // --- Validation Checks ---

        // Cooldown check
        $mugCooldown = $attacker->mugCooldownUntil ?? 0;
        $now = time();
        if ($mugCooldown > $now) {
            $remaining = $mugCooldown - $now;
            return jsonResponse($response, ['error' => "Đang hồi sức! Cần chờ thêm {$remaining}s nữa."], 400);
        }

        // Hospital check
        if ($attacker->isHospitalized()) {
            return jsonResponse($response, ['error' => 'Đang bị thương, không thể cướp!'], 400);
        }

        // Jail check
        if ($attacker->jailUntil > $now) {
            return jsonResponse($response, ['error' => 'Đang ngồi tù, không thể hành sự!'], 400);
        }

        // Travel check
        if ($attacker->isTraveling()) {
            return jsonResponse($response, ['error' => 'Đang di chuyển, không thể cướp!'], 400);
        }

        // Same area check
        if ($attacker->currentArea !== $victim->currentArea) {
            return jsonResponse($response, ['error' => 'Mục tiêu không ở cùng khu vực!'], 400);
        }

        // Level gate: ±10 levels
        $levelDiff = abs($attacker->level - $victim->level);
        if ($levelDiff > 10) {
            return jsonResponse($response, ['error' => 'Chênh lệch tu vi quá lớn! (Tối đa ±10 cấp)'], 400);
        }

        // Victim has gold?
        if ($victim->gold <= 0) {
            return jsonResponse($response, ['error' => 'Mục tiêu không mang theo Linh Thạch!'], 400);
        }

        // --- Combat Resolution ---
        $aStats = $attacker->getFinalStats();
        $vStats = $victim->getFinalStats();

        // Success chance: base 50%, modified by strength vs defense
        $powerRatio = ($aStats['strength'] + $aStats['speed']) / max(1, $vStats['defense'] + $vStats['dexterity']);
        $successChance = min(85, max(15, (int)(50 * $powerRatio)));

        $roll = mt_rand(1, 100);
        $success = $roll <= $successChance;

        $pdo = Database::pdo();
        $log = [];
        $goldStolen = 0;
        $outcome = 'fail';

        // Set cooldown (2 minutes)
        $attacker->mugCooldownUntil = $now + 120;

        if ($success) {
            // Steal 5-15% of victim's gold
            $stealPercent = mt_rand(5, 15) / 100;
            $goldStolen = max(1, (int)floor($victim->gold * $stealPercent));

            $victim->gold -= $goldStolen;
            $attacker->gold += $goldStolen;
            $outcome = 'success';

            $log[] = "⚔️ {$attacker->name} đã mai phục và cướp thành công {$goldStolen} 💎 từ {$victim->name}!";

            // Event for victim
            if (function_exists('addPlayerEvent')) {
                addPlayerEvent($pdo, $victimId, 'mugged', "💀 {$attacker->name} (Lv.{$attacker->level}) đã phục kích cướp đi {$goldStolen} 💎 của bạn!");
            }

            // Event for attacker
            if (function_exists('addPlayerEvent')) {
                addPlayerEvent($pdo, $attackerId, 'mug_success', "💰 Đã cướp thành công {$goldStolen} 💎 từ {$victim->name} (Lv.{$victim->level})!");
            }
        } else {
            // Fail: attacker takes retaliation damage and brief hospitalization
            $retaliationDmg = max(1, (int)($vStats['strength'] * 0.3));
            $attacker->currentHp = max(1, $attacker->currentHp - $retaliationDmg);

            // Brief hospitalization (30-60 seconds)
            $hospitalTime = mt_rand(30, 60);
            $attacker->hospitalUntil = $now + $hospitalTime;
            $outcome = 'fail';

            $log[] = "💥 {$attacker->name} cố cướp {$victim->name} nhưng bị phản đòn! Mất {$retaliationDmg} HP và bị thương {$hospitalTime}s!";

            // Events
            if (function_exists('addPlayerEvent')) {
                addPlayerEvent($pdo, $victimId, 'mug_defend', "🛡️ {$attacker->name} (Lv.{$attacker->level}) cố phục kích bạn nhưng thất bại!");
                addPlayerEvent($pdo, $attackerId, 'mug_fail', "💀 Phục kích {$victim->name} (Lv.{$victim->level}) thất bại! Bị phản đòn và trọng thương {$hospitalTime}s.");
            }
        }

        // Log to mugging_log
        $stmt = $pdo->prepare("
            INSERT INTO mugging_log (attacker_id, attacker_name, victim_id, victim_name, gold_stolen, outcome)
            VALUES (?, ?, ?, ?, ?, ?)
        ");
        $stmt->execute([$attackerId, $attacker->name, $victimId, $victim->name, $goldStolen, $outcome]);

        // Save both players
        savePlayer($attackerId, $attacker);
        savePlayer($victimId, $victim);

        return jsonResponse($response, [
            'success' => $success,
            'outcome' => $outcome,
            'goldStolen' => $goldStolen,
            'successChance' => $successChance,
            'log' => $log,
            'message' => $log[0] ?? '',
            'player' => $attacker->toArray(),
        ]);
    });

    // === MUGGING HISTORY ===
    $app->get('/api/player/{id}/mug-log', function (Request $request, Response $response, array $args) {
        $id = $args['id'];
        $pdo = Database::pdo();
        $stmt = $pdo->prepare("
            SELECT * FROM mugging_log
            WHERE attacker_id = ? OR victim_id = ?
            ORDER BY created_at DESC
            LIMIT 20
        ");
        $stmt->execute([$id, $id]);
        $logs = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        return jsonResponse($response, ['logs' => $logs]);
    });

    // === NEARBY TARGETS (Same area, similar level) ===
    $app->get('/api/player/{id}/mug-targets', function (Request $request, Response $response, array $args) {
        $id = $args['id'];
        $player = loadPlayer($id);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        $pdo = Database::pdo();
        $minLevel = max(1, $player->level - 10);
        $maxLevel = $player->level + 10;

        $stmt = $pdo->prepare("
            SELECT id, name, gender, level, current_area
            FROM players
            WHERE id != ?
              AND current_area = ?
              AND level BETWEEN ? AND ?
              AND current_hp > 0
            ORDER BY level DESC
            LIMIT 20
        ");
        $stmt->execute([$id, $player->currentArea, $minLevel, $maxLevel]);
        $targets = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        return jsonResponse($response, [
            'targets' => $targets,
            'mugCooldown' => max(0, ($player->mugCooldownUntil ?? 0) - time()),
        ]);
    });
};
