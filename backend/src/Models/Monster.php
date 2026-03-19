<?php

namespace App\Models;

/**
 * Monster entity for combat encounters.
 */
class Monster
{
    public string $id;
    public string $name;
    public int $currentHp;
    public int $maxHp;
    public int $xpReward;
    public int $level = 1;

    private array $stats;
    private array $rawData = [];

    public function __construct(
        string $id,
        string $name,
        array $stats,
        int $xpReward = 20
    ) {
        $this->id = $id;
        $this->name = $name;
        $this->stats = $stats;
        $this->maxHp = $stats['hp'] ?? 50;
        $this->currentHp = $this->maxHp;
        $this->xpReward = $xpReward;
    }

    public function getStats(): array
    {
        return [
            'strength'  => $this->stats['strength'] ?? 5,
            'speed'     => $this->stats['speed'] ?? 5,
            'dexterity' => $this->stats['dexterity'] ?? 5,
            'defense'   => $this->stats['defense'] ?? 5,
        ];
    }

    public function takeDamage(int $amount): void
    {
        $this->currentHp = max(0, $this->currentHp - $amount);
    }

    public function isAlive(): bool
    {
        return $this->currentHp > 0;
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'currentHp' => $this->currentHp,
            'maxHp' => $this->maxHp,
            'stats' => $this->getStats(),
            'alive' => $this->isAlive(),
            'level' => $this->level,
        ];
    }

    public function getRawData(): array
    {
        return $this->rawData;
    }

    public function getElement(): ?string
    {
        return $this->rawData['element'] ?? null;
    }

    /**
     * Create from JSON data with optional level scaling.
     */
    public static function fromData(array $data, int $level = 1): self
    {
        $scale = 1 + ($level - 1) * 0.15;
        $stats = [
            'hp'        => (int) round(($data['stats']['hp'] ?? 50) * $scale),
            'strength'  => (int) round(($data['stats']['strength'] ?? 5) * $scale),
            'speed'     => (int) round(($data['stats']['speed'] ?? 5) * $scale),
            'dexterity' => (int) round(($data['stats']['dexterity'] ?? 5) * $scale),
            'defense'   => (int) round(($data['stats']['defense'] ?? 5) * $scale),
        ];

        $xp = (int) round(($data['xpReward'] ?? 20) * $scale);
        $m = new self($data['id'], $data['name'], $stats, $xp);
        $m->level = $level;
        $m->rawData = $data;
        return $m;
    }
}
