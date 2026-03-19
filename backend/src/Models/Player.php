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
    /** @var int Unix timestamp when medicine cooldown expires */
    public int $medCooldownUntil = 0;

    /** @var array Base stat allocations */
    private array $baseStats;

    /** @var array Stat point allocations */
    private array $allocatedStats = [
        'strength' => 0, 'speed' => 0, 'dexterity' => 0, 'defense' => 0
    ];

    /** @var Item[] Equipped items */
    private array $equipment = [];

    /** @var Item[] Inventory */
    private array $inventory = [];

    /** @var array Active/passive skills */
    private array $skills = [];

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
     * Use medicine: restore HP%, reduce hospital time, add to med cooldown.
     * Returns null on success, error string on failure.
     */
    public function useMedicine(array $medicine): ?string
    {
        // Check med cooldown
        if ($this->medCooldownUntil > time()) {
            $remain = $this->medCooldownUntil - time();
            return "Đan dược chưa hết cooldown! Còn {$remain}s.";
        }

        // Restore HP
        $healAmount = (int) round($this->maxHp * ($medicine['healPercent'] / 100));
        $this->heal($healAmount);

        // Reduce hospital time
        $reduceSeconds = $medicine['reduceHospital'] ?? 0;
        if ($this->hospitalUntil > time()) {
            $this->hospitalUntil = max(time(), $this->hospitalUntil - $reduceSeconds);
        }

        // If fully healed, leave hospital
        if ($this->currentHp >= $this->maxHp) {
            $this->hospitalUntil = 0;
        }

        // Add medicine cooldown
        $cooldown = $medicine['cooldown'] ?? 30;
        $this->medCooldownUntil = time() + $cooldown;

        return null;
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
            'medCooldownRemaining' => max(0, $this->medCooldownUntil - time()),
            'stats' => $finalStats,
            'allocatedStats' => $this->allocatedStats,
            'equipment' => array_map(fn($i) => $i->toArray(), $this->equipment),
            'inventory' => array_map(fn($i) => $i->toArray(), $this->inventory),
            'skills' => array_values($this->skills),
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

        return $player;
    }
}
