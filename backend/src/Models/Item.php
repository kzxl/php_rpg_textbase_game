<?php

namespace App\Models;

/**
 * Item entity representing equipment, weapons, armors, and accessories
 * with procedural affixes, level gates, and enhancement progression.
 */
class Item
{
    public string $id;
    public string $name;
    public string $baseType; // 'sword', 'shield', 'helmet', 'armor', 'ring', etc.
    public string $slot;     // 'weapon', 'shield', 'head', 'body', 'feet', 'ring', 'ring1', 'ring2'
    public string $rarity;   // 'common', 'uncommon', 'rare', 'epic', 'legendary'
    public int $itemLevel = 1; // Determines affix tiers and scaling
    public int $enhanceLevel = 0; // Enhancement rank from +0 to +12

    /** @var array Affix definitions rolled on the item */
    private array $affixes;

    public function __construct(
        string $id,
        string $name,
        string $baseType,
        string $slot,
        string $rarity = 'common',
        array $affixes = [],
        int $itemLevel = 1,
        int $enhanceLevel = 0
    ) {
        $this->id = $id;
        $this->name = $name;
        $this->baseType = $baseType;
        $this->slot = $slot;
        $this->rarity = $rarity;
        $this->affixes = $affixes;
        $this->itemLevel = $itemLevel;
        $this->enhanceLevel = max(0, min(12, $enhanceLevel));
    }

    /**
     * Compute all combat modifiers derived from affixes and enhancement rank.
     *
     * @return Modifier[]
     */
    public function getModifiers(): array
    {
        $mods = [];

        // 1. Inherent Affix Modifiers
        foreach ($this->affixes as $affix) {
            $mods[] = new Modifier(
                type: $affix['type'] ?? 'flat',
                stat: $affix['stat'] ?? 'strength',
                value: $affix['value'] ?? 0,
                condition: $affix['condition'] ?? null,
                source: 'item:' . $this->id
            );
        }

        // 2. Dynamic Enhancement Modifiers (+1 to +12 scaling)
        if ($this->enhanceLevel > 0) {
            $ilvlScale = max(1, (int) floor($this->itemLevel / 3));

            if ($this->slot === 'weapon') {
                // Weapons gain escalating flat strength and damage
                $bonusStr = (int) round($this->enhanceLevel * 4 * $ilvlScale);
                $mods[] = new Modifier(
                    type: 'flat',
                    stat: 'strength',
                    value: max(4 * $this->enhanceLevel, $bonusStr),
                    condition: null,
                    source: 'enhance:' . $this->id
                );
            } elseif ($this->slot === 'body' || $this->slot === 'shield' || $this->slot === 'head') {
                // Armors and shields gain physical defense and health pool
                $bonusDef = (int) round($this->enhanceLevel * 3 * $ilvlScale);
                $mods[] = new Modifier(
                    type: 'flat',
                    stat: 'defense',
                    value: max(3 * $this->enhanceLevel, $bonusDef),
                    condition: null,
                    source: 'enhance:' . $this->id
                );
                $mods[] = new Modifier(
                    type: 'flat',
                    stat: 'maxHp',
                    value: $this->enhanceLevel * 30 * $ilvlScale,
                    condition: null,
                    source: 'enhance:' . $this->id
                );
            } elseif ($this->slot === 'feet') {
                // Boots gain speed and evasion dexterity
                $bonusSpd = (int) round($this->enhanceLevel * 3 * $ilvlScale);
                $mods[] = new Modifier(
                    type: 'flat',
                    stat: 'speed',
                    value: max(2 * $this->enhanceLevel, $bonusSpd),
                    condition: null,
                    source: 'enhance:' . $this->id
                );
                $mods[] = new Modifier(
                    type: 'flat',
                    stat: 'dexterity',
                    value: max(1 * $this->enhanceLevel, (int)round($bonusSpd * 0.6)),
                    condition: null,
                    source: 'enhance:' . $this->id
                );
            } elseif (in_array($this->slot, ['ring', 'ring1', 'ring2', 'accessory'])) {
                // Rings gain dexterity, strength, and crit chance
                $mods[] = new Modifier(
                    type: 'flat',
                    stat: 'strength',
                    value: max(2 * $this->enhanceLevel, (int)round($this->enhanceLevel * 2 * $ilvlScale)),
                    condition: null,
                    source: 'enhance:' . $this->id
                );
                $mods[] = new Modifier(
                    type: 'flat',
                    stat: 'dexterity',
                    value: max(2 * $this->enhanceLevel, (int)round($this->enhanceLevel * 2 * $ilvlScale)),
                    condition: null,
                    source: 'enhance:' . $this->id
                );
            }
        }

        return $mods;
    }

    public function getId(): string { return $this->id; }
    public function getRarity(): string { return $this->rarity; }
    public function getSlot(): string { return $this->slot; }
    public function getAffixes(): array { return $this->affixes; }
    public function setAffixes(array $affixes): void { $this->affixes = $affixes; }
    public function getItemLevel(): int { return $this->itemLevel; }
    public function setItemLevel(int $level): void { $this->itemLevel = $level; }
    public function getBaseItemLevel(): int { return $this->itemLevel; }
    public function getEnhanceLevel(): int { return $this->enhanceLevel; }
    public function setEnhanceLevel(int $level): void { $this->enhanceLevel = max(0, min(12, $level)); }

    /**
     * Get user-facing display name with enhancement badge.
     */
    public function getDisplayName(): string
    {
        return $this->enhanceLevel > 0 ? "{$this->name} +{$this->enhanceLevel}" : $this->name;
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'displayName' => $this->getDisplayName(),
            'baseType' => $this->baseType,
            'slot' => $this->slot,
            'rarity' => $this->rarity,
            'itemLevel' => $this->itemLevel,
            'enhanceLevel' => $this->enhanceLevel,
            'affixes' => $this->affixes,
        ];
    }

    public static function fromArray(array $data): self
    {
        return new self(
            id: $data['id'],
            name: $data['name'],
            baseType: $data['baseType'] ?? ($data['slot'] ?? 'weapon'),
            slot: $data['slot'] ?? 'weapon',
            rarity: $data['rarity'] ?? 'common',
            affixes: $data['affixes'] ?? [],
            itemLevel: (int)($data['itemLevel'] ?? 1),
            enhanceLevel: (int)($data['enhanceLevel'] ?? 0)
        );
    }
}
