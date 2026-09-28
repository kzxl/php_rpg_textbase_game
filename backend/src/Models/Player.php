<?php

namespace App\Models;

use App\Core\StatEngine;
use App\Core\ModifierEngine;

/**
 * Player entity with gender-based stats, equipment, and skills.
 */
class Player
{
    public string $id = '';
    public string $name;
    public string $username = '';
    public string $passwordHash = '';
    public string $gender; // 'male' | 'female'
    public int $level = 1;
    public int $xp = 0;
    public int $xpToNext = 100;
    public int $currentHp = 100;
    public int $maxHp = 100;
    public int $currentEnergy = 50;
    public int $maxEnergy = 50;
    public int $currentStamina = 100; // Thể Lực
    public int $maxStamina = 100;
    public int $statPoints = 0;

    /** @var int Unix timestamp when hospital ends (0 = not hospitalized) */
    public int $hospitalUntil = 0;
    /** @var int Unix timestamp when shared med cooldown expires (Torn-style stacking) */
    public int $medCooldownUntil = 0;
    /** @var int Unix timestamp when mugging cooldown expires */
    public int $mugCooldownUntil = 0;
    public ?string $pendingMugVictim = null;
    public ?int $pendingMugExpiry = null;
    /** @var string Active displayed title */
    public string $activeTitle = '';
    /** @var int Max med cooldown cap in seconds */
    private const MED_COOLDOWN_CAP = 300; // 5 minutes
    /** @var int Last HP regen timestamp (meditation) */
    public int $lastHpRegen = 0;
    
    // --- Glitch System (Thiên Đạo Bị Lỗi) ---
    public int $glitchInsight = 0;
    public array $behaviorCounters = [];
    public array $unlockedImprints = [];
    public string $activeStance = 'breaker';
    
    // --- Phase 1: Crimes + Jail + Education ---
    public int $gold = 0;
    public int $nerve = 15;
    public int $maxNerve = 15;
    public int $crimeExp = 0; // hidden, determines maxNerve growth
    public array $crimeSkills = []; // ['search_trash' => 5, 'shoplift' => 2]
    public int $jailUntil = 0;
    public string $studyingNode = ''; // education node id being studied
    public int $studyEndsAt = 0; // unix timestamp
    public array $unlockedNodes = []; // array of learned node ids
    public array $treeProgress = []; // points per tree, e.g. ['internal_cultivation' => 5]
    public array $skillProgress = []; // {nodeId: {level: 1, exp: 0}}
    public array $discoveredNodes = []; // manually unlocked nodes via items
    public array $discoveredMonsters = []; // monster IDs discovered through combat
    public array $discoveredItems = []; // item IDs discovered through inventory
    public array $trackedMonsters = []; // [{instance_id, monster_id, hp_current}]
    public int $lastMonsterSpawn = 0; // unix
    public string $currentArea = 'thanh_lam_tran'; // Ngao Du — current area
    public ?string $travelingTo = null; // Travel destination area ID
    public int $travelArrivesAt = 0; // Unix timestamp when travel completes
    public array $activeQuests = []; // Phase 9: [{npc_id, quest_id, status, progress, accepted_at}]
    public string $role = 'player'; // Phase 10: 'player' | 'admin'
    public int $realmTier = 1; // Cảnh giới hiện tại (1-8), cần đột phá để lên tier
    public int $createdAt = 0; // Unix timestamp when account was created
    public int $craftingLevel = 1; // Luyện Đan Thuật level (1-100)
    public int $craftingXp = 0; // Crafting XP for current level
    public string $gymDate = ''; // today's date for session tracking
    public int $gymSessions = 0; // sessions done today
    public int $gymCooldownUntil = 0; // unix cooldown timestamp
    public int $gymStreak = 0; // consecutive training days
    public string $lastGymDate = ''; // last training date for streak
    public array $tienCanhMaps = []; // Tiên Đồ inventory [{mapId, tier, modifiers}]
    public array $atlasProgress = []; // {mapId: timesCompleted}
    public int $atlasBonus = 0; // IIQ bonus from atlas completion
    public array $activeAuras = []; // Array of active aura IDs reserving mana
    public array $tribulationRecords = []; // History of survived heavenly tribulations
    public string $multiplayerStatus = 'normal'; // 'normal' | 'hospital' | 'jailed' | 'traveling'
    public int $pendingEscrow = 0; // Unclaimed Linh Thạch in Merchant Escrow
    public int $divineWardUntil = 0; // 90s Divine Protection Shield timestamp
    public int $tamCanh = 100; // Tâm Cảnh (0-100)

    /**
     * Danh mục Tâm Pháp Hào Quang & Tỷ Lệ Khóa Linh Lực (Mana Reservation)
     */
    public const AURA_CONFIGS = [
        'ho_the_kim_chung' => [
            'id' => 'ho_the_kim_chung',
            'name' => 'Hộ Thể Kim Chung',
            'icon' => '🛡️',
            'category' => 'internal',
            'reservationPct' => 20,
            'desc' => 'Khóa 20% Linh Lực tối đa. Tăng +25 Giáp & +100 Máu, giảm 20% sát thương lôi kiếp.',
            'statBonuses' => ['defense' => 25, 'maxHp' => 100]
        ],
        'than_hanh_bo' => [
            'id' => 'than_hanh_bo',
            'name' => 'Thần Hành Hào Quang',
            'icon' => '💨',
            'category' => 'internal',
            'reservationPct' => 15,
            'desc' => 'Khóa 15% Linh Lực tối đa. Tăng +20 Tốc độ & +15 Thân pháp né tránh.',
            'statBonuses' => ['speed' => 20, 'dexterity' => 15]
        ],
        'hoa_diem_chan_khi' => [
            'id' => 'hoa_diem_chan_khi',
            'name' => 'Hỏa Diễm Chân Khí',
            'icon' => '🔥',
            'category' => 'internal',
            'reservationPct' => 25,
            'desc' => 'Khóa 25% Linh Lực tối đa. Tăng +25 Lực đạo & +10% Tỷ lệ Bạo Kích.',
            'statBonuses' => ['strength' => 25, 'critChance' => 10]
        ],
        'toa_thien' => [
            'id' => 'toa_thien',
            'name' => 'Toạ Thiền Tụ Khí',
            'icon' => '🧘',
            'category' => 'internal',
            'reservationPct' => 10,
            'desc' => 'Khóa 10% Linh Lực tối đa. Gia tăng tốc độ hồi phục Khí Huyết & Thể Lực.',
            'statBonuses' => ['hpRegen' => 5, 'staminaRegen' => 2]
        ]
    ];

    public function getReservedEnergy(): int
    {
        $totalPct = 0;
        foreach ($this->activeAuras as $auraId) {
            if (isset(self::AURA_CONFIGS[$auraId])) {
                $totalPct += self::AURA_CONFIGS[$auraId]['reservationPct'];
            }
        }
        return (int)floor($this->maxEnergy * (min(85, $totalPct) / 100));
    }

    public function getUsableEnergy(): int
    {
        return max(5, $this->maxEnergy - $this->getReservedEnergy());
    }

    /** @var array Base stat allocations */
    private array $baseStats;

    /** @var array Stat point allocations */
    public array $allocatedStats = [
        'strength' => 0, 'speed' => 0, 'dexterity' => 0, 'defense' => 0
    ];

