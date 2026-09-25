<?php

/**
 * Glitch Feature — Hệ Thống Khai Thác Lỗi Thiên Đạo
 * Endpoints:
 *   GET  /api/player/{id}/glitches
 *   POST /api/player/{id}/stance
 *   POST /api/player/{id}/glitch/override-tribulation
 */

use Slim\Psr7\Request;
use Slim\Psr7\Response;
use App\Systems\GlitchSystem;

return function ($app) {
    // 1. Lấy thông tin tổng quan về Lỗi Thiên Đạo & Dấu Ấn Hành Vi
    $app->get('/api/player/{id}/glitches', function (Request $request, Response $response, array $args) {
        $id = $args['id'];
        $player = loadPlayer($id);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        $status = GlitchSystem::getPlayerGlitchStatus($player);
        return jsonResponse($response, [
            'status' => $status,
            'player' => $player->toArray(),
        ]);
    });

    // 2. Chuyển đổi Thế Chiến Đấu (Stance)
    $app->post('/api/player/{id}/stance', function (Request $request, Response $response, array $args) {
        $id = $args['id'];
        $player = loadPlayer($id);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        $body = $request->getParsedBody();
        $stance = $body['stance'] ?? 'breaker';

        if (!isset(GlitchSystem::STANCES[$stance])) {
            return jsonResponse($response, ['error' => 'Thế chiến đấu không hợp lệ!'], 400);
        }

        $player->activeStance = $stance;
        savePlayer($id, $player);

        $stanceInfo = GlitchSystem::STANCES[$stance];
        return jsonResponse($response, [
            'message' => "Đã chuyển sang [{$stanceInfo['name']}]! {$stanceInfo['description']}",
            'activeStance' => $stance,
            'player' => $player->toArray(),
        ]);
    });

    // 3. Thi triển "Lách Luật Thiên Đạo" (Glitch Override)
    $app->post('/api/player/{id}/glitch/override-tribulation', function (Request $request, Response $response, array $args) {
        $id = $args['id'];
        $player = loadPlayer($id);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        $cost = 50;
        if (($player->glitchInsight ?? 0) < $cost) {
            return jsonResponse($response, ['error' => "Không đủ Điểm Thấu Triệt Thiên Đạo! Cần tối thiểu {$cost} điểm."], 400);
        }

        $player->glitchInsight -= $cost;
        // Tẩy trừ trạng thái trọng thương nếu đang trong viện
        if ($player->isHospitalized()) {
            $player->hospitalUntil = 0;
            $player->currentHp = (int)round($player->maxHp * 0.5);
            $msg = "Đồng hóa quy luật thành công! Thiên Đạo xóa bỏ ghi chép tử thương, bạn thoát khỏi viện tịnh dưỡng và hồi 50% Khí Huyết.";
        } else {
            // Hồi phục toàn bộ Linh Lực
            $player->currentEnergy = $player->maxEnergy;
            $msg = "Quy luật đảo chiều! Toàn bộ kinh mạch được nạp đầy Linh Lực tức thì.";
        }

        savePlayer($id, $player);
        return jsonResponse($response, [
            'message' => $msg,
            'glitchInsight' => $player->glitchInsight,
            'player' => $player->toArray(),
        ]);
    });
};
