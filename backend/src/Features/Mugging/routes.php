<?php

/**
 * Mugging Feature — Cướp Đoạt Linh Thạch (2-Phase PVP)
 *
 * Phase 1: Attack (POST /mug) → CombatEngine fight
 * Phase 2: Post-win action (POST /mug-action) → leave / rob / wound
 *
 * Mechanics:
 * - Newbie protection: 7 days (lose it if YOU attack someone)
 * - Cooldown: 2 minutes between attempts
 * - On win: choose action (bỏ mặc / cướp / đánh trọng thương)
 * - "Cướp" steals fixed % (5-15%), higher with Cướp Bóc skill
 * - "Trọng Thương" = longer hospital (300-600s vs 60-120s for cướp)
 * - Rob has chance to unlock "cuop_boc" skill, proficiency → higher steal limit
 * - Attacking removes YOUR protection
 */

use Slim\Psr7\Request;
use Slim\Psr7\Response;
use App\Core\Database;
use App\Core\CombatEngine;

return function ($app) {

    // === PHASE 1: ATTACK A PLAYER (PvP Combat FSM) ===
    $app->post('/api/player/{id}/mug', function (Request $request, Response $response, array $args) {
        $attackerId = $args['id'];
        $body = (array)$request->getParsedBody();
        $victimId = $body['victimId'] ?? $body['target_id'] ?? '';

        if (!$victimId || $attackerId === $victimId) {
            return jsonResponse($response, ['error' => 'Mục tiêu không hợp lệ!'], 400);
        }

        $pvp = new \App\Services\PvPCombatService();
        try {
            $res = $pvp->initiateCombat($attackerId, $victimId);
            $attacker = loadPlayer($attackerId);
            $won = ($res['winner'] === 'attacker');

            return jsonResponse($response, array_merge($res, [
                'success' => $won,
                'won' => $won,
                'outcome' => $res['outcome'] ?? ($won ? 'pending_action' : 'fail'),
                'sessionId' => $res['session_id'],
                'victimId' => $res['defender_id'] ?? $victimId,
                'victimName' => $res['defender_name'] ?? '',
                'victimGold' => $res['defender_gold'] ?? 0,
                'combatLog' => $res['combat_log'] ?? [],
                'message' => $won 
                    ? "⚔️ Đã hạ gục {$res['defender_name']}! Hãy chọn kết cục:"
                    : "💀 Thua trận! Đối thủ phản đòn trọng thương {$res['lockout_applied_seconds']}s.",
                'player' => $attacker ? $attacker->toArray() : null,
            ]));
        } catch (\Throwable $e) {
            return jsonResponse($response, ['error' => $e->getMessage()], 400);
        }
    });

    // === PHASE 2: POST-WIN ACTION (Trifecta: leave, rob, wound) ===
    $app->post('/api/player/{id}/mug-action', function (Request $request, Response $response, array $args) {
        $attackerId = $args['id'];
        $body = (array)$request->getParsedBody();
        $action = $body['action'] ?? '';
        $sessionId = $body['sessionId'] ?? $body['session_id'] ?? '';

        if (!in_array($action, ['leave', 'rob', 'wound'], true)) {
            return jsonResponse($response, ['error' => 'Hành động không hợp lệ!'], 400);
        }

        // If sessionId not supplied directly, find from player_states
        if (!$sessionId) {
            $pdo = Database::pdo();
            $st = $pdo->prepare("SELECT active_combat_session_id FROM player_states WHERE player_id = ?");
            $st->execute([$attackerId]);
            $sessionId = (string)$st->fetchColumn();
        }

        if (!$sessionId) {
            return jsonResponse($response, ['error' => 'Không tìm thấy phiên giao chiến đang chờ xử lý!'], 400);
        }

        $pvp = new \App\Services\PvPCombatService();
        try {
            $res = $pvp->resolveAction($sessionId, $attackerId, $action);
            return jsonResponse($response, array_merge($res, [
                'outcome' => $res['action_chosen'],
                'goldStolen' => $res['loot_stolen'],
                'hospitalSeconds' => $res['hospital_seconds'],
            ]));
        } catch (\Throwable $e) {
            return jsonResponse($response, ['error' => $e->getMessage()], 400);
        }
    });

    // === MUGGING HISTORY ===
    $app->get('/api/player/{id}/mug-log', function (Request $request, Response $response, array $args) {
        $pdo = Database::pdo();
        $stmt = $pdo->prepare("SELECT * FROM mugging_log WHERE attacker_id = ? OR victim_id = ? ORDER BY created_at DESC LIMIT 20");
        $stmt->execute([$args['id'], $args['id']]);
        return jsonResponse($response, ['logs' => $stmt->fetchAll(\PDO::FETCH_ASSOC)]);
    });

    // === NEARBY TARGETS ===
    $app->get('/api/player/{id}/mug-targets', function (Request $request, Response $response, array $args) {
        $id = $args['id'];
        $player = loadPlayer($id);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        $pdo = Database::pdo();
        $stmt = $pdo->prepare("SELECT id, name, gender, level, current_area, created_at FROM players WHERE id != ? AND current_area = ? AND current_hp > 0 ORDER BY level DESC LIMIT 20");
        $stmt->execute([$id, $player->currentArea]);
        $targets = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        // Mark newbie protection
        $now = time();
        foreach ($targets as &$t) {
            $age = $now - strtotime($t['created_at'] ?? '2000-01-01');
            $t['protected'] = $age < 7 * 86400;
        }

        return jsonResponse($response, [
            'targets' => $targets,
            'mugCooldown' => max(0, ($player->mugCooldownUntil ?? 0) - $now),
            'hasPending' => !empty($player->pendingMugVictim) && ($player->pendingMugExpiry ?? 0) > $now,
        ]);
    });
};
