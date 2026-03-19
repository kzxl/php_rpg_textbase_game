<?php

namespace App\Core;

/**
 * Evaluates conditions for conditional modifiers.
 */
class ConditionEngine
{
    /**
     * Check if a condition is met given current context.
     * 
     * @param array|null $condition ['type' => '...', 'value' => ...]
     * @param array $context ['hp_percent' => 0.5, 'effects' => [...], ...]
     */
    public static function evaluate(?array $condition, array $context): bool
    {
        if ($condition === null) {
            return true; // no condition = always active
        }

        $type = $condition['type'] ?? '';
        $value = $condition['value'] ?? 0;

        return match ($type) {
            'hp_below'    => ($context['hp_percent'] ?? 1.0) < $value,
            'hp_above'    => ($context['hp_percent'] ?? 1.0) > $value,
            'has_effect'  => in_array($value, $context['effects'] ?? []),
            'no_effect'   => !in_array($value, $context['effects'] ?? []),
            'has_skill'   => in_array($value, $context['skills'] ?? []),
            'has_item'    => in_array($value, $context['items'] ?? []),
            'gender'      => ($context['gender'] ?? '') === $value,
            'level_above' => ($context['level'] ?? 1) >= $value,
            'always'      => true,
            default       => false,
        };
    }
}
