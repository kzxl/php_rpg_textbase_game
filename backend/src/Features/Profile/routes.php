<?php

/**
 * Player Profile Feature — Xem Profile Người Chơi Khác
 * Search by name, view public stats, with attack/friend actions
 */

use Slim\Psr7\Request;
use Slim\Psr7\Response;
use App\Core\Database;

return function ($app) {

    // === SEARCH PLAYERS BY NAME ===
    $app->get('/api/players/lookup', function (Request $request, Response $response) {
        $params = $request->getQueryParams();
        $query = trim($params['q'] ?? '');
        if (strlen($query) < 2) {
            return jsonResponse($response, ['error' => 'Nhập ít nhất 2 ký tự!'], 400);
        }

        $pdo = Database::pdo();
        $stmt = $pdo->prepare("
            SELECT p.id, p.name, p.level, p.realm_tier, p.current_area
            FROM players p
            WHERE p.name LIKE ? AND p.name != ''
            ORDER BY p.level DESC
            LIMIT 20
        ");
        $stmt->execute(["%{$query}%"]);
        $results = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        return jsonResponse($response, ['players' => $results]);
    });

    // === GET PUBLIC PROFILE ===
    $app->get('/api/player/{id}/profile', function (Request $request, Response $response, array $args) {
        $id = $args['id'];
        $player = loadPlayer($id);
        if (!$player) return jsonResponse($response, ['error' => 'Không tìm thấy người chơi!'], 404);

        $pdo = Database::pdo();

        // Guild info
        $gStmt = $pdo->prepare("
            SELECT g.name as guild_name, g.tag as guild_tag, gm.role
            FROM guild_members gm JOIN guilds g ON g.id = gm.guild_id
            WHERE gm.player_id = ?
        ");
        $gStmt->execute([$id]);
        $guild = $gStmt->fetch(\PDO::FETCH_ASSOC);

        // Housing info
        $hStmt = $pdo->prepare("SELECT tier FROM player_housing WHERE player_id = ?");
        $hStmt->execute([$id]);
        $housing = $hStmt->fetch(\PDO::FETCH_ASSOC);

        // Public stats (limited info, not full internal stats)
        $p = $player;
        return jsonResponse($response, [
            'profile' => [
                'id' => $id,
                'name' => $p->name,
                'level' => $p->level,
                'realmInfo' => $p->realmInfo ?? null,
                'currentArea' => $p->currentArea ?? 'thanh_lam_tran',
                'gold' => $p->gold, // visible
                'stats' => [
                    'strength' => $p->stats['strength'] ?? 0,
                    'speed' => $p->stats['speed'] ?? 0,
                    'dexterity' => $p->stats['dexterity'] ?? 0,
                    'defense' => $p->stats['defense'] ?? 0,
                ],
                'currentHp' => $p->currentHp,
                'maxHp' => $p->maxHp,
                'guild' => $guild ?: null,
                'housingTier' => $housing ? (int)$housing['tier'] : 0,
                'skills' => count($p->skills ?? []),
                'items' => count($p->inventory ?? []),
            ],
        ]);
    });
};
