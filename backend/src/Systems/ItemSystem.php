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
     * Generate a random item with random affixes.
     */
    public function generateRandomItem(string $rarity = 'common', ?string $slot = null): Item
    {
        $maxAffixes = match ($rarity) {
            'common'    => 1,
            'rare'      => 2,
            'epic'      => 3,
            'legendary' => 4,
            default     => 1,
        };

        $affixes = $this->rollAffixes($maxAffixes);
        $id = 'gen_' . bin2hex(random_bytes(4));
        $name = $this->generateName($rarity, $slot ?? 'weapon');
        $slotVal = $slot ?? $this->randomSlot();

        return new Item($id, $name, $slotVal, $slotVal, $rarity, $affixes);
    }

    /**
     * Roll random affixes from the pool.
     */
    private function rollAffixes(int $count): array
    {
        if (empty($this->affixPool)) return [];

        $totalWeight = array_sum(array_column($this->affixPool, 'weight'));
        $selected = [];

        for ($i = 0; $i < $count; $i++) {
            $roll = mt_rand(1, $totalWeight);
            $cumulative = 0;

            foreach ($this->affixPool as $affix) {
                $cumulative += $affix['weight'];
                if ($roll <= $cumulative) {
                    $valueRange = $affix['value'];
                    $value = is_array($valueRange)
                        ? mt_rand($valueRange[0], $valueRange[1])
                        : $valueRange;

                    $selected[] = [
                        'type' => $affix['type'],
                        'stat' => $affix['stat'],
                        'value' => $value,
                    ];
                    break;
                }
            }
        }

        return $selected;
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
}