    /** @var Item[] Equipped items */
    public array $equipment = [];

    /** @var Item[] Inventory */
    public array $inventory = [];

    /** @var array Stash for stackable materials (id => amount) */
    public array $materials = [];

    /** @var array Owned medicines (id => amount) */
    public array $medicines = [];

    /** @var array Active/passive skills */
    public array $skills = [];

    /** @var array Talent/Aptitude multipliers per stat {strength: 1.0, speed: 0.5, ...} */
    public array $talents = [
        'strength' => 1.0, 'speed' => 1.0, 'dexterity' => 1.0, 'defense' => 1.0
    ];

    /** Talent tier definitions */
    private const TALENT_TIERS = [
        ['value' => 0.5, 'weight' => 20, 'name' => 'Phế Mạch',  'icon' => '❌', 'color' => '#888'],
        ['value' => 1.0, 'weight' => 40, 'name' => 'Phàm Cốt',  'icon' => '⚪', 'color' => '#ccc'],
        ['value' => 1.5, 'weight' => 25, 'name' => 'Lương Cốt',  'icon' => '🟢', 'color' => '#4ade80'],
        ['value' => 2.0, 'weight' => 12, 'name' => 'Linh Cốt',  'icon' => '🔵', 'color' => '#60a5fa'],
        ['value' => 3.0, 'weight' => 3,  'name' => 'Thiên Cốt',  'icon' => '🟡', 'color' => '#fbbf24'],
    ];

    /** @var array Temporary buffs from pills e.g. [{id, type, stat, value, duration}] */
    public array $combatBuffs = [];

    /** @var Modifier[] Extra modifiers (title, hidden, etc.) */
    private array $extraModifiers = [];

    public function __construct(string $name, string $gender)
    {
        $this->name = $name;
        $this->gender = $gender;
        $this->baseStats = StatEngine::getBaseStats($gender);
        $this->talents = self::generateRandomTalents();
        $this->recalcDerived();
        $this->currentHp = $this->maxHp;
        $this->currentEnergy = $this->maxEnergy;
    }

    /**
     * Roll random talent tier for each stat based on weighted probability.
     */
    public static function generateRandomTalents(): array
    {
        $talents = [];
        foreach (['strength', 'speed', 'dexterity', 'defense'] as $stat) {
            $roll = mt_rand(1, 100);
            $cum = 0;
            foreach (self::TALENT_TIERS as $tier) {
                $cum += $tier['weight'];
                if ($roll <= $cum) {
                    $talents[$stat] = $tier['value'];
                    break;
                }
            }
        }
        return $talents;
    }

    /**
     * Get talent tier info for a given stat.
     */
    public function getTalentInfo(string $stat): array
    {
        $val = $this->talents[$stat] ?? 1.0;
        foreach (self::TALENT_TIERS as $tier) {
            if (abs($tier['value'] - $val) < 0.01) return $tier;
        }
        return self::TALENT_TIERS[1]; // default Phàm Cốt
    }

    /**
     * Get all talent info for frontend display.
     */
    public function getTalentDisplay(): array
    {
        $result = [];
        foreach ($this->talents as $stat => $val) {
            $info = $this->getTalentInfo($stat);
            $result[$stat] = [
                'value' => $val,
                'name' => $info['name'],
                'icon' => $info['icon'],
                'color' => $info['color'],
            ];
        }
        return $result;
    }

    /**
     * Get all gathered modifiers from every source.
     * @return Modifier[]
     */
    public function gatherModifiers(): array
    {
        $mods = [];

        // Gender bonuses
        $mods = array_merge($mods, StatEngine::getGenderModifiers($this->gender));

        // Level HP bonus: Mỗi cấp độ tăng thêm 5 Max HP cơ bản
        $levelHpBonus = max(0, ($this->level - 1) * 5);
        if ($levelHpBonus > 0) {
            $mods[] = new Modifier('flat', 'maxHp', (float)$levelHpBonus, null, 'level_hp');
        }

        // Allocated stat points as flat modifiers
        foreach ($this->allocatedStats as $stat => $points) {
            if ($points > 0) {
                $mods[] = new Modifier('flat', $stat, $points, null, 'statpoint');
            }
        }

        // Equipment modifiers
        foreach ($this->equipment as $item) {
            $mods = array_merge($mods, $item->getModifiers());
        }

        // Skill modifiers (passive)
        foreach ($this->skills as $skill) {
            if (($skill['type'] ?? 'active') === 'passive' && !empty($skill['modifiers'])) {
                foreach ($skill['modifiers'] as $modData) {
                    $mods[] = Modifier::fromArray($modData);
                }
            }
        }

        // Pill combat buffs
        foreach ($this->combatBuffs as $buff) {
            $mods[] = new Modifier($buff['type'], $buff['stat'], $buff['value'], null, $buff['id'] ?? 'pill');
        }

        // Extra modifiers (titles, hidden, etc.)
        $mods = array_merge($mods, $this->extraModifiers);

        // Glitch Imprints (Dấu Ấn Lỗi Thiên Đạo)
        if (!empty($this->unlockedImprints)) {
            $mods = array_merge($mods, \App\Systems\GlitchSystem::getImprintModifiers($this->unlockedImprints));
        }

        // Glitch Combat Stance (Thế Chiến Đấu)
        if (!empty($this->activeStance)) {
            $mods = array_merge($mods, \App\Systems\GlitchSystem::getStanceModifiers($this->activeStance));
        }

        // Environment modifiers
        $envMods = [
            'hac_phong_lam' => [new Modifier('increase', 'speed', 0.05, null, 'env_forest')],
            'vong_linh_coc' => [new Modifier('increase', 'dexterity', 0.1, null, 'env_dark')],
            'thiet_huyet_son' => [new Modifier('increase', 'fireDamage', 0.1, null, 'env_fire')],
            'thien_kiep_uyen' => [new Modifier('increase', 'speed', 0.15, null, 'env_lightning')],
            'bac_suong_canh' => [new Modifier('decrease', 'speed', 0.1, null, 'env_freeze')],
            'am_sat_hoang' => [new Modifier('more', 'dexterity', 15, null, 'env_crit')],
            'co_moc_linh_vien' => [new Modifier('increase', 'defense', 0.15, null, 'env_wood')],
            'huyet_ma_chien_truong' => [new Modifier('increase', 'damage', 0.3, null, 'env_blood'), new Modifier('increase', 'damageTaken', 0.2, null, 'env_blood_vuln')],
            'thien_hoa_linh_dia' => [new Modifier('increase', 'fireDamage', 0.25, null, 'env_hellfire')],
            'u_minh_quy_vuc' => [new Modifier('decrease', 'defense', 0.15, null, 'env_soul')],
            'thien_dao_tan_tich' => [new Modifier('increase', 'allStats', 0.15, null, 'env_law')],
            'vo_tan_hu_khong' => [new Modifier('increase', 'damage', 0.5, null, 'env_void'), new Modifier('increase', 'damageTaken', 0.3, null, 'env_void')],
            'cuu_u_than_uyen' => [new Modifier('increase', 'damage', 0.35, null, 'env_abyss'), new Modifier('increase', 'speed', 0.2, null, 'env_abyss')],
            'thai_co_hong_hoang' => [new Modifier('increase', 'maxHp', 0.25, null, 'env_primordial'), new Modifier('increase', 'defense', 0.2, null, 'env_primordial')],
            'chu_thien_tinh_hai' => [new Modifier('increase', 'speed', 0.3, null, 'env_stars'), new Modifier('increase', 'dexterity', 0.25, null, 'env_stars')],
            'hon_don_tien_vuc' => [new Modifier('increase', 'allStats', 0.35, null, 'env_chaos')],
            'hon_nguyen_dao_canh' => [new Modifier('increase', 'damage', 0.6, null, 'env_dao'), new Modifier('increase', 'allStats', 0.5, null, 'env_dao')]
        ];

        if (isset($envMods[$this->currentArea])) {
            $mods = array_merge($mods, $envMods[$this->currentArea]);
        }

        // Realm bonuses (Cảnh giới tu vi gia trì)
        $realmBonuses = \App\Systems\RealmSystem::getCumulativeBonuses($this->realmTier);
        foreach ($realmBonuses as $stat => $val) {
            if ($val > 0) {
                $mods[] = new Modifier('flat', $stat, (float)$val, null, 'realm');
            }
        }

        // Active Mana Reservation Auras (Tâm Pháp Hào Quang Chiếm Dụng Linh Lực)
        foreach ($this->activeAuras as $auraId) {
            $auraDef = self::AURA_CONFIGS[$auraId] ?? null;
            if ($auraDef && !empty($auraDef['statBonuses'])) {
                foreach ($auraDef['statBonuses'] as $stat => $val) {
                    $mods[] = new Modifier('flat', $stat, (float)$val, null, 'aura_' . $auraId);
                }
            }
        }

        return $mods;
    }

