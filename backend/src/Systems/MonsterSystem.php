<?php

namespace App\Systems;

use App\Models\Monster;

/**
 * Manages monster loading and encounter generation.
 */
class MonsterSystem
{
    private array $monsterData = [];

    public function __construct()
    {
        $path = __DIR__ . '/../../data/monsters.json';
        if (file_exists($path)) {
            $data = json_decode(file_get_contents($path), true);
            $this->monsterData = $data['monsters'] ?? [];
        }
    }

    /**
     * Get all monster templates.
     */
    public function getAll(): array
    {
        return $this->monsterData;
    }

    /**
     * Create a monster instance by ID, scaled to player level.
     */
    public function spawn(string $id, int $playerLevel = 1): ?Monster
    {
        foreach ($this->monsterData as $data) {
            if ($data['id'] === $id) {
                return Monster::fromData($data, $playerLevel);
            }
        }
        return null;
    }

    /**
     * Spawn a random monster appropriate for player level.
     */
    public function spawnRandom(int $playerLevel = 1): Monster
    {
        // Filter monsters appropriate for level
        $available = array_filter($this->monsterData, function ($m) use ($playerLevel) {
            $minLevel = $m['minLevel'] ?? 1;
            return $playerLevel >= $minLevel;
        });

        if (empty($available)) {
            $available = $this->monsterData;
        }

        $chosen = $available[array_rand($available)];
        return Monster::fromData($chosen, $playerLevel);
    }
}
