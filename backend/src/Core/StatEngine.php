<?php

namespace App\Core;

use App\Models\Modifier;

/**
 * Calculates final battle stats and derived stats for any entity.
 * Gathers modifiers from all sources and applies ModifierEngine.
 */
class StatEngine
{
    /** Base battle stats per gender */
    private const GENDER_BASE = [
        'male' => [
            'strength'  => 12,
            'speed'     => 8,
            'dexterity' => 7,
            'defense'   => 10,
        ],
        'female' => [
            'strength'  => 8,
            'speed'     => 10,
            'dexterity' => 12,
            'defense'   => 7,
        ],
    ];

    /** Gender-specific bonus modifiers */
    private const GENDER_BONUSES = [
        'male' => [
            ['type' => 'increase', 'stat' => 'strength', 'value' => 10, 'source' => 'gender'],
            ['type' => 'increase', 'stat' => 'defense',  'value' => 5,  'source' => 'gender'],
        ],
        'female' => [
            ['type' => 'increase', 'stat' => 'dexterity', 'value' => 10, 'source' => 'gender'],
            ['type' => 'increase', 'stat' => 'speed',     'value' => 5,  'source' => 'gender'],
        ],
    ];

    /** Stat names that are battle stats */
    public const BATTLE_STATS = ['strength', 'speed', 'dexterity', 'defense'];

    /**
     * Get base stats for a gender.
     */
    public static function getBaseStats(string $gender): array
    {
        return self::GENDER_BASE[$gender] ?? self::GENDER_BASE['male'];
    }

    /**
     * Get gender bonus modifiers.
     * @return Modifier[]
     */
    public static function getGenderModifiers(string $gender): array
    {
        $bonuses = self::GENDER_BONUSES[$gender] ?? [];
        return array_map(fn($b) => Modifier::fromArray($b), $bonuses);
    }

    /**
     * Calculate all final stats for an entity.
     *
     * @param array $baseStats     ['strength' => 12, ...]
     * @param Modifier[] $modifiers All gathered modifiers
     * @param array $context       Condition context
     * @return array               Final stats including derived stats
     */
    public static function calculateAll(array $baseStats, array $modifiers, array $context = []): array
    {
        $final = [];

        // Calculate battle stats
        foreach (self::BATTLE_STATS as $stat) {
            $base = $baseStats[$stat] ?? 0;
            $final[$stat] = round(ModifierEngine::apply($base, $modifiers, $stat, $context), 2);
        }

        // Calculate derived stats
        $baseHp = self::calcMaxHp($final['strength']);
        $final['maxHp'] = (int) round(ModifierEngine::apply($baseHp, $modifiers, 'maxHp', $context));
        $baseEnergy = self::calcMaxEnergy($final['dexterity']);
        $final['maxEnergy'] = (int) round(ModifierEngine::apply($baseEnergy, $modifiers, 'maxEnergy', $context));
        
        $baseEnergyRegen = self::calcEnergyRegen($final['speed']);
        $final['energyRegen'] = round(ModifierEngine::apply($baseEnergyRegen, $modifiers, 'energyRegen', $context), 2);

        $baseStaminaRegen = 2; // Cân bằng 2 Thể lực / 10s (hồi đầy trong ~8.3 phút)
        $final['staminaRegen'] = round(ModifierEngine::apply($baseStaminaRegen, $modifiers, 'staminaRegen', $context), 2);

        $final['critChance'] = self::calcCritChance($final['dexterity']);
        $final['critMultiplier'] = self::calcCritMultiplier($modifiers, $context);

        return $final;
    }

    /**
     * Max HP = 100 (base) + floor(strength / 5) × 2
     * No cap on max HP.
     */
    public static function calcMaxHp(float $strength): int
    {
        return 100 + ((int) floor($strength / 5)) * 2;
    }

    /**
     * Max Energy (Linh Lực) = 50 (base) + floor(dexterity / 3)
     * Khéo léo giúp kiểm soát linh lực tốt hơn.
     */
    public static function calcMaxEnergy(float $dexterity): int
    {
        return 50 + ((int) floor($dexterity / 3));
    }

