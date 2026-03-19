<?php

namespace App\Core;

/**
 * GameDataRepository — Centralized DB access for game data.
 * Replaces all json_decode(file_get_contents(...)) calls in routes.
 */
class GameDataRepository
{
    // ============================================
    // MONSTERS
    // ============================================
    public static function getMonsters(): array
    {
        $stmt = Database::pdo()->query("SELECT data FROM game_monsters ORDER BY tier, name");
        return array_map(fn($r) => json_decode($r['data'], true), $stmt->fetchAll(\PDO::FETCH_ASSOC));
    }

    public static function getMonsterById(string $id): ?array
    {
        $stmt = Database::pdo()->prepare("SELECT data FROM game_monsters WHERE id = ?");
        $stmt->execute([$id]);
        $row = $stmt->fetch(\PDO::FETCH_ASSOC);
        return $row ? json_decode($row['data'], true) : null;
    }

    public static function getMonstersByArea(string $areaId, bool $excludeWorldBoss = true): array
    {
        $sql = "SELECT data FROM game_monsters WHERE area_id = ?";
        if ($excludeWorldBoss) $sql .= " AND is_world_boss = 0";
        $stmt = Database::pdo()->prepare($sql);
        $stmt->execute([$areaId]);
        return array_map(fn($r) => json_decode($r['data'], true), $stmt->fetchAll(\PDO::FETCH_ASSOC));
    }

    public static function getWorldBossesByArea(string $areaId): array
    {
        $stmt = Database::pdo()->prepare("SELECT data FROM game_monsters WHERE area_id = ? AND is_world_boss = 1");
        $stmt->execute([$areaId]);
        return array_map(fn($r) => json_decode($r['data'], true), $stmt->fetchAll(\PDO::FETCH_ASSOC));
    }

    public static function getAllMonsters(): array
    {
        $stmt = Database::pdo()->query("SELECT data FROM game_monsters WHERE is_world_boss = 0");
        return array_map(fn($r) => json_decode($r['data'], true), $stmt->fetchAll(\PDO::FETCH_ASSOC));
    }

    // ============================================
    // SKILLS
    // ============================================
    public static function getSkills(): array
    {
        $stmt = Database::pdo()->query("SELECT data FROM game_skills ORDER BY name");
        return array_map(fn($r) => json_decode($r['data'], true), $stmt->fetchAll(\PDO::FETCH_ASSOC));
    }

    public static function getSkillById(string $id): ?array
    {
        $stmt = Database::pdo()->prepare("SELECT data FROM game_skills WHERE id = ?");
        $stmt->execute([$id]);
        $row = $stmt->fetch(\PDO::FETCH_ASSOC);
        return $row ? json_decode($row['data'], true) : null;
    }

    // ============================================
    // ITEMS
    // ============================================
    public static function getItems(): array
    {
        $stmt = Database::pdo()->query("SELECT data FROM game_items ORDER BY name");
        return array_map(fn($r) => json_decode($r['data'], true), $stmt->fetchAll(\PDO::FETCH_ASSOC));
    }

    public static function getItemById(string $id): ?array
    {
        $stmt = Database::pdo()->prepare("SELECT data FROM game_items WHERE id = ?");
        $stmt->execute([$id]);
        $row = $stmt->fetch(\PDO::FETCH_ASSOC);
        return $row ? json_decode($row['data'], true) : null;
    }

    // ============================================
    // MATERIALS
    // ============================================
    public static function getMaterials(): array
    {
        $stmt = Database::pdo()->query("SELECT data FROM game_materials ORDER BY category, name");
        return array_map(fn($r) => json_decode($r['data'], true), $stmt->fetchAll(\PDO::FETCH_ASSOC));
    }

    public static function getMaterialById(string $id): ?array
    {
        $stmt = Database::pdo()->prepare("SELECT data FROM game_materials WHERE id = ?");
        $stmt->execute([$id]);
        $row = $stmt->fetch(\PDO::FETCH_ASSOC);
        return $row ? json_decode($row['data'], true) : null;
    }

    // ============================================
    // CRIMES
    // ============================================
    public static function getCrimes(): array
    {
        $stmt = Database::pdo()->query("SELECT * FROM game_crimes ORDER BY nerve_cost, min_skill");
        $rows = $stmt->fetchAll(\PDO::FETCH_ASSOC);
        return array_map(function($r) {
            return [
                'id' => $r['id'],
                'name' => $r['name'],
                'category' => $r['category'],
                'nerveCost' => (int)$r['nerve_cost'],
                'baseSuccessRate' => (int)$r['base_success_rate'],
                'minSkill' => (int)$r['min_skill'],
                'icon' => $r['icon'],
                'rewards' => json_decode($r['rewards'], true),
                'failPenalty' => json_decode($r['fail_penalty'], true),
                'critFailChance' => (int)$r['crit_fail_chance'],
                'critFailPenalty' => json_decode($r['crit_fail_penalty'], true),
                'special' => json_decode($r['special'], true) ?: [],
                'description' => $r['description'],
            ];
        }, $rows);
    }

