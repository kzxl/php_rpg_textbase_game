-- RPG Engine Database Schema
-- Run: mysql -u root < migrations/001_init.sql

CREATE DATABASE IF NOT EXISTS rpg_engine CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE rpg_engine;

-- ============================================
-- PLAYERS
-- ============================================
CREATE TABLE IF NOT EXISTS players (
    id VARCHAR(32) PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    gender ENUM('male','female') DEFAULT 'male',
    level INT UNSIGNED DEFAULT 1,
    xp INT UNSIGNED DEFAULT 0,
    xp_to_next INT UNSIGNED DEFAULT 100,
    current_hp INT UNSIGNED DEFAULT 100,
    max_hp INT UNSIGNED DEFAULT 100,
    current_energy INT UNSIGNED DEFAULT 50,
    max_energy INT UNSIGNED DEFAULT 50,
    stat_points INT UNSIGNED DEFAULT 0,

    -- Battle stats (JSON: {strength, speed, dexterity, defense})
    allocated_stats JSON DEFAULT NULL,

    -- Hospital / Cooldowns
    hospital_until INT UNSIGNED DEFAULT 0,
    med_cooldown_until INT UNSIGNED DEFAULT 0,
    last_hp_regen INT UNSIGNED DEFAULT 0,

    -- Crime (Nghịch Thiên)
    gold INT UNSIGNED DEFAULT 0,
    nerve INT UNSIGNED DEFAULT 15,
    max_nerve INT UNSIGNED DEFAULT 15,
    crime_exp INT UNSIGNED DEFAULT 0,
    crime_skills JSON DEFAULT NULL,
    jail_until INT UNSIGNED DEFAULT 0,

    -- Education (Tu Luyện)
    current_course VARCHAR(50) DEFAULT '',
    course_ends_at INT UNSIGNED DEFAULT 0,
    completed_courses JSON DEFAULT NULL,

    -- Skills
    skills JSON DEFAULT NULL,

    -- Travel (Ngao Du)
    current_area VARCHAR(50) DEFAULT 'thanh_lam_tran' COMMENT 'Current area ID',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ============================================
-- ITEMS (equipment + consumables + materials)
-- ============================================
CREATE TABLE IF NOT EXISTS player_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    player_id VARCHAR(32) NOT NULL,
    item_uid VARCHAR(50) NOT NULL COMMENT 'Unique instance ID',
    name VARCHAR(100) NOT NULL,
    base_type VARCHAR(50) NOT NULL,
    slot VARCHAR(20) NOT NULL DEFAULT 'none',
    rarity ENUM('common','rare','epic','legendary') DEFAULT 'common',
    item_level INT UNSIGNED DEFAULT 1,
    category ENUM('weapon','armor','medicine','material','treasure','special') DEFAULT 'weapon',
    quantity INT UNSIGNED DEFAULT 1,
    sell_price INT UNSIGNED DEFAULT 0,
    stackable BOOLEAN DEFAULT FALSE,
    equipped BOOLEAN DEFAULT FALSE,
    affixes JSON DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    INDEX idx_player (player_id),
    INDEX idx_category (player_id, category),
    INDEX idx_equipped (player_id, equipped),
    FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ============================================
-- AREAS (Ngao Du - Travel Zones)
-- ============================================
CREATE TABLE IF NOT EXISTS areas (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    min_level INT UNSIGNED DEFAULT 1 COMMENT 'Recommended min level',
    travel_time INT UNSIGNED DEFAULT 0 COMMENT 'Travel time in seconds',
    sort_order INT UNSIGNED DEFAULT 0
) ENGINE=InnoDB;

-- ============================================
-- AREA MONSTERS (which monsters spawn in which area)
-- ============================================
CREATE TABLE IF NOT EXISTS area_monsters (
    id INT AUTO_INCREMENT PRIMARY KEY,
    area_id VARCHAR(50) NOT NULL,
    monster_id VARCHAR(50) NOT NULL,
    spawn_weight INT UNSIGNED DEFAULT 10 COMMENT 'Higher = more common',
    min_level INT UNSIGNED DEFAULT 1,
    max_level INT UNSIGNED DEFAULT 10,

    INDEX idx_area (area_id),
    FOREIGN KEY (area_id) REFERENCES areas(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ============================================
-- MONSTER DROP TABLES
-- ============================================
CREATE TABLE IF NOT EXISTS monster_drops (
    id INT AUTO_INCREMENT PRIMARY KEY,
    monster_id VARCHAR(50) NOT NULL,
    item_id VARCHAR(50) NOT NULL COMMENT 'Reference to items.json base item ID or material ID',
    drop_chance DECIMAL(5,2) DEFAULT 10.00 COMMENT 'Percentage 0-100',
    min_quantity INT UNSIGNED DEFAULT 1,
    max_quantity INT UNSIGNED DEFAULT 1,
    min_monster_level INT UNSIGNED DEFAULT 1 COMMENT 'Monster must be at least this level',

    INDEX idx_monster (monster_id)
) ENGINE=InnoDB;

-- ============================================
-- SEED DATA: Areas
-- ============================================
INSERT INTO areas (id, name, description, min_level, travel_time, sort_order) VALUES
('thanh_lam_tran', 'Thanh Lam Trấn', 'Thị trấn nhỏ yên bình, quái vật cấp thấp quanh rìa.', 1, 0, 1),
('hac_phong_lam', 'Hắc Phong Lâm', 'Rừng tối u ám, đầy yêu thú và sơn tặc.', 3, 30, 2),
('vong_linh_coc', 'Vong Linh Cốc', 'Thung lũng cổ xưa, hồn ma và quái vật mạnh.', 5, 60, 3),
('thiết_huyết_sơn', 'Thiết Huyết Sơn', 'Núi lửa hung hiểm, quái vật cực mạnh.', 8, 120, 4),
('thiên_kiếp_uyên', 'Thiên Kiếp Uyên', 'Vực sâu tận cùng, nơi trú ngụ của ma tướng.', 12, 180, 5);

-- ============================================
-- SEED DATA: Area Monsters
-- ============================================
INSERT INTO area_monsters (area_id, monster_id, spawn_weight, min_level, max_level) VALUES
-- Thanh Lam Trấn
('thanh_lam_tran', 'slime', 30, 1, 3),
('thanh_lam_tran', 'wolf', 20, 1, 3),
('thanh_lam_tran', 'bandit', 10, 2, 4),
-- Hắc Phong Lâm
('hac_phong_lam', 'wolf', 25, 3, 5),
('hac_phong_lam', 'bandit', 20, 3, 6),
('hac_phong_lam', 'spider', 15, 4, 6),
('hac_phong_lam', 'ghost', 10, 4, 7),
-- Vong Linh Cốc
('vong_linh_coc', 'ghost', 25, 5, 8),
('vong_linh_coc', 'golem', 20, 5, 8),
('vong_linh_coc', 'shadow', 15, 6, 9),
('vong_linh_coc', 'wraith', 10, 7, 10),
-- Thiết Huyết Sơn
('thiết_huyết_sơn', 'golem', 20, 8, 12),
('thiết_huyết_sơn', 'demon', 20, 8, 12),
('thiết_huyết_sơn', 'dragon', 5, 10, 15),
-- Thiên Kiếp Uyên
('thiên_kiếp_uyên', 'demon', 25, 12, 18),
('thiên_kiếp_uyên', 'dragon', 15, 12, 20),
('thiên_kiếp_uyên', 'boss_demon', 5, 15, 25);

-- ============================================
-- SEED DATA: Monster Drops
-- ============================================
INSERT INTO monster_drops (monster_id, item_id, drop_chance, min_quantity, max_quantity, min_monster_level) VALUES
-- Slime
('slime', 'mat_slime_gel', 50.00, 1, 3, 1),
('slime', 'mat_crystal_shard', 10.00, 1, 1, 1),
-- Wolf
('wolf', 'mat_wolf_fang', 40.00, 1, 2, 1),
('wolf', 'mat_beast_hide', 30.00, 1, 2, 1),
-- Bandit
('bandit', 'mat_iron_ore', 25.00, 1, 2, 1),
('bandit', 'rusty_sword', 5.00, 1, 1, 1),
-- Ghost
('ghost', 'mat_spirit_essence', 35.00, 1, 2, 1),
('ghost', 'mat_crystal_shard', 20.00, 1, 2, 4),
-- Golem
('golem', 'mat_iron_ore', 40.00, 2, 5, 1),
('golem', 'mat_ancient_stone', 25.00, 1, 2, 5),
-- Demon
('demon', 'mat_demon_core', 30.00, 1, 1, 1),
('demon', 'mat_spirit_essence', 20.00, 1, 3, 8),
-- Dragon
('dragon', 'mat_dragon_scale', 40.00, 1, 3, 1),
('dragon', 'mat_demon_core', 25.00, 1, 2, 10),
('dragon', 'tre_dragon_pearl', 5.00, 1, 1, 12);