    /**
     * Energy Regen = 5 (base) + floor(speed / 5)
     * Tốc độ giúp hồi linh lực nhanh hơn.
     */
    public static function calcEnergyRegen(float $speed): int
    {
        return 5 + ((int) floor($speed / 5));
    }

    /**
     * Hit chance based on attacker speed vs defender dexterity.
     * Base 60% + ratio scaling up to 95%, floor 20%.
     */
    public static function calcHitChance(float $attackerSpeed, float $defenderDex): float
    {
        if ($attackerSpeed <= 0 && $defenderDex <= 0) return 75.0;
        $ratio = ($attackerSpeed + 1) / max(1.0, ($attackerSpeed + $defenderDex));
        $chance = 60.0 + ($ratio * 35.0);
        return min(95.0, max(20.0, round($chance, 2)));
    }

    /**
     * Dodge chance: Evasion roll based on defender dexterity vs attacker speed.
     * Capped at 35% for standard entities to prevent combat stalemates.
     */
    public static function calcDodgeChance(float $defenderDex, float $attackerSpeed): float
    {
        if ($defenderDex <= 0) return 0.0;
        $chance = ($defenderDex / ($defenderDex + 2.5 * max(1.0, $attackerSpeed))) * 100.0;
        return min(35.0, round($chance, 2));
    }

    /**
     * Crit chance = 5 + dexterity × 0.1, capped at 75%
     */
    public static function calcCritChance(float $dexterity): float
    {
        return min(75.0, round(5 + $dexterity * 0.1, 2));
    }

    /**
     * Crit multiplier = 1.5 (base) + modifier bonuses
     */
    public static function calcCritMultiplier(array $modifiers, array $context = []): float
    {
        return ModifierEngine::apply(1.5, $modifiers, 'critMultiplier', $context);
    }

    /**
     * MDG Standard: Dynamic Armor Mitigation vs Raw Damage
     * Formula: Armor Reduction (%) = Armor / (Armor + 5 * RawDamage) * 100
     * Caps at 85%. Effective against light hits, but heavy strikes pierce through.
     */
    public static function calcDamageReduction(float $defense, float $rawDamage = 25.0): float
    {
        if ($defense <= 0) return 0.0;
        $effRaw = max(8.0, $rawDamage);
        $reduction = ($defense / ($defense + 5.0 * $effRaw)) * 100.0;
        return min(85.0, round($reduction, 2));
    }

    /**
     * Level / Realm Gap Suppression (Áp Chế Cảnh Giới)
     * Returns a multiplier for outgoing damage based on level delta.
     */
    public static function calcLevelSuppression(int $attackerLevel, int $defenderLevel): float
    {
        $diff = $attackerLevel - $defenderLevel;
        if ($diff < 0) {
            // Attacker is lower level: penalty up to -35%
            $penalty = min(0.35, abs($diff) * 0.05);
            return max(0.65, 1.0 - $penalty);
        } elseif ($diff > 0) {
            // Attacker is higher level: small advantage up to +20%
            $bonus = min(0.20, $diff * 0.03);
            return 1.0 + $bonus;
        }
        return 1.0;
    }

    /**
     * Full breakdown for UI display.
     */
    public static function calculateBreakdown(array $baseStats, array $modifiers, array $context = []): array
    {
        $breakdown = [];
        foreach (self::BATTLE_STATS as $stat) {
            $base = $baseStats[$stat] ?? 0;
            $breakdown[$stat] = ModifierEngine::applyWithBreakdown($base, $modifiers, $stat, $context);
        }
        
        // Add breakdown for regen
        $baseEnergyRegen = self::calcEnergyRegen($breakdown['speed']['final'] ?? 8);
        $breakdown['energyRegen'] = ModifierEngine::applyWithBreakdown($baseEnergyRegen, $modifiers, 'energyRegen', $context);
        
        $breakdown['staminaRegen'] = ModifierEngine::applyWithBreakdown(2, $modifiers, 'staminaRegen', $context);
        
        return $breakdown;
    }
}