    public static function getCrimeById(string $id): ?array
    {
        $stmt = Database::pdo()->prepare("SELECT * FROM game_crimes WHERE id = ?");
        $stmt->execute([$id]);
        $r = $stmt->fetch(\PDO::FETCH_ASSOC);
        if (!$r) return null;
        return [
            'id' => $r['id'],
            'name' => $r['name'],
            'category' => $r['category'],
            'nerveCost' => (int)$r['nerve_cost'],
            'baseSuccessRate' => (int)$r['base_success_rate'],
            'minSkill' => (int)$r['min_skill'],
            'icon' => $r['icon'],
            'rewards' => json_decode($r['rewards'], true),
            'failPenalty' => json_decode($r['fail_penalty'], true),
            'critFailChance' => (int)$r['crit_fail_chance'],
            'critFailPenalty' => json_decode($r['crit_fail_penalty'], true),
            'special' => json_decode($r['special'], true) ?: [],
            'description' => $r['description'],
        ];
    }

    // ============================================
    // NPCs + QUESTS
    // ============================================
    public static function getNpcs(): array
    {
        $stmt = Database::pdo()->query("SELECT data FROM game_npcs ORDER BY name");
        return array_map(fn($r) => json_decode($r['data'], true), $stmt->fetchAll(\PDO::FETCH_ASSOC));
    }

    public static function getNpcById(string $id): ?array
    {
        $stmt = Database::pdo()->prepare("SELECT data FROM game_npcs WHERE id = ?");
        $stmt->execute([$id]);
        $row = $stmt->fetch(\PDO::FETCH_ASSOC);
        return $row ? json_decode($row['data'], true) : null;
    }

    public static function getNpcsByArea(string $areaId): array
    {
        $stmt = Database::pdo()->prepare("SELECT data FROM game_npcs WHERE JSON_CONTAINS(area_ids, ?)");
        $stmt->execute([json_encode($areaId)]);
        return array_map(fn($r) => json_decode($r['data'], true), $stmt->fetchAll(\PDO::FETCH_ASSOC));
    }

    public static function getNpcQuests(string $npcId): array
    {
        $stmt = Database::pdo()->prepare("SELECT * FROM game_npc_quests WHERE npc_id = ?");
        $stmt->execute([$npcId]);
        $rows = $stmt->fetchAll(\PDO::FETCH_ASSOC);
        return array_map(fn($r) => [
            'id' => $r['id'],
            'npcId' => $r['npc_id'],
            'name' => $r['name'],
            'type' => $r['type'],
            'target' => $r['target'],
            'amount' => (int)$r['amount'],
            'description' => $r['description'],
            'rewards' => json_decode($r['rewards'], true),
        ], $rows);
    }

    // ============================================
    // MEDICINES
    // ============================================
    public static function getMedicines(): array
    {
        $stmt = Database::pdo()->query("SELECT data FROM game_medicines ORDER BY name");
        return array_map(fn($r) => json_decode($r['data'], true), $stmt->fetchAll(\PDO::FETCH_ASSOC));
    }

    public static function getMedicineById(string $id): ?array
    {
        $stmt = Database::pdo()->prepare("SELECT data FROM game_medicines WHERE id = ?");
        $stmt->execute([$id]);
        $row = $stmt->fetch(\PDO::FETCH_ASSOC);
        return $row ? json_decode($row['data'], true) : null;
    }

    // ============================================
    // ADMIN CRUD (replaces JSON file writes)
    // ============================================
    public static function updateRecord(string $table, string $id, array $data): bool
    {
        $pdo = Database::pdo();
        // Update full data JSON + individual columns where applicable
        $dataJson = json_encode($data, JSON_UNESCAPED_UNICODE);
        $stmt = $pdo->prepare("UPDATE $table SET data = ? WHERE id = ?");
        return $stmt->execute([$dataJson, $id]);
    }

    public static function insertRecord(string $table, string $id, array $data): bool
    {
        $pdo = Database::pdo();
        $dataJson = json_encode($data, JSON_UNESCAPED_UNICODE);
        $stmt = $pdo->prepare("INSERT INTO $table (id, name, data) VALUES (?, ?, ?)");
        return $stmt->execute([$id, $data['name'] ?? $id, $dataJson]);
    }

    public static function deleteRecord(string $table, string $id): bool
    {
        $stmt = Database::pdo()->prepare("DELETE FROM $table WHERE id = ?");
        return $stmt->execute([$id]);
    }

    public static function getDataSummary(): array
    {
        $pdo = Database::pdo();
        return [
            'monsterCount' => (int)$pdo->query("SELECT COUNT(*) FROM game_monsters")->fetchColumn(),
            'skillCount' => (int)$pdo->query("SELECT COUNT(*) FROM game_skills")->fetchColumn(),
            'itemCount' => (int)$pdo->query("SELECT COUNT(*) FROM game_items")->fetchColumn(),
            'materialCount' => (int)$pdo->query("SELECT COUNT(*) FROM game_materials")->fetchColumn(),
            'crimeCount' => (int)$pdo->query("SELECT COUNT(*) FROM game_crimes")->fetchColumn(),
            'npcCount' => (int)$pdo->query("SELECT COUNT(*) FROM game_npcs")->fetchColumn(),
            'questCount' => (int)$pdo->query("SELECT COUNT(*) FROM game_npc_quests")->fetchColumn(),
            'medicineCount' => (int)$pdo->query("SELECT COUNT(*) FROM game_medicines")->fetchColumn(),
            'areaCount' => (int)$pdo->query("SELECT COUNT(*) FROM game_areas")->fetchColumn(),
            'educationCount' => (int)$pdo->query("SELECT COUNT(*) FROM game_education_trees")->fetchColumn(),
            'recipeCount' => (int)$pdo->query("SELECT COUNT(*) FROM game_recipes")->fetchColumn(),
        ];
    }

