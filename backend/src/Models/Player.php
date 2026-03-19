<?php

namespace App\Models;

use App\Core\StatEngine;
use App\Core\ModifierEngine;

/**
 * Player entity with gender-based stats, equipment, and skills.
 */
class Player
{
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
    public int $statPoints = 0;

    /** @var int Unix timestamp when hospital ends (0 = not hospitalized) */
    public int $hospitalUntil = 0;
    /** @var int Unix timestamp when shared med cooldown expires (Torn-style stacking) */
    public int $medCooldownUntil = 0;
    /** @var int Max med cooldown cap in seconds */
    private const MED_COOLDOWN_CAP = 300; // 5 minutes
    /** @var int Last HP regen timestamp (meditation) */
    public int $lastHpRegen = 0;

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
    public string $currentArea = 'thanh_lam_tran'; // Ngao Du — current area
    public ?string $travelingTo = null; // Travel destination area ID
    public int $travelArrivesAt = 0; // Unix timestamp when travel completes

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

    /** @var array Active/passive skills */
    public array $skills = [];

    /** @var Modifier[] Extra modifiers (title, hidden, etc.) */
    private array $extraModifiers = [];

    public function __construct(string $name, string $gender)
    {
        $this->name = $name;
        $this->gender = $gender;
        $this->baseStats = StatEngine::getBaseStats($gender);
        $this->recalcDerived();
        $this->currentHp = $this->maxHp;
        $this->currentEnergy = $this->maxEnergy;
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

        // Extra modifiers (titles, hidden, etc.)
        $mods = array_merge($mods, $this->extraModifiers);

        return $mods;
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
     * Equip an item.
     */
    public function equipItem(Item $item): void
    {
        $this->equipment[$item->slot] = $item;
        $this->recalcDerived();
    }

    /**
     * Unequip an item.
     */
    public function unequipItem(string $slot): ?Item
    {
        $item = $this->equipment[$slot] ?? null;
        if ($item) {
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
     * Get active skill by ID.
     */
    public function getActiveSkill(string $skillId): ?array
    {
        $skill = $this->skills[$skillId] ?? null;
        if ($skill && ($skill['type'] ?? 'active') === 'active') {
            return $skill;
        }
        return null;
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
     * Train a stat in the gym. Costs energy, directly increases stat.
     */
    public function trainStat(string $stat, int $energyCost = 5): ?string
    {
        if (!in_array($stat, StatEngine::BATTLE_STATS)) {
            return "Chỉ số không hợp lệ.";
        }
        if ($this->isHospitalized()) {
            return "Đang tịnh dưỡng, không thể rèn luyện!";
        }
        if ($this->currentEnergy < $energyCost) {
            return "Không đủ linh lực! Cần {$energyCost}.";
        }

        $this->currentEnergy -= $energyCost;

        // Gain = 1 + random(0-1) based on stat level  
        $currentStat = $this->allocatedStats[$stat] ?? 0;
        $gain = 1; // base gain per train
        $this->allocatedStats[$stat] = ($this->allocatedStats[$stat] ?? 0) + $gain;
        $this->recalcDerived();

        return null;
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
     * Use medicine with Torn-style shared stacking cooldown.
     * Each use ADDS time to the shared timer. Can't use if timer > cap.
     */
    public function useMedicine(array $medicine): ?string
    {
        $remaining = max(0, $this->medCooldownUntil - time());
        $addTime = $medicine['cooldownAdd'] ?? 30;

        if ($remaining + $addTime > self::MED_COOLDOWN_CAP) {
            return "Đan độc quá nồng! Cần chờ {$remaining}s trước khi dùng tiếp.";
        }

        // Heal
        $healAmount = (int) round($this->maxHp * ($medicine['healPercent'] / 100));
        $this->currentHp = min($this->maxHp, $this->currentHp + $healAmount);

        // Stack cooldown: if timer is still running, add to it; else start fresh
        $this->medCooldownUntil = max(time(), $this->medCooldownUntil) + $addTime;

        return null;
    }

    public function medCooldownRemaining(): int
    {
        return max(0, $this->medCooldownUntil - time());
    }

    /**
     * Apply meditation HP regen (1% maxHP per 10s) if player has Toa Thien skill.
     */
    public function applyMeditation(): int
    {
        $hasMeditation = in_array('toa_thien', array_column($this->skills, 'id'));
        if (!$hasMeditation) return 0;
        if ($this->currentHp >= $this->maxHp) return 0;

        $now = time();
        $elapsed = $now - $this->lastHpRegen;
        if ($elapsed < 10) return 0;

        $ticks = (int) floor($elapsed / 10);
        $healPerTick = max(1, (int) round($this->maxHp * 0.01));
        $totalHeal = $healPerTick * $ticks;
        $this->currentHp = min($this->maxHp, $this->currentHp + $totalHeal);
        $this->lastHpRegen = $now;
        return $totalHeal;
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
        $this->currentEnergy = min($this->maxEnergy, $this->currentEnergy + $regen);
        return $this->currentEnergy - $before;
    }

    /**
     * Gain XP and handle level up.
     */
    public function gainXp(int $amount): void
    {
        $this->xp += $amount;
        while ($this->xp >= $this->xpToNext) {
            $this->xp -= $this->xpToNext;
            $this->level++;
            $this->statPoints += 3;
            $this->xpToNext = (int) ($this->xpToNext * 1.5);
            $this->recalcDerived();
            $this->currentHp = $this->maxHp;
            $this->currentEnergy = $this->maxEnergy;
        }
    }

    public function isAlive(): bool
    {
        return $this->currentHp > 0;
    }

    private function recalcDerived(): void
    {
        $stats = $this->getFinalStats();
        $this->maxHp = $stats['maxHp'];
        $this->maxEnergy = $stats['maxEnergy'] ?? 50;
    }

    public function toArray(): array
    {
        $finalStats = $this->getFinalStats();
        return [
            'username' => $this->username,
            'passwordHash' => $this->passwordHash,
            'name' => $this->name,
            'gender' => $this->gender,
            'level' => $this->level,
            'xp' => $this->xp,
            'xpToNext' => $this->xpToNext,
            'currentHp' => $this->currentHp,
            'maxHp' => $this->maxHp,
            'currentEnergy' => $this->currentEnergy,
            'maxEnergy' => $this->maxEnergy,
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
            'currentArea' => $this->currentArea,
            'travelingTo' => $this->travelingTo,
            'travelArrivesAt' => $this->travelArrivesAt,
            'travelRemaining' => $this->travelRemaining(),
        ];
    }

    /**
     * Create from saved data.
     */
    public static function fromArray(array $data): self
    {
        $player = new self($data['name'], $data['gender']);
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

        // Recalculate maxHp/maxEnergy after restoring all equipment/stats
        $player->recalcDerived();
        $player->currentHp = $data['currentHp'] ?? $player->maxHp;
        $player->currentEnergy = $data['currentEnergy'] ?? $player->maxEnergy;
        $player->hospitalUntil = $data['hospitalUntil'] ?? 0;
        $player->medCooldownUntil = $data['medCooldownUntil'] ?? 0;
        $player->lastHpRegen = $data['lastHpRegen'] ?? time();
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
        $player->currentArea = $data['currentArea'] ?? 'thanh_lam_tran';
        $player->travelingTo = $data['travelingTo'] ?? null;
        $player->travelArrivesAt = $data['travelArrivesAt'] ?? 0;
        $player->username = $data['username'] ?? '';
        $player->passwordHash = $data['passwordHash'] ?? '';

        return $player;
    }

    // === Phase 1 Methods ===

    public function isJailed(): bool { return $this->jailUntil > time(); }
    public function jailRemaining(): int { return max(0, $this->jailUntil - time()); }

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

    public function jail(int $seconds): void { $this->jailUntil = time() + $seconds; }

    public function spendNerve(int $amount): bool
    {
        if ($this->nerve < $amount) return false;
        $this->nerve -= $amount;
        return true;
    }

    /**
     * Execute a crime. Returns result array.
     */
    public function commitCrime(array $crime): array
    {
        if ($this->isJailed()) return ['outcome' => 'jailed', 'message' => 'Đang bị giam! Không thể phạm tội.'];
        if ($this->isHospitalized()) return ['outcome' => 'hospital', 'message' => 'Đang tịnh dưỡng! Không thể phạm tội.'];
        if ($this->nerve < $crime['nerveCost']) return ['outcome' => 'no_nerve', 'message' => 'Không đủ Nghịch Khí!'];

        $cs = $this->crimeSkills[$crime['id']] ?? 0;
        if ($cs < ($crime['minSkill'] ?? 0)) {
            return ['outcome' => 'locked', 'message' => "Cần Crime Skill {$crime['minSkill']} để thực hiện!"];
        }

        $this->nerve -= $crime['nerveCost'];

        // Success rate = base + CS bonus (each CS point adds 0.5%)
        $successRate = min(95, $crime['baseSuccessRate'] + $cs * 0.5);
        $roll = mt_rand(1, 100);

        if ($roll <= $successRate) {
            // SUCCESS
            $gold = mt_rand($crime['rewards']['goldMin'], $crime['rewards']['goldMax']);
            $this->gold += $gold;
            $this->crimeExp += $crime['rewards']['ceGain'];
            $this->crimeSkills[$crime['id']] = min(100, ($this->crimeSkills[$crime['id']] ?? 0) + $crime['rewards']['csGain']);
            // Max nerve grows with crimeExp (every 50 CE = +5 max nerve)
            $this->maxNerve = 15 + (int)floor($this->crimeExp / 50) * 5;

            return [
                'outcome' => 'success',
                'message' => "✅ Thành công! +{$gold} lính thạch",
                'gold' => $gold,
                'ceGain' => $crime['rewards']['ceGain'],
                'csGain' => $crime['rewards']['csGain'],
            ];
        }

        // Check critical failure
        $critRoll = mt_rand(1, 100);
        if ($critRoll <= ($crime['critFailChance'] ?? 5)) {
            // CRITICAL FAILURE → Jail
            $this->crimeExp = max(0, $this->crimeExp - $crime['critFailPenalty']['ceLoss']);
            $this->crimeSkills[$crime['id']] = max(0, ($this->crimeSkills[$crime['id']] ?? 0) - $crime['critFailPenalty']['csLoss']);
            $jailTime = $crime['critFailPenalty']['jailSeconds'];
            $this->jail($jailTime);

            return [
                'outcome' => 'critical_fail',
                'message' => "❌ Thảm bại! Bị bắt giam {$jailTime}s!",
                'jailSeconds' => $jailTime,
                'ceLoss' => $crime['critFailPenalty']['ceLoss'],
                'csLoss' => $crime['critFailPenalty']['csLoss'],
            ];
        }

        // NORMAL FAILURE
        $this->crimeExp = max(0, $this->crimeExp - ($crime['failPenalty']['ceLoss'] ?? 0));
        $this->crimeSkills[$crime['id']] = max(0, ($this->crimeSkills[$crime['id']] ?? 0) - ($crime['failPenalty']['csLoss'] ?? 0));

        return [
            'outcome' => 'fail',
            'message' => '⚠️ Thất bại! Không thu được gì.',
            'ceLoss' => $crime['failPenalty']['ceLoss'] ?? 0,
            'csLoss' => $crime['failPenalty']['csLoss'] ?? 0,
        ];
    }

    /**
     * Attempt jail escape. Costs nerve, DEX-based success.
     */
    public function escapeJail(): array
    {
        if (!$this->isJailed()) return ['success' => false, 'message' => 'Không bị giam!'];
        if ($this->nerve < 3) return ['success' => false, 'message' => 'Cần 3 Nghịch Khí để vượt ngục!'];

        $this->nerve -= 3;
        $dex = $this->getFinalStats()['dexterity'] ?? 10;
        $escapeChance = min(60, 20 + $dex * 0.5);

        if (mt_rand(1, 100) <= $escapeChance) {
            $this->jailUntil = 0;
            return ['success' => true, 'message' => '🏃 Vượt ngục thành công!'];
        }

        // Failed escape: +50% time
        $remaining = $this->jailRemaining();
        $this->jailUntil += (int)($remaining * 0.5);
        return ['success' => false, 'message' => "❌ Thất bại! Thời gian giam tăng thêm {$remaining}s!"];
    }

    /**
     * Bail out of jail. Costs gold.
     */
    public function bailOut(): array
    {
        if (!$this->isJailed()) return ['success' => false, 'message' => 'Không bị giam!'];
        $remaining = (int)ceil($this->jailRemaining() / 60);
        $cost = max(10, 100 * $remaining * $this->level);

        if ($this->gold < $cost) return ['success' => false, 'message' => "Cần {$cost} lính thạch để bảo lãnh!"];

        $this->gold -= $cost;
        $this->jailUntil = 0;
        return ['success' => true, 'message' => "💰 Bảo lãnh thành công! -{$cost} lính thạch", 'cost' => $cost];
    }

    /**
     * Enroll in an education node.
     */
    public function enrollNode(array $node, string $treeId): ?string
    {
        if ($this->isJailed()) return 'Đang bị giam!';
        if ($this->studyingNode !== '') return 'Đang tu luyện môn khác!';
        if (in_array($node['id'], $this->unlockedNodes)) return 'Đã lĩnh ngộ thành công môn này!';

        // Check prereqs
        foreach (($node['prerequisites'] ?? []) as $prereq) {
            if (!in_array($prereq, $this->unlockedNodes)) {
                return "Cần lĩnh ngộ cơ sở trước!";
            }
        }

        $this->studyingNode = $node['id'] . '|' . $treeId;
        $this->studyEndsAt = time() + ($node['duration'] ?? 60);
        return null; // success
    }

    /**
     * Check/complete education. Returns completed node ID or null.
     */
    public function checkEducation(): ?string
    {
        if ($this->studyingNode === '' || $this->studyEndsAt > time()) return null;

        $parts = explode('|', $this->studyingNode);
        $nodeId = $parts[0];
        $treeId = $parts[1] ?? 'unknown';

        $this->unlockedNodes[] = $nodeId;
        $this->treeProgress[$treeId] = ($this->treeProgress[$treeId] ?? 0) + 1;
        
        $this->studyingNode = '';
        $this->studyEndsAt = 0;
        return $nodeId;
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
}
