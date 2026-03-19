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

        $itemSystem = new ItemSystem();
        $item = $itemSystem->createItem($itemId);
        if (!$item) return jsonResponse($response, ['error' => 'Item not found'], 404);

        $player->equipItem($item);
        savePlayer($id, $player);

        return jsonResponse($response, [
            'message' => "Đã trang bị {$item->name}",
            'player' => $player->toArray(),
        ]);
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
        return jsonResponse($response, [
            'message' => "+{$medicine['healPercent']}% HP · Đan độc +{$medicine['cooldownAdd']}s",
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