    /**
     * Heal stamina fully.
     */
    public function healStamina(): void
    {
        $this->currentStamina = $this->maxStamina;
    }

    /**
     * Spend stamina. Returns true if successful.
     */
    public function spendStamina(int $amount): bool
    {
        if ($this->currentStamina < $amount) {
            return false;
        }
        $this->currentStamina -= $amount;
        return true;
    }

    /**
     * Calculate final stats including all modifiers and derived stats.
     */
    public function getFinalStats(): array
    {
        $context = [
            'hp_percent' => $this->maxHp > 0 ? $this->currentHp / $this->maxHp : 1.0,
            'gender' => $this->gender,
            'level' => $this->level,
            'skills' => array_column($this->skills, 'id'),
        ];

        return StatEngine::calculateAll($this->baseStats, $this->gatherModifiers(), $context);
    }

    /**
     * Get full stat breakdown for UI.
     */
    public function getStatBreakdown(): array
    {
        $context = [
            'hp_percent' => $this->maxHp > 0 ? $this->currentHp / $this->maxHp : 1.0,
            'gender' => $this->gender,
            'level' => $this->level,
        ];

        return StatEngine::calculateBreakdown($this->baseStats, $this->gatherModifiers(), $context);
    }

    /**
     * Allocate stat points.
     */
    public function allocateStat(string $stat, int $points = 1): bool
    {
        if ($this->statPoints < $points) return false;
        if (!in_array($stat, StatEngine::BATTLE_STATS)) return false;

        $this->allocatedStats[$stat] += $points;
        $this->statPoints -= $points;
        $this->recalcDerived();
        return true;
    }

    /**
     * Equip an item from inventory.
     */
    public function equipItem(Item $item): void
    {
        // Remove from inventory
        foreach ($this->inventory as $idx => $invItem) {
            if ($invItem->id === $item->id) {
                unset($this->inventory[$idx]);
                $this->inventory = array_values($this->inventory);
                break;
            }
        }

        // Unequip current item in slot if possible
        if (isset($this->equipment[$item->slot])) {
            $oldItem = $this->equipment[$item->slot];
            unset($this->equipment[$item->slot]);
            $this->addToInventory($oldItem);
        }

        $this->equipment[$item->slot] = $item;
        $this->recalcDerived();
    }

    /**
     * Get current max capacity
     */
    public function getMaxInventorySize(): int
    {
        $cap = 20;
        foreach (['ring1', 'ring2'] as $slot) {
            $r = $this->equipment[$slot] ?? null;
            if ($r && (strpos($r->baseType, 'tru_vat') !== false || $r->id === 'tui_tru_vat')) {
                // capacity is stored in the 1st mod's value
                $cap += (int)($r->getModifiers()[0]->value ?? 10);
            }
        }
        return $cap;
    }

    /**
     * Unequip an item.
     */
    public function unequipItem(string $slot): ?Item
    {
        $item = $this->equipment[$slot] ?? null;
        if ($item) {
            if ($slot === 'ring1' || $slot === 'ring2') {
                $loss = (int)($item->getModifiers()[0]->value ?? 10);
                if (count($this->inventory) + 1 > $this->getMaxInventorySize() - $loss) {
                    throw new \Exception("Túi đồ sẽ quá tải nếu tháo giới chỉ này!");
                }
            } else {
                if (count($this->inventory) >= $this->getMaxInventorySize()) {
                    throw new \Exception("Túi đồ đã đầy, không thể tháo thêm!");
                }
            }
            unset($this->equipment[$slot]);
            $this->inventory[] = $item;
            $this->recalcDerived();
        }
        return $item;
    }

    /**
     * Add item to inventory.
     */
    public function addToInventory(Item $item): void
    {
        if (count($this->inventory) >= $this->getMaxInventorySize()) {
            throw new \Exception("Túi đồ đã đầy!");
        }
        $this->inventory[] = $item;
    }

    /**
     * Learn a skill.
     */
    public function learnSkill(array $skill): void
    {
        $this->skills[$skill['id']] = $skill;
    }

    /**
     * Get the level of a skill (combat, passive, or life skill).
     * Returns 0 if player has not learned the skill.
     */
    public function getSkillLevel(string $skillId): int
    {
        if (isset($this->skills[$skillId]) && is_array($this->skills[$skillId])) {
            return (int)($this->skills[$skillId]['level'] ?? 1);
        }
        foreach ($this->skills as $s) {
            $sid = is_array($s) ? ($s['id'] ?? '') : $s;
            if ($sid === $skillId) {
                return is_array($s) ? (int)($s['level'] ?? 1) : 1;
            }
        }
        return 0;
    }

    /**
     * Check if player has learned a specific skill.
     */
    public function hasSkill(string $skillId): bool
    {
        return $this->getSkillLevel($skillId) > 0;
    }

    /**
     * Get active skill by ID.
     */
    public function getActiveSkill(string $skillId): ?array
    {
        $found = null;
        if (isset($this->skills[$skillId]) && is_array($this->skills[$skillId])) {
            $found = $this->skills[$skillId];
        } else {
            foreach ($this->skills as $s) {
                if (is_array($s) && ($s['id'] ?? '') === $skillId) {
                    $found = $s;
                    break;
                }
            }
        }
        if ($found && ($found['type'] ?? 'active') === 'active') {
            return $found;
        }
        return null;
    }

    /**
     * Get all currently equipped active skills.
     */
    public function getEquippedActiveSkills(): array
    {
        $actives = [];
        foreach ($this->skills as $s) {
            if (is_array($s) && !empty($s['isEquipped']) && ($s['type'] ?? '') === 'active') {
                $actives[] = $s;
            }
        }
        return $actives;
    }

