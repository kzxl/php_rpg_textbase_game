<?php

namespace App\Core;

use App\Models\Player;
use App\Systems\SkillSystem;

/**
 * Player persistence via MySQL.
 * Skills stored in player_skills mapping table (not JSON blob).
 * Auth via username + password_hash.
 */
class PlayerRepository
{
    /**
     * Save player to database (upsert).
     */
    public static function save(string $id, Player $player): void
    {
        $pdo = Database::pdo();
        $data = $player->toArray();

        $sql = "INSERT INTO players (
            id, username, password_hash, name, gender, level, xp, xp_to_next,
            current_hp, max_hp, current_energy, max_energy, current_stamina, max_stamina, stat_points,
            allocated_stats, hospital_until, med_cooldown_until, mug_cooldown_until, last_hp_regen,
            gold, nerve, max_nerve, crime_exp, crime_skills, jail_until,
            studying_node, study_ends_at, unlocked_nodes, tree_progress,
            skill_progress, discovered_nodes,
            current_area, traveling_to, travel_arrives_at, role, realm_tier, talents
        ) VALUES (
            :id, :username, :password_hash, :name, :gender, :level, :xp, :xp_to_next,
            :current_hp, :max_hp, :current_energy, :max_energy, :current_stamina, :max_stamina, :stat_points,
            :allocated_stats, :hospital_until, :med_cooldown_until, :mug_cooldown_until, :last_hp_regen,
            :gold, :nerve, :max_nerve, :crime_exp, :crime_skills, :jail_until,
            :studying_node, :study_ends_at, :unlocked_nodes, :tree_progress,
            :skill_progress, :discovered_nodes,
            :current_area, :traveling_to, :travel_arrives_at, :role, :realm_tier, :talents
        ) ON DUPLICATE KEY UPDATE
            name = VALUES(name), gender = VALUES(gender),
            level = VALUES(level), xp = VALUES(xp), xp_to_next = VALUES(xp_to_next),
            current_hp = VALUES(current_hp), max_hp = VALUES(max_hp),
            current_energy = VALUES(current_energy), max_energy = VALUES(max_energy),
            current_stamina = VALUES(current_stamina), max_stamina = VALUES(max_stamina),
            stat_points = VALUES(stat_points), allocated_stats = VALUES(allocated_stats),
            hospital_until = VALUES(hospital_until), med_cooldown_until = VALUES(med_cooldown_until), mug_cooldown_until = VALUES(mug_cooldown_until),
            last_hp_regen = VALUES(last_hp_regen),
            gold = VALUES(gold), nerve = VALUES(nerve), max_nerve = VALUES(max_nerve),
            crime_exp = VALUES(crime_exp), crime_skills = VALUES(crime_skills),
            jail_until = VALUES(jail_until),
            studying_node = VALUES(studying_node), study_ends_at = VALUES(study_ends_at),
            unlocked_nodes = VALUES(unlocked_nodes), tree_progress = VALUES(tree_progress),
            skill_progress = VALUES(skill_progress), discovered_nodes = VALUES(discovered_nodes),
            current_area = VALUES(current_area),
            traveling_to = VALUES(traveling_to),
            travel_arrives_at = VALUES(travel_arrives_at),
            role = VALUES(role),
            realm_tier = VALUES(realm_tier),
            talents = VALUES(talents)";

        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            'id' => $id,
            'username' => $data['username'] ?? strtolower(str_replace(' ', '_', $data['name'])) . '_' . substr($id, 0, 4),
            'password_hash' => $data['passwordHash'] ?? '',
            'name' => $data['name'],
            'gender' => $data['gender'],
            'level' => $data['level'],
            'xp' => $data['xp'],
            'xp_to_next' => $data['xpToNext'],
            'current_hp' => $data['currentHp'],
            'max_hp' => $data['maxHp'],
            'current_energy' => $data['currentEnergy'],
            'max_energy' => $data['maxEnergy'],
            'current_stamina' => $data['currentStamina'] ?? $data['maxStamina'] ?? 100,
            'max_stamina' => $data['maxStamina'] ?? 100,
            'stat_points' => $data['statPoints'],
            'allocated_stats' => json_encode($data['allocatedStats'] ?? []),
            'hospital_until' => $data['hospitalUntil'] ?? 0,
            'med_cooldown_until' => $data['medCooldownUntil'] ?? 0,
            'mug_cooldown_until' => $data['mugCooldownUntil'] ?? 0,
            'last_hp_regen' => $data['lastHpRegen'] ?? 0,
            'gold' => $data['gold'] ?? 0,
            'nerve' => $data['nerve'] ?? 15,
            'max_nerve' => $data['maxNerve'] ?? 15,
            'crime_exp' => $data['crimeExp'] ?? 0,
            'crime_skills' => json_encode($data['crimeSkills'] ?? []),
            'jail_until' => $data['jailUntil'] ?? 0,
            'studying_node' => $data['studyingNode'] ?? '',
            'study_ends_at' => $data['studyEndsAt'] ?? 0,
            'unlocked_nodes' => json_encode($data['unlockedNodes'] ?? []),
            'tree_progress' => json_encode($data['treeProgress'] ?? []),
            'skill_progress' => json_encode($data['skillProgress'] ?? []),
            'discovered_nodes' => json_encode($data['discoveredNodes'] ?? []),
            'current_area' => $data['currentArea'] ?? 'thanh_lam_tran',
            'traveling_to' => $data['travelDestination'] ?? null,
            'travel_arrives_at' => $data['travelEndTime'] ?? 0,
            'role' => $data['role'] ?? 'player',
            'realm_tier' => $data['realmTier'] ?? 1,
            'talents' => json_encode($data['talents'] ?? null),
        ]);

        // Phase 5: Normalized Tracking Tables
        $stmtEx = $pdo->prepare("INSERT INTO player_exploration (player_id, last_monster_spawn) VALUES (?, ?) ON DUPLICATE KEY UPDATE last_monster_spawn = VALUES(last_monster_spawn)");
        $stmtEx->execute([$id, $data['lastMonsterSpawn'] ?? 0]);

        $pdo->prepare("DELETE FROM player_tracked_monsters WHERE player_id = ? AND area_id = ?")->execute([$id, $data['currentArea']]);
        if (!empty($data['trackedMonsters'])) {
            $stmtM = $pdo->prepare("INSERT INTO player_tracked_monsters (player_id, area_id, monster_id, current_hp, spawned_at) VALUES (?, ?, ?, ?, ?)");
            foreach ($data['trackedMonsters'] as $tm) {
                if (($tm['area_id'] ?? $data['currentArea']) === $data['currentArea']) {
                    $stmtM->execute([$id, $data['currentArea'], $tm['monster_id'], $tm['current_hp'], $tm['spawned_at'] ?? time()]);
                }
            }
        }
    }

    /**
     * Load player from database.
     */
    public static function load(string $id): ?Player
    {
        $pdo = Database::pdo();
        $stmt = $pdo->prepare("SELECT * FROM players WHERE id = :id");
        $stmt->execute(['id' => $id]);
        $row = $stmt->fetch();

        if (!$row) return null;

        // Convert DB row (snake_case) to Player array format (camelCase)
        $data = [
            'id' => $id,
            'username' => $row['username'] ?? '',
            'passwordHash' => $row['password_hash'] ?? '',
            'name' => $row['name'],
            'gender' => $row['gender'],
            'level' => (int) $row['level'],
            'xp' => (int) $row['xp'],
            'xpToNext' => (int) $row['xp_to_next'],
            'currentHp' => (int) $row['current_hp'],
            'maxHp' => (int) $row['max_hp'],
            'currentEnergy' => (int) $row['current_energy'],
            'maxEnergy' => (int) $row['max_energy'],
            'currentStamina' => (int) $row['current_stamina'],
            'maxStamina' => (int) $row['max_stamina'],
            'statPoints' => (int) $row['stat_points'],
            'allocatedStats' => json_decode($row['allocated_stats'] ?? '{}', true) ?: [],
            'hospitalUntil' => (int) $row['hospital_until'],
            'medCooldownUntil' => (int) $row['med_cooldown_until'],
            'mugCooldownUntil' => (int) ($row['mug_cooldown_until'] ?? 0),
            'lastHpRegen' => (int) $row['last_hp_regen'],
            'gold' => (int) $row['gold'],
            'nerve' => (int) $row['nerve'],
            'maxNerve' => (int) $row['max_nerve'],
            'crimeExp' => (int) $row['crime_exp'],
            'crimeSkills' => json_decode($row['crime_skills'] ?? '[]', true) ?: [],
            'jailUntil' => (int) $row['jail_until'],
            'studyingNode' => $row['studying_node'] ?? '',
            'studyEndsAt' => (int) $row['study_ends_at'],
            'unlockedNodes' => json_decode($row['unlocked_nodes'] ?? '[]', true) ?: [],
            'treeProgress' => json_decode($row['tree_progress'] ?? '{}', true) ?: [],
            'skillProgress' => json_decode($row['skill_progress'] ?? '{}', true) ?: [],
            'discoveredNodes' => json_decode($row['discovered_nodes'] ?? '[]', true) ?: [],
            'currentArea' => $row['current_area'] ?? 'thanh_lam_tran',
            'role' => $row['role'] ?? 'player',
            'realmTier' => (int)($row['realm_tier'] ?? 1),
            'talents' => json_decode($row['talents'] ?? 'null', true),
            // skills loaded from player_skills table below
            'skills' => [],
            // equipment/inventory loaded from player_items table
            'equipment' => [],
            'inventory' => [],
        ];

        // Load equipped items
        $itemStmt = $pdo->prepare("SELECT * FROM player_items WHERE player_id = :id");
        $itemStmt->execute(['id' => $id]);
        $items = $itemStmt->fetchAll();

        $equipped = [];
        $inventory = [];
        foreach ($items as $item) {
            $itemArr = [
                'id' => $item['item_uid'],
                'name' => $item['name'],
                'baseType' => $item['base_type'],
                'slot' => $item['slot'],
                'rarity' => $item['rarity'],
                'itemLevel' => (int) $item['item_level'],
                'category' => $item['category'],
                'quantity' => (int) $item['quantity'],
                'sellPrice' => (int) $item['sell_price'],
                'stackable' => (bool) $item['stackable'],
                'affixes' => json_decode($item['affixes'] ?? '[]', true) ?: [],
            ];

            if ($item['equipped']) {
                $equipped[$item['slot']] = $itemArr;
            } else {
                $inventory[] = $itemArr;
            }
        }

        $data['equipment'] = $equipped;
        $data['inventory'] = $inventory;

        // Load skills from player_skills mapping table
        $skillStmt = $pdo->prepare("SELECT skill_id, level, current_xp, is_equipped FROM player_skills WHERE player_id = :id");
        $skillStmt->execute(['id' => $id]);
        $skillRows = $skillStmt->fetchAll(\PDO::FETCH_ASSOC);

        // Hydrate skill data from skills.json
        $skillSystem = new SkillSystem();
        $skills = [];
        foreach ($skillRows as $row) {
            $skill = $skillSystem->getById($row['skill_id']);
            if ($skill) {
                // Attach dynamic progression data to the static JSON definition
                $skill['level'] = (int)$row['level'];
                $skill['currentXp'] = (int)$row['current_xp'];
                $skill['isEquipped'] = (bool)$row['is_equipped'];
                $skills[] = $skill;
            }
        }
        $data['skills'] = $skills;

        // Phase 5: Load Normalized Tracked Monsters and Exploration State
        $stmtEx = $pdo->prepare("SELECT last_monster_spawn FROM player_exploration WHERE player_id = ?");
        $stmtEx->execute([$id]);
        if ($exRow = $stmtEx->fetch(\PDO::FETCH_ASSOC)) {
            $data['lastMonsterSpawn'] = (int) $exRow['last_monster_spawn'];
        }

        $stmtM = $pdo->prepare("SELECT id as instance_id, area_id, monster_id, current_hp, spawned_at FROM player_tracked_monsters WHERE player_id = ? AND area_id = ?");
        $stmtM->execute([$id, $data['currentArea'] ?? 'thanh_lam_tran']);
        $data['trackedMonsters'] = $stmtM->fetchAll(\PDO::FETCH_ASSOC) ?: [];

        // Phase 9: Load active quests
        $data['activeQuests'] = self::loadQuests($id);

        return Player::fromArray($data);
    }

    /**
     * Delete player.
     */
    public static function delete(string $id): void
    {
        $pdo = Database::pdo();
        $stmt = $pdo->prepare("DELETE FROM players WHERE id = :id");
        $stmt->execute(['id' => $id]);
    }

    /**
     * Save player items to DB (replaces all items for this player).
     */
    public static function saveItems(string $playerId, Player $player): void
    {
        $pdo = Database::pdo();

        // Delete all existing items for this player
        $del = $pdo->prepare("DELETE FROM player_items WHERE player_id = :pid");
        $del->execute(['pid' => $playerId]);

        $sql = "INSERT INTO player_items (
            player_id, item_uid, name, base_type, slot, rarity,
            item_level, category, quantity, sell_price, stackable, equipped, affixes
        ) VALUES (
            :pid, :uid, :name, :base_type, :slot, :rarity,
            :ilvl, :cat, :qty, :price, :stack, :eq, :affixes
        )";
        $stmt = $pdo->prepare($sql);

        // Save equipped items
        foreach ($player->equipment as $slot => $item) {
            $arr = $item->toArray();
            $stmt->execute([
                'pid' => $playerId,
                'uid' => $arr['id'],
                'name' => $arr['name'],
                'base_type' => $arr['baseType'],
                'slot' => $arr['slot'],
                'rarity' => $arr['rarity'] ?? 'common',
                'ilvl' => $arr['itemLevel'] ?? 1,
                'cat' => $arr['category'] ?? 'weapon',
                'qty' => 1,
                'price' => $arr['sellPrice'] ?? 0,
                'stack' => 0,
                'eq' => 1,
                'affixes' => json_encode($arr['affixes'] ?? []),
            ]);
        }

        // Save inventory items
        foreach ($player->inventory as $item) {
            $arr = $item->toArray();
            $stmt->execute([
                'pid' => $playerId,
                'uid' => $arr['id'],
                'name' => $arr['name'],
                'base_type' => $arr['baseType'],
                'slot' => $arr['slot'],
                'rarity' => $arr['rarity'] ?? 'common',
                'ilvl' => $arr['itemLevel'] ?? 1,
                'cat' => $arr['category'] ?? 'weapon',
                'qty' => $arr['quantity'] ?? 1,
                'price' => $arr['sellPrice'] ?? 0,
                'stack' => $arr['stackable'] ?? 0,
                'eq' => 0,
                'affixes' => json_encode($arr['affixes'] ?? []),
            ]);
        }
    }

    /**
     * Save player skills to mapping table.
     */
    public static function saveSkills(string $playerId, Player $player): void
    {
        $pdo = Database::pdo();

        // Delete existing skills
        $del = $pdo->prepare("DELETE FROM player_skills WHERE player_id = :pid");
        $del->execute(['pid' => $playerId]);

        // Insert current skills
        $ins = $pdo->prepare("INSERT INTO player_skills (player_id, skill_id, level, current_xp, is_equipped) VALUES (:pid, :sid, :level, :xp, :eq)");
        foreach ($player->skills as $skill) {
            $sid = is_array($skill) ? ($skill['id'] ?? '') : $skill;
            $level = is_array($skill) ? ($skill['level'] ?? 1) : 1;
            $xp = is_array($skill) ? ($skill['currentXp'] ?? 0) : 0;
            $eq = is_array($skill) ? (isset($skill['isEquipped']) && $skill['isEquipped'] ? 1 : 0) : 0;
            if ($sid) {
                $ins->execute([
                    'pid' => $playerId,
                    'sid' => $sid,
                    'level' => $level,
                    'xp' => $xp,
                    'eq' => $eq
                ]);
            }
        }
    }

    // ===== QUESTS =====

    /**
     * Load active quests for a player.
     */
    public static function loadQuests(string $playerId): array
    {
        $pdo = Database::pdo();
        $stmt = $pdo->prepare("SELECT npc_id, quest_id, status, progress, accepted_at, completed_at FROM player_quests WHERE player_id = ? AND status = 'active'");
        $stmt->execute([$playerId]);
        return $stmt->fetchAll(\PDO::FETCH_ASSOC) ?: [];
    }

    /**
     * Save quests for a player (upsert).
     */
    public static function saveQuests(string $playerId, array $quests): void
    {
        $pdo = Database::pdo();
        $sql = "INSERT INTO player_quests (player_id, npc_id, quest_id, status, progress, accepted_at, completed_at)
                VALUES (:pid, :npc, :qid, :status, :prog, :at, :ct)
                ON DUPLICATE KEY UPDATE status = VALUES(status), progress = VALUES(progress), completed_at = VALUES(completed_at)";
        $stmt = $pdo->prepare($sql);
        foreach ($quests as $q) {
            $stmt->execute([
                'pid' => $playerId,
                'npc' => $q['npc_id'],
                'qid' => $q['quest_id'],
                'status' => $q['status'] ?? 'active',
                'prog' => $q['progress'] ?? 0,
                'at' => $q['accepted_at'] ?? time(),
                'ct' => $q['completed_at'] ?? null,
            ]);
        }
    }

    // ===== AUTH =====

    /**
     * Register a new player with username/password.
     */
    public static function register(string $username, string $password, string $name, string $gender): array
    {
        $pdo = Database::pdo();

        // Check username exists
        $check = $pdo->prepare("SELECT id FROM players WHERE username = :u");
        $check->execute(['u' => $username]);
        if ($check->fetch()) {
            return ['error' => 'Tên đăng nhập đã tồn tại'];
        }

        $id = bin2hex(random_bytes(8));
        $hash = password_hash($password, PASSWORD_DEFAULT);

        $player = new Player($name, $gender);

        // Set auth data on player before saving
        $player->username = $username;
        $player->passwordHash = $hash;

        self::save($id, $player);

        return ['id' => $id, 'player' => $player];
    }

    /**
     * Login with username/password.
     */
    public static function login(string $username, string $password): array
    {
        $pdo = Database::pdo();
        $stmt = $pdo->prepare("SELECT id, password_hash FROM players WHERE username = :u");
        $stmt->execute(['u' => $username]);
        $row = $stmt->fetch();

        if (!$row) {
            return ['error' => 'Tên đăng nhập không tồn tại'];
        }

        if (!password_verify($password, $row['password_hash'])) {
            return ['error' => 'Sai mật khẩu'];
        }

        $player = self::load($row['id']);
        return ['id' => $row['id'], 'player' => $player];
    }
}
