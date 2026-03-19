-- Migration 002: Player Skills Mapping + Auth Login
-- 1. Normalize skills: JSON blob → player_skills table
-- 2. Add auth: username + password_hash columns

-- === SKILLS MAPPING TABLE ===
CREATE TABLE IF NOT EXISTS player_skills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    player_id VARCHAR(32) NOT NULL,
    skill_id VARCHAR(64) NOT NULL,
    learned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_player_skill (player_id, skill_id),
    FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Migrate existing JSON skill data → mapping table
INSERT IGNORE INTO player_skills (player_id, skill_id)
SELECT p.id, JSON_UNQUOTE(j.skill_id)
FROM players p
CROSS JOIN JSON_TABLE(
    p.skills,
    '$[*]' COLUMNS (
        skill_id VARCHAR(64) PATH '$.id'
    )
) AS j
WHERE p.skills IS NOT NULL AND p.skills != '[]' AND p.skills != 'null';

-- Drop skills JSON column
ALTER TABLE players DROP COLUMN IF EXISTS skills;

-- === AUTH: Login System ===
ALTER TABLE players
    ADD COLUMN username VARCHAR(64) UNIQUE AFTER id,
    ADD COLUMN password_hash VARCHAR(255) AFTER username;

-- Set default username = name for existing players
UPDATE players SET username = CONCAT(LOWER(REPLACE(name, ' ', '_')), '_', SUBSTRING(id, 1, 4))
WHERE username IS NULL;

-- Make username NOT NULL after migration
ALTER TABLE players MODIFY COLUMN username VARCHAR(64) NOT NULL;