    /**
     * Calculate effective trigger chance for an active skill.
     * Takes into account: base triggerChance, skill mastery level, dexterity, and stance.
     */
    public function getSkillTriggerChance(array $skill): int
    {
        $tierChances = [1 => 55, 2 => 45, 3 => 40, 4 => 35, 5 => 30, 6 => 25, 7 => 20];
        $baseChance = (int)($skill['triggerChance'] ?? ($tierChances[$skill['tier'] ?? 1] ?? 40));

        // +1% per skill mastery level above level 1
        $levelBonus = max(0, ((int)($skill['level'] ?? 1) - 1));

        // Dexterity bonus (+1% per 10 Dexterity)
        $dex = $this->getFinalStats()['dexterity'] ?? 10;
        $dexBonus = (int)floor($dex / 10);

        // Stance bonus: Thế Phá Quy (Breaker) tăng 5% xác suất xuất chiêu bạo phát
        $stanceBonus = ($this->activeStance ?? '') === 'breaker' ? 5 : 0;

        return min(85, max(15, $baseChance + $levelBonus + $dexBonus + $stanceBonus));
    }

    /**
     * Take damage.
     */
    public function takeDamage(int $amount): void
    {
        $this->currentHp = max(0, $this->currentHp - $amount);
    }

    /**
     * Enter hospital (tịnh dưỡng) for a duration in seconds.
     */
    public function hospitalize(int $durationSeconds): void
    {
        $this->hospitalUntil = time() + $durationSeconds;
    }

    /**
     * Check if currently hospitalized.
     */
    public function isHospitalized(): bool
    {
        return $this->hospitalUntil > time();
    }

    /**
     * Get remaining hospital time in seconds.
     */
    public function hospitalRemaining(): int
    {
        return max(0, $this->hospitalUntil - time());
    }

    /**
     * Train a stat in the gym. Costs stamina, directly increases stat.
     */
    public function trainStat(string $stat, int $staminaCost = 5): ?string
    {
        if (!in_array($stat, StatEngine::BATTLE_STATS)) {
            return "Chỉ số không hợp lệ.";
        }
        if ($this->isHospitalized()) {
            return "Đang tịnh dưỡng, không thể rèn luyện!";
        }
        if ($this->currentStamina < $staminaCost) {
            return "Không đủ Thể Lực! Cần {$staminaCost}.";
        }

        $this->currentStamina -= $staminaCost;

        // Gain = base 1, multiplied by talent aptitude
        $talentMul = $this->talents[$stat] ?? 1.0;
        $gain = max(1, (int)round(1 * $talentMul));
        $this->allocatedStats[$stat] = ($this->allocatedStats[$stat] ?? 0) + $gain;
        $this->recalcDerived();

        return null;
    }

    /**
     * Gain XP for a specific skill and handle leveling up.
     */
    public function gainSkillXp(string $skillId, int $amount = 1): ?array
    {
        $levelUpData = null;
        $found = false;
        foreach ($this->skills as &$sk) {
            $sid = is_array($sk) ? ($sk['id'] ?? '') : $sk;
            if ($sid === $skillId && is_array($sk)) {
                $found = true;
                $sk['currentXp'] = (int)($sk['currentXp'] ?? 0) + $amount;
                $level = (int)($sk['level'] ?? 1);
                // Require more XP for higher levels (Lv1->2: 100XP, Lv2->3: 200XP)
                $xpRequired = $level * 100;

                if ($sk['currentXp'] >= $xpRequired) {
                    $sk['level'] = $level + 1;
                    $sk['currentXp'] -= $xpRequired;
                    $levelUpData = [
                        'skillId' => $sid,
                        'name' => $sk['name'] ?? $sid,
                        'newLevel' => $sk['level']
                    ];
                }
                break;
            }
        }
        unset($sk);

        // If skill wasn't already in skills list, auto-learn at level 1 and apply XP
        if (!$found) {
            $skillSys = new \App\Systems\SkillSystem();
            $baseSkill = $skillSys->getById($skillId);
            if (!$baseSkill) {
                $name = $skillId === 'hai_duoc' ? 'Hái Dược' : ($skillId === 'khai_khoang' ? 'Khai Khoáng' : ucfirst(str_replace('_', ' ', $skillId)));
                $baseSkill = [
                    'id' => $skillId,
                    'name' => $name,
                    'type' => 'passive',
                    'category' => 'life',
                ];
            }
            $baseSkill['level'] = 1;
            $baseSkill['currentXp'] = $amount;
            $baseSkill['isEquipped'] = false;
            if ($baseSkill['currentXp'] >= 100) {
                $baseSkill['level'] = 2;
                $baseSkill['currentXp'] -= 100;
                $levelUpData = [
                    'skillId' => $skillId,
                    'name' => $baseSkill['name'] ?? $skillId,
                    'newLevel' => 2
                ];
            }
            $this->skills[] = $baseSkill;
        }

        return $levelUpData;
    }

    /**
     * Heal.
     */
    public function heal(int $amount): void
    {
        $this->currentHp = min($this->maxHp, $this->currentHp + $amount);
    }

    /**
     * Full heal.
     */
    public function fullHeal(): void
    {
        $this->recalcDerived();
        $this->currentHp = $this->maxHp;
        $this->currentEnergy = $this->maxEnergy;
    }

    /**
     * Get Xianxia Realm tier (uses RealmSystem).
     */
    public function getRealm(): int
    {
        return $this->realmTier;
    }

    /**
     * Get full realm info from RealmSystem.
     */
    public function getRealmInfo(): array
    {
        return \App\Systems\RealmSystem::getRealmInfo($this->level, $this->realmTier);
    }

