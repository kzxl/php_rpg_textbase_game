<?php

namespace App\Systems;

use App\Models\Monster;
use App\Core\GameDataRepository;

/**
 * Manages monster loading and encounter generation.
 * Uses GameDataRepository (DB) instead of JSON files.
 */
class MonsterSystem
{
    private array $monsterData = [];

    public function __construct()
    {
        $this->monsterData = GameDataRepository::getMonsters();
    }

    public function getAll(): array
    {
        return $this->monsterData;
    }

    public function spawn(string $id, int $playerLevel = 1): ?Monster
    {
        $data = GameDataRepository::getMonsterById($id);
        return $data ? Monster::fromData($data, $playerLevel) : null;
    }

    public function spawnRandom(int $playerLevel = 1): Monster
    {
        $available = array_filter($this->monsterData, function ($m) use ($playerLevel) {
            $minLevel = $m['minLevel'] ?? 1;
            return $playerLevel >= $minLevel;
        });
        if (empty($available)) $available = $this->monsterData;
        $chosen = $available[array_rand($available)];
        return Monster::fromData($chosen, $playerLevel);
    }
}
