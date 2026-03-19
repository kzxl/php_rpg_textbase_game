<?php
/**
 * Time Events — Sự Kiện Thời Gian (XP boost, gold boost, special events)
 */
use Slim\Psr7\Request;
use Slim\Psr7\Response;
use App\Core\Database;

return function ($app) {

    // === GET ACTIVE EVENTS ===
    $app->get('/api/events/active', function (Request $request, Response $response) {
        $pdo = Database::pdo();
        $stmt = $pdo->query("
            SELECT * FROM game_events
            WHERE active = 1 AND start_time <= NOW() AND end_time >= NOW()
            ORDER BY start_time ASC
        ");
        $events = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        foreach ($events as &$e) {
            $e['rewards'] = json_decode($e['rewards'] ?? 'null', true);
            $e['timeLeft'] = max(0, strtotime($e['end_time']) - time());
        }

        return jsonResponse($response, ['events' => $events]);
    });

    // === GET ALL EVENTS (admin + history) ===
    $app->get('/api/events/all', function (Request $request, Response $response) {
        $pdo = Database::pdo();
        $stmt = $pdo->query("SELECT * FROM game_events ORDER BY start_time DESC LIMIT 50");
        return jsonResponse($response, ['events' => $stmt->fetchAll(\PDO::FETCH_ASSOC)]);
    });

    // === CREATE EVENT (admin) ===
    $app->post('/api/events/create', function (Request $request, Response $response) {
        $body = $request->getParsedBody();
        $pdo = Database::pdo();

        $eventId = $body['eventId'] ?? 'event_' . time();
        $name = $body['name'] ?? 'Sự Kiện';
        $desc = $body['description'] ?? '';
        $type = $body['eventType'] ?? 'xp_boost';
        $multiplier = (float)($body['multiplier'] ?? 2.0);
        $startTime = $body['startTime'] ?? date('Y-m-d H:i:s');
        $endTime = $body['endTime'] ?? date('Y-m-d H:i:s', time() + 3600);
        $rewards = json_encode($body['rewards'] ?? null, JSON_UNESCAPED_UNICODE);

        $pdo->prepare("
            INSERT INTO game_events (event_id, name, description, event_type, multiplier, start_time, end_time, rewards)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE name = VALUES(name), description = VALUES(description),
            event_type = VALUES(event_type), multiplier = VALUES(multiplier),
            start_time = VALUES(start_time), end_time = VALUES(end_time), rewards = VALUES(rewards), active = 1
        ")->execute([$eventId, $name, $desc, $type, $multiplier, $startTime, $endTime, $rewards]);

        return jsonResponse($response, ['message' => "📢 Sự kiện [{$name}] đã được tạo!"]);
    });

    // === QUICK EVENTS (predefined) ===
    $app->post('/api/events/quick/{type}', function (Request $request, Response $response, array $args) {
        $type = $args['type'];
        $pdo = Database::pdo();

        $presets = [
            'double_xp' => ['name' => '🔥 Double XP', 'type' => 'xp_boost', 'multiplier' => 2.0, 'hours' => 2],
            'double_gold' => ['name' => '💰 Double Gold', 'type' => 'gold_boost', 'multiplier' => 2.0, 'hours' => 2],
            'triple_drop' => ['name' => '🎁 Triple Drop', 'type' => 'drop_boost', 'multiplier' => 3.0, 'hours' => 1],
            'pvp_season' => ['name' => '⚔️ Mùa PvP', 'type' => 'pvp_season', 'multiplier' => 1.5, 'hours' => 24],
        ];

        if (!isset($presets[$type])) return jsonResponse($response, ['error' => 'Loại sự kiện không hợp lệ!'], 400);

        $preset = $presets[$type];
        $eventId = $type . '_' . date('YmdHi');
        $start = date('Y-m-d H:i:s');
        $end = date('Y-m-d H:i:s', time() + $preset['hours'] * 3600);

        $pdo->prepare("INSERT INTO game_events (event_id, name, event_type, multiplier, start_time, end_time) VALUES (?, ?, ?, ?, ?, ?)")
            ->execute([$eventId, $preset['name'], $preset['type'], $preset['multiplier'], $start, $end]);

        return jsonResponse($response, ['message' => "📢 {$preset['name']} bắt đầu! Kéo dài {$preset['hours']}h"]);
    });
};
