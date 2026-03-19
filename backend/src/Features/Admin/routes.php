<?php

/**
 * Admin Feature — Thiên Đạo Đài Control Panel
 * CRUD game data JSON files. Requires role === 'admin'.
 */

use Slim\Psr7\Request;
use Slim\Psr7\Response;

return function ($app) {

    // === Middleware: Admin check ===
    $adminCheck = function (Request $request, $handler) {
        $playerId = $request->getAttribute('routeParams')['id'] ?? null;
        // Try from query or body
        if (!$playerId) {
            $params = $request->getQueryParams();
            $playerId = $params['pid'] ?? null;
        }
        if (!$playerId) {
            $body = json_decode($request->getBody()->getContents(), true);
            $playerId = $body['playerId'] ?? null;
            // Rewind body so route can re-read
            $request->getBody()->rewind();
        }
        if (!$playerId) {
            $response = new \Slim\Psr7\Response();
            return jsonResponse($response, ['error' => 'Missing player ID'], 400);
        }
        $player = loadPlayer($playerId);
        if (!$player || $player->role !== 'admin') {
            $response = new \Slim\Psr7\Response();
            return jsonResponse($response, ['error' => 'Không có quyền truy cập.'], 403);
        }
        return $handler->handle($request);
    };

    $dataDir = __DIR__ . '/../../../data';

    // Helper: load + save JSON
    $loadJson = function (string $file) use ($dataDir) {
        $path = "{$dataDir}/{$file}";
        return file_exists($path) ? json_decode(file_get_contents($path), true) : [];
    };
    $saveJson = function (string $file, array $data) use ($dataDir) {
        $path = "{$dataDir}/{$file}";
        file_put_contents($path, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    };

    // ============================================
    // MONSTERS CRUD
    // ============================================
    $app->get('/api/admin/monsters', function (Request $request, Response $response) use ($loadJson) {
        return jsonResponse($response, $loadJson('monsters.json'));
    });

    $app->put('/api/admin/monsters/{monsterId}', function (Request $request, Response $response, array $args) use ($loadJson, $saveJson) {
        $data = $loadJson('monsters.json');
        $body = json_decode($request->getBody()->getContents(), true);
        $found = false;
        foreach ($data['monsters'] as &$m) {
            if ($m['id'] === $args['monsterId']) {
                $m = array_merge($m, $body);
                $found = true;
                break;
            }
        }
        unset($m);
        if (!$found) return jsonResponse($response, ['error' => 'Monster not found'], 404);
        $saveJson('monsters.json', $data);
        return jsonResponse($response, ['success' => true, 'message' => 'Đã cập nhật ' . $args['monsterId']]);
    });

    $app->post('/api/admin/monsters', function (Request $request, Response $response) use ($loadJson, $saveJson) {
        $data = $loadJson('monsters.json');
        $body = json_decode($request->getBody()->getContents(), true);
        if (empty($body['id'])) return jsonResponse($response, ['error' => 'Thiếu ID'], 400);
        foreach ($data['monsters'] as $m) {
            if ($m['id'] === $body['id']) return jsonResponse($response, ['error' => 'ID đã tồn tại'], 400);
        }
        $data['monsters'][] = $body;
        $saveJson('monsters.json', $data);
        return jsonResponse($response, ['success' => true, 'message' => 'Đã thêm ' . $body['id']]);
    });

    $app->delete('/api/admin/monsters/{monsterId}', function (Request $request, Response $response, array $args) use ($loadJson, $saveJson) {
        $data = $loadJson('monsters.json');
        $data['monsters'] = array_values(array_filter($data['monsters'], fn($m) => $m['id'] !== $args['monsterId']));
        $saveJson('monsters.json', $data);
        return jsonResponse($response, ['success' => true, 'message' => 'Đã xóa ' . $args['monsterId']]);
    });

    // ============================================
    // ITEMS CRUD
    // ============================================
    $app->get('/api/admin/items', function (Request $request, Response $response) use ($loadJson) {
        return jsonResponse($response, $loadJson('items.json'));
    });

    $app->put('/api/admin/items/{itemId}', function (Request $request, Response $response, array $args) use ($loadJson, $saveJson) {
        $data = $loadJson('items.json');
        $body = json_decode($request->getBody()->getContents(), true);
        $key = isset($data['items']) ? 'items' : (isset($data['bases']) ? 'bases' : null);
        if (!$key) return jsonResponse($response, ['error' => 'Invalid items format'], 500);
        $found = false;
        foreach ($data[$key] as &$item) {
            if ($item['id'] === $args['itemId']) {
                $item = array_merge($item, $body);
                $found = true;
                break;
            }
        }
        unset($item);
        if (!$found) return jsonResponse($response, ['error' => 'Item not found'], 404);
        $saveJson('items.json', $data);
        return jsonResponse($response, ['success' => true, 'message' => 'Đã cập nhật ' . $args['itemId']]);
    });

    // ============================================
    // AREAS / EXPLORATION CRUD
    // ============================================
    $app->get('/api/admin/areas', function (Request $request, Response $response) use ($loadJson) {
        return jsonResponse($response, $loadJson('exploration.json'));
    });

    $app->put('/api/admin/areas/{areaId}', function (Request $request, Response $response, array $args) use ($loadJson, $saveJson) {
        $data = $loadJson('exploration.json');
        $body = json_decode($request->getBody()->getContents(), true);
        if (!isset($data[$args['areaId']])) return jsonResponse($response, ['error' => 'Area not found'], 404);
        $data[$args['areaId']] = array_merge($data[$args['areaId']], $body);
        $saveJson('exploration.json', $data);
        return jsonResponse($response, ['success' => true, 'message' => 'Đã cập nhật khu vực ' . $args['areaId']]);
    });

    // ============================================
    // NPC CRUD
    // ============================================
    $app->get('/api/admin/npcs', function (Request $request, Response $response) use ($loadJson) {
        return jsonResponse($response, $loadJson('npcs.json'));
    });

    $app->put('/api/admin/npcs/{npcId}', function (Request $request, Response $response, array $args) use ($loadJson, $saveJson) {
        $data = $loadJson('npcs.json');
        $body = json_decode($request->getBody()->getContents(), true);
        $found = false;
        foreach ($data['npcs'] as &$npc) {
            if ($npc['id'] === $args['npcId']) {
                $npc = array_merge($npc, $body);
                $found = true;
                break;
            }
        }
        unset($npc);
        if (!$found) return jsonResponse($response, ['error' => 'NPC not found'], 404);
        $saveJson('npcs.json', $data);
        return jsonResponse($response, ['success' => true, 'message' => 'Đã cập nhật NPC ' . $args['npcId']]);
    });

    // ============================================
    // MATERIALS CRUD
    // ============================================
    $app->get('/api/admin/materials', function (Request $request, Response $response) use ($loadJson) {
        return jsonResponse($response, $loadJson('materials.json'));
    });

    $app->put('/api/admin/materials/{matId}', function (Request $request, Response $response, array $args) use ($loadJson, $saveJson) {
        $data = $loadJson('materials.json');
        $found = false;
        $body = json_decode($request->getBody()->getContents(), true);
        foreach ($data['materials'] as &$mat) {
            if ($mat['id'] === $args['matId']) {
                $mat = array_merge($mat, $body);
                $found = true;
                break;
            }
        }
        unset($mat);
        if (!$found) return jsonResponse($response, ['error' => 'Material not found'], 404);
        $saveJson('materials.json', $data);
        return jsonResponse($response, ['success' => true, 'message' => 'Đã cập nhật ' . $args['matId']]);
    });

    // ============================================
    // CRIMES CRUD
    // ============================================
    $app->get('/api/admin/crimes', function (Request $request, Response $response) use ($loadJson) {
        return jsonResponse($response, $loadJson('crimes.json'));
    });

    $app->put('/api/admin/crimes/{crimeId}', function (Request $request, Response $response, array $args) use ($loadJson, $saveJson) {
        $data = $loadJson('crimes.json');
        $key = isset($data['crimes']) ? 'crimes' : 'actions';
        $found = false;
        $body = json_decode($request->getBody()->getContents(), true);
        foreach ($data[$key] as &$c) {
            if ($c['id'] === $args['crimeId']) {
                $c = array_merge($c, $body);
                $found = true;
                break;
            }
        }
        unset($c);
        if (!$found) return jsonResponse($response, ['error' => 'Crime not found'], 404);
        $saveJson('crimes.json', $data);
        return jsonResponse($response, ['success' => true, 'message' => 'Đã cập nhật ' . $args['crimeId']]);
    });

    // ============================================
    // EDUCATION CRUD
    // ============================================
    $app->get('/api/admin/education', function (Request $request, Response $response) use ($loadJson) {
        return jsonResponse($response, $loadJson('education.json'));
    });

    $app->put('/api/admin/education/{treeId}', function (Request $request, Response $response, array $args) use ($loadJson, $saveJson) {
        $data = $loadJson('education.json');
        $body = json_decode($request->getBody()->getContents(), true);
        $found = false;
        $key = isset($data['trees']) ? 'trees' : (is_array($data) ? null : null);
        if (isset($data['trees'])) {
            foreach ($data['trees'] as &$tree) {
                if ($tree['id'] === $args['treeId']) {
                    $tree = array_merge($tree, $body);
                    $found = true;
                    break;
                }
            }
            unset($tree);
        }
        if (!$found) return jsonResponse($response, ['error' => 'Tree not found'], 404);
        $saveJson('education.json', $data);
        return jsonResponse($response, ['success' => true, 'message' => 'Đã cập nhật ' . $args['treeId']]);
    });

    // ============================================
    // GENERIC: Reload all data
    // ============================================
    $app->get('/api/admin/data-summary', function (Request $request, Response $response) use ($loadJson) {
        $monsters = $loadJson('monsters.json');
        $items = $loadJson('items.json');
        $areas = $loadJson('exploration.json');
        $npcs = $loadJson('npcs.json');
        $materials = $loadJson('materials.json');
        $crimes = $loadJson('crimes.json');

        return jsonResponse($response, [
            'monsterCount' => count($monsters['monsters'] ?? []),
            'itemCount' => count($items['items'] ?? $items['bases'] ?? []),
            'areaCount' => count(array_keys($areas)),
            'npcCount' => count($npcs['npcs'] ?? []),
            'materialCount' => count($materials['materials'] ?? []),
            'crimeCount' => count($crimes['crimes'] ?? $crimes['actions'] ?? []),
        ]);
    });
};
