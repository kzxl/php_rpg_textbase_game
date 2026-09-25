<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Core\ResponseHelper;
use App\Services\PlayerService;
use App\Systems\GlitchSystem;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

/**
 * Controller handling Heavenly Glitches, Behavior Imprints, and Stances.
 */
class GlitchController
{
    public function __construct(
        private readonly PlayerService $playerService
    ) {}

    public function getStatus(Request $request, Response $response, array $args): Response
    {
        $id = $args['id'];
        $player = $this->playerService->load($id);
        if (!$player) {
            return ResponseHelper::json($response, ['error' => 'Player not found'], 404);
        }

        $status = GlitchSystem::getPlayerGlitchStatus($player);
        return ResponseHelper::json($response, [
            'status' => $status,
            'player' => $player->toArray(),
        ]);
    }

    public function setStance(Request $request, Response $response, array $args): Response
    {
        $id = $args['id'];
        $player = $this->playerService->load($id);
        if (!$player) {
            return ResponseHelper::json($response, ['error' => 'Player not found'], 404);
        }

        $body = (array)$request->getParsedBody();
        $stance = $body['stance'] ?? 'breaker';

        if (!isset(GlitchSystem::STANCES[$stance])) {
            return ResponseHelper::json($response, ['error' => 'Thế chiến đấu không hợp lệ!'], 400);
        }

        $player->activeStance = $stance;
        $this->playerService->save($id, $player);

        $stanceInfo = GlitchSystem::STANCES[$stance];
        return ResponseHelper::json($response, [
            'message' => "Đã chuyển sang [{$stanceInfo['name']}]! {$stanceInfo['description']}",
            'activeStance' => $stance,
            'player' => $player->toArray(),
        ]);
    }

    public function overrideTribulation(Request $request, Response $response, array $args): Response
    {
        $id = $args['id'];
        $player = $this->playerService->load($id);
        if (!$player) {
            return ResponseHelper::json($response, ['error' => 'Player not found'], 404);
        }

        $cost = 50;
        if (($player->glitchInsight ?? 0) < $cost) {
            return ResponseHelper::json($response, ['error' => "Không đủ Điểm Thấu Triệt Thiên Đạo! Cần tối thiểu {$cost} điểm."], 400);
        }

        $player->glitchInsight -= $cost;
        if ($player->isHospitalized()) {
            $player->hospitalUntil = 0;
            $player->currentHp = (int)round($player->maxHp * 0.5);
            $msg = "Đồng hóa quy luật thành công! Thiên Đạo xóa bỏ ghi chép tử thương, bạn thoát khỏi viện tịnh dưỡng và hồi 50% Khí Huyết.";
        } else {
            $player->currentEnergy = $player->maxEnergy;
            $msg = "Quy luật đảo chiều! Toàn bộ kinh mạch được nạp đầy Linh Lực tức thì.";
        }

        $this->playerService->save($id, $player);
        return ResponseHelper::json($response, [
            'message' => $msg,
            'glitchInsight' => $player->glitchInsight,
            'player' => $player->toArray(),
        ]);
    }
}