    /**
     * Use medicine with logic engine (Tiers, HP Below, Penalties).
     */
    public function useMedicine(array $medicine): ?string
    {
        $reqs = $medicine['requirements'] ?? [];
        
        // 1. Check realm
        $reqRealm = $reqs['realm'] ?? 1;
        if ($this->getRealm() < $reqRealm) {
            return "Cảnh giới chưa đủ để hấp thụ đan dược này!";
        }
        
        // 2. Check HP below
        if (isset($reqs['hpBelow'])) {
            $hpPercent = $this->maxHp > 0 ? $this->currentHp / $this->maxHp : 1;
            if ($hpPercent > floatval($reqs['hpBelow'])) {
                return "Chỉ có thể dùng khi sinh mệnh dưới " . ($reqs['hpBelow'] * 100) . "%!";
            }
        }

        // 2.5 Toxicity / Overdose Check
        if (isset($medicine['toxicity'])) {
            $tox = $medicine['toxicity'];
            $chance = $tox['chance'] ?? 0;
            if (mt_rand(1, 100) <= $chance) {
                $this->currentHp = 1;
                $this->currentEnergy = 0;
                $duration = ($tox['duration'] ?? 5) * 60;
                $this->hospitalize($duration);
                // Still add the cooldown so they can't spam
                $addTime = $medicine['cooldownAdd'] ?? 30;
                $this->medCooldownUntil = max(time(), $this->medCooldownUntil) + $addTime;
                return "Phản phệ! Dược lực hung hãn xé rách kinh mạch. Bạn bị tẩu hỏa nhập ma, phải tịnh dưỡng {$duration}s.";
            }
        }

        // Shared cooldown check
        $remaining = max(0, $this->medCooldownUntil - time());
        $addTime = $medicine['cooldownAdd'] ?? 30;

        if ($remaining + $addTime > self::MED_COOLDOWN_CAP) {
            return "Đan độc quá nồng! Cần chờ {$remaining}s trước khi dùng tiếp.";
        }

        // 3. Apply Effects
        $effects = $medicine['effects'] ?? [];
        $duration = $medicine['duration'] ?? 1; // Default 1 combat

        foreach ($effects as $eff) {
            $type = $eff['type'] ?? '';
            $stat = $eff['stat'] ?? '';
            $val = $eff['value'] ?? 0;
            
            if ($type === 'flat' && $stat === 'hp') {
                $this->currentHp = min($this->maxHp, $this->currentHp + $val);
            } elseif ($type === 'talent_upgrade') {
                // Tẩy Tủy Đan: Upgrade a random stat's talent by 1 tier
                $upgradableStats = [];
                $tierValues = array_column(self::TALENT_TIERS, 'value');
                $maxTier = max($tierValues);
                foreach ($this->talents as $s => $v) {
                    if ($v < $maxTier) $upgradableStats[] = $s;
                }
                if (empty($upgradableStats)) {
                    return "Căn cốt đã đạt cực hạn, không thể cải tạo thêm!";
                }
                $chosenStat = $upgradableStats[array_rand($upgradableStats)];
                $currentVal = $this->talents[$chosenStat];
                // Find next tier
                $nextVal = $currentVal;
                foreach (self::TALENT_TIERS as $tier) {
                    if ($tier['value'] > $currentVal) {
                        $nextVal = $tier['value'];
                        break;
                    }
                }
                $this->talents[$chosenStat] = $nextVal;
                $info = $this->getTalentInfo($chosenStat);
                $this->recalcDerived();
            } elseif ($type === 'talent_reroll') {
                // Hoán Cốt Đan: Completely reroll all talents
                $this->talents = self::generateRandomTalents();
                $this->recalcDerived();
            } elseif ($type === 'increase' || $type === 'more') {
                // Add as combat buff
                $this->combatBuffs[] = [
                    'id' => $medicine['id'],
                    'type' => $type,
                    'stat' => $stat,
                    'value' => $val,
                    'duration' => $duration
                ];
            }
        }
        
        // 4. Handle penalties
        $penalties = $medicine['penalty'] ?? [];
        foreach ($penalties as $pen) {
             if (($pen['stat'] ?? '') === 'hp') {
                 $drop = (int)($this->maxHp * abs(floatval($pen['value'] ?? 0)));
                 $this->currentHp = max(1, $this->currentHp - $drop);
             }
        }

        // 5. Old Heal Percent for compatibility
        if (isset($medicine['healPercent'])) {
            $healAmount = (int) round($this->maxHp * ($medicine['healPercent'] / 100));
            $this->currentHp = min($this->maxHp, $this->currentHp + $healAmount);
        }

        // Stack cooldown
        $this->medCooldownUntil = max(time(), $this->medCooldownUntil) + $addTime;

        return null;
    }

    public function medCooldownRemaining(): int
    {
        return max(0, $this->medCooldownUntil - time());
    }

    /**
     * Giảm thời lượng (duration) của các Buff sau mỗi trận đấu.
     * Xoá Buff nếu hết hạn.
     */
    public function tickCombatBuffs(): void
    {
        $activeBuffs = [];
        foreach ($this->combatBuffs as $buff) {
            $buff['duration'] -= 1;
            if ($buff['duration'] > 0) {
                $activeBuffs[] = $buff;
            }
        }
        $this->combatBuffs = $activeBuffs;
        $this->recalcDerived(); // Recalculate stats as buffs might have dropped
    }

    /**
     * Tự động hồi phục HP, Energy, Stamina theo thời gian thực (tick 10s)
     */
    public function applyRegeneration(): bool
    {
        $now = time();
        $elapsed = $now - $this->lastHpRegen;
        if ($elapsed < 10) return false;

        $ticks = (int) floor($elapsed / 10);
        $this->lastHpRegen = $now - ($elapsed % 10); // Giữ lại phần dư

        $stats = $this->getFinalStats();
        $changed = false;

        // Housing passive bonuses
        $housingHpBonus = 0;
        $housingEnergyBonus = 0;
        $housingStaminaBonus = 0;
        try {
            if (!empty($this->id)) {
                $hService = new \App\Features\Housing\HousingService();
                $hData = $hService->getHousingDetails($this->id);
                $hBonuses = $hData['passiveBonuses'] ?? [];
                $housingHpBonus = (int)($hBonuses['hpRegenBonus'] ?? 0);
                $housingEnergyBonus = (int)($hBonuses['energyRegenBonus'] ?? 0);
                $housingStaminaBonus = (int)($hBonuses['staminaMaxBonus'] ?? 0);
            }
        } catch (\Throwable) {
            // Gracefully ignore if housing db is unreachable
        }

        // HP Regen — Base 0.5%/10s, Tọa Thiền doubles to 1%/10s + Housing passive
        if ($this->currentHp < $this->maxHp) {
            $hasMeditation = in_array('toa_thien', $this->activeAuras, true) || in_array('toa_thien', array_column($this->skills, 'id'));
            $regenRate = $hasMeditation ? 0.01 : 0.005; // 1% vs 0.5%
            $healPerTick = max(1, (int) round($this->maxHp * $regenRate)) + $housingHpBonus;
            $this->currentHp = min($this->maxHp, $this->currentHp + $healPerTick * $ticks);
            $changed = true;
        }

        // Energy Regen (tính theo Linh Lực khả dụng sau khi trừ bảo lưu) + Tụ Linh Trận bonus
        $usableEnergy = $this->getUsableEnergy();
        if ($this->currentEnergy < $usableEnergy) {
            $energyRegenStat = ($stats['energyRegen'] ?? 5) + $housingEnergyBonus; 
            $this->currentEnergy = min($usableEnergy, $this->currentEnergy + $energyRegenStat * $ticks);
            $changed = true;
        } elseif ($this->currentEnergy > $usableEnergy) {
            $this->currentEnergy = $usableEnergy;
            $changed = true;
        }

        // Stamina Regen + Thủ Linh Trận max stamina bonus
        $effectiveMaxStamina = $this->maxStamina + $housingStaminaBonus;
        if ($this->currentStamina < $effectiveMaxStamina) {
            $staminaRegenStat = $stats['staminaRegen'] ?? 2;
            $this->currentStamina = min($effectiveMaxStamina, $this->currentStamina + $staminaRegenStat * $ticks);
            $changed = true;
        }

        return $changed;
    }

    /**
     * Tự động hoàn thành chuyến đi nếu hết thời gian
     * @return bool True nếu có thay đổi cần lưu
     */
    public function updateTravelStatus(): bool
    {
        if ($this->isTraveling() && $this->travelRemaining() <= 0) {
            $this->completeTravelIfReady();
            return true;
        }
        return false;
    }
    
    /**
     * Spend energy for an action. Returns false if not enough.
     */
    public function spendEnergy(int $amount): bool
    {
        if ($this->currentEnergy < $amount) return false;
        $this->currentEnergy -= $amount;
        return true;
    }

    /**
     * Regenerate energy (called each turn).
     */
    public function regenEnergy(): int
    {
        $stats = $this->getFinalStats();
        $regen = $stats['energyRegen'] ?? 5;
        $before = $this->currentEnergy;
        $this->currentEnergy = min($this->getUsableEnergy(), $this->currentEnergy + $regen);
        return $this->currentEnergy - $before;
    }

