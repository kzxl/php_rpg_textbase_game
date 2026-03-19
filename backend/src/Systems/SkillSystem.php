<?php

namespace App\Systems;

/**
 * Manages skill learning, equipping, and data loading.
 */
class SkillSystem
{
    private array $skillData = [];

    public function __construct()
    {
        $this->loadSkills();
    }

    private function loadSkills(): void
    {
        $path = __DIR__ . '/../../data/skills.json';
        if (file_exists($path)) {
            $data = json_decode(file_get_contents($path), true);
            $this->skillData = $data['skills'] ?? [];
        }
    }

    /**
     * Get all available skills.
     */
    public function getAll(): array
    {
        return $this->skillData;
    }

    /**
     * Get skill by ID.
     */
    public function getById(string $id): ?array
    {
        foreach ($this->skillData as $skill) {
            if ($skill['id'] === $id) return $skill;
        }
        return null;
    }

    /**
     * Get skills by type.
     */
    public function getByType(string $type): array
    {
        return array_values(array_filter(
            $this->skillData,
            fn($s) => ($s['type'] ?? 'active') === $type
        ));
    }
}
