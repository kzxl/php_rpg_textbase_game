<?php

/**
 * Event Logs Feature
 * Allows players to view their notifications and historical events.
 */

use Slim\Psr7\Request;
use Slim\Psr7\Response;
use App\Core\GameDataRepository;

return function ($app) {
    // Lấy danh sách sự kiện và đánh dấu đã đọc
    $app->get('/api/player/{id}/events', function (Request $request, Response $response, array $args) {
        $id = $args['id'];
        $player = loadPlayer($id);
        
        if (!$player) {
            return jsonResponse($response, ['error' => 'Player not found'], 404);
        }

        $events = GameDataRepository::getEvents($id, 50);
        GameDataRepository::markEventsAsRead($id); // Đánh dấu đã đọc khi vừa mở

        return jsonResponse($response, [
            'events' => $events,
            // Cập nhật lại unread = 0 ngay sau khi lấy
            'unreadEventsCount' => 0
        ]);
    });
};
