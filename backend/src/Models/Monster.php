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
     * Create from JSON data with MDG balanced tier-based stat floors and level scaling.
     */
    public static function fromData(array $data, int $level = 1): self
    {
        $tier = (int)($data['tier'] ?? 1);
        $isBoss = !empty($data['isBoss']) || !empty($data['boss']) || in_array('boss', $data['tags'] ?? []);

        // MDG Balanced Tier Stat Floors (tránh quái quá giấy ở cấp thấp)
        $hpFloors = [
            1 => 65,
            2 => 220,
            3 => 650,
            4 => 1800,
            5 => 5000,
        ];
        $strFloors = [
            1 => 8,
            2 => 18,
            3 => 35,
            4 => 65,
            5 => 120,
        ];

        $minHp = $hpFloors[$tier] ?? 65;
        $minStr = $strFloors[$tier] ?? 8;

        $rawHp = max($minHp, (int)($data['stats']['hp'] ?? 50));
        $rawStr = max($minStr, (int)($data['stats']['strength'] ?? 5));
        $rawSpd = max(6, (int)($data['stats']['speed'] ?? 5));
        $rawDex = max(6, (int)($data['stats']['dexterity'] ?? 5));
        $rawDef = max(4, (int)($data['stats']['defense'] ?? 5));

        // Smooth level scaling (+20% per level)
        $scale = 1.0 + ($level - 1) * 0.20;
        if ($isBoss) {
            $scale *= 2.2; // Boss HP & threat multiplier
        }

        $stats = [
            'hp'        => (int) round($rawHp * $scale),
            'strength'  => (int) round($rawStr * (1.0 + ($level - 1) * 0.15) * ($isBoss ? 1.4 : 1.0)),
            'speed'     => (int) round($rawSpd * (1.0 + ($level - 1) * 0.10)),
            'dexterity' => (int) round($rawDex * (1.0 + ($level - 1) * 0.10)),
            'defense'   => (int) round($rawDef * (1.0 + ($level - 1) * 0.12) * ($isBoss ? 1.3 : 1.0)),
        ];

        $xp = (int) round(($data['xpReward'] ?? 20) * (1.0 + ($level - 1) * 0.25));
        $m = new self($data['id'], $data['name'], $stats, $xp);
        $m->level = $level;
        $m->rawData = $data;
        return $m;
    }
}
