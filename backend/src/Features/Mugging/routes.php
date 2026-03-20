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

    // === PHASE 1: ATTACK A PLAYER ===
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

        $now = time();

        // --- Validation ---
        if ($attacker->isHospitalized()) return jsonResponse($response, ['error' => 'Đang bị thương!'], 400);
        if ($attacker->jailUntil > $now) return jsonResponse($response, ['error' => 'Đang ngồi tù!'], 400);
        if ($attacker->isTraveling()) return jsonResponse($response, ['error' => 'Đang di chuyển!'], 400);

        $mugCooldown = $attacker->mugCooldownUntil ?? 0;
        if ($mugCooldown > $now) {
            $remaining = $mugCooldown - $now;
            return jsonResponse($response, ['error' => "Hồi sức! Chờ {$remaining}s."], 400);
        }

        if ($attacker->currentArea !== $victim->currentArea) {
            return jsonResponse($response, ['error' => 'Mục tiêu không ở cùng khu vực!'], 400);
        }

        // Newbie protection for victim
        $victimAge = $now - ($victim->createdAt ?? 0);
        if ($victimAge < 7 * 86400) {
            return jsonResponse($response, ['error' => 'Mục tiêu đang được bảo hộ tân thủ!'], 400);
        }

        // === PROTECTION LOSS: Attacker loses their own protection if they attack ===
        $attackerAge = $now - ($attacker->createdAt ?? 0);
        $lostProtection = false;
        if ($attackerAge < 7 * 86400) {
            // Force set createdAt to >7 days ago to remove protection
            $attacker->createdAt = $now - (8 * 86400);
            $lostProtection = true;
        }

        // Victim is dead/hospital?
        if ($victim->isHospitalized()) {
            return jsonResponse($response, ['error' => 'Mục tiêu đang tịnh dưỡng, không thể tấn công!'], 400);
        }

        // === COMBAT (CombatEngine PvP) ===
        $engine = new CombatEngine();
        $result = $engine->simulatePvP($attacker, $victim);
        $won = ($result['winner'] === 'attacker');

        // Crime XP for attacking
        $attacker->crimeExp = ($attacker->crimeExp ?? 0) + 3;
        $attacker->mugCooldownUntil = $now + 120;

        $pdo = Database::pdo();

        if (!$won) {
            // Attacker lost — hospitalized
            $hospitalTime = mt_rand(60, 180);
            $attacker->hospitalUntil = $now + $hospitalTime;

            savePlayer($attackerId, $attacker);

            if (function_exists('addPlayerEvent')) {
                addPlayerEvent($pdo, $victimId, 'mug_defend', "🛡️ {$attacker->name} (Lv.{$attacker->level}) cố tấn công bạn nhưng thất bại!");
                addPlayerEvent($pdo, $attackerId, 'mug_fail', "💀 Tấn công {$victim->name} thất bại! Bị thương {$hospitalTime}s.");
            }

            // Log
            $pdo->prepare("INSERT INTO mugging_log (attacker_id, attacker_name, victim_id, victim_name, gold_stolen, outcome) VALUES (?, ?, ?, ?, 0, 'fail')")
                ->execute([$attackerId, $attacker->name, $victimId, $victim->name]);

            return jsonResponse($response, [
                'success' => false,
                'outcome' => 'fail',
                'message' => "💀 Thua! {$victim->name} phản đòn mạnh mẽ! Trọng thương {$hospitalTime}s.",
                'combatLog' => $result['log'] ?? [],
                'lostProtection' => $lostProtection,
                'player' => $attacker->toArray(),
            ]);
        }

        // === WON — Store pending action, wait for phase 2 ===
        $attacker->pendingMugVictim = $victimId;
        $attacker->pendingMugExpiry = $now + 60; // 60s to decide

        savePlayer($attackerId, $attacker);
        savePlayer($victimId, $victim);

        return jsonResponse($response, [
            'success' => true,
            'outcome' => 'pending_action',
            'message' => "⚔️ Đã hạ gục {$victim->name}! Chọn hành động:",
            'victimId' => $victimId,
            'victimName' => $victim->name,
            'victimGold' => $victim->gold,
            'combatLog' => $result['log'] ?? [],
            'lostProtection' => $lostProtection,
            'actions' => [
                ['id' => 'leave', 'name' => '🚶 Bỏ Mặc', 'desc' => 'Bỏ đi. Victim nghỉ ngơi 30-60s.'],
                ['id' => 'rob', 'name' => '💰 Cướp Linh Thạch', 'desc' => 'Lấy 5-15% gold. Victim nghỉ 60-120s.'],
                ['id' => 'wound', 'name' => '🩸 Đánh Trọng Thương', 'desc' => 'Không cướp. Victim nghỉ 300-600s.'],
            ],
            'player' => $attacker->toArray(),
        ]);
    });

    // === PHASE 2: POST-WIN ACTION ===
    $app->post('/api/player/{id}/mug-action', function (Request $request, Response $response, array $args) {
        $attackerId = $args['id'];
        $body = $request->getParsedBody();
        $action = $body['action'] ?? '';

        if (!in_array($action, ['leave', 'rob', 'wound'])) {
            return jsonResponse($response, ['error' => 'Hành động không hợp lệ!'], 400);
        }

        $attacker = loadPlayer($attackerId);
        if (!$attacker) return jsonResponse($response, ['error' => 'Player not found'], 404);

        $victimId = $attacker->pendingMugVictim ?? '';
        $expiry = $attacker->pendingMugExpiry ?? 0;

        if (!$victimId || time() > $expiry) {
            $attacker->pendingMugVictim = null;
            $attacker->pendingMugExpiry = null;
            savePlayer($attackerId, $attacker);
            return jsonResponse($response, ['error' => 'Hết thời gian ra quyết định!'], 400);
        }

        $victim = loadPlayer($victimId);
        if (!$victim) return jsonResponse($response, ['error' => 'Victim not found'], 404);

        $pdo = Database::pdo();
        $now = time();
        $goldStolen = 0;
        $message = '';
        $outcome = $action;

        // === Robbery Skill: "cuop_boc" proficiency ===
        $robberySkillLevel = 0;
        foreach ($attacker->skills as $s) {
            $sid = is_array($s) ? ($s['id'] ?? '') : $s;
            if ($sid === 'cuop_boc') {
                $robberySkillLevel = is_array($s) ? ($s['level'] ?? 1) : 1;
                break;
            }
        }
        $stealBonusPct = $robberySkillLevel * 2; // +2% per skill level

        if ($action === 'leave') {
            // Victim: brief hospital (30-60s)
            $victimHospital = mt_rand(30, 60);
            $victim->hospitalUntil = $now + $victimHospital;
            $message = "🚶 Bỏ mặc {$victim->name}. Họ tỉnh dậy sau {$victimHospital}s.";

        } elseif ($action === 'rob') {
            // Steal 5-15% + skill bonus, cap at 25%
            $stealPercent = mt_rand(5, 15) + $stealBonusPct;
            $stealPercent = min($stealPercent, 25); // Cap at 25%
            $goldStolen = max(1, (int)floor($victim->gold * $stealPercent / 100));

            $victim->gold -= $goldStolen;
            $attacker->gold += $goldStolen;

            // Victim: medium hospital (60-120s)
            $victimHospital = mt_rand(60, 120);
            $victim->hospitalUntil = $now + $victimHospital;

            // Crime XP for robbing
            $attacker->crimeExp = ($attacker->crimeExp ?? 0) + 5;

            // === Chance to unlock/level up Cướp Bóc skill ===
            if ($robberySkillLevel === 0) {
                // 10% chance to learn Cướp Bóc
                if (mt_rand(1, 100) <= 10) {
                    $attacker->skills[] = ['id' => 'cuop_boc', 'level' => 1, 'xp' => 0];
                    $message = "💰 Cướp {$goldStolen} 💎 ({$stealPercent}%) từ {$victim->name}! 🎓 Học được kỹ năng [Cướp Bóc]!";
                } else {
                    $message = "💰 Cướp {$goldStolen} 💎 ({$stealPercent}%) từ {$victim->name}!";
                }
            } else {
                // Level up Cướp Bóc XP
                $attacker->gainSkillXp('cuop_boc', 15);
                $message = "💰 Cướp {$goldStolen} 💎 ({$stealPercent}%) từ {$victim->name}! (Cướp Bóc +15 XP)";
            }

        } elseif ($action === 'wound') {
            // Victim: severe hospital (300-600s = 5-10 min)
            $victimHospital = mt_rand(300, 600);
            $victim->hospitalUntil = $now + $victimHospital;
            $victim->currentHp = 1; // Nearly dead

            // Heavy crime XP
            $attacker->crimeExp = ($attacker->crimeExp ?? 0) + 10;

            $message = "🩸 Đánh trọng thương {$victim->name}! Họ phải tịnh dưỡng {$victimHospital}s!";
        }

        // Events for both
        if (function_exists('addPlayerEvent')) {
            if ($action === 'rob') {
                addPlayerEvent($pdo, $victimId, 'mugged', "💀 {$attacker->name} cướp {$goldStolen} 💎 của bạn!");
            } elseif ($action === 'wound') {
                addPlayerEvent($pdo, $victimId, 'wounded', "🩸 {$attacker->name} đánh trọng thương bạn! Tịnh dưỡng {$victimHospital}s!");
            } else {
                addPlayerEvent($pdo, $victimId, 'attacked', "⚔️ {$attacker->name} tấn công rồi bỏ đi.");
            }
        }

        // Log to mugging_log
        $pdo->prepare("INSERT INTO mugging_log (attacker_id, attacker_name, victim_id, victim_name, gold_stolen, outcome) VALUES (?, ?, ?, ?, ?, ?)")
            ->execute([$attackerId, $attacker->name, $victimId, $victim->name, $goldStolen, $outcome]);

        // Clear pending
        $attacker->pendingMugVictim = null;
        $attacker->pendingMugExpiry = null;

        savePlayer($attackerId, $attacker);
        savePlayer($victimId, $victim);

        return jsonResponse($response, [
            'outcome' => $outcome,
            'goldStolen' => $goldStolen,
            'message' => $message,
            'player' => $attacker->toArray(),
        ]);
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