    /**
     * Gain XP, handle level up without any level cap (Vô Hạn Cấp Độ).
     */
     public function gainXp(int $amount): void
     {
         $this->xp += $amount;
         $leveledUp = false;
         
         while ($this->xp >= $this->xpToNext) {
             $this->xp -= $this->xpToNext;
             $this->level++;
             $leveledUp = true;
             
             // Công thức cày cuốc RPG không giới hạn cấp độ (Safe 64-bit int calculation)
             $nextXp = (float)(100 * pow($this->level, 2.2));
             if ($nextXp > PHP_INT_MAX / 4) {
                 $this->xpToNext = (int)(PHP_INT_MAX / 4);
             } else {
                 $this->xpToNext = (int) $nextXp;
             }
         }

         if ($leveledUp) {
             $this->recalcDerived();
             $this->currentHp = $this->maxHp;
             $this->currentEnergy = $this->maxEnergy;
             $this->currentStamina = $this->maxStamina;
         }
     }

     public function isAlive(): bool
     {
         return $this->currentHp > 0;
     }

     public function recalcDerived(): void
     {
         $stats = $this->getFinalStats();
         $this->maxHp = (int)$stats['maxHp'];
         $this->maxEnergy = (int)($stats['maxEnergy'] ?? 50);
         $this->currentEnergy = min($this->currentEnergy, $this->getUsableEnergy());
         $this->currentHp = min($this->currentHp, $this->maxHp);
         
         // Luôn luôn đảm bảo xpToNext chuẩn với công thức cày cuốc mới nhất 
         $nextXp = (float)(100 * pow($this->level, 2.2));
         if ($nextXp > PHP_INT_MAX / 4) {
             $this->xpToNext = (int)(PHP_INT_MAX / 4);
         } else {
             $this->xpToNext = (int) $nextXp;
         }
     }

    public function toArray(): array
    {
        $this->recalcDerived();
        $finalStats = $this->getFinalStats();
        return [
            'id' => $this->id,
            'username' => $this->username,
            'passwordHash' => $this->passwordHash,
            'name' => $this->name,
            'gender' => $this->gender,
            'level' => $this->level,
            'xp' => $this->xp,
            'xpToNext' => $this->xpToNext,
            'currentHp' => $this->currentHp,
            'maxHp' => (int)$finalStats['maxHp'],
            'currentEnergy' => $this->currentEnergy,
            'maxEnergy' => (int)($finalStats['maxEnergy'] ?? 50),
            'currentStamina' => $this->currentStamina,
            'maxStamina' => $this->maxStamina,
            'statPoints' => $this->statPoints,
            'hospitalUntil' => $this->hospitalUntil,
            'hospitalRemaining' => $this->hospitalRemaining(),
            'medCooldownUntil' => $this->medCooldownUntil,
            'medCooldownRemaining' => $this->medCooldownRemaining(),
            'lastHpRegen' => $this->lastHpRegen,
            'stats' => $finalStats,
            'allocatedStats' => $this->allocatedStats,
            'equipment' => array_map(fn($i) => $i->toArray(), $this->equipment),
            'inventory' => array_map(fn($i) => $i->toArray(), $this->inventory),
            'materials' => $this->materials,
            'medicines' => $this->medicines,
            'skills' => array_values($this->skills),
            // Phase 1
            'gold' => $this->gold,
            'nerve' => $this->nerve,
            'maxNerve' => $this->maxNerve,
            'crimeExp' => $this->crimeExp,
            'crimeSkills' => $this->crimeSkills,
            'jailUntil' => $this->jailUntil,
            'jailRemaining' => max(0, $this->jailUntil - time()),
            'studyingNode' => $this->studyingNode,
            'studyEndsAt' => $this->studyEndsAt,
            'studyRemaining' => max(0, $this->studyEndsAt - time()),
            'unlockedNodes' => $this->unlockedNodes,
            'treeProgress' => $this->treeProgress,
            'skillProgress' => $this->skillProgress,
            'discoveredNodes' => $this->discoveredNodes,
            'discoveredMonsters' => $this->discoveredMonsters,
            'discoveredItems' => $this->discoveredItems,
            'trackedMonsters' => $this->trackedMonsters,
            'combatBuffs' => $this->combatBuffs,
            'lastMonsterSpawn' => $this->lastMonsterSpawn,
            'currentArea' => $this->currentArea,
            'travelingTo' => $this->travelingTo,
            'travelArrivesAt' => $this->travelArrivesAt,
            'travelRemaining' => $this->travelRemaining(),
            'activeQuests' => $this->activeQuests,
            'role' => $this->role,
            'unreadEventsCount' => \App\Core\GameDataRepository::getUnreadEventsCount($this->id),
            'insightLevels' => $this->getInsightLevels(),
            'realmTier' => $this->realmTier,
            'realmInfo' => $this->getRealmInfo(),
            'talents' => $this->talents,
            'talentDisplay' => $this->getTalentDisplay(),
            'mugCooldownUntil' => $this->mugCooldownUntil,
            'pendingMugVictim' => $this->pendingMugVictim,
            'pendingMugExpiry' => $this->pendingMugExpiry,
            'activeTitle' => $this->activeTitle,
            'createdAt' => $this->createdAt,
            'craftingLevel' => $this->craftingLevel,
            'craftingXp' => $this->craftingXp,
            'craftingXpToNext' => $this->craftingLevel * 50,
            'gymSessions' => $this->gymSessions,
            'gymSessionCap' => 20 + ($this->realmTier * 5),
            'gymStreak' => $this->gymStreak,
            'gymCooldownUntil' => $this->gymCooldownUntil,
            'tienCanhMaps' => $this->tienCanhMaps,
            'atlasProgress' => $this->atlasProgress,
            'atlasBonus' => $this->atlasBonus,
            'glitchInsight' => $this->glitchInsight,
            'behaviorCounters' => $this->behaviorCounters,
            'unlockedImprints' => $this->unlockedImprints,
            'activeStance' => $this->activeStance,
            'glitchStatus' => \App\Systems\GlitchSystem::getPlayerGlitchStatus($this),
            'activeAuras' => $this->activeAuras,
            'reservedEnergy' => $this->getReservedEnergy(),
            'usableEnergy' => $this->getUsableEnergy(),
            'reservationPct' => min(100, array_sum(array_map(fn($a) => self::AURA_CONFIGS[$a]['reservationPct'] ?? 0, $this->activeAuras))),
            'tribulationRecords' => $this->tribulationRecords,
            'auraConfigs' => self::AURA_CONFIGS,
            'multiplayerStatus' => $this->multiplayerStatus,
            'pendingEscrow' => $this->pendingEscrow,
            'divineWardUntil' => $this->divineWardUntil,
            'divineWardRemaining' => max(0, $this->divineWardUntil - time()),
            'tamCanh' => $this->tamCanh,
        ];
    }

