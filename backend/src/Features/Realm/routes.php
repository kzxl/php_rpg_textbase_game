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
        $allRealms = RealmSystem::getAllRealms();

        return jsonResponse($response, [
            'current' => $realmInfo,
            'allRealms' => $allRealms,
            'playerLevel' => $player->level,
        ]);
    });

    // === ATTEMPT BREAKTHROUGH ===
    $app->post('/api/player/{id}/breakthrough', function (Request $request, Response $response, array $args) {
        $id = $args['id'];
        $player = loadPlayer($id);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        // Hospital/jail check
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
        if (!$result['success'] && !($result['needsTrial'] ?? false) && !($result['failed'] ?? false)) {
            return jsonResponse($response, ['error' => $result['message']], 400);
        }

        // Random failure (no trial required) — hospitalize
        if ($result['failed'] ?? false) {
            $cost = RealmSystem::REALMS[$player->realmTier + 1]['breakthroughCost'] ?? null;
            // Still consume half the resources on failure
            if ($cost) {
                $player->gold -= (int)(($cost['gold'] ?? 0) / 2);
                $player->currentEnergy = max(0, $player->currentEnergy - (int)(($cost['energy'] ?? 0) / 2));
            }
            // Hospitalize
            $hospitalSecs = $result['failHospitalSeconds'] ?? 60;
            $player->currentHp = 1;
            $player->hospitalUntil = time() + $hospitalSecs;
            savePlayer($id, $player);

            $mins = (int)ceil($hospitalSecs / 60);
            return jsonResponse($response, [
                'success' => false,
                'failed' => true,
                'message' => "⚡ Đột phá thất bại! Cơ thể không chịu nổi, bị trọng thương! Tĩnh dưỡng {$mins} phút.",
                'player' => $player->toArray(),
            ]);
        }

        // Needs trial combat
        if ($result['needsTrial'] ?? false) {
            $monsterId = $result['trialMonster'];
            $monsterData = GameDataRepository::getMonsterById($monsterId);
            $nextTier = $player->realmTier + 1;
            $nextRealm = RealmSystem::REALMS[$nextTier] ?? null;
            $cost = $nextRealm['breakthroughCost'] ?? null;
            $failChance = $result['failChance'] ?? 0;
            $failHospitalSecs = $result['failHospitalSeconds'] ?? 0;

            if (!$monsterData) {
                // No monster in DB — skip trial, just do fail chance roll
                if ($failChance > 0 && mt_rand(1, 100) <= $failChance) {
                    if ($cost) {
                        $player->gold -= (int)(($cost['gold'] ?? 0) / 2);
                        $player->currentEnergy = max(0, $player->currentEnergy - (int)(($cost['energy'] ?? 0) / 2));
                    }
                    $player->currentHp = 1;
                    $player->hospitalUntil = time() + $failHospitalSecs;
                    savePlayer($id, $player);
                    $mins = (int)ceil($failHospitalSecs / 60);
                    return jsonResponse($response, [
                        'success' => false,
                        'failed' => true,
                        'message' => "⚡ Đột phá thất bại! Trọng thương! Tĩnh dưỡng {$mins} phút.",
                        'player' => $player->toArray(),
                    ]);
                }
                // Success without trial
                $result['success'] = true;
                $result['newTier'] = $nextTier;
                $result['cost'] = $cost;
                $result['message'] = "🌟 ĐỘT PHÁ THÀNH CÔNG! Chào mừng đến cảnh giới {$nextRealm['name']}!";
            } else {
                // Create Monster and fight
                $trialLevel = $player->level + 2;
                $monsterData['name'] = "⚡ Thiên Kiếp: " . $monsterData['name'];
                $monster = Monster::fromData($monsterData, $trialLevel);

                $combatEngine = new CombatEngine();
                $combatResult = $combatEngine->fullCombat($player, $monster);

                if ($combatResult['outcome'] !== 'win') {
                    // Lost trial — hospitalize longer
                    $player->hospitalUntil = time() + $failHospitalSecs;
                    savePlayer($id, $player);
                    $mins = (int)ceil($failHospitalSecs / 60);
                    return jsonResponse($response, [
                        'success' => false,
                        'trialFailed' => true,
                        'message' => "⚡ Thiên Kiếp thất bại! {$monsterData['name']} quá mạnh. Trọng thương, tĩnh dưỡng {$mins} phút.",
                        'combat' => $combatResult,
                        'player' => $player->toArray(),
                    ]);
                }

                // Won trial — but still roll fail chance for breakthrough itself
                if ($failChance > 0 && mt_rand(1, 100) <= $failChance) {
                    if ($cost) {
                        $player->gold -= (int)(($cost['gold'] ?? 0) / 2);
                        $player->currentEnergy = max(0, $player->currentEnergy - (int)(($cost['energy'] ?? 0) / 2));
                    }
                    $halfHospital = (int)($failHospitalSecs / 2);
                    $player->hospitalUntil = time() + $halfHospital;
                    savePlayer($id, $player);
                    $mins = (int)ceil($halfHospital / 60);
                    return jsonResponse($response, [
                        'success' => false,
                        'failed' => true,
                        'message' => "⚡ Thắng Thiên Kiếp nhưng đột phá thất bại! Bị phản phệ, tĩnh dưỡng {$mins} phút.",
                        'combat' => $combatResult,
                        'player' => $player->toArray(),
                    ]);
                }

                // Full success with trial
                $result['success'] = true;
                $result['newTier'] = $nextTier;
                $result['cost'] = $cost;
                $result['message'] = "⚡🌟 Vượt qua Thiên Kiếp! ĐỘT PHÁ THÀNH CÔNG lên " . ($nextRealm['name'] ?? '???') . "!";
                $result['combat'] = $combatResult;
            }
        }

        if ($result['success']) {
            // Deduct cost
            $cost = $result['cost'] ?? null;
            if ($cost) {
                $player->gold -= ($cost['gold'] ?? 0);
                $player->currentEnergy -= ($cost['energy'] ?? 0);
            }

            // Level up realm
            $player->realmTier = $result['newTier'];

            // Full heal on breakthrough!
            $player->fullHeal();

            savePlayer($id, $player);

            return jsonResponse($response, [
                'success' => true,
                'message' => $result['message'],
                'newRealm' => $player->getRealmInfo(),
                'combat' => $result['combat'] ?? null,
                'player' => $player->toArray(),
            ]);
        }

        return jsonResponse($response, ['error' => $result['message']], 400);
    });

    // === GET ALL REALMS (reference data) ===
    $app->get('/api/data/realms', function (Request $request, Response $response) {
        return jsonResponse($response, ['realms' => RealmSystem::getAllRealms()]);
    });
};
