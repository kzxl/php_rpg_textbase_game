<?php

namespace App\Models;

/**
 * Item with base type and affix-generated modifiers.
 */
class Item
{
    public string $id;
    public string $name;
    public string $baseType; // 'sword', 'shield', 'helmet', etc.
    public string $slot;     // 'weapon', 'shield', 'head', 'body', 'ring'
    public string $rarity;   // 'common', 'rare', 'epic', 'legendary'

    /** @var array Affix data */
    private array $affixes;

    public function __construct(
        string $id,
        string $name,
        string $baseType,
        string $slot,
        string $rarity = 'common',
        array $affixes = []
    ) {
        $this->id = $id;
        $this->name = $name;
        $this->baseType = $baseType;
        $this->slot = $slot;
        $this->rarity = $rarity;
        $this->affixes = $affixes;
    }

    /**
     * Get all modifiers from this item's affixes.
     * @return Modifier[]
     */
    public function getModifiers(): array
    {
        $mods = [];
        foreach ($this->affixes as $affix) {
            $mods[] = new Modifier(
                type: $affix['type'] ?? 'flat',
                stat: $affix['stat'] ?? 'strength',
                value: $affix['value'] ?? 0,
                condition: $affix['condition'] ?? null,
                source: 'item:' . $this->id
            );
        }
        return $mods;
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'baseType' => $this->baseType,
            'slot' => $this->slot,
            'rarity' => $this->rarity,
            'affixes' => $this->affixes,
        ];
    }

    public static function fromArray(array $data): self
    {
        return new self(
            id: $data['id'],
            name: $data['name'],
            baseType: $data['baseType'],
            slot: $data['slot'],
            rarity: $data['rarity'] ?? 'common',
            affixes: $data['affixes'] ?? []
        );
    }
}
