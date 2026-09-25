<?php

/**
 * Monster Mastery & Crafting Mastery Features
 * Action-driven progression replacing legacy timed education.
 */

use Slim\Psr7\Request;
use Slim\Psr7\Response;
use App\Core\GameDataRepository;
use App\Systems\MonsterMasterySystem;

return function ($app) {
    /**
     * GET /api/player/{id}/monster-mastery
     * Returns the player's full bestiary with mastery stats, tiers, and Fog of War masking.
     */
    $app->get('/api/player/{id}/monster-mastery', function (Request $request, Response $response, array $args) {
        $id = $args['id'];
        $player = loadPlayer($id);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        $allMonsters = GameDataRepository::getMonsters();
        $playerMastery = MonsterMasterySystem::getAllPlayerMastery($id);

        $totalKills = 0;
        $tierCounts = [0 => 0, 1 => 0, 2 => 0, 3 => 0, 4 => 0, 5 => 0];

        $enrichedMonsters = [];
        foreach ($allMonsters as $m) {
            $mId = $m['id'];
            $mastery = $playerMastery[$mId] ?? [
                'playerId' => $id,
                'monsterId' => $mId,
                'kills' => 0,
                'tier' => 0,
                'tierName' => MonsterMasterySystem::TIERS[0]['name'],
                'stars' => MonsterMasterySystem::TIERS[0]['stars'],
                'starCount' => 0,
                'desc' => MonsterMasterySystem::TIERS[0]['desc'],
                'badgeColor' => MonsterMasterySystem::TIERS[0]['badgeColor'],
                'tierInfo' => MonsterMasterySystem::TIERS[0],
                'nextTier' => 1,
                'nextTierReq' => 5,
                'tierProgress' => 0,
                'isMaxTier' => false,
                'firstKilledAt' => 0,
                'lastKilledAt' => 0,
            ];

            $totalKills += $mastery['kills'];
            $tierCounts[$mastery['tier']] = ($tierCounts[$mastery['tier']] ?? 0) + 1;

            // Fog of war check:
            // Tier 0: Mask true stats
            $isRevealed = ($mastery['tier'] >= 1);
            $monsterData = [
                'id' => $mId,
                'name' => $isRevealed || $mastery['kills'] > 0 ? $m['name'] : '??? (Chưa rõ)',
                'description' => $isRevealed ? ($m['description'] ?? '') : 'Sinh vật lạ chưa thấu tỏ tập tính. Hãy trảm sát 5 con để mở khóa chi tiết thông tin.',
                'tier' => $m['tier'] ?? 1,
                'tierName' => $m['tierName'] ?? 'Luyện Khí',
                'tags' => $isRevealed ? ($m['tags'] ?? []) : ['???'],
                'element' => $isRevealed ? ($m['element'] ?? 'none') : 'unknown',
                'stats' => $isRevealed ? ($m['stats'] ?? []) : [
                    'hp' => '???',
                    'strength' => '???',
                    'speed' => '???',
                    'defense' => '???',
                    'dexterity' => '???'
                ],
                'xpReward' => $isRevealed ? ($m['xpReward'] ?? 0) : '???',
                'drops' => $isRevealed ? ($m['drops'] ?? []) : [],
                'resistances' => $isRevealed ? ($m['resistances'] ?? []) : [],
                'mastery' => $mastery,
            ];

            $enrichedMonsters[] = $monsterData;
        }

        return jsonResponse($response, [
            'totalKills' => $totalKills,
            'totalSpecies' => count($allMonsters),
            'tierCounts' => $tierCounts,
            'tiers' => MonsterMasterySystem::TIERS,
            'monsters' => $enrichedMonsters
        ]);
    });

    /**
     * GET /api/player/{id}/crafting-mastery
     * Returns player's crafting mastery progression, titles, perks, and recipe catalog.
     */
    $app->get('/api/player/{id}/crafting-mastery', function (Request $request, Response $response, array $args) {
        $id = $args['id'];
        $player = loadPlayer($id);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        $craftLvl = $player->craftingLevel;
        $craftXp = $player->craftingXp;
        $xpToNext = $craftLvl * 50;
        $progressPct = min(100, round(($craftXp / max(1, $xpToNext)) * 100));

        // Crafting Title Progression
        $title = 'Sơ Cấp Dược Đồng';
        $badgeColor = '#94a3b8';
        if ($craftLvl >= 100) {
            $title = 'Thần Nông Vô Thượng Tôn';
            $badgeColor = '#ef4444';
        } elseif ($craftLvl >= 76) {
            $title = 'Đan Thánh Chí Tôn';
            $badgeColor = '#f59e0b';
        } elseif ($craftLvl >= 51) {
            $title = 'Đan Đạo Tông Sư';
            $badgeColor = '#8b5cf6';
        } elseif ($craftLvl >= 26) {
            $title = 'Đại Luyện Đan Sư';
            $badgeColor = '#3b82f6';
        } elseif ($craftLvl >= 11) {
            $title = 'Thuần Thục Đan Sư';
            $badgeColor = '#10b981';
        }

        // Perks
        $lvlSuccessBonus = (int) floor($craftLvl / 5);
        $critChance = $craftLvl >= 76 ? 8 : ($craftLvl >= 51 ? 5 : ($craftLvl >= 26 ? 3 : 0));
        $matReturnRate = $craftLvl >= 76 ? 20 : ($craftLvl >= 51 ? 10 : ($craftLvl <= 10 ? 50 : 0));

        $allRecipes = GameDataRepository::getRecipes();

        return jsonResponse($response, [
            'craftingLevel' => $craftLvl,
            'craftingXp' => $craftXp,
            'xpToNext' => $xpToNext,
            'progressPercent' => $progressPct,
            'title' => $title,
            'badgeColor' => $badgeColor,
            'perks' => [
                'successBonusPct' => $lvlSuccessBonus,
                'critQualityChance' => $critChance,
                'materialReturnRate' => $matReturnRate,
                'canCraftDivine' => ($craftLvl >= 76),
                'canCraftSupreme' => ($craftLvl >= 26),
            ],
            'recipesCount' => count($allRecipes),
            'recipes' => $allRecipes
        ]);
    });
};