    /**
     * Progressive Info Disclosure — what details the player can see.
     * Based on education tree progress (treeProgress points).
     *
     * Monster insight (Thiên Cơ / perception):
     *   0: name + icon only
     *   1: HP bar (no number)
     *   2: HP number
     *   3: Combat stats (crit%, dodge%)
     *   4: Enemy skills
     *   5: Drop rates
     *   6: Predicted outcome
     *
     * Material insight (Đan Dược / alchemy):
     *   0: name only
     *   1: category + description
     *   2: rarity
     *   3: affix / hidden properties
     *   4: crafting uses
     *   5: optimal combinations
     *   6: mutations
     *
     * Self insight (Nội Công / internal_cultivation):
     *   0-2: basic stats
     *   3+: hidden regen rates
     *   5+: buff durations
     *   8: full stat breakdown
     */
    public function getInsightLevels(): array
    {
        $tp = $this->treeProgress;
        return [
            'monster' => min(6, $tp['perception'] ?? 0),
            'material' => min(6, $tp['alchemy'] ?? 0),
            'self' => min(8, $tp['internal_cultivation'] ?? 0),
        ];
    }

    /**
     * Create from saved data.
     */
    public static function fromArray(array $data): self
    {
        $player = new self($data['name'], $data['gender']);
        $player->id = $data['id'] ?? ''; // Added this line
        $player->level = $data['level'] ?? 1;
        $player->xp = $data['xp'] ?? 0;
        $player->xpToNext = $data['xpToNext'] ?? 100;
        $player->statPoints = $data['statPoints'] ?? 0;
        $player->allocatedStats = $data['allocatedStats'] ?? $player->allocatedStats;
        $player->skills = $data['skills'] ?? [];

        // Restore equipment
        if (!empty($data['equipment'])) {
            foreach ($data['equipment'] as $slot => $itemData) {
                if (is_array($itemData) && isset($itemData['id'])) {
                    $player->equipment[$slot] = Item::fromArray($itemData);
                }
            }
        }

        // Restore inventory
        if (!empty($data['inventory'])) {
            foreach ($data['inventory'] as $itemData) {
                if (is_array($itemData) && isset($itemData['id'])) {
                    $player->inventory[] = Item::fromArray($itemData);
                }
            }
        }

        // Restore materials
        $player->materials = $data['materials'] ?? [];

        // Restore medicines
        $player->medicines = $data['medicines'] ?? [];

        // Phase 1
        $player->gold = $data['gold'] ?? 0;
        $player->nerve = $data['nerve'] ?? 15;
        $player->maxNerve = $data['maxNerve'] ?? 15;
        $player->crimeExp = $data['crimeExp'] ?? 0;
        $player->crimeSkills = $data['crimeSkills'] ?? [];
        $player->jailUntil = $data['jailUntil'] ?? 0;
        $player->studyingNode = $data['studyingNode'] ?? '';
        $player->studyEndsAt = $data['studyEndsAt'] ?? 0;
        $player->unlockedNodes = $data['unlockedNodes'] ?? [];
        $player->treeProgress = $data['treeProgress'] ?? [];
        $player->skillProgress = $data['skillProgress'] ?? [];
        $player->discoveredNodes = $data['discoveredNodes'] ?? [];
        $player->discoveredMonsters = $data['discoveredMonsters'] ?? [];
        $player->discoveredItems = $data['discoveredItems'] ?? [];
        $player->trackedMonsters = $data['trackedMonsters'] ?? [];
        $player->combatBuffs = $data['combatBuffs'] ?? [];
        $player->lastMonsterSpawn = $data['lastMonsterSpawn'] ?? 0;
        $player->currentArea = $data['currentArea'] ?? 'thanh_lam_tran';
        $player->travelingTo = $data['travelingTo'] ?? null;
        $player->travelArrivesAt = $data['travelArrivesAt'] ?? 0;
        $player->username = $data['username'] ?? '';
        $player->passwordHash = $data['passwordHash'] ?? '';
        $player->activeQuests = $data['activeQuests'] ?? [];
        $player->role = $data['role'] ?? 'player';
        $player->realmTier = $data['realmTier'] ?? \App\Systems\RealmSystem::getRealmTier($player->level);
        $player->talents = $data['talents'] ?? self::generateRandomTalents();
        $player->mugCooldownUntil = $data['mugCooldownUntil'] ?? 0;
        $player->pendingMugVictim = $data['pendingMugVictim'] ?? null;
        $player->pendingMugExpiry = $data['pendingMugExpiry'] ?? null;
        $player->activeTitle = $data['activeTitle'] ?? '';
        $player->createdAt = $data['createdAt'] ?? time();
        $player->craftingLevel = $data['craftingLevel'] ?? 1;
        $player->craftingXp = $data['craftingXp'] ?? 0;
        $player->gymDate = $data['gymDate'] ?? '';
        $player->gymSessions = $data['gymSessions'] ?? 0;
        $player->gymCooldownUntil = $data['gymCooldownUntil'] ?? 0;
        $player->gymStreak = $data['gymStreak'] ?? 0;
        $player->lastGymDate = $data['lastGymDate'] ?? '';
        $player->tienCanhMaps = $data['tienCanhMaps'] ?? [];
        $player->atlasProgress = $data['atlasProgress'] ?? [];
        $player->atlasBonus = $data['atlasBonus'] ?? 0;
        $player->glitchInsight = (int)($data['glitchInsight'] ?? $data['glitch_insight'] ?? 0);
        $player->behaviorCounters = is_string($data['behaviorCounters'] ?? $data['behavior_counters'] ?? null) 
            ? (json_decode($data['behaviorCounters'] ?? $data['behavior_counters'], true) ?: []) 
            : ($data['behaviorCounters'] ?? $data['behavior_counters'] ?? []);
        $player->unlockedImprints = is_string($data['unlockedImprints'] ?? $data['unlocked_imprints'] ?? null)
            ? (json_decode($data['unlockedImprints'] ?? $data['unlocked_imprints'], true) ?: [])
            : ($data['unlockedImprints'] ?? $data['unlocked_imprints'] ?? []);
        $player->activeStance = $data['activeStance'] ?? $data['active_stance'] ?? 'breaker';
        $player->activeAuras = is_string($data['activeAuras'] ?? $data['active_auras'] ?? null)
            ? (json_decode($data['activeAuras'] ?? $data['active_auras'], true) ?: [])
            : ($data['activeAuras'] ?? $data['active_auras'] ?? []);
        $player->tribulationRecords = is_string($data['tribulationRecords'] ?? $data['tribulation_records'] ?? null)
            ? (json_decode($data['tribulationRecords'] ?? $data['tribulation_records'], true) ?: [])
            : ($data['tribulationRecords'] ?? $data['tribulation_records'] ?? []);
        $player->hospitalUntil = $data['hospitalUntil'] ?? 0;
        $player->medCooldownUntil = $data['medCooldownUntil'] ?? 0;
        $player->lastHpRegen = $data['lastHpRegen'] ?? time();
        $player->maxStamina = (int)($data['maxStamina'] ?? $data['max_stamina'] ?? 100);
        $player->currentStamina = isset($data['currentStamina']) ? (int)$data['currentStamina'] : (isset($data['current_stamina']) ? (int)$data['current_stamina'] : $player->maxStamina);
        $player->multiplayerStatus = $data['multiplayerStatus'] ?? $data['multiplayer_status'] ?? 'normal';
        $player->pendingEscrow = (int)($data['pendingEscrow'] ?? $data['pending_escrow'] ?? 0);
        $player->divineWardUntil = (int)($data['divineWardUntil'] ?? $data['divine_ward_until'] ?? 0);
        $player->tamCanh = (int)($data['tamCanh'] ?? $data['tam_canh'] ?? 100);

        // Recalculate maxHp/maxEnergy after all realmTier, talents, auras, equipment, etc. are restored
        $player->recalcDerived();

        // Restore HP: If saved HP was full health (or not set), keep full health with new maxHp
        $savedHp = isset($data['currentHp']) ? (int)$data['currentHp'] : $player->maxHp;
        $savedMaxHp = isset($data['maxHp']) ? (int)$data['maxHp'] : $player->maxHp;
        if ($savedHp >= $savedMaxHp || !isset($data['currentHp'])) {
            $player->currentHp = $player->maxHp;
        } else {
            $player->currentHp = min($player->maxHp, $savedHp);
        }

        // Restore Energy: If saved energy was full usable energy (or not set), keep full usable energy
        $savedEnergy = isset($data['currentEnergy']) ? (int)$data['currentEnergy'] : $player->getUsableEnergy();
        $savedMaxEnergy = isset($data['maxEnergy']) ? (int)$data['maxEnergy'] : $player->maxEnergy;
        if ($savedEnergy >= $savedMaxEnergy || !isset($data['currentEnergy'])) {
            $player->currentEnergy = $player->getUsableEnergy();
        } else {
            $player->currentEnergy = min($player->getUsableEnergy(), $savedEnergy);
        }

        return $player;
    }