    // ============================================
    // EXPLORATION AREAS
    // ============================================
    public static function getAreas(): array
    {
        $stmt = Database::pdo()->query("SELECT id, data FROM game_areas ORDER BY name");
        $result = [];
        foreach ($stmt->fetchAll(\PDO::FETCH_ASSOC) as $row) {
            $result[$row['id']] = json_decode($row['data'], true);
        }
        return $result;
    }

    public static function getAreaById(string $id): ?array
    {
        $stmt = Database::pdo()->prepare("SELECT data FROM game_areas WHERE id = ?");
        $stmt->execute([$id]);
        $row = $stmt->fetch(\PDO::FETCH_ASSOC);
        return $row ? json_decode($row['data'], true) : null;
    }

    // ============================================
    // PLAYER EVENTS
    // ============================================
    public static function addEvent(string $playerId, string $type, string $message): void
    {
        // Don't add events for missing players
        if (!$playerId) return;

        $stmt = Database::pdo()->prepare("
            INSERT INTO player_events (player_id, type, message, is_read, created_at)
            VALUES (?, ?, ?, 0, ?)
        ");
        $stmt->execute([$playerId, $type, $message, time()]);
    }

    public static function getEvents(string $playerId, int $limit = 50): array
    {
        $stmt = Database::pdo()->prepare("
            SELECT * FROM player_events
            WHERE player_id = ?
            ORDER BY created_at DESC
            LIMIT ?
        ");
        // PDO bindValue because LIMIT needs INT
        $stmt->bindValue(1, $playerId);
        $stmt->bindValue(2, $limit, \PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }

    public static function getUnreadEventsCount(string $playerId): int
    {
        $stmt = Database::pdo()->prepare("
            SELECT COUNT(*) FROM player_events
            WHERE player_id = ? AND is_read = 0
        ");
        $stmt->execute([$playerId]);
        return (int) $stmt->fetchColumn();
    }

    public static function markEventsAsRead(string $playerId): void
    {
        $stmt = Database::pdo()->prepare("
            UPDATE player_events
            SET is_read = 1
            WHERE player_id = ? AND is_read = 0
        ");
        $stmt->execute([$playerId]);
    }

    // ============================================
    // EDUCATION TREES
    // ============================================
    public static function getEducationTrees(): array
    {
        $stmt = Database::pdo()->query("SELECT data FROM game_education_trees ORDER BY name");
        return array_map(fn($r) => json_decode($r['data'], true), $stmt->fetchAll(\PDO::FETCH_ASSOC));
    }

    public static function getEducationTreeById(string $id): ?array
    {
        $stmt = Database::pdo()->prepare("SELECT data FROM game_education_trees WHERE id = ?");
        $stmt->execute([$id]);
        $row = $stmt->fetch(\PDO::FETCH_ASSOC);
        return $row ? json_decode($row['data'], true) : null;
    }

    // ============================================
    // RECIPES
    // ============================================
    public static function getRecipes(): array
    {
        $stmt = Database::pdo()->query("SELECT data FROM game_recipes ORDER BY tier, name");
        return array_map(fn($r) => json_decode($r['data'], true), $stmt->fetchAll(\PDO::FETCH_ASSOC));
    }

    public static function getRecipeById(string $id): ?array
    {
        $stmt = Database::pdo()->prepare("SELECT data FROM game_recipes WHERE id = ?");
        $stmt->execute([$id]);
        $row = $stmt->fetch(\PDO::FETCH_ASSOC);
        return $row ? json_decode($row['data'], true) : null;
    }

    // ============================================
    // ADMIN HELPERS
    // ============================================

    /** Map frontend tab IDs to DB tables */
    public static function getTableForTab(string $tab): ?string
    {
        $map = [
            'monsters' => 'game_monsters',
            'npcs' => 'game_npcs',
            'areas' => 'game_areas',
            'items' => 'game_items',
            'materials' => 'game_materials',
            'crimes' => 'game_crimes',
            'education' => 'game_education_trees',
            'medicines' => 'game_medicines',
            'recipes' => 'game_recipes',
            'skills' => 'game_skills',
        ];
        return $map[$tab] ?? null;
    }

    /** Generic fetch all records from a game table */
    public static function getAllFromTable(string $table): array
    {
        $stmt = Database::pdo()->query("SELECT data FROM $table ORDER BY name");
        return array_map(fn($r) => json_decode($r['data'], true), $stmt->fetchAll(\PDO::FETCH_ASSOC));
    }
}
