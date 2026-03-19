<?php

/**
 * Gym Feature — Rèn Luyện (stat training with diminishing returns & streaks).
 */

use Slim\Psr7\Request;
use Slim\Psr7\Response;

return function ($app) {
    $app->post('/api/player/{id}/train', function (Request $request, Response $response, array $args) {
        $id = $args['id'];
        $player = loadPlayer($id);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        $body = $request->getParsedBody();
        $stat = $body['stat'] ?? '';
        $count = min(max((int)($body['count'] ?? 1), 1), 100); // 1-100 lần
        $energyCost = 5;

        // Session cap based on realm tier
        $sessionCap = 20 + ($player->realmTier * 5);

        // Check cooldown (mỏi cơ thể)
        $gymCooldown = $player->gymCooldownUntil ?? 0;
        if (time() < $gymCooldown) {
            $remaining = $gymCooldown - time();
            $mins = (int)ceil($remaining / 60);
            return jsonResponse($response, ['error' => "Cơ thể đang mỏi! Cần nghỉ ngơi thêm {$mins} phút."], 400);
        }

        // Track daily sessions
        $today = date('Y-m-d');
        if (($player->gymDate ?? '') !== $today) {
            $player->gymDate = $today;
            $player->gymSessions = 0;
        }

        // Check max trainable
        $maxTrainable = (int)floor($player->currentEnergy / $energyCost);
        if ($maxTrainable <= 0) {
            return jsonResponse($response, ['error' => 'Không đủ linh lực để rèn luyện!'], 400);
        }
        $remainingSessions = max(0, $sessionCap - ($player->gymSessions ?? 0));
        if ($remainingSessions <= 0) {
            // Trigger cooldown: 4 hours
            $player->gymCooldownUntil = time() + (4 * 3600);
            $player->gymSessions = 0;
            savePlayer($id, $player);
            return jsonResponse($response, ['error' => 'Đã hết phiên rèn luyện hôm nay! Cơ thể cần nghỉ 4 giờ.', 'player' => $player->toArray()], 400);
        }
        $actualCount = min($count, $maxTrainable, $remainingSessions);

        // Training streak bonus
        $streakDays = $player->gymStreak ?? 0;
        $streakBonus = 0;
        if ($streakDays >= 30) $streakBonus = 0.50;
        elseif ($streakDays >= 7) $streakBonus = 0.25;
        elseif ($streakDays >= 3) $streakBonus = 0.10;

        // Execute training with diminishing returns
        $errors = [];
        $totalGain = 0;
        for ($i = 0; $i < $actualCount; $i++) {
            // Diminishing returns: efficiency decreases as sessions increase
            $sessionsUsed = ($player->gymSessions ?? 0) + $i;
            $efficiency = max(0.1, 1.0 - ($sessionsUsed / $sessionCap) * 0.5);
            $efficiency *= (1 + $streakBonus); // streak multiplier

            $error = $player->trainStat($stat, $energyCost);
            if ($error) {
                $errors[] = $error;
                break;
            }
            $totalGain += $efficiency; // fractional gain
        }

        if ($totalGain <= 0) {
            return jsonResponse($response, ['error' => $errors[0] ?? 'Không thể rèn luyện.'], 400);
        }

        $player->gymSessions = ($player->gymSessions ?? 0) + $actualCount;

        // Update training streak (if trained today for first time)
        $yesterday = date('Y-m-d', strtotime('-1 day'));
        if (($player->lastGymDate ?? '') === $yesterday && ($player->gymDate ?? '') === $today) {
            // Consecutive day
        } elseif (($player->lastGymDate ?? '') !== $today) {
            if (($player->lastGymDate ?? '') === $yesterday) {
                $player->gymStreak = ($player->gymStreak ?? 0) + 1;
            } else {
                $player->gymStreak = 1; // Reset streak
            }
            $player->lastGymDate = $today;
        }

        savePlayer($id, $player);

        $statNames = ['strength' => 'Sức mạnh', 'speed' => 'Tốc độ', 'dexterity' => 'Khéo léo', 'defense' => 'Phòng thủ'];
        $statLabel = $statNames[$stat] ?? $stat;
        $usedEnergy = $actualCount * $energyCost;
        $effectiveGain = round($totalGain, 1);
        $streakLabel = $streakDays >= 30 ? '🏆 Thiết Nhân (+50%)' : ($streakDays >= 7 ? '🔥 Kiên Trì (+25%)' : ($streakDays >= 3 ? '⚡ Streak (+10%)' : ''));

        return jsonResponse($response, [
            'message' => "Rèn luyện +{$effectiveGain} {$statLabel} (-{$usedEnergy} linh lực)" . ($streakLabel ? " {$streakLabel}" : ''),
            'player' => $player->toArray(),
            'trained' => $actualCount,
            'effectiveGain' => $effectiveGain,
            'sessionsRemaining' => max(0, $sessionCap - $player->gymSessions),
            'sessionCap' => $sessionCap,
            'streakDays' => $player->gymStreak ?? 0,
            'streakBonus' => $streakBonus,
        ]);
    });
};