    // === Phase 1 Methods ===

    public function isJailed(): bool { return false; }
    public function jailRemaining(): int { return 0; }

    // Travel methods
    public function isTraveling(): bool { return $this->travelingTo !== null && $this->travelArrivesAt > 0; }
    public function travelRemaining(): int { return $this->isTraveling() ? max(0, $this->travelArrivesAt - time()) : 0; }
    public function completeTravelIfReady(): ?string {
        if (!$this->isTraveling() || $this->travelRemaining() > 0) return null;
        $this->currentArea = $this->travelingTo;
        $areaName = $this->travelingTo;
        $this->travelingTo = null;
        $this->travelArrivesAt = 0;
        return $areaName;
    }

    /**
     * Discover a monster (first encounter → wiki unlock).
     */
    public function discoverMonster(string $monsterId): bool
    {
        if (in_array($monsterId, $this->discoveredMonsters)) return false;
        $this->discoveredMonsters[] = $monsterId;
        return true; // first discovery
    }

    /**
     * Discover an item (first pickup → wiki unlock).
     */
    public function discoverItem(string $itemId): bool
    {
        if (in_array($itemId, $this->discoveredItems)) return false;
        $this->discoveredItems[] = $itemId;
        return true;
    }

    /**
     * Enroll in an education node.
     */
    public function enrollNode(array $node, string $treeId): ?string
    {
        if ($this->studyingNode !== '') return 'Đang tu luyện môn khác!';

        // Check prerequisites
        foreach (($node['prerequisites'] ?? []) as $prereq) {
            if (!in_array($prereq, $this->unlockedNodes)) {
                return "Cần lĩnh ngộ cơ sở trước!";
            }
        }

        $this->studyingNode = $node['id'] . '|' . $treeId;
        $this->studyEndsAt = time() + ($node['duration'] ?? 60);
        return null; // success
    }

    public function checkEducation(): array
    {
        if ($this->studyingNode === '' || $this->studyEndsAt > time()) return ['finished' => false];

        $parts = explode('|', $this->studyingNode);
        $nodeId = $parts[0];
        $treeId = $parts[1] ?? 'unknown';

        $this->studyingNode = '';
        $this->studyEndsAt = 0;

        $isLevelUp = false;
        $expGained = 100; // Base flat EXP for simplicity 

        if (!isset($this->skillProgress)) {
            $this->skillProgress = [];
        }

        if (!in_array($nodeId, $this->unlockedNodes)) {
            $this->unlockedNodes[] = $nodeId;
            $this->treeProgress[$treeId] = ($this->treeProgress[$treeId] ?? 0) + 1;
            // Initialize progress
            $this->skillProgress[$nodeId] = ['level' => 1, 'exp' => 0];
            $isLevelUp = true;
        } else {
            // Already unlocked -> Gain EXP
            $sp = $this->skillProgress[$nodeId] ?? ['level' => 1, 'exp' => 0];
            $sp['exp'] += $expGained;
            
            $maxExp = $sp['level'] * 100;
            if ($sp['exp'] >= $maxExp) {
                // Breakthrough to next level!
                $sp['level'] += 1;
                $sp['exp'] -= $maxExp;
                $isLevelUp = true;
            }
            $this->skillProgress[$nodeId] = $sp;
        }

        return [
            'finished' => true,
            'nodeId' => $nodeId,
            'isLevelUp' => $isLevelUp,
            'expGained' => $expGained,
            'currentLevel' => $this->skillProgress[$nodeId]['level'] ?? 1
        ];
    }

    /**
     * Helper to check if a specific node is unlocked.
     */
    public function hasNode(string $nodeId): bool
    {
        return in_array($nodeId, $this->unlockedNodes);
    }

    /**
     * Helper to check tree progress points.
     */
    public function getTreeProgress(string $treeId): int
    {
        return $this->treeProgress[$treeId] ?? 0;
    }

    // === Phase 9: Quest Methods ===

    /**
     * Accept a quest from an NPC.
     */
    public function acceptQuest(string $npcId, string $questId): ?string
    {
        // Check if already active
        foreach ($this->activeQuests as $q) {
            if ($q['quest_id'] === $questId && $q['status'] === 'active') {
                return 'Đã nhận nhiệm vụ này rồi!';
            }
        }
        // Max 5 active quests
        $activeCount = count(array_filter($this->activeQuests, fn($q) => $q['status'] === 'active'));
        if ($activeCount >= 5) {
            return 'Tối đa 5 nhiệm vụ cùng lúc!';
        }
        $this->activeQuests[] = [
            'npc_id' => $npcId,
            'quest_id' => $questId,
            'status' => 'active',
            'progress' => 0,
            'accepted_at' => time(),
            'completed_at' => null,
        ];
        return null;
    }

    /**
     * Update quest progress for kill/collect type events.
     */
    public function updateQuestProgress(string $type, string $targetId, int $amount, array $npcsData): array
    {
        $notifications = [];
        foreach ($this->activeQuests as &$q) {
            if ($q['status'] !== 'active') continue;
            // Find the quest definition from NPC data
            $questDef = null;
            foreach ($npcsData as $npc) {
                if ($npc['id'] !== $q['npc_id']) continue;
                foreach ($npc['quests'] as $quest) {
                    if ($quest['id'] === $q['quest_id'] && $quest['type'] === $type && $quest['target'] === $targetId) {
                        $questDef = $quest;
                        break 2;
                    }
                }
            }
            if (!$questDef) continue;
            $q['progress'] = min($q['progress'] + $amount, $questDef['amount']);
            if ($q['progress'] >= $questDef['amount']) {
                $notifications[] = [
                    'questId' => $q['quest_id'],
                    'questName' => $questDef['name'],
                    'message' => '✅ Nhiệm vụ "' . $questDef['name'] . '" đã hoàn thành! Hãy tìm NPC để trả quest.'
                ];
            }
        }
        unset($q);
        return $notifications;
    }
}
