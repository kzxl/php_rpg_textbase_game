<?php

declare(strict_types=1);

namespace App\Services;

use App\Core\PlayerRepository;
use App\Models\Player;

/**
 * Service managing Player lifecycle, persistence, and continuous state updates.
 */
class PlayerService
{
    public function load(string $id): ?Player
    {
        $player = PlayerRepository::load($id);
        if (!$player) {
            return null;
        }

        // Auto-apply HP, Energy, Stamina regeneration and travel updates
        $changedRegen = $player->applyRegeneration();
        $changedTravel = $player->updateTravelStatus();

        if ($changedRegen || $changedTravel) {
            $this->save($id, $player);
        }

        return $player;
    }

    public function save(string $id, Player $player): void
    {
        PlayerRepository::save($id, $player);
        PlayerRepository::saveItems($id, $player);
        PlayerRepository::saveSkills($id, $player);
    }
}
