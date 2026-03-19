<?php

/**
 * Chat Feature — Giang Hồ Truyền Âm
 * Global chat + Private messages (friends only).
 * Polling-based, messages auto-expire after 24h.
 */

use Slim\Psr7\Request;
use Slim\Psr7\Response;
use App\Core\Database;

return function ($app) {

    // === GET GLOBAL MESSAGES ===
    $app->get('/api/chat/global', function (Request $request, Response $response) {
        $params = $request->getQueryParams();
        $afterId = (int)($params['afterId'] ?? 0);
        $pdo = Database::pdo();

        // Only messages from last 24h
        $cutoff = date('Y-m-d H:i:s', time() - 86400);

        if ($afterId > 0) {
            $stmt = $pdo->prepare("
                SELECT id, sender_id, sender_name, message, created_at
                FROM chat_messages
                WHERE channel = 'global' AND id > :afterId AND created_at > :cutoff
                ORDER BY id ASC LIMIT 50
            ");
            $stmt->execute(['afterId' => $afterId, 'cutoff' => $cutoff]);
        } else {
            $stmt = $pdo->prepare("
                SELECT id, sender_id, sender_name, message, created_at
                FROM chat_messages
                WHERE channel = 'global' AND created_at > :cutoff
                ORDER BY id DESC LIMIT 50
            ");
            $stmt->execute(['cutoff' => $cutoff]);
        }

        $messages = $stmt->fetchAll(\PDO::FETCH_ASSOC);
        if ($afterId === 0) $messages = array_reverse($messages);

        return jsonResponse($response, ['messages' => $messages]);
    });

    // === GET PRIVATE MESSAGES ===
    $app->get('/api/chat/private/{id}', function (Request $request, Response $response, array $args) {
        $id = $args['id'];
        $params = $request->getQueryParams();
        $withId = $params['with'] ?? '';
        $afterId = (int)($params['afterId'] ?? 0);

        if (!$withId) return jsonResponse($response, ['error' => 'Thiếu ID đối phương'], 400);

        $pdo = Database::pdo();

        // Check friendship
        $friendCheck = $pdo->prepare("SELECT id FROM player_relationships WHERE player_id = ? AND target_id = ? AND type = 'friend'");
        $friendCheck->execute([$id, $withId]);
        if (!$friendCheck->fetch()) {
            return jsonResponse($response, ['error' => 'Chỉ có thể nhắn tin với Đạo Hữu!'], 403);
        }

        $cutoff = date('Y-m-d H:i:s', time() - 86400);

        if ($afterId > 0) {
            $stmt = $pdo->prepare("
                SELECT id, sender_id, sender_name, message, created_at
                FROM chat_messages
                WHERE channel = 'private' AND id > :afterId AND created_at > :cutoff
                  AND ((sender_id = :me AND receiver_id = :them) OR (sender_id = :them2 AND receiver_id = :me2))
                ORDER BY id ASC LIMIT 50
            ");
            $stmt->execute(['afterId' => $afterId, 'cutoff' => $cutoff, 'me' => $id, 'them' => $withId, 'them2' => $withId, 'me2' => $id]);
        } else {
            $stmt = $pdo->prepare("
                SELECT id, sender_id, sender_name, message, created_at
                FROM chat_messages
                WHERE channel = 'private' AND created_at > :cutoff
                  AND ((sender_id = :me AND receiver_id = :them) OR (sender_id = :them2 AND receiver_id = :me2))
                ORDER BY id DESC LIMIT 50
            ");
            $stmt->execute(['cutoff' => $cutoff, 'me' => $id, 'them' => $withId, 'them2' => $withId, 'me2' => $id]);
        }

        $messages = $stmt->fetchAll(\PDO::FETCH_ASSOC);
        if ($afterId === 0) $messages = array_reverse($messages);

        return jsonResponse($response, ['messages' => $messages]);
    });

    // === SEND MESSAGE ===
    $app->post('/api/chat/send', function (Request $request, Response $response) {
        $body = $request->getParsedBody();
        $senderId = $body['senderId'] ?? '';
        $channel = $body['channel'] ?? 'global';
        $receiverId = $body['receiverId'] ?? null;
        $message = trim($body['message'] ?? '');

        if (!$senderId) return jsonResponse($response, ['error' => 'Thiếu senderId'], 400);
        if (strlen($message) === 0) return jsonResponse($response, ['error' => 'Tin nhắn trống'], 400);
        if (strlen($message) > 500) return jsonResponse($response, ['error' => 'Tối đa 500 ký tự'], 400);

        $pdo = Database::pdo();

        // Get sender name
        $senderStmt = $pdo->prepare("SELECT name, level FROM players WHERE id = ?");
        $senderStmt->execute([$senderId]);
        $sender = $senderStmt->fetch();
        if (!$sender) return jsonResponse($response, ['error' => 'Người gửi không tồn tại'], 404);

        // Rate limit: 1 message per 3 seconds
        $rateStmt = $pdo->prepare("
            SELECT id FROM chat_messages
            WHERE sender_id = ? AND created_at > DATE_SUB(NOW(), INTERVAL 3 SECOND)
            LIMIT 1
        ");
        $rateStmt->execute([$senderId]);
        if ($rateStmt->fetch()) {
            return jsonResponse($response, ['error' => 'Nói chậm thôi! Chờ 3 giây.'], 429);
        }

        // Private: check friendship
        if ($channel === 'private') {
            if (!$receiverId) return jsonResponse($response, ['error' => 'Thiếu ID người nhận'], 400);
            $friendCheck = $pdo->prepare("SELECT id FROM player_relationships WHERE player_id = ? AND target_id = ? AND type = 'friend'");
            $friendCheck->execute([$senderId, $receiverId]);
            if (!$friendCheck->fetch()) {
                return jsonResponse($response, ['error' => 'Chỉ có thể nhắn tin với Đạo Hữu!'], 403);
            }
        }

        $stmt = $pdo->prepare("
            INSERT INTO chat_messages (sender_id, sender_name, channel, receiver_id, message)
            VALUES (?, ?, ?, ?, ?)
        ");
        $stmt->execute([$senderId, $sender['name'], $channel, $receiverId, $message]);

        return jsonResponse($response, [
            'success' => true,
            'messageId' => (int)$pdo->lastInsertId(),
        ]);
    });

    // === GET FRIEND LIST FOR CHAT ===
    $app->get('/api/chat/friends/{id}', function (Request $request, Response $response, array $args) {
        $id = $args['id'];
        $pdo = Database::pdo();

        $stmt = $pdo->prepare("
            SELECT r.target_id AS id, p.name, p.level
            FROM player_relationships r
            JOIN players p ON p.id = r.target_id
            WHERE r.player_id = ? AND r.type = 'friend'
            ORDER BY p.name
        ");
        $stmt->execute([$id]);
        return jsonResponse($response, ['friends' => $stmt->fetchAll(\PDO::FETCH_ASSOC)]);
    });
};
