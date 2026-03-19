<?php

/**
 * Migration 011: Create game data tables + seed from JSON files.
 * Replaces JSON file reads with DB storage for flat game data.
 */

require_once __DIR__ . '/../src/Core/Database.php';
use App\Core\Database;

try {
    $pdo = Database::pdo();
    $dataDir = __DIR__ . '/../data';

    // ========================================
    // 1. CREATE TABLES
    // ========================================

    $pdo->exec("CREATE TABLE IF NOT EXISTS game_monsters (
        id VARCHAR(64) PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        tier INT DEFAULT 1,
        area_id VARCHAR(64) DEFAULT 'thanh_lam_tran',
        is_world_boss TINYINT(1) DEFAULT 0,
        stats JSON,
        xp_reward INT DEFAULT 10,
        gold_reward JSON,
        drops JSON,
        regen_per_hour INT DEFAULT 0,
        description TEXT,
        data JSON
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
    echo "[OK] game_monsters\n";

    $pdo->exec("CREATE TABLE IF NOT EXISTS game_skills (
        id VARCHAR(64) PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        type VARCHAR(32),
        description TEXT,
        effects JSON,
        data JSON
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
    echo "[OK] game_skills\n";

    $pdo->exec("CREATE TABLE IF NOT EXISTS game_items (
        id VARCHAR(64) PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        slot VARCHAR(32),
        rarity VARCHAR(20) DEFAULT 'common',
        stats JSON,
        data JSON
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
    echo "[OK] game_items\n";

    $pdo->exec("CREATE TABLE IF NOT EXISTS game_materials (
        id VARCHAR(64) PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        category VARCHAR(32) DEFAULT 'basic',
        rarity VARCHAR(20) DEFAULT 'common',
        description TEXT,
        data JSON
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
    echo "[OK] game_materials\n";

    $pdo->exec("CREATE TABLE IF NOT EXISTS game_crimes (
        id VARCHAR(64) PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        category VARCHAR(32) DEFAULT 'theft',
        nerve_cost INT DEFAULT 2,
        base_success_rate INT DEFAULT 50,
        min_skill INT DEFAULT 0,
        icon VARCHAR(10) DEFAULT '',
        rewards JSON,
        fail_penalty JSON,
        crit_fail_chance INT DEFAULT 5,
        crit_fail_penalty JSON,
        special JSON,
        description TEXT
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
    echo "[OK] game_crimes\n";

    $pdo->exec("CREATE TABLE IF NOT EXISTS game_npcs (
        id VARCHAR(64) PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        profession VARCHAR(64),
        icon VARCHAR(10) DEFAULT '🧓',
        area_ids JSON,
        greeting TEXT,
        teachable_skills JSON,
        data JSON
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
    echo "[OK] game_npcs\n";

    $pdo->exec("CREATE TABLE IF NOT EXISTS game_npc_quests (
        id VARCHAR(64) PRIMARY KEY,
        npc_id VARCHAR(64) NOT NULL,
        name VARCHAR(100) NOT NULL,
        type VARCHAR(20) DEFAULT 'collect',
        target VARCHAR(64),
        amount INT DEFAULT 1,
        description TEXT,
        rewards JSON,
        INDEX idx_npc (npc_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
    echo "[OK] game_npc_quests\n";

    $pdo->exec("CREATE TABLE IF NOT EXISTS game_medicines (
        id VARCHAR(64) PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        hp_restore INT DEFAULT 0,
        energy_restore INT DEFAULT 0,
        cooldown INT DEFAULT 0,
        data JSON
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
    echo "[OK] game_medicines\n";

    // ========================================
    // 2. SEED DATA FROM JSON
    // ========================================

    // --- Monsters ---
    $monstersJson = json_decode(file_get_contents("$dataDir/monsters.json"), true);
    $monsters = $monstersJson['monsters'] ?? $monstersJson;
    $stmtM = $pdo->prepare("INSERT IGNORE INTO game_monsters (id, name, tier, area_id, is_world_boss, stats, xp_reward, gold_reward, drops, regen_per_hour, description, data) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)");
    foreach ($monsters as $m) {
        $stmtM->execute([
            $m['id'], $m['name'], $m['tier'] ?? 1, $m['areaId'] ?? 'thanh_lam_tran',
            !empty($m['isWorldBoss']) ? 1 : 0,
            json_encode($m['stats'] ?? []), $m['xpReward'] ?? 10,
            json_encode($m['goldReward'] ?? [0, 0]),
            json_encode($m['drops'] ?? []), $m['regenPerHour'] ?? 0,
            $m['description'] ?? '', json_encode($m)
        ]);
    }
    echo "[SEED] " . count($monsters) . " monsters\n";

    // --- Skills ---
    $skillsJson = json_decode(file_get_contents("$dataDir/skills.json"), true);
    $skills = $skillsJson['skills'] ?? $skillsJson;
    $stmtS = $pdo->prepare("INSERT IGNORE INTO game_skills (id, name, type, description, effects, data) VALUES (?,?,?,?,?,?)");
    foreach ($skills as $s) {
        $stmtS->execute([
            $s['id'], $s['name'], $s['type'] ?? 'passive',
            $s['description'] ?? '', json_encode($s['effects'] ?? []), json_encode($s)
        ]);
    }
    echo "[SEED] " . count($skills) . " skills\n";

    // --- Items ---
    $itemsJson = json_decode(file_get_contents("$dataDir/items.json"), true);
    $items = $itemsJson['items'] ?? $itemsJson['bases'] ?? $itemsJson;
    $stmtI = $pdo->prepare("INSERT IGNORE INTO game_items (id, name, slot, rarity, stats, data) VALUES (?,?,?,?,?,?)");
    foreach ($items as $item) {
        $stmtI->execute([
            $item['id'], $item['name'], $item['slot'] ?? 'weapon',
            $item['rarity'] ?? 'common', json_encode($item['stats'] ?? []), json_encode($item)
        ]);
    }
    echo "[SEED] " . count($items) . " items\n";

    // --- Materials ---
    $matsJson = json_decode(file_get_contents("$dataDir/materials.json"), true);
    $mats = $matsJson['materials'] ?? $matsJson;
    $stmtMat = $pdo->prepare("INSERT IGNORE INTO game_materials (id, name, category, rarity, description, data) VALUES (?,?,?,?,?,?)");
    foreach ($mats as $mat) {
        $stmtMat->execute([
            $mat['id'], $mat['name'], $mat['category'] ?? 'basic',
            $mat['rarity'] ?? 'common', $mat['description'] ?? '', json_encode($mat)
        ]);
    }
    echo "[SEED] " . count($mats) . " materials\n";

    // --- Crimes ---
    $crimes = json_decode(file_get_contents("$dataDir/crimes.json"), true);
    $stmtC = $pdo->prepare("INSERT IGNORE INTO game_crimes (id, name, category, nerve_cost, base_success_rate, min_skill, icon, rewards, fail_penalty, crit_fail_chance, crit_fail_penalty, special, description) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)");
    foreach ($crimes as $c) {
        $stmtC->execute([
            $c['id'], $c['name'], $c['category'] ?? 'theft',
            $c['nerveCost'], $c['baseSuccessRate'], $c['minSkill'] ?? 0,
            $c['icon'] ?? '', json_encode($c['rewards']),
            json_encode($c['failPenalty']), $c['critFailChance'] ?? 5,
            json_encode($c['critFailPenalty']), json_encode($c['special'] ?? []),
            $c['description'] ?? ''
        ]);
    }
    echo "[SEED] " . count($crimes) . " crimes\n";

    // --- NPCs + Quests ---
    $npcsJson = json_decode(file_get_contents("$dataDir/npcs.json"), true);
    $npcs = $npcsJson['npcs'] ?? $npcsJson;
    $stmtN = $pdo->prepare("INSERT IGNORE INTO game_npcs (id, name, profession, icon, area_ids, greeting, teachable_skills, data) VALUES (?,?,?,?,?,?,?,?)");
    $stmtQ = $pdo->prepare("INSERT IGNORE INTO game_npc_quests (id, npc_id, name, type, target, amount, description, rewards) VALUES (?,?,?,?,?,?,?,?)");
    $questCount = 0;
    foreach ($npcs as $n) {
        $stmtN->execute([
            $n['id'], $n['name'], $n['profession'] ?? '',
            $n['icon'] ?? '🧓', json_encode($n['areaIds'] ?? []),
            $n['greeting'] ?? '', json_encode($n['teachableSkills'] ?? []),
            json_encode($n)
        ]);
        foreach ($n['quests'] ?? [] as $q) {
            $stmtQ->execute([
                $q['id'], $n['id'], $q['name'], $q['type'] ?? 'collect',
                $q['target'] ?? '', $q['amount'] ?? 1,
                $q['description'] ?? '', json_encode($q['rewards'] ?? [])
            ]);
            $questCount++;
        }
    }
    echo "[SEED] " . count($npcs) . " NPCs + $questCount quests\n";

    // --- Medicines ---
    $medsJson = json_decode(file_get_contents("$dataDir/medicines.json"), true);
    $meds = $medsJson['medicines'] ?? $medsJson;
    $stmtMed = $pdo->prepare("INSERT IGNORE INTO game_medicines (id, name, hp_restore, energy_restore, cooldown, data) VALUES (?,?,?,?,?,?)");
    foreach ($meds as $med) {
        $stmtMed->execute([
            $med['id'], $med['name'], $med['hpRestore'] ?? 0,
            $med['energyRestore'] ?? 0, $med['cooldown'] ?? 0, json_encode($med)
        ]);
    }
    echo "[SEED] " . count($meds) . " medicines\n";

    // --- Exploration Areas ---
    $pdo->exec("CREATE TABLE IF NOT EXISTS game_areas (
        id VARCHAR(64) PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        stamina_cost INT DEFAULT 10,
        rates JSON,
        data JSON
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
    echo "[OK] game_areas\n";

    $explorationJson = json_decode(file_get_contents("$dataDir/exploration.json"), true);
    $stmtArea = $pdo->prepare("INSERT IGNORE INTO game_areas (id, name, stamina_cost, rates, data) VALUES (?,?,?,?,?)");
    $areaCount = 0;
    foreach ($explorationJson as $areaId => $areaData) {
        $stmtArea->execute([
            $areaId,
            $areaData['name'] ?? $areaId,
            $areaData['staminaCost'] ?? 10,
            json_encode($areaData['rates'] ?? []),
            json_encode($areaData)
        ]);
        $areaCount++;
    }
    echo "[SEED] $areaCount areas\n";

    // --- Education Trees ---
    $pdo->exec("CREATE TABLE IF NOT EXISTS game_education_trees (
        id VARCHAR(64) PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        icon VARCHAR(10) DEFAULT '',
        nodes JSON,
        milestones JSON,
        data JSON
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
    echo "[OK] game_education_trees\n";

    $educationJson = json_decode(file_get_contents("$dataDir/education.json"), true);
    $stmtEdu = $pdo->prepare("INSERT IGNORE INTO game_education_trees (id, name, description, icon, nodes, milestones, data) VALUES (?,?,?,?,?,?,?)");
    foreach ($educationJson as $tree) {
        $stmtEdu->execute([
            $tree['id'], $tree['name'], $tree['description'] ?? '',
            $tree['icon'] ?? '', json_encode($tree['nodes'] ?? []),
            json_encode($tree['milestones'] ?? []), json_encode($tree)
        ]);
    }
    echo "[SEED] " . count($educationJson) . " education trees\n";

    // --- Recipes ---
    $pdo->exec("CREATE TABLE IF NOT EXISTS game_recipes (
        id VARCHAR(64) PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        target VARCHAR(64),
        type VARCHAR(32) DEFAULT 'medicine',
        tier INT DEFAULT 1,
        requirements JSON,
        materials JSON,
        cost INT DEFAULT 0,
        success_rate INT DEFAULT 50,
        craft_time INT DEFAULT 5,
        data JSON
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
    echo "[OK] game_recipes\n";

    $recipesJson = json_decode(file_get_contents("$dataDir/recipes.json"), true);
    $recipes = $recipesJson['recipes'] ?? $recipesJson;
    $stmtR = $pdo->prepare("INSERT IGNORE INTO game_recipes (id, name, target, type, tier, requirements, materials, cost, success_rate, craft_time, data) VALUES (?,?,?,?,?,?,?,?,?,?,?)");
    foreach ($recipes as $r) {
        $stmtR->execute([
            $r['id'], $r['name'], $r['target'] ?? '',
            $r['type'] ?? 'medicine', $r['tier'] ?? 1,
            json_encode($r['requirements'] ?? []),
            json_encode($r['materials'] ?? []),
            $r['cost'] ?? 0, $r['successRate'] ?? 50,
            $r['craftTime'] ?? 5, json_encode($r)
        ]);
    }
    echo "[SEED] " . count($recipes) . " recipes\n";

    echo "\n✅ Migration 011: All 11 game data tables created and seeded.\n";
} catch (Exception $e) {
    echo "❌ Migration 011 failed: " . $e->getMessage() . "\n";
    echo $e->getTraceAsString() . "\n";
}

