<?php
/**
 * Leaderboard — Bảng Xếp Hạng (level, gold, pvp, guild)
 */
use Slim\Psr7\Request;
use Slim\Psr7\Response;
use App\Core\Database;

return function ($app) {

    // === GET LEADERBOARD ===
    $app->get('/api/leaderboard/{type}', function (Request $request, Response $response, array $args) {
        $type = $args['type'];
        $pdo = Database::pdo();

        switch ($type) {
            case 'level':
                $stmt = $pdo->query("
                    SELECT p.id, p.name, p.level, p.realm_tier, p.gold
                    FROM players p ORDER BY p.level DESC, p.name ASC LIMIT 50
                ");
                break;
            case 'gold':
                $stmt = $pdo->query("
                    SELECT p.id, p.name, p.level, p.gold
                    FROM players p ORDER BY p.gold DESC LIMIT 50
                ");
                break;
            case 'pvp':
                $stmt = $pdo->query("
                    SELECT a.player_id as id, p.name, p.level, a.rating, a.wins, a.losses, a.streak
                    FROM pvp_arena a
                    JOIN players p ON p.id = a.player_id
                    ORDER BY a.rating DESC LIMIT 50
                ");
                break;
            case 'guild':
                $stmt = $pdo->query("
                    SELECT g.id, g.name, g.tag, g.level, g.treasury,
                           (SELECT COUNT(*) FROM guild_members gm WHERE gm.guild_id = g.id) as members,
                           g.max_members, p.name as leader_name
                    FROM guilds g
                    JOIN players p ON p.id = g.leader_id
                    ORDER BY g.level DESC, g.treasury DESC LIMIT 50
                ");
                break;
            default:
                return jsonResponse($response, ['error' => 'Loại bảng xếp hạng không hợp lệ!'], 400);
        }

        return jsonResponse($response, [
            'type' => $type,
            'rankings' => $stmt->fetchAll(\PDO::FETCH_ASSOC),
        ]);
    });
};
