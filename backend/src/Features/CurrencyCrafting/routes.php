<?php

/**
 * Currency Crafting Feature — Tiền Tệ Chế Tác (Equipment Modification)
 *
 * PoE-inspired currency system for rerolling equipment affixes.
 * All cost gold = major gold sink.
 */

use Slim\Psr7\Request;
use Slim\Psr7\Response;
use App\Systems\ItemSystem;

return function ($app) {

    $CURRENCIES = [
        'tay_tuy_phu' => [
            'name' => 'Tẩy Tủy Phù', 'description' => 'Xóa toàn bộ affix và roll lại ngẫu nhiên.',
            'goldCost' => 200, 'icon' => '🔄', 'action' => 'reroll',
        ],
        'hon_chu_phu' => [
            'name' => 'Hỗn Chú Phù', 'description' => 'Thêm 1 affix ngẫu nhiên (tối đa 4).',
            'goldCost' => 500, 'icon' => '➕', 'action' => 'add_affix',
        ],
        'thien_menh_phu' => [
            'name' => 'Thiên Mệnh Phù', 'description' => 'Khóa 1 affix, xóa và roll lại phần còn lại.',
            'goldCost' => 1000, 'icon' => '🔒', 'action' => 'lock_reroll',
        ],
        'thang_cap_phu' => [
            'name' => 'Thăng Cấp Phù', 'description' => 'Tăng item level +1 (tối đa +5).',
            'goldCost' => 1500, 'icon' => '⬆️', 'action' => 'upgrade_ilvl',
        ],
    ];

    // === GET CURRENCY INFO ===
    $app->get('/api/crafting/currencies', function (Request $request, Response $response) use ($CURRENCIES) {
        return jsonResponse($response, ['currencies' => $CURRENCIES]);
    });

    // === APPLY CURRENCY TO ITEM ===
    $app->post('/api/player/{id}/crafting/apply', function (Request $request, Response $response, array $args) use ($CURRENCIES) {
        $id = $args['id'];
        $player = loadPlayer($id);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        $body = $request->getParsedBody();
        $currencyId = $body['currencyId'] ?? '';
        $itemId = $body['itemId'] ?? '';
        $lockAffixIndex = isset($body['lockAffixIndex']) ? (int)$body['lockAffixIndex'] : -1;

        if (!isset($CURRENCIES[$currencyId])) {
            return jsonResponse($response, ['error' => 'Phù văn không hợp lệ!'], 400);
        }

        $currency = $CURRENCIES[$currencyId];
        if ($player->gold < $currency['goldCost']) {
            return jsonResponse($response, ['error' => "Không đủ Linh thạch! Cần {$currency['goldCost']} 💎"], 400);
        }

        // Find item
        $targetItem = null;
        $locType = null;
        foreach ($player->equipment as $slot => $item) {
            if ($item->getId() === $itemId) { $targetItem = $item; $locType = 'eq'; break; }
        }
        if (!$targetItem) {
            foreach ($player->inventory as $i => $item) {
                if ($item->getId() === $itemId) { $targetItem = $item; $locType = 'inv'; break; }
            }
        }
        if (!$targetItem) return jsonResponse($response, ['error' => 'Trang bị không tìm thấy!'], 400);

        $itemSystem = new ItemSystem();
        $action = $currency['action'];
        $currentAffixes = $targetItem->getAffixes();
        $message = '';

        switch ($action) {
            case 'reroll':
                $newAffixes = $itemSystem->generateAffixes($targetItem->getRarity(), $targetItem->getSlot());
                $targetItem->setAffixes($newAffixes);
                $message = "🔄 Đã reroll toàn bộ affix!";
                break;
            case 'add_affix':
                if (count($currentAffixes) >= 4) {
                    return jsonResponse($response, ['error' => 'Đã có tối đa 4 affix!'], 400);
                }
                $newAffix = $itemSystem->generateSingleAffix($targetItem->getSlot(), $currentAffixes);
                $currentAffixes[] = $newAffix;
                $targetItem->setAffixes($currentAffixes);
                $affName = $newAffix['name'] ?? 'Unknown';
                $message = "➕ Thêm affix [{$affName}]!";
                break;
            case 'lock_reroll':
                if ($lockAffixIndex < 0 || $lockAffixIndex >= count($currentAffixes)) {
                    return jsonResponse($response, ['error' => 'Chỉ mục affix khóa không hợp lệ!'], 400);
                }
                $locked = $currentAffixes[$lockAffixIndex];
                $newAffixes = $itemSystem->generateAffixes($targetItem->getRarity(), $targetItem->getSlot());
                if (!empty($newAffixes)) { $newAffixes[0] = $locked; } else { $newAffixes = [$locked]; }
                $targetItem->setAffixes($newAffixes);
                $lockName = $locked['name'] ?? 'Unknown';
                $message = "🔒 Khóa [{$lockName}], reroll phần còn lại!";
                break;
            case 'upgrade_ilvl':
                $ilvl = $targetItem->getItemLevel();
                $targetItem->setItemLevel($ilvl + 1);
                $message = "⬆️ Item level {$ilvl} → " . ($ilvl + 1) . "!";
                break;
        }

        $player->gold -= $currency['goldCost'];
        savePlayer($id, $player);

        return jsonResponse($response, [
            'message' => $message,
            'item' => $targetItem->toArray(),
            'player' => $player->toArray(),
        ]);
    });
};
