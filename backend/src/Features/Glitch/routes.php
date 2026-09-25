<?php

declare(strict_types=1);

/**
 * Glitch Feature — Hệ Thống Khai Thác Lỗi Thiên Đạo
 * Clean LitePlatform routing delegating to GlitchController.
 */

use App\Controllers\GlitchController;
use Slim\App;

return function (App $app) {
    // 1. Lấy thông tin tổng quan về Lỗi Thiên Đạo & Dấu Ấn Hành Vi
    $app->get('/api/player/{id}/glitches', [GlitchController::class, 'getStatus']);

    // 2. Chuyển đổi Thế Chiến Đấu (Stance)
    $app->post('/api/player/{id}/stance', [GlitchController::class, 'setStance']);

    // 3. Thi triển "Lách Luật Thiên Đạo" (Glitch Override)
    $app->post('/api/player/{id}/glitch/override-tribulation', [GlitchController::class, 'overrideTribulation']);
};
