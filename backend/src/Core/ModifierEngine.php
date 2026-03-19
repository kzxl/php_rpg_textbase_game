<?php

namespace App\Core;

use App\Models\Modifier;

/**
 * Core engine: applies modifier pipeline to calculate final stat values.
 * Formula: finalStat = (base + Σflat) × (1 + Σincrease%) × Π(1 + more%)
 */
class ModifierEngine
{
    /**
     * Apply all modifiers for a specific stat to a base value.
     *
     * @param float $base       Base stat value
     * @param Modifier[] $modifiers  All modifiers (will be filtered by stat)
     * @param string $stat      The stat to calculate
     * @param array $context    Context for conditional modifiers
     * @return float            Final calculated value
     */
    public static function apply(float $base, array $modifiers, string $stat, array $context = []): float
    {
        $flat = 0.0;
        $increasePct = 0.0;
        $moreMul = 1.0;

        foreach ($modifiers as $mod) {
            // Filter by stat name
            if ($mod->stat !== $stat) {
                continue;
            }

            // Check condition
            if (!ConditionEngine::evaluate($mod->condition, $context)) {
                continue;
            }

            match ($mod->type) {
                'flat'     => $flat += $mod->value,
                'increase' => $increasePct += $mod->value / 100,
                'more'     => $moreMul *= (1 + $mod->value / 100),
                default    => null,
            };
        }

        return ($base + $flat) * (1 + $increasePct) * $moreMul;
    }

    /**
     * Apply modifiers and return breakdown for UI display.
     */
    public static function applyWithBreakdown(float $base, array $modifiers, string $stat, array $context = []): array
    {
        $flat = 0.0;
        $increasePct = 0.0;
        $moreMul = 1.0;
        $sources = [];

        foreach ($modifiers as $mod) {
            if ($mod->stat !== $stat) {
                continue;
            }
            if (!ConditionEngine::evaluate($mod->condition, $context)) {
                continue;
            }

            $sources[] = $mod->toArray();

            match ($mod->type) {
                'flat'     => $flat += $mod->value,
                'increase' => $increasePct += $mod->value / 100,
                'more'     => $moreMul *= (1 + $mod->value / 100),
                default    => null,
            };
        }

        $final = ($base + $flat) * (1 + $increasePct) * $moreMul;

        return [
            'base' => $base,
            'flat' => $flat,
            'increase_pct' => round($increasePct * 100, 2),
            'more_mul' => round($moreMul, 4),
            'final' => round($final, 2),
            'sources' => $sources,
        ];
    }
}
