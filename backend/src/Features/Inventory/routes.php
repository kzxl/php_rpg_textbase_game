<?php

/**
 * Inventory Feature — Pháp Bảo (equip, medicine, items).
 */

use Slim\Psr7\Request;
use Slim\Psr7\Response;
use App\Systems\ItemSystem;

return function ($app) {
    $app->post('/api/player/{id}/equip', function (Request $request, Response $response, array $args) {
        $id = $args['id'];
        $player = loadPlayer($id);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        $body = $request->getParsedBody();
        $itemId = $body['itemId'] ?? '';

        $item = null;
        foreach ($player->inventory as $inv) {
            if ($inv->id === $itemId) {
                $item = $inv;
                break;
            }
        }
        if (!$item) return jsonResponse($response, ['error' => 'Không tìm thấy trang bị trong túi'], 404);

        try {
            $player->equipItem($item);
            savePlayer($id, $player);
        } catch (\Exception $e) {
            return jsonResponse($response, ['error' => $e->getMessage()], 400);
        }

        return jsonResponse($response, [
            'message' => "Đã trang bị {$item->name}",
            'player' => $player->toArray(),
        ]);
    });

    // === USE ITEM (MANUALS, CONSUMABLES) ===
    $app->post('/api/player/{id}/use', function (Request $request, Response $response, array $args) {
        $id = $args['id'];
        $player = loadPlayer($id);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        $body = $request->getParsedBody();
        $itemId = $body['itemId'] ?? '';

        $invIndex = -1;
        foreach ($player->inventory as $i => $inv) {
            if ($inv->id === $itemId) { $invIndex = $i; break; }
        }
        if ($invIndex === -1) return jsonResponse($response, ['error' => 'Không tìm thấy vật phẩm'], 404);

        $itemObj = $player->inventory[$invIndex];
        $arr = $itemObj->toArray();
        $affixes = $arr['affixes'] ?? [];

        $nodeId = null;
        foreach ($affixes as $aff) {
            if (isset($aff['unlockNodeId'])) {
                $nodeId = $aff['unlockNodeId'];
                break;
            }
        }

        // Check if manual
        if ($nodeId) {
            if (in_array($nodeId, $player->discoveredNodes)) {
                return jsonResponse($response, ['error' => 'Đã thấu hiểu phương pháp tu luyện này rồi!']);
            }

            $player->discoveredNodes[] = $nodeId;
            
            // Consume the item
            array_splice($player->inventory, $invIndex, 1);

            \App\Core\GameDataRepository::addEvent($id, 'education', "Cơ duyên xảo hợp, lĩnh ngộ thành công bí pháp ẩn chứa trong {$itemObj->name}!");
            savePlayer($id, $player);

            return jsonResponse($response, [
                'success' => true,
                'message' => "Lĩnh ngộ thành công {$itemObj->name}!",
                'player' => $player->toArray(),
            ]);
        }
        
        return jsonResponse($response, ['error' => 'Vật phẩm này không thể sử dụng trực tiếp.'], 400);
    });

    // Torn-style stacking cooldown medicine
    $app->post('/api/player/{id}/use-medicine', function (Request $request, Response $response, array $args) {
        $id = $args['id'];
        $player = loadPlayer($id);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        $body = $request->getParsedBody();
        $medId = $body['medicineId'] ?? '';

        $medsFile = __DIR__ . '/../../../data/medicines.json';
        $medicines = json_decode(file_get_contents($medsFile), true);
        $medicine = null;
        foreach ($medicines as $m) {
            if ($m['id'] === $medId) { $medicine = $m; break; }
        }
        if (!$medicine) return jsonResponse($response, ['error' => 'Đan dược không tồn tại'], 404);

        $error = $player->useMedicine($medicine);
        if ($error) return jsonResponse($response, ['error' => $error], 400);

        savePlayer($id, $player);

        $msgParts = [];
        if (isset($medicine['healPercent'])) $msgParts[] = "+{$medicine['healPercent']}% HP";
        if (isset($medicine['cooldownAdd'])) $msgParts[] = "Đan độc +{$medicine['cooldownAdd']}s";
        $msg = empty($msgParts) ? "Đã dùng {$medicine['name']}" : implode(' · ', $msgParts);

        return jsonResponse($response, [
            'message' => $msg,
            'player' => $player->toArray(),
        ]);
    });

    $app->post('/api/items/generate', function (Request $request, Response $response) {
        $body = $request->getParsedBody();
        $rarity = $body['rarity'] ?? 'common';
        $slot = $body['slot'] ?? null;
        $item = (new ItemSystem())->generateRandomItem($rarity, $slot);
        return jsonResponse($response, ['item' => $item->toArray()]);
    });

    $app->get('/api/data/items', function (Request $request, Response $response) {
        return jsonResponse($response, ['items' => (new ItemSystem())->getAll()]);
    });

    $app->get('/api/data/medicines', function (Request $request, Response $response) {
        $file = __DIR__ . '/../../../data/medicines.json';
        $medicines = json_decode(file_get_contents($file), true);
        return jsonResponse($response, ['medicines' => $medicines]);
    });
};
