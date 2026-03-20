<?php
/**
 * Thiên Phần Tháp — Infinite Tower Endgame
 *
 * Unlimited floors, monsters scale each floor.
 * Monthly reset (season = YYYY-MM). Top players get rewards.
 * Must kill all monsters on floor to advance.
 */
use Slim\Psr7\Request;
use Slim\Psr7\Response;
use App\Core\Database;
use App\Core\CombatEngine;
use App\Core\GameDataRepository;

return function ($app) {

    $currentSeason = function (): string { return date('Y-m'); };

    // Monster pool for tower (scales infinitely)
    $TOWER_MONSTERS = [
        ['id' => 'tower_phantom',    'name' => 'Ảo Ảnh',       'element' => 'water'],
        ['id' => 'tower_golem',      'name' => 'Thạch Nhân',    'element' => 'earth'],
        ['id' => 'tower_flame',      'name' => 'Hỏa Linh',      'element' => 'fire'],
        ['id' => 'tower_wind',       'name' => 'Phong Yêu',     'element' => 'wood'],
        ['id' => 'tower_iron',       'name' => 'Thiết Vệ',      'element' => 'metal'],
        ['id' => 'tower_shadow',     'name' => 'Ảm Ảnh',        'element' => 'water'],
        ['id' => 'tower_berserker',  'name' => 'Cuồng Chiến',   'element' => 'fire'],
        ['id' => 'tower_guardian',   'name' => 'Thủ Hộ Thần',   'element' => 'earth'],
    ];

    // Boss every 10 floors
    $TOWER_BOSSES = [
        ['id' => 'tower_boss_fire',   'name' => 'Hỏa Viêm Thần Tướng', 'element' => 'fire'],
        ['id' => 'tower_boss_water',  'name' => 'Hải Triều Tà Quân',    'element' => 'water'],
        ['id' => 'tower_boss_earth',  'name' => 'Địa Ngục Vương',       'element' => 'earth'],
        ['id' => 'tower_boss_metal',  'name' => 'Kiếm Ma',              'element' => 'metal'],
        ['id' => 'tower_boss_wood',   'name' => 'Vạn Mộc Tà Đạo',      'element' => 'wood'],
    ];

    // Scale monster stats by floor
    $scaleMonster = function (int $floor, array $base, bool $isBoss): array {
        // Exponential scaling: each floor +8%, bosses +50%
        $scale = pow(1.08, $floor - 1) * ($isBoss ? 1.5 : 1.0);
        $baseHp = $isBoss ? 200 : 80;
        $baseStr = $isBoss ? 20 : 12;
        $baseDef = $isBoss ? 15 : 8;
        return [
            'id' => $base['id'],
            'name' => $base['name'] . ($isBoss ? '' : " (T.{$floor})"),
            'element' => $base['element'] ?? null,
            'stats' => [
                'hp'       => (int)round($baseHp * $scale),
                'strength' => (int)round($baseStr * $scale),
                'speed'    => (int)round(10 * $scale),
                'dexterity'=> (int)round(10 * $scale),
                'defense'  => (int)round($baseDef * $scale),
            ],
            'xpReward' => (int)round(30 * $scale),
            'goldReward' => [(int)round(10 * $scale), (int)round(25 * $scale)],
            'drops' => [],
        ];
    };

    // Rewards per floor tier
    $FLOOR_REWARDS = [
        10  => ['title' => 'Tháp Tiên Sơ Nhập', 'gold' => 500],
        25  => ['title' => 'Tháp Tiên Chiến Sĩ', 'gold' => 1500],
        50  => ['title' => 'Tháp Tiên Dũng Sĩ', 'gold' => 5000],
        100 => ['title' => 'Tháp Tiên Bá Vương', 'gold' => 20000],
        200 => ['title' => 'Tháp Tiên Truyền Thuyết', 'gold' => 50000],
    ];

    // === GET TOWER STATUS ===
    $app->get('/api/player/{id}/tower', function (Request $request, Response $response, array $args) use ($currentSeason, $FLOOR_REWARDS) {
        $id = $args['id'];
        $player = loadPlayer($id);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        $season = $currentSeason();
        $pdo = Database::pdo();

        // Get or create run for this season
        $stmt = $pdo->prepare("SELECT * FROM tower_runs WHERE player_id = ? AND season = ?");
        $stmt->execute([$id, $season]);
        $run = $stmt->fetch(\PDO::FETCH_ASSOC);

        // Leaderboard top 20
        $stmt = $pdo->prepare("SELECT player_id, player_name, highest_floor, total_kills FROM tower_runs WHERE season = ? AND highest_floor > 0 ORDER BY highest_floor DESC, total_kills DESC LIMIT 20");
        $stmt->execute([$season]);
        $leaderboard = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        // Player rank
        $playerRank = 0;
        foreach ($leaderboard as $i => $row) {
            if ($row['player_id'] === $id) { $playerRank = $i + 1; break; }
        }

        // Previous season rewards
        $prevSeason = date('Y-m', strtotime('-1 month'));
        $stmt = $pdo->prepare("SELECT * FROM tower_leaderboard WHERE season = ? AND player_id = ?");
        $stmt->execute([$prevSeason, $id]);
        $prevReward = $stmt->fetch(\PDO::FETCH_ASSOC);

        // Next milestone
        $currentFloor = $run ? (int)$run['highest_floor'] : 0;
        $nextMilestone = null;
        foreach ($FLOOR_REWARDS as $floor => $reward) {
            if ($currentFloor < $floor) { $nextMilestone = ['floor' => $floor, 'reward' => $reward]; break; }
        }

        return jsonResponse($response, [
            'season' => $season,
            'run' => $run ? [
                'currentFloor' => (int)$run['current_floor'],
                'highestFloor' => (int)$run['highest_floor'],
                'totalKills' => (int)$run['total_kills'],
                'status' => $run['status'],
            ] : null,
            'leaderboard' => array_map(function($row, $i) {
                return [
                    'rank' => $i + 1,
                    'playerId' => $row['player_id'],
                    'name' => $row['player_name'] ?? $row['player_id'],
                    'floor' => (int)$row['highest_floor'],
                    'kills' => (int)$row['total_kills'],
                ];
            }, $leaderboard, array_keys($leaderboard)),
            'playerRank' => $playerRank,
            'nextMilestone' => $nextMilestone,
            'milestones' => $FLOOR_REWARDS,
            'prevSeasonReward' => $prevReward ?: null,
        ]);
    });

    // === ENTER / CONTINUE TOWER ===
    $app->post('/api/player/{id}/tower/climb', function (Request $request, Response $response, array $args) use ($currentSeason) {
        $id = $args['id'];
        $player = loadPlayer($id);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        if ($player->isHospitalized()) return jsonResponse($response, ['error' => 'Đang tịnh dưỡng!'], 400);
        if ($player->isJailed()) return jsonResponse($response, ['error' => 'Đang ngồi tù!'], 400);

        $season = $currentSeason();
        $pdo = Database::pdo();

        $stmt = $pdo->prepare("SELECT * FROM tower_runs WHERE player_id = ? AND season = ?");
        $stmt->execute([$id, $season]);
        $run = $stmt->fetch(\PDO::FETCH_ASSOC);

        if (!$run) {
            // Create new run
            $stmt = $pdo->prepare("INSERT INTO tower_runs (player_id, season, current_floor, highest_floor, player_name) VALUES (?, ?, 1, 0, ?)");
            $stmt->execute([$id, $season, $player->name]);
            $runId = $pdo->lastInsertId();
            return jsonResponse($response, [
                'message' => "🗼 Bước vào Thiên Phần Tháp! Mùa {$season}",
                'floor' => 1,
                'status' => 'active',
            ]);
        }

        if ($run['status'] === 'dead') {
            // Reset to floor 1 but keep highest_floor record
            $pdo->prepare("UPDATE tower_runs SET current_floor = 1, status = 'active' WHERE id = ?")->execute([$run['id']]);
            return jsonResponse($response, [
                'message' => "🗼 Hồi sinh! Tháp reset về tầng 1. Kỷ lục: tầng {$run['highest_floor']}",
                'floor' => 1,
                'highestFloor' => (int)$run['highest_floor'],
                'status' => 'active',
            ]);
        }

        return jsonResponse($response, [
            'message' => "🗼 Tiếp tục leo tháp! Tầng {$run['current_floor']}",
            'floor' => (int)$run['current_floor'],
            'highestFloor' => (int)$run['highest_floor'],
            'status' => $run['status'],
        ]);
    });

    // === FIGHT CURRENT FLOOR ===
    $app->post('/api/player/{id}/tower/fight', function (Request $request, Response $response, array $args) use ($currentSeason, $scaleMonster, $TOWER_MONSTERS, $TOWER_BOSSES, $FLOOR_REWARDS) {
        $id = $args['id'];
        $player = loadPlayer($id);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);
        if ($player->isHospitalized()) return jsonResponse($response, ['error' => 'Đang tịnh dưỡng!'], 400);

        $season = $currentSeason();
        $pdo = Database::pdo();
        $stmt = $pdo->prepare("SELECT * FROM tower_runs WHERE player_id = ? AND season = ? AND status = 'active'");
        $stmt->execute([$id, $season]);
        $run = $stmt->fetch(\PDO::FETCH_ASSOC);
        if (!$run) return jsonResponse($response, ['error' => 'Chưa vào tháp! Hãy bắt đầu leo.'], 400);

        $floor = (int)$run['current_floor'];
        $isBoss = ($floor % 10 === 0);
        $monstersPerFloor = min(1 + (int)floor($floor / 20), 3);

        // === FLOOR EVENTS (deterministic by floor number) ===
        $floorType = 'normal';
        $floorLabel = '';
        $floorLootMultiplier = 1.0;

        if ($isBoss) {
            $floorType = 'boss';
            $floorLabel = '👑 Boss Tầng';
        } elseif ($floor % 15 === 0) {
            $floorType = 'treasure';
            $floorLabel = '💰 Bảo Tàng Tầng';
            $floorLootMultiplier = 2.5;
        } elseif ($floor % 7 === 0) {
            $floorType = 'trap';
            $floorLabel = '☠️ Bẫy Trận Tầng';
            // Trap: lose 10% HP before combat
            $hpLoss = (int)round($player->currentHp * 0.10);
            $player->currentHp = max(1, $player->currentHp - $hpLoss);
        } elseif ($floor % 13 === 0) {
            $floorType = 'healing';
            $floorLabel = '💚 Linh Tuyền Tầng';
            // Heal 20% HP + full energy
            $hpHeal = (int)round($player->maxHp * 0.20);
            $player->currentHp = min($player->maxHp, $player->currentHp + $hpHeal);
            $player->currentEnergy = $player->maxEnergy;
        } elseif ($floor % 11 === 0) {
            $floorType = 'elite';
            $floorLabel = '⚡ Tinh Anh Tầng';
            // Elite floor: fewer but stronger monsters, guaranteed material drop
        } elseif ($floor % 9 === 0 && $floor > 20) {
            $floorType = 'elemental';
            $floorLabel = '☯ Ngũ Hành Tầng';
            // All monsters same element, bonus if player skills counter it
        }

        // Generate monsters for this floor
        $combatResults = [];
        $allLoot = [];
        $survived = true;

        if ($floorLabel) $allLoot[] = $floorLabel;

        for ($m = 0; $m < $monstersPerFloor; $m++) {
            if ($isBoss && $m === $monstersPerFloor - 1) {
                $base = $TOWER_BOSSES[($floor / 10 - 1) % count($TOWER_BOSSES)];
                $monsterData = $scaleMonster($floor, $base, true);
            } else {
                $base = $TOWER_MONSTERS[array_rand($TOWER_MONSTERS)];
                $monsterData = $scaleMonster($floor, $base, false);
            }

            // Apply floor type to monster
            if ($floorType === 'elite') {
                foreach (['hp','strength','speed','dexterity','defense'] as $s) {
                    $monsterData['stats'][$s] = (int)round($monsterData['stats'][$s] * 1.3);
                }
                $monsterData['name'] = '⚡' . $monsterData['name'];
                $monsterData['xpReward'] = (int)round($monsterData['xpReward'] * 2.0);
            }
            if ($floorType === 'elemental') {
                $elements = ['fire','water','wood','earth','metal'];
                $forcedElement = $elements[$floor % count($elements)];
                $monsterData['element'] = $forcedElement;
            }

            $monster = \App\Models\Monster::fromData($monsterData);
            $engine = new CombatEngine();
            $result = $engine->fullCombat($player, $monster);

            // XP + Gold with floor loot multiplier
            if ($result['result'] === 'win') {
                $xpGain = (int)round($monsterData['xpReward'] * $floorLootMultiplier);
                $goldGain = (int)round(mt_rand($monsterData['goldReward'][0], $monsterData['goldReward'][1]) * $floorLootMultiplier);
                $player->gainXp($xpGain);
                $player->gold += $goldGain;
                $allLoot[] = "💎{$goldGain} ⭐{$xpGain}XP";
            } else {
                $survived = false;
                $combatResults[] = [
                    'monster' => $monsterData['name'],
                    'result' => 'loss',
                    'log' => $result['log'],
                ];
                break;
            }

            $combatResults[] = [
                'monster' => $monsterData['name'],
                'result' => 'win',
                'log' => $result['log'],
            ];
        }

        if (!$survived) {
            // Player died — tower run ends, keep highest floor
            $pdo->prepare("UPDATE tower_runs SET status = 'dead', updated_at = NOW() WHERE id = ?")->execute([$run['id']]);
            savePlayer($id, $player);

            return jsonResponse($response, [
                'result' => 'death',
                'message' => "💀 Ngã ở tầng {$floor}! Kỷ lục: tầng {$run['highest_floor']}",
                'floor' => $floor,
                'highestFloor' => (int)$run['highest_floor'],
                'combatResults' => $combatResults,
                'player' => $player->toArray(),
            ]);
        }

        // Floor cleared! Advance
        $newFloor = $floor + 1;
        $newHighest = max((int)$run['highest_floor'], $floor);
        $totalKills = (int)$run['total_kills'] + $monstersPerFloor;

        $pdo->prepare("UPDATE tower_runs SET current_floor = ?, highest_floor = ?, total_kills = ?, player_name = ?, updated_at = NOW() WHERE id = ?")
            ->execute([$newFloor, $newHighest, $totalKills, $player->name, $run['id']]);

        // Check milestone rewards
        $milestone = null;
        if (isset($FLOOR_REWARDS[$floor]) && (int)$run['highest_floor'] < $floor) {
            $milestone = $FLOOR_REWARDS[$floor];
            $player->gold += $milestone['gold'];
            $allLoot[] = "🏆 {$milestone['title']}: +{$milestone['gold']}💎";
        }

        // Boss floor bonus drops
        if ($isBoss) {
            $bossGold = (int)round(50 * pow(1.08, $floor - 1));
            $player->gold += $bossGold;
            $allLoot[] = "👑 Boss bonus: +{$bossGold}💎";

            // Chance to drop Tiên Đồ (atlas map) from boss
            if (mt_rand(1, 100) <= 20) {
                $tcData = json_decode(file_get_contents(__DIR__ . '/../../../data/tien_canh_maps.json'), true);
                $maxTier = min(8, 1 + (int)floor($floor / 25));
                $eligibleMaps = array_values(array_filter($tcData['maps'], fn($m) => $m['tier'] <= $maxTier));
                if (!empty($eligibleMaps)) {
                    $chosen = $eligibleMaps[array_rand($eligibleMaps)];
                    $player->tienCanhMaps[] = ['mapId' => $chosen['id'], 'mapName' => $chosen['name'], 'tier' => $chosen['tier'], 'modifiers' => []];
                    $allLoot[] = "🗺️ Tiên Đồ: {$chosen['name']} (T{$chosen['tier']})";
                }
            }
        }

        savePlayer($id, $player);

        return jsonResponse($response, [
            'result' => 'floor_cleared',
            'message' => "⚔️ Tầng {$floor} — đã xóa sổ!" . ($isBoss ? " 👑 BOSS hạ!" : ''),
            'floor' => $floor,
            'nextFloor' => $newFloor,
            'highestFloor' => $newHighest,
            'totalKills' => $totalKills,
            'monstersKilled' => $monstersPerFloor,
            'isBoss' => $isBoss,
            'loot' => $allLoot,
            'milestone' => $milestone,
            'combatResults' => $combatResults,
            'player' => $player->toArray(),
        ]);
    });

    // === TOWER LEADERBOARD (standalone) ===
    $app->get('/api/tower/leaderboard', function (Request $request, Response $response) use ($currentSeason) {
        $season = $request->getQueryParams()['season'] ?? $currentSeason();
        $pdo = Database::pdo();
        $stmt = $pdo->prepare("SELECT player_id, player_name, highest_floor, total_kills FROM tower_runs WHERE season = ? AND highest_floor > 0 ORDER BY highest_floor DESC, total_kills DESC LIMIT 50");
        $stmt->execute([$season]);
        $rows = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        return jsonResponse($response, [
            'season' => $season,
            'leaderboard' => array_map(function($row, $i) {
                return [
                    'rank' => $i + 1,
                    'playerId' => $row['player_id'],
                    'name' => $row['player_name'] ?? $row['player_id'],
                    'floor' => (int)$row['highest_floor'],
                    'kills' => (int)$row['total_kills'],
                ];
            }, $rows, array_keys($rows)),
        ]);
    });

    // === CLAIM PREVIOUS SEASON REWARDS ===
    $app->post('/api/player/{id}/tower/claim-rewards', function (Request $request, Response $response, array $args) {
        $id = $args['id'];
        $player = loadPlayer($id);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        $prevSeason = date('Y-m', strtotime('-1 month'));
        $pdo = Database::pdo();

        $stmt = $pdo->prepare("SELECT * FROM tower_leaderboard WHERE season = ? AND player_id = ? AND rewards_claimed = 0");
        $stmt->execute([$prevSeason, $id]);
        $reward = $stmt->fetch(\PDO::FETCH_ASSOC);
        if (!$reward) return jsonResponse($response, ['error' => 'Không có phần thưởng chưa nhận!'], 400);

        $rank = (int)$reward['rank_position'];
        $goldReward = 0;
        if ($rank === 1) $goldReward = 100000;
        elseif ($rank === 2) $goldReward = 60000;
        elseif ($rank === 3) $goldReward = 30000;
        elseif ($rank <= 10) $goldReward = 10000;
        elseif ($rank <= 20) $goldReward = 5000;
        elseif ($rank <= 50) $goldReward = 2000;

        $player->gold += $goldReward;
        $pdo->prepare("UPDATE tower_leaderboard SET rewards_claimed = 1 WHERE id = ?")->execute([$reward['id']]);
        savePlayer($id, $player);

        $rankNames = [1 => '🥇 Tháp Chủ', 2 => '🥈 Phó Chủ', 3 => '🥉 Hộ Pháp'];
        $rankTitle = $rankNames[$rank] ?? "Top {$rank}";

        return jsonResponse($response, [
            'message' => "🏆 Mùa {$prevSeason}: {$rankTitle}! +{$goldReward}💎",
            'rank' => $rank,
            'goldReward' => $goldReward,
            'player' => $player->toArray(),
        ]);
    });

    // === ADMIN: End Season (snapshot leaderboard) ===
    $app->post('/api/admin/tower/end-season', function (Request $request, Response $response) {
        $pdo = Database::pdo();
        $season = date('Y-m');

        // Snapshot top 50 into leaderboard
        $stmt = $pdo->prepare("SELECT player_id, player_name, highest_floor, total_kills FROM tower_runs WHERE season = ? AND highest_floor > 0 ORDER BY highest_floor DESC, total_kills DESC LIMIT 50");
        $stmt->execute([$season]);
        $rows = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        $insert = $pdo->prepare("INSERT INTO tower_leaderboard (season, player_id, player_name, highest_floor, total_kills, rank_position) VALUES (?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE highest_floor = VALUES(highest_floor), total_kills = VALUES(total_kills), rank_position = VALUES(rank_position)");

        foreach ($rows as $i => $row) {
            $insert->execute([$season, $row['player_id'], $row['player_name'], $row['highest_floor'], $row['total_kills'], $i + 1]);
        }

        return jsonResponse($response, ['message' => "Mùa {$season} kết thúc! {$i} players ranked.", 'count' => count($rows)]);
    });
};
