<?php

namespace App\Core;

use App\Models\Player;

/**
 * Player persistence via MySQL.
 * Replaces JSON file storage with database queries.
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
            id, name, gender, level, xp, xp_to_next,
            current_hp, max_hp, current_energy, max_energy, stat_points,
            allocated_stats, hospital_until, med_cooldown_until, last_hp_regen,
            gold, nerve, max_nerve, crime_exp, crime_skills, jail_until,
            current_course, course_ends_at, completed_courses, skills, current_area
        ) VALUES (
            :id, :name, :gender, :level, :xp, :xp_to_next,
            :current_hp, :max_hp, :current_energy, :max_energy, :stat_points,
            :allocated_stats, :hospital_until, :med_cooldown_until, :last_hp_regen,
            :gold, :nerve, :max_nerve, :crime_exp, :crime_skills, :jail_until,
            :current_course, :course_ends_at, :completed_courses, :skills, :current_area
        ) ON DUPLICATE KEY UPDATE
            name = VALUES(name), gender = VALUES(gender),
            level = VALUES(level), xp = VALUES(xp), xp_to_next = VALUES(xp_to_next),
            current_hp = VALUES(current_hp), max_hp = VALUES(max_hp),
            current_energy = VALUES(current_energy), max_energy = VALUES(max_energy),
            stat_points = VALUES(stat_points), allocated_stats = VALUES(allocated_stats),
            hospital_until = VALUES(hospital_until), med_cooldown_until = VALUES(med_cooldown_until),
            last_hp_regen = VALUES(last_hp_regen),
            gold = VALUES(gold), nerve = VALUES(nerve), max_nerve = VALUES(max_nerve),
            crime_exp = VALUES(crime_exp), crime_skills = VALUES(crime_skills),
            jail_until = VALUES(jail_until),
            current_course = VALUES(current_course), course_ends_at = VALUES(course_ends_at),
            completed_courses = VALUES(completed_courses), skills = VALUES(skills),
            current_area = VALUES(current_area)";

        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            'id' => $id,
            'name' => $data['name'],
            'gender' => $data['gender'],
            'level' => $data['level'],
            'xp' => $data['xp'],
            'xp_to_next' => $data['xpToNext'],
            'current_hp' => $data['currentHp'],
            'max_hp' => $data['maxHp'],
            'current_energy' => $data['currentEnergy'],
            'max_energy' => $data['maxEnergy'],
            'stat_points' => $data['statPoints'],
            'allocated_stats' => json_encode($data['allocatedStats'] ?? []),
            'hospital_until' => $data['hospitalUntil'] ?? 0,
            'med_cooldown_until' => $data['medCooldownUntil'] ?? 0,
            'last_hp_regen' => $data['lastHpRegen'] ?? 0,
            'gold' => $data['gold'] ?? 0,
            'nerve' => $data['nerve'] ?? 15,
            'max_nerve' => $data['maxNerve'] ?? 15,
            'crime_exp' => $data['crimeExp'] ?? 0,
            'crime_skills' => json_encode($data['crimeSkills'] ?? []),
            'jail_until' => $data['jailUntil'] ?? 0,
            'current_course' => $data['currentCourse'] ?? '',
            'course_ends_at' => $data['courseEndsAt'] ?? 0,
            'completed_courses' => json_encode($data['completedCourses'] ?? []),
            'skills' => json_encode($data['skills'] ?? []),
            'current_area' => $data['currentArea'] ?? 'thanh_lam_tran',
        ]);
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
            'name' => $row['name'],
            'gender' => $row['gender'],
            'level' => (int) $row['level'],
            'xp' => (int) $row['xp'],
            'xpToNext' => (int) $row['xp_to_next'],
            'currentHp' => (int) $row['current_hp'],
            'maxHp' => (int) $row['max_hp'],
            'currentEnergy' => (int) $row['current_energy'],
            'maxEnergy' => (int) $row['max_energy'],
            'statPoints' => (int) $row['stat_points'],
            'allocatedStats' => json_decode($row['allocated_stats'] ?? '{}', true) ?: [],
            'hospitalUntil' => (int) $row['hospital_until'],
            'medCooldownUntil' => (int) $row['med_cooldown_until'],
            'lastHpRegen' => (int) $row['last_hp_regen'],
            'gold' => (int) $row['gold'],
            'nerve' => (int) $row['nerve'],
            'maxNerve' => (int) $row['max_nerve'],
            'crimeExp' => (int) $row['crime_exp'],
            'crimeSkills' => json_decode($row['crime_skills'] ?? '[]', true) ?: [],
            'jailUntil' => (int) $row['jail_until'],
            'currentCourse' => $row['current_course'] ?? '',
            'courseEndsAt' => (int) $row['course_ends_at'],
            'completedCourses' => json_decode($row['completed_courses'] ?? '[]', true) ?: [],
            'skills' => json_decode($row['skills'] ?? '[]', true) ?: [],
            'currentArea' => $row['current_area'] ?? 'thanh_lam_tran',
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
}
