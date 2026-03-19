<?php

namespace App\Systems;

use App\Models\Item;

/**
 * Manages item data, generation, and crafting.
 */
class ItemSystem
{
    private array $itemData = [];
    private array $affixPool = [];

    public function __construct()
    {
        $this->loadItems();
    }

    private function loadItems(): void
    {
        $path = __DIR__ . '/../../data/items.json';
        if (file_exists($path)) {
            $data = json_decode(file_get_contents($path), true);
            $this->itemData = $data['items'] ?? [];
            $this->affixPool = $data['affixes'] ?? [];
        }
    }

    /**
     * Get all preset items.
     */
    public function getAll(): array
    {
        return $this->itemData;
    }

    /**
     * Get item by ID.
     */
    public function getById(string $id): ?array
    {
        foreach ($this->itemData as $item) {
            if ($item['id'] === $id) return $item;
        }
        return null;
    }

    /**
     * Create an Item model from data.
     */
    public function createItem(string $id): ?Item
    {
        $data = $this->getById($id);
        if (!$data) return null;
        return Item::fromArray($data);
    }

    /**
     * Generate a random item with ilvl-gated affixes.
     */
    public function generateRandomItem(string $rarity = 'common', ?string $slot = null, int $itemLevel = 1): Item
    {
        $maxAffixes = match ($rarity) {
            'common'    => 1,
            'rare'      => 3,
            'epic'      => 5,
            'legendary' => 6,
            default     => 1,
        };

        $affixes = $this->rollAffixes($maxAffixes, $itemLevel);
        $id = 'gen_' . bin2hex(random_bytes(4));
        $slotVal = $slot ?? $this->randomSlot();
        $name = $this->generateName($rarity, $slotVal);

        return new Item($id, $name, $slotVal, $slotVal, $rarity, $affixes, $itemLevel);
    }

    /**
     * Roll random affixes, filtered by item level.
     */
    private function rollAffixes(int $count, int $itemLevel = 1): array
    {
        if (empty($this->affixPool)) return [];

        // Filter by ilvl
        $eligible = array_filter($this->affixPool, fn($a) => ($a['minLevel'] ?? 1) <= $itemLevel);
        if (empty($eligible)) return [];

        $totalWeight = array_sum(array_column($eligible, 'weight'));
        $selected = [];
        $usedStats = []; // prevent duplicate stat+type combos (PoE-style mod groups)

        for ($i = 0; $i < $count; $i++) {
            $roll = mt_rand(1, $totalWeight);
            $cumulative = 0;

            foreach ($eligible as $affix) {
                $cumulative += $affix['weight'];
                if ($roll <= $cumulative) {
                    // Skip if same stat+type already rolled
                    $key = $affix['stat'] . ':' . $affix['type'];
                    if (in_array($key, $usedStats)) break;
                    $usedStats[] = $key;

                    $valueRange = $affix['value'];
                    $value = is_array($valueRange)
                        ? mt_rand($valueRange[0], $valueRange[1])
                        : $valueRange;

                    $selected[] = [
                        'type' => $affix['type'],
                        'stat' => $affix['stat'],
                        'value' => $value,
                        'name' => $affix['name'] ?? $affix['id'],
                        'tier' => $affix['tier'] ?? 1,
                    ];
                    break;
                }
            }
        }

        return $selected;
    }

    /**
     * Public: Generate affixes for a given rarity and slot.
     */
    public function generateAffixes(string $rarity, string $slot, int $itemLevel = 1): array
    {
        $maxAffixes = match ($rarity) {
            'common'    => 1,
            'rare'      => 3,
            'epic'      => 5,
            'legendary' => 6,
            default     => 1,
        };
        return $this->rollAffixes($maxAffixes, $itemLevel);
    }

    /**
     * Public: Generate a single random affix, avoiding duplicates.
     */
    public function generateSingleAffix(string $slot, array $existingAffixes = [], int $itemLevel = 1): array
    {
        $result = $this->rollAffixes(1, $itemLevel);
        return $result[0] ?? ['type' => 'flat', 'stat' => 'strength', 'value' => 1, 'name' => 'Cường Hóa', 'tier' => 1];
    }

    private function randomSlot(): string
    {
        $slots = ['weapon', 'body', 'shield', 'feet', 'ring'];
        return $slots[array_rand($slots)];
    }

    private function generateName(string $rarity, string $slot): string
    {
        $prefixes = match ($rarity) {
            'legendary' => ['Thiên', 'Huyền', 'Thánh'],
            'epic'      => ['Ma', 'Linh', 'Cổ'],
            'rare'      => ['Cương', 'Huyền', 'Tinh'],
            default     => ['Thô', 'Sơ', 'Cũ'],
        };
        $types = match ($slot) {
            'weapon' => ['Kiếm', 'Đao', 'Thương'],
            'body'   => ['Giáp', 'Bào', 'Y'],
            'shield' => ['Khiên', 'Thuẫn'],
            'feet'   => ['Hài', 'Ủng'],
            'ring'   => ['Nhẫn', 'Giới'],
            default  => ['Vật'],
        };

        return $prefixes[array_rand($prefixes)] . ' ' . $types[array_rand($types)];
    }

    /**
     * Generate a random item for gacha/loot
     */
    public function generateItem(int $playerLevel, string $rarity = 'common', string $slot = 'weapon'): Item
    {
        $name = $this->generateName($rarity, $slot);
        $affixCount = match($rarity) {
            'legendary' => rand(3, 4),
            'rare' => rand(2, 3),
            'uncommon' => rand(1, 2),
            default => rand(0, 1),
        };
        $affixes = $this->generateAffixes($rarity, $slot);
        if (count($affixes) > $affixCount) $affixes = array_slice($affixes, 0, $affixCount);

        $id = $slot . '_' . substr(md5(uniqid()), 0, 8);
        $item = Item::fromArray([
            'id' => $id,
            'name' => $name,
            'slot' => $slot,
            'baseType' => $slot,
            'rarity' => $rarity,
            'itemLevel' => $playerLevel + rand(0, 5),
            'affixes' => $affixes,
        ]);
        return $item;
    }
}
