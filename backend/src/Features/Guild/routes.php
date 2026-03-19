<?php

/**
 * Guild Feature — Tông Môn (Faction System)
 *
 * - Create guild: 10,000 gold
 * - Daily upkeep from guild treasury (scales with level)
 * - Members contribute gold to treasury
 * - Upgrade guild → more members, buffs
 * - Guild buffs = passive bonuses for all members
 */

use Slim\Psr7\Request;
use Slim\Psr7\Response;
use App\Core\Database;

return function ($app) {

    // Guild level definitions
    $GUILD_LEVELS = [
        1 => ['name' => 'Sơ Lập', 'maxMembers' => 10,  'upkeep' => 100,   'upgradeCost' => 0,      'buffs' => []],
        2 => ['name' => 'Tiểu Phái','maxMembers' => 15, 'upkeep' => 250,   'upgradeCost' => 20000,  'buffs' => ['xpBonus' => 5]],
        3 => ['name' => 'Trung Phái','maxMembers' => 25, 'upkeep' => 500,   'upgradeCost' => 50000,  'buffs' => ['xpBonus' => 10, 'goldBonus' => 5]],
        4 => ['name' => 'Đại Phái', 'maxMembers' => 40, 'upkeep' => 1000,  'upgradeCost' => 120000, 'buffs' => ['xpBonus' => 15, 'goldBonus' => 10, 'statBonus' => 3]],
        5 => ['name' => 'Thánh Địa','maxMembers' => 60, 'upkeep' => 2000,  'upgradeCost' => 300000, 'buffs' => ['xpBonus' => 25, 'goldBonus' => 15, 'statBonus' => 5]],
    ];

    $CREATE_COST = 10000;

    // === GET MY GUILD ===
    $app->get('/api/player/{id}/guild', function (Request $request, Response $response, array $args) use ($GUILD_LEVELS) {
        $id = $args['id'];
        $pdo = Database::pdo();

        $stmt = $pdo->prepare("
            SELECT g.*, gm.role, gm.contributed
            FROM guild_members gm
            JOIN guilds g ON g.id = gm.guild_id
            WHERE gm.player_id = ?
        ");
        $stmt->execute([$id]);
        $row = $stmt->fetch(\PDO::FETCH_ASSOC);

        if (!$row) {
            return jsonResponse($response, ['inGuild' => false, 'createCost' => 10000, 'levels' => $GUILD_LEVELS]);
        }

        $guildId = (int)$row['id'];
        $level = (int)$row['level'];
        $levelInfo = $GUILD_LEVELS[$level] ?? $GUILD_LEVELS[1];

        // Members
        $mStmt = $pdo->prepare("
            SELECT gm.player_id, gm.role, gm.contributed, gm.joined_at, p.name
            FROM guild_members gm
            JOIN players p ON p.id = gm.player_id
            WHERE gm.guild_id = ? ORDER BY gm.role ASC, gm.contributed DESC
        ");
        $mStmt->execute([$guildId]);
        $members = $mStmt->fetchAll(\PDO::FETCH_ASSOC);

        // Recent log
        $lStmt = $pdo->prepare("SELECT * FROM guild_log WHERE guild_id = ? ORDER BY created_at DESC LIMIT 20");
        $lStmt->execute([$guildId]);
        $log = $lStmt->fetchAll(\PDO::FETCH_ASSOC);

        // Upkeep status
        $today = date('Y-m-d');
        $upkeepDue = ($row['last_upkeep_date'] ?? '') !== $today;

        return jsonResponse($response, [
            'inGuild' => true,
            'guild' => [
                'id' => $guildId,
                'name' => $row['name'],
                'tag' => $row['tag'],
                'description' => $row['description'],
                'level' => $level,
                'levelInfo' => $levelInfo,
                'treasury' => (int)$row['treasury'],
                'dailyUpkeep' => $levelInfo['upkeep'],
                'maxMembers' => $levelInfo['maxMembers'],
                'memberCount' => count($members),
                'buffs' => $levelInfo['buffs'],
                'upkeepDue' => $upkeepDue,
                'nextLevel' => isset($GUILD_LEVELS[$level + 1]) ? $GUILD_LEVELS[$level + 1] : null,
            ],
            'myRole' => $row['role'],
            'myContributed' => (int)$row['contributed'],
            'members' => $members,
            'log' => $log,
        ]);
    });

    // === CREATE GUILD ===
    $app->post('/api/player/{id}/guild/create', function (Request $request, Response $response, array $args) use ($CREATE_COST) {
        $id = $args['id'];
        $player = loadPlayer($id);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        $body = $request->getParsedBody();
        $name = trim($body['name'] ?? '');
        $tag = strtoupper(trim($body['tag'] ?? ''));
        $desc = trim($body['description'] ?? '');

        if (strlen($name) < 2 || strlen($name) > 30) return jsonResponse($response, ['error' => 'Tên 2-30 ký tự!'], 400);
        if (strlen($tag) < 2 || strlen($tag) > 5) return jsonResponse($response, ['error' => 'Tag 2-5 ký tự!'], 400);

        $pdo = Database::pdo();

        // Check already in guild
        $check = $pdo->prepare("SELECT id FROM guild_members WHERE player_id = ?");
        $check->execute([$id]);
        if ($check->fetch()) return jsonResponse($response, ['error' => 'Đã có Tông Môn!'], 400);

        // Check name unique
        $nameCheck = $pdo->prepare("SELECT id FROM guilds WHERE name = ?");
        $nameCheck->execute([$name]);
        if ($nameCheck->fetch()) return jsonResponse($response, ['error' => 'Tên đã tồn tại!'], 400);

        if ($player->gold < $CREATE_COST) {
            return jsonResponse($response, ['error' => "Cần {$CREATE_COST} 💎 để lập Tông Môn!"], 400);
        }

        $player->gold -= $CREATE_COST;
        savePlayer($id, $player);

        $pdo->prepare("INSERT INTO guilds (name, tag, description, leader_id, level, treasury, daily_upkeep) VALUES (?, ?, ?, ?, 1, 0, 100)")
            ->execute([$name, $tag, $desc, $id]);
        $guildId = $pdo->lastInsertId();

        $pdo->prepare("INSERT INTO guild_members (guild_id, player_id, role) VALUES (?, ?, 'leader')")
            ->execute([$guildId, $id]);

        $pdo->prepare("INSERT INTO guild_log (guild_id, player_id, action, detail) VALUES (?, ?, 'create', ?)")
            ->execute([$guildId, $id, "Lập Tông Môn [{$name}]"]);

        return jsonResponse($response, [
            'message' => "🏯 Đã lập Tông Môn [{$name}] [{$tag}]! (-{$CREATE_COST} 💎)",
            'player' => $player->toArray(),
        ]);
    });

    // === CONTRIBUTE GOLD ===
    $app->post('/api/player/{id}/guild/contribute', function (Request $request, Response $response, array $args) {
        $id = $args['id'];
        $player = loadPlayer($id);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        $body = $request->getParsedBody();
        $amount = max(1, (int)($body['amount'] ?? 0));

        if ($player->gold < $amount) return jsonResponse($response, ['error' => 'Không đủ Linh thạch!'], 400);

        $pdo = Database::pdo();
        $stmt = $pdo->prepare("SELECT guild_id FROM guild_members WHERE player_id = ?");
        $stmt->execute([$id]);
        $mem = $stmt->fetch(\PDO::FETCH_ASSOC);
        if (!$mem) return jsonResponse($response, ['error' => 'Chưa có Tông Môn!'], 400);

        $guildId = (int)$mem['guild_id'];
        $player->gold -= $amount;
        savePlayer($id, $player);

        $pdo->prepare("UPDATE guilds SET treasury = treasury + ? WHERE id = ?")->execute([$amount, $guildId]);
        $pdo->prepare("UPDATE guild_members SET contributed = contributed + ? WHERE player_id = ?")->execute([$amount, $id]);
        $pdo->prepare("INSERT INTO guild_log (guild_id, player_id, action, detail) VALUES (?, ?, 'contribute', ?)")
            ->execute([$guildId, $id, "Đóng góp {$amount} 💎"]);

        return jsonResponse($response, [
            'message' => "💰 Đã đóng góp {$amount} 💎 vào quỹ Tông Môn!",
            'player' => $player->toArray(),
        ]);
    });

    // === UPGRADE GUILD (leader only) ===
    $app->post('/api/player/{id}/guild/upgrade', function (Request $request, Response $response, array $args) use ($GUILD_LEVELS) {
        $id = $args['id'];
        $pdo = Database::pdo();

        $stmt = $pdo->prepare("SELECT g.* FROM guild_members gm JOIN guilds g ON g.id = gm.guild_id WHERE gm.player_id = ? AND gm.role = 'leader'");
        $stmt->execute([$id]);
        $guild = $stmt->fetch(\PDO::FETCH_ASSOC);
        if (!$guild) return jsonResponse($response, ['error' => 'Bạn không phải Chưởng Môn!'], 400);

        $level = (int)$guild['level'];
        $nextLevel = $level + 1;
        if (!isset($GUILD_LEVELS[$nextLevel])) return jsonResponse($response, ['error' => 'Đã đạt cấp tối đa!'], 400);

        $cost = $GUILD_LEVELS[$nextLevel]['upgradeCost'];
        if ((int)$guild['treasury'] < $cost) {
            return jsonResponse($response, ['error' => "Quỹ Tông Môn cần {$cost} 💎!"], 400);
        }

        $newUpkeep = $GUILD_LEVELS[$nextLevel]['upkeep'];
        $pdo->prepare("UPDATE guilds SET level = ?, treasury = treasury - ?, daily_upkeep = ?, max_members = ? WHERE id = ?")
            ->execute([$nextLevel, $cost, $newUpkeep, $GUILD_LEVELS[$nextLevel]['maxMembers'], $guild['id']]);

        $pdo->prepare("INSERT INTO guild_log (guild_id, player_id, action, detail) VALUES (?, ?, 'upgrade', ?)")
            ->execute([$guild['id'], $id, "Nâng cấp Lv{$nextLevel} [{$GUILD_LEVELS[$nextLevel]['name']}] (-{$cost} 💎)"]);

        return jsonResponse($response, [
            'message' => "🏯 Tông Môn nâng lên [{$GUILD_LEVELS[$nextLevel]['name']}]! Phí duy trì: {$newUpkeep}/ngày",
        ]);
    });

    // === JOIN GUILD ===
    $app->post('/api/player/{id}/guild/join', function (Request $request, Response $response, array $args) use ($GUILD_LEVELS) {
        $id = $args['id'];
        $body = $request->getParsedBody();
        $guildId = (int)($body['guildId'] ?? 0);

        $pdo = Database::pdo();

        // Check not already in guild
        $check = $pdo->prepare("SELECT id FROM guild_members WHERE player_id = ?");
        $check->execute([$id]);
        if ($check->fetch()) return jsonResponse($response, ['error' => 'Đã có Tông Môn!'], 400);

        $stmt = $pdo->prepare("SELECT * FROM guilds WHERE id = ?");
        $stmt->execute([$guildId]);
        $guild = $stmt->fetch(\PDO::FETCH_ASSOC);
        if (!$guild) return jsonResponse($response, ['error' => 'Tông Môn không tồn tại!'], 400);

        $level = (int)$guild['level'];
        $maxMembers = $GUILD_LEVELS[$level]['maxMembers'] ?? 10;
        $memberCount = $pdo->prepare("SELECT COUNT(*) FROM guild_members WHERE guild_id = ?");
        $memberCount->execute([$guildId]);
        if ((int)$memberCount->fetchColumn() >= $maxMembers) {
            return jsonResponse($response, ['error' => 'Tông Môn đã đầy!'], 400);
        }

        $pdo->prepare("INSERT INTO guild_members (guild_id, player_id, role) VALUES (?, ?, 'member')")
            ->execute([$guildId, $id]);

        $player = loadPlayer($id);
        $pdo->prepare("INSERT INTO guild_log (guild_id, player_id, action, detail) VALUES (?, ?, 'join', ?)")
            ->execute([$guildId, $id, ($player ? $player->name : $id) . " gia nhập"]);

        return jsonResponse($response, ['message' => "🏯 Đã gia nhập [{$guild['name']}]!"]);
    });

    // === LEAVE GUILD ===
    $app->post('/api/player/{id}/guild/leave', function (Request $request, Response $response, array $args) {
        $id = $args['id'];
        $pdo = Database::pdo();

        $stmt = $pdo->prepare("SELECT gm.*, g.name FROM guild_members gm JOIN guilds g ON g.id = gm.guild_id WHERE gm.player_id = ?");
        $stmt->execute([$id]);
        $mem = $stmt->fetch(\PDO::FETCH_ASSOC);
        if (!$mem) return jsonResponse($response, ['error' => 'Chưa có Tông Môn!'], 400);

        if ($mem['role'] === 'leader') return jsonResponse($response, ['error' => 'Chưởng Môn không thể rời! Hãy giải tán hoặc chuyển giao.'], 400);

        $pdo->prepare("DELETE FROM guild_members WHERE player_id = ?")->execute([$id]);
        $pdo->prepare("INSERT INTO guild_log (guild_id, player_id, action, detail) VALUES (?, ?, 'leave', 'Rời Tông Môn')")
            ->execute([$mem['guild_id'], $id]);

        return jsonResponse($response, ['message' => "Đã rời [{$mem['name']}]"]);
    });

    // === LIST ALL GUILDS ===
    $app->get('/api/guilds', function (Request $request, Response $response) {
        $pdo = Database::pdo();
        $stmt = $pdo->query("
            SELECT g.id, g.name, g.tag, g.level, g.treasury,
                   (SELECT COUNT(*) FROM guild_members gm WHERE gm.guild_id = g.id) as member_count,
                   g.max_members, p.name as leader_name
            FROM guilds g
            JOIN players p ON p.id = g.leader_id
            ORDER BY g.level DESC, g.treasury DESC
        ");
        return jsonResponse($response, ['guilds' => $stmt->fetchAll(\PDO::FETCH_ASSOC)]);
    });

    // === PAY GUILD UPKEEP (auto or manual) ===
    $app->post('/api/guild/{guildId}/upkeep', function (Request $request, Response $response, array $args) use ($GUILD_LEVELS) {
        $guildId = (int)$args['guildId'];
        $pdo = Database::pdo();

        $stmt = $pdo->prepare("SELECT * FROM guilds WHERE id = ?");
        $stmt->execute([$guildId]);
        $guild = $stmt->fetch(\PDO::FETCH_ASSOC);
        if (!$guild) return jsonResponse($response, ['error' => 'Tông Môn không tồn tại!'], 400);

        $today = date('Y-m-d');
        if (($guild['last_upkeep_date'] ?? '') === $today) {
            return jsonResponse($response, ['error' => 'Đã nộp phí hôm nay!'], 400);
        }

        $upkeep = (int)$guild['daily_upkeep'];
        if ((int)$guild['treasury'] < $upkeep) {
            // Not enough → downgrade level
            $level = (int)$guild['level'];
            if ($level > 1) {
                $newLevel = $level - 1;
                $newUpkeep = $GUILD_LEVELS[$newLevel]['upkeep'];
                $pdo->prepare("UPDATE guilds SET level = ?, daily_upkeep = ?, max_members = ?, last_upkeep_date = ? WHERE id = ?")
                    ->execute([$newLevel, $newUpkeep, $GUILD_LEVELS[$newLevel]['maxMembers'], $today, $guildId]);
                $pdo->prepare("INSERT INTO guild_log (guild_id, action, detail) VALUES (?, 'downgrade', ?)")
                    ->execute([$guildId, "Không đủ quỹ! Tụt xuống Lv{$newLevel}"]);
                return jsonResponse($response, ['message' => "⚠️ Quỹ không đủ! Tông Môn tụt xuống Lv{$newLevel}."]);
            }
            $pdo->prepare("UPDATE guilds SET last_upkeep_date = ? WHERE id = ?")->execute([$today, $guildId]);
            return jsonResponse($response, ['message' => '⚠️ Quỹ hết! Cần đóng góp gấp.']);
        }

        $pdo->prepare("UPDATE guilds SET treasury = treasury - ?, last_upkeep_date = ? WHERE id = ?")->execute([$upkeep, $today, $guildId]);
        $pdo->prepare("INSERT INTO guild_log (guild_id, action, detail) VALUES (?, 'upkeep', ?)")
            ->execute([$guildId, "Phí duy trì: -{$upkeep} 💎"]);

        return jsonResponse($response, ['message' => "💰 Phí duy trì Tông Môn: {$upkeep} 💎"]);
    });
};
