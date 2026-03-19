<?php

namespace App\Models;

/**
 * Value object representing a single stat modifier.
 * Types: flat, increase (additive %), more (multiplicative %)
 * appliesTo: optional tag filter (e.g. ['physical'] = only applies to physical skills)
 */
class Modifier
{
    public function __construct(
        public readonly string $type,   // 'flat' | 'increase' | 'more'
        public readonly string $stat,   // 'strength', 'damage', etc.
        public readonly float  $value,
        public readonly ?array $condition = null, // ['type' => 'hp_below', 'value' => 0.3]
        public readonly string $source = 'unknown', // 'item', 'skill', 'gender', 'title'
        public readonly ?array $appliesTo = null // ['physical'] | ['magical'] | null = global
    ) {}

    /**
     * Create from JSON/array data
     */
    public static function fromArray(array $data): self
    {
        return new self(
            type: $data['type'],
            stat: $data['stat'],
            value: $data['value'],
            condition: $data['condition'] ?? null,
            source: $data['source'] ?? 'unknown',
            appliesTo: $data['appliesTo'] ?? null
        );
    }

    /**
     * Check if this modifier applies to the given skill tags.
     * Returns true if: appliesTo is null (global) OR any tag matches.
     */
    public function matchesTags(array $skillTags): bool
    {
        if ($this->appliesTo === null) return true;
        return !empty(array_intersect($this->appliesTo, $skillTags));
    }

    public function toArray(): array
    {
        return [
            'type' => $this->type,
            'stat' => $this->stat,
            'value' => $this->value,
            'condition' => $this->condition,
            'source' => $this->source,
            'appliesTo' => $this->appliesTo,
        ];
    }
}
