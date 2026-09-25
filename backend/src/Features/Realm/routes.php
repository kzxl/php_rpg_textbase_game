<?php

/**
 * Realm Feature — Cảnh Giới Tu Tiên
 * View realm info, attempt breakthrough (có tỷ lệ thất bại + trọng thương), get all realms.
 */

use Slim\Psr7\Request;
use Slim\Psr7\Response;
use App\Systems\RealmSystem;
use App\Core\CombatEngine;
use App\Core\GameDataRepository;
use App\Models\Monster;

return function ($app) {

    // === GET REALM INFO ===
    $app->get('/api/player/{id}/realm', function (Request $request, Response $response, array $args) {
        $player = loadPlayer($args['id']);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        $realmInfo = $player->getRealmInfo();
        $allRealms = RealmSystem::getAllRealms($player->realmTier);

        return jsonResponse($response, [
            'current' => $realmInfo,
            'allRealms' => $allRealms,
            'playerLevel' => $player->level,
        ]);
    });

    // === GET TRIBULATION PREVIEW ===
    $app->get('/api/player/{id}/tribulation-preview', function (Request $request, Response $response, array $args) {
        $player = loadPlayer($args['id']);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        $nextTier = $player->realmTier + 1;
        $config = \App\Systems\TribulationSystem::getTribulationConfig($nextTier);
        $stats = $player->getFinalStats();
        $defRedPct = min(60, (int)round(\App\Core\StatEngine::calcDamageReduction($stats['defense'] ?? 10) * 0.75));
        $dodgeChance = min(40, (int)round(\App\Core\StatEngine::calcDodgeChance($stats['dexterity'] ?? 10, $stats['speed'] ?? 10) * 0.5));

        return jsonResponse($response, [
            'targetTier' => $nextTier,
            'tribulation' => $config,
            'playerStats' => [
                'currentHp' => $player->currentHp,
                'maxHp' => $player->maxHp,
                'usableEnergy' => $player->getUsableEnergy(),
                'defense' => $stats['defense'] ?? 0,
                'defenseMitigationPct' => $defRedPct,
                'dodgeChancePct' => $dodgeChance,
                'hasGoldenBell' => in_array('ho_the_kim_chung', $player->activeAuras ?? [], true),
                'hasGaleStride' => in_array('than_hanh_bo', $player->activeAuras ?? [], true),
            ]
        ]);
    });

    // === ATTEMPT BREAKTHROUGH VIA HEAVENLY TRIBULATION SURVIVAL ===
    $app->post('/api/player/{id}/breakthrough', function (Request $request, Response $response, array $args) {
        $id = $args['id'];
        $player = loadPlayer($id);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        // Hospital check
        if ($player->hospitalUntil > time()) {
            return jsonResponse($response, ['error' => 'Đang tĩnh dưỡng, không thể đột phá!'], 400);
        }

        $result = RealmSystem::attemptBreakthrough(
            $player->level,
            $player->realmTier,
            $player->gold,
            $player->currentEnergy
        );

        // Simple failure — not enough level/resources
        if (!$result['success'] && !($result['needsTrial'] ?? false)) {
            return jsonResponse($response, ['error' => $result['message']], 400);
        }

        $nextTier = $player->realmTier + 1;
        $nextRealm = RealmSystem::getRealmDefinition($nextTier);
        $cost = $nextRealm['breakthroughCost'] ?? null;

        // Execute Heavenly Tribulation Survival Ordeal
        $tribulation = \App\Systems\TribulationSystem::simulateTribulation($player, $nextTier);

        if (!$tribulation['survived']) {
            // Failed tribulation survival
            if ($cost) {
                $player->gold = max(0, $player->gold - (int)(($cost['gold'] ?? 0) / 2));
                $player->currentEnergy = max(0, $player->currentEnergy - (int)(($cost['energy'] ?? 0) / 2));
            }
            $player->currentHp = 1;
            $player->hospitalUntil = time() + 90; // 90s tĩnh dưỡng
            \App\Systems\GlitchSystem::trackBehavior($player, 'tribulation_failed', 1);
            savePlayer($id, $player);

            return jsonResponse($response, [
                'success' => false,
                'trialFailed' => true,
                'message' => "⚡ Lôi Kiếp bộc phát vượt quá sức chịu đựng! Ngã xuống tại đợt {$tribulation['wavesSurvived']}/{$tribulation['totalWaves']}, kinh mạch tổn thương, tĩnh dưỡng 1.5 phút.",
                'tribulation' => $tribulation,
                'player' => $player->toArray(),
            ]);
        }

        // Survived all lightning waves! ASCENSION SUCCESS!
        if ($cost) {
            $player->gold -= ($cost['gold'] ?? 0);
            $player->currentEnergy = max(0, $player->currentEnergy - ($cost['energy'] ?? 0));
        }

        // Level up realm
        $player->realmTier = $nextTier;
        $player->tribulationRecords[] = [
            'tier' => $nextTier,
            'name' => $tribulation['tribulationName'],
            'time' => time(),
            'waves' => $tribulation['totalWaves'],
        ];

        // Track breakthrough streak & tribulation survival
        \App\Systems\GlitchSystem::trackBehavior($player, 'breakthrough_streak', 1);
        \App\Systems\GlitchSystem::trackBehavior($player, 'tribulation_survived', 1);

        // Full heal on breakthrough!
        $player->fullHeal();

        savePlayer($id, $player);

        return jsonResponse($response, [
            'success' => true,
            'message' => "⚡🌟 ĐỘT PHÁ THÀNH CÔNG! Sống sót qua {$tribulation['totalWaves']} đợt Lôi Đình, thăng hoa cảnh giới {$nextRealm['name']}!",
            'newRealm' => $player->getRealmInfo(),
            'tribulation' => $tribulation,
            'player' => $player->toArray(),
        ]);

        return jsonResponse($response, ['error' => $result['message']], 400);
    });

    // === GET ALL REALMS (reference data) ===
    $app->get('/api/data/realms', function (Request $request, Response $response) {
        return jsonResponse($response, ['realms' => RealmSystem::getAllRealms()]);
    });
};
