<?php

/**
 * Social Feature — Giao Tế (Đạo Hữu & Kẻ Thù)
 * Friend requests, friendships, enemies system.
 */

use Slim\Psr7\Request;
use Slim\Psr7\Response;
use App\Core\Database;

return function ($app) {

    // === SEARCH PLAYERS ===
    $app->get('/api/players/search', function (Request $request, Response $response) {
        $q = trim($request->getQueryParams()['q'] ?? '');
        if (strlen($q) < 2) {
            return jsonResponse($response, ['error' => 'Cần ít nhất 2 ký tự để tìm kiếm'], 400);
        }

        $pdo = Database::pdo();
        $stmt = $pdo->prepare("SELECT id, name, gender, level, current_area FROM players WHERE name LIKE :q OR username LIKE :q LIMIT 20");
        $stmt->execute(['q' => "%{$q}%"]);
        $results = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        // Add realm info
        foreach ($results as &$r) {
            $lvl = (int)$r['level'];
            if ($lvl >= 15) $r['realm'] = 'Nguyên Anh';
            elseif ($lvl >= 10) $r['realm'] = 'Kim Đan';
            elseif ($lvl >= 5) $r['realm'] = 'Trúc Cơ';
            else $r['realm'] = 'Luyện Khí';
        }

        return jsonResponse($response, ['players' => $results]);
    });

    // === GET RELATIONSHIPS ===
    $app->get('/api/player/{id}/relationships', function (Request $request, Response $response, array $args) {
        $id = $args['id'];
        $pdo = Database::pdo();

        // My outgoing relations
        $stmt = $pdo->prepare("
            SELECT r.target_id, r.type, r.created_at,
                   p.name, p.gender, p.level, p.current_area
            FROM player_relationships r
            JOIN players p ON p.id = r.target_id
            WHERE r.player_id = :id
        ");
        $stmt->execute(['id' => $id]);
        $outgoing = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        // Incoming friend requests (others → me)
        $stmt2 = $pdo->prepare("
            SELECT r.player_id AS sender_id, r.type, r.created_at,
                   p.name, p.gender, p.level, p.current_area
            FROM player_relationships r
            JOIN players p ON p.id = r.player_id
            WHERE r.target_id = :id AND r.type = 'friend_pending'
        ");
        $stmt2->execute(['id' => $id]);
        $incoming = $stmt2->fetchAll(\PDO::FETCH_ASSOC);

        // Categorize
        $friends = [];
        $enemies = [];
        $pendingSent = [];

        foreach ($outgoing as $rel) {
            $entry = [
                'id' => $rel['target_id'],
                'name' => $rel['name'],
                'gender' => $rel['gender'],
                'level' => (int)$rel['level'],
                'currentArea' => $rel['current_area'],
                'since' => $rel['created_at'],
            ];
            $lvl = $entry['level'];
            $entry['realm'] = $lvl >= 15 ? 'Nguyên Anh' : ($lvl >= 10 ? 'Kim Đan' : ($lvl >= 5 ? 'Trúc Cơ' : 'Luyện Khí'));

            if ($rel['type'] === 'friend') $friends[] = $entry;
            elseif ($rel['type'] === 'enemy') $enemies[] = $entry;
            elseif ($rel['type'] === 'friend_pending') $pendingSent[] = $entry;
        }

        $pendingReceived = [];
        foreach ($incoming as $rel) {
            $entry = [
                'id' => $rel['sender_id'],
                'name' => $rel['name'],
                'gender' => $rel['gender'],
                'level' => (int)$rel['level'],
                'currentArea' => $rel['current_area'],
                'since' => $rel['created_at'],
            ];
            $lvl = $entry['level'];
            $entry['realm'] = $lvl >= 15 ? 'Nguyên Anh' : ($lvl >= 10 ? 'Kim Đan' : ($lvl >= 5 ? 'Trúc Cơ' : 'Luyện Khí'));
            $pendingReceived[] = $entry;
        }

        return jsonResponse($response, [
            'friends' => $friends,
            'enemies' => $enemies,
            'pendingSent' => $pendingSent,
            'pendingReceived' => $pendingReceived,
        ]);
    });

    // === ADD FRIEND (send request) ===
    $app->post('/api/player/{id}/add-friend', function (Request $request, Response $response, array $args) {
        $id = $args['id'];
        $body = $request->getParsedBody();
        $targetId = $body['targetId'] ?? '';

        if (!$targetId || $targetId === $id) {
            return jsonResponse($response, ['error' => 'ID không hợp lệ'], 400);
        }

        $pdo = Database::pdo();

        // Check target exists
        $check = $pdo->prepare("SELECT id, name FROM players WHERE id = ?");
        $check->execute([$targetId]);
        $target = $check->fetch();
        if (!$target) return jsonResponse($response, ['error' => 'Người chơi không tồn tại'], 404);

        // Check existing relation
        $existing = $pdo->prepare("SELECT type FROM player_relationships WHERE player_id = ? AND target_id = ?");
        $existing->execute([$id, $targetId]);
        $rel = $existing->fetch();

        if ($rel) {
            if ($rel['type'] === 'friend') return jsonResponse($response, ['error' => 'Đã là Đạo Hữu!'], 400);
            if ($rel['type'] === 'friend_pending') return jsonResponse($response, ['error' => 'Đã gửi lời mời!'], 400);
            // If enemy, remove enemy and create friend request
            $pdo->prepare("DELETE FROM player_relationships WHERE player_id = ? AND target_id = ?")->execute([$id, $targetId]);
        }

        // Check if target already sent us a request → auto-accept
        $reverseCheck = $pdo->prepare("SELECT type FROM player_relationships WHERE player_id = ? AND target_id = ?");
        $reverseCheck->execute([$targetId, $id]);
        $reverseRel = $reverseCheck->fetch();

        if ($reverseRel && $reverseRel['type'] === 'friend_pending') {
            // Auto-accept: both become friends
            $pdo->prepare("UPDATE player_relationships SET type = 'friend' WHERE player_id = ? AND target_id = ?")->execute([$targetId, $id]);
            $pdo->prepare("INSERT INTO player_relationships (player_id, target_id, type) VALUES (?, ?, 'friend')")->execute([$id, $targetId]);
            return jsonResponse($response, [
                'success' => true,
                'message' => "🤝 Kết giao thành công với {$target['name']}!",
                'autoAccepted' => true,
            ]);
        }

        // Create pending request
        $pdo->prepare("INSERT INTO player_relationships (player_id, target_id, type) VALUES (?, ?, 'friend_pending')")->execute([$id, $targetId]);

        return jsonResponse($response, [
            'success' => true,
            'message' => "📨 Đã gửi lời kết giao đến {$target['name']}!",
        ]);
    });

    // === ACCEPT FRIEND ===
    $app->post('/api/player/{id}/accept-friend', function (Request $request, Response $response, array $args) {
        $id = $args['id'];
        $body = $request->getParsedBody();
        $targetId = $body['targetId'] ?? '';

        $pdo = Database::pdo();

        // Check pending request from target → me
        $check = $pdo->prepare("SELECT id FROM player_relationships WHERE player_id = ? AND target_id = ? AND type = 'friend_pending'");
        $check->execute([$targetId, $id]);
        if (!$check->fetch()) {
            return jsonResponse($response, ['error' => 'Không có lời mời từ người này'], 400);
        }

        // Update target's row to friend
        $pdo->prepare("UPDATE player_relationships SET type = 'friend' WHERE player_id = ? AND target_id = ?")->execute([$targetId, $id]);
        // Insert my row as friend
        $pdo->prepare("INSERT INTO player_relationships (player_id, target_id, type) VALUES (?, ?, 'friend') ON DUPLICATE KEY UPDATE type = 'friend'")->execute([$id, $targetId]);

        $name = $pdo->prepare("SELECT name FROM players WHERE id = ?");
        $name->execute([$targetId]);
        $targetName = $name->fetchColumn() ?: 'Đạo Hữu';

        return jsonResponse($response, [
            'success' => true,
            'message' => "🤝 Đã kết giao với {$targetName}!",
        ]);
    });

    // === REJECT FRIEND ===
    $app->post('/api/player/{id}/reject-friend', function (Request $request, Response $response, array $args) {
        $id = $args['id'];
        $body = $request->getParsedBody();
        $targetId = $body['targetId'] ?? '';

        $pdo = Database::pdo();
        $pdo->prepare("DELETE FROM player_relationships WHERE player_id = ? AND target_id = ? AND type = 'friend_pending'")->execute([$targetId, $id]);

        return jsonResponse($response, ['success' => true, 'message' => '❌ Đã từ chối lời kết giao.']);
    });

    // === REMOVE FRIEND ===
    $app->post('/api/player/{id}/remove-friend', function (Request $request, Response $response, array $args) {
        $id = $args['id'];
        $body = $request->getParsedBody();
        $targetId = $body['targetId'] ?? '';

        $pdo = Database::pdo();
        // Remove both directions
        $pdo->prepare("DELETE FROM player_relationships WHERE player_id = ? AND target_id = ? AND type = 'friend'")->execute([$id, $targetId]);
        $pdo->prepare("DELETE FROM player_relationships WHERE player_id = ? AND target_id = ? AND type = 'friend'")->execute([$targetId, $id]);

        return jsonResponse($response, ['success' => true, 'message' => '💔 Đã hủy kết giao.']);
    });

    // === ADD ENEMY ===
    $app->post('/api/player/{id}/add-enemy', function (Request $request, Response $response, array $args) {
        $id = $args['id'];
        $body = $request->getParsedBody();
        $targetId = $body['targetId'] ?? '';

        if (!$targetId || $targetId === $id) {
            return jsonResponse($response, ['error' => 'ID không hợp lệ'], 400);
        }

        $pdo = Database::pdo();

        // Check target exists
        $check = $pdo->prepare("SELECT name FROM players WHERE id = ?");
        $check->execute([$targetId]);
        $targetName = $check->fetchColumn();
        if (!$targetName) return jsonResponse($response, ['error' => 'Người chơi không tồn tại'], 404);

        // Upsert as enemy (one-directional)
        $pdo->prepare("INSERT INTO player_relationships (player_id, target_id, type) VALUES (?, ?, 'enemy') ON DUPLICATE KEY UPDATE type = 'enemy'")->execute([$id, $targetId]);

        return jsonResponse($response, [
            'success' => true,
            'message' => "⚔️ Đã đánh dấu {$targetName} là kẻ thù!",
        ]);
    });

    // === REMOVE ENEMY ===
    $app->post('/api/player/{id}/remove-enemy', function (Request $request, Response $response, array $args) {
        $id = $args['id'];
        $body = $request->getParsedBody();
        $targetId = $body['targetId'] ?? '';

        $pdo = Database::pdo();
        $pdo->prepare("DELETE FROM player_relationships WHERE player_id = ? AND target_id = ? AND type = 'enemy'")->execute([$id, $targetId]);

        return jsonResponse($response, ['success' => true, 'message' => '🕊️ Đã xóa khỏi danh sách kẻ thù.']);
    });

    // === TƯƠNG TÁC NGƯỜI CHƠI (INTERACT) ===
    $app->post('/api/player/{id}/interact', function (Request $request, Response $response, array $args) {
        $id = $args['id'];
        $player = loadPlayer($id);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        $body = $request->getParsedBody();
        $targetId = $body['targetId'] ?? '';
        $action = $body['action'] ?? ''; // 'gift'

        if (!$targetId || !$action) {
            return jsonResponse($response, ['error' => 'Thiếu thông tin tương tác.'], 400);
        }

        $target = loadPlayer($targetId);
        if (!$target) return jsonResponse($response, ['error' => 'Không tìm thấy Đạo hữu này.'], 404);

        if ($action === 'gift') {
            $amount = (int)($body['amount'] ?? 100);
            if ($amount <= 0) return jsonResponse($response, ['error' => 'Số lượng quá ít.'], 400);
            if ($player->gold < $amount) return jsonResponse($response, ['error' => 'Không đủ Linh Thạch.'], 400);

            $player->gold -= $amount;
            $target->gold += $amount;

            // Ghi nhận sự kiện cho người nhận
            \App\Core\GameDataRepository::addEvent(
                $targetId, 
                'money', 
                "Hỷ sự! Đạo hữu {$player->name} đã hào phóng tặng bạn {$amount} Linh Thạch!"
            );

            savePlayer($id, $player);
            savePlayer($targetId, $target);

            return jsonResponse($response, [
                'message' => "Bạn đã đưa {$amount} Linh Thạch cho {$target->name}.",
                'player' => $player->toArray()
            ]);
        }

        return jsonResponse($response, ['error' => 'Hành động không hợp lệ.'], 400);
    });

};
