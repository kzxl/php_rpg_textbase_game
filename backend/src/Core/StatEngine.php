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
        $final['maxHp'] = self::calcMaxHp($final['strength']);
        $final['maxEnergy'] = self::calcMaxEnergy($final['dexterity']);
        
        $baseEnergyRegen = self::calcEnergyRegen($final['speed']);
        $final['energyRegen'] = round(ModifierEngine::apply($baseEnergyRegen, $modifiers, 'energyRegen', $context), 2);

        $baseStaminaRegen = 10; // Cố định 10 Thể lực
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
     * Hit chance = attacker.speed / (attacker.speed + defender.dexterity) × 100
     * Capped at 95%
     */
    public static function calcHitChance(float $attackerSpeed, float $defenderDex): float
    {
        if ($attackerSpeed + $defenderDex <= 0) return 50.0;
        $chance = ($attackerSpeed / ($attackerSpeed + $defenderDex)) * 100;
        return min(95.0, round($chance, 2));
    }

    /**
     * Dodge chance = defender.dex / (defender.dex + attacker.speed) × 100
     * Capped at 75%
     */
    public static function calcDodgeChance(float $defenderDex, float $attackerSpeed): float
    {
        if ($defenderDex + $attackerSpeed <= 0) return 0.0;
        $chance = ($defenderDex / ($defenderDex + $attackerSpeed)) * 100;
        return min(75.0, round($chance, 2));
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
     * Damage reduction = defense / (defense + 100), capped at 90%
     */
    public static function calcDamageReduction(float $defense): float
    {
        if ($defense <= 0) return 0.0;
        $reduction = ($defense / ($defense + 100)) * 100;
        return min(90.0, round($reduction, 2));
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
        
        $breakdown['staminaRegen'] = ModifierEngine::applyWithBreakdown(10, $modifiers, 'staminaRegen', $context);
        
        return $breakdown;
    }
}
