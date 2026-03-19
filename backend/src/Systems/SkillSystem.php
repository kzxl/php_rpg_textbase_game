<?php

namespace App\Systems;

/**
 * SkillSystem — loads skill definitions from skills.json (data-driven).
 * Used by PlayerRepository to hydrate skill data from player_skills mapping table.
 */
class SkillSystem
{
    private array $skills = [];

    public function __construct()
    {
        $file = __DIR__ . '/../../data/skills.json';
        if (file_exists($file)) {
            $data = json_decode(file_get_contents($file), true);
            foreach (($data['skills'] ?? []) as $skill) {
                $this->skills[$skill['id']] = $skill;
            }
        }
    }

    /**
     * Get skill definition by ID.
     */
    public function getById(string $id): ?array
    {
        return $this->skills[$id] ?? null;
    }

    /**
     * Get all skill definitions.
     */
    public function getAll(): array
    {
        return array_values($this->skills);
    }
}
