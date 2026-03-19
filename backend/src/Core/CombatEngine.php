<?php

namespace App\Core;

use App\Models\Player;
use App\Models\Monster;

/**
 * Torn-style turn-based combat engine.
 *
 * Key mechanics (adapted from Torn City):
 *  - Max 25 turns per fight
 *  - Body part targeting with damage multipliers (3.5x/2x/1x/0.7x)
 *  - Hit outcomes: hit, miss, dodge, crit, glancing
 *  - Stalemate if nobody dies after 25 turns
 *  - Flee attempt when monster misses (DEX vs SPD check)
 */
class CombatEngine
{
    private array $log = [];

    /** Max turns before stalemate */
    private const MAX_TURNS = 25;

    /** Base energy cost per attack */
    private const ATTACK_COST = 10;

    /** Body parts with damage multipliers and hit weights (Torn-style) */
    private const BODY_PARTS = [
        ['name' => 'Đầu',    'mul' => 3.5, 'weight' => 5],   // Head - rare but devastating
        ['name' => 'Cổ',     'mul' => 3.5, 'weight' => 3],   // Throat
        ['name' => 'Tim',    'mul' => 3.5, 'weight' => 2],   // Heart
        ['name' => 'Ngực',   'mul' => 2.0, 'weight' => 15],  // Chest
        ['name' => 'Bụng',   'mul' => 2.0, 'weight' => 12],  // Stomach
        ['name' => 'Háng',   'mul' => 2.0, 'weight' => 5],   // Groin
        ['name' => 'Tay',    'mul' => 1.0, 'weight' => 20],  // Arms
        ['name' => 'Chân',   'mul' => 1.0, 'weight' => 20],  // Legs
        ['name' => 'Vai',    'mul' => 0.7, 'weight' => 10],  // Shoulder
        ['name' => 'Bàn tay','mul' => 0.7, 'weight' => 8],   // Hands
    ];

    /**
     * Roll a random body part based on weights.
     */
    private function rollBodyPart(): array
    {
        $totalWeight = array_sum(array_column(self::BODY_PARTS, 'weight'));
        $roll = mt_rand(1, $totalWeight);
        $cumulative = 0;
        foreach (self::BODY_PARTS as $part) {
            $cumulative += $part['weight'];
            if ($roll <= $cumulative) return $part;
        }
        return self::BODY_PARTS[6]; // fallback: arms
    }

    /**
     * Player attacks monster.
     */
    public function attack(Player $attacker, Monster $defender, ?string $skillId = null): array
    {
        $this->log = [];
        $aStats = $attacker->getFinalStats();
        $dStats = $defender->getStats();

        // 1. Hit check (Speed vs Dexterity)
        $hitChance = StatEngine::calcHitChance($aStats['speed'], $dStats['dexterity']);
        if ($this->roll(100) > $hitChance) {
            $this->log("💨 {$attacker->name} chém hụt!");
            return $this->result('miss', 0, $defender);
        }

        // 2. Dodge check
        $dodgeChance = StatEngine::calcDodgeChance($dStats['dexterity'], $aStats['speed']);
        if ($this->roll(100) <= $dodgeChance) {
            $this->log("🌀 {$defender->name} né được!");
            return $this->result('dodge', 0, $defender);
        }

        // 3. Body part targeting (Torn-style)
        $bodyPart = $this->rollBodyPart();
        $partMul = $bodyPart['mul'];

        // 4. Base damage — depends on skill damage type
        $baseDamage = $aStats['strength'];
        $skillMul = 1.0;
        $skillTags = [];

        // Skill modifier + weapon check
        if ($skillId !== null) {
            $skill = $attacker->getActiveSkill($skillId);
            if ($skill) {
                $skillMul = $skill['damageMultiplier'] ?? 1.0;
                $skillTags = $skill['tags'] ?? [];
                $damageType = $skill['damageType'] ?? 'physical';

                // Weapon type check
                $weaponTypes = $skill['weaponTypes'] ?? null;
                if ($weaponTypes !== null) {
                    $weapon = $attacker->equipment['weapon'] ?? null;
                    $weaponBase = $weapon ? $weapon->baseType : 'unarmed';
                    if (!in_array($weaponBase, $weaponTypes)) {
                        $this->log("❌ {$skill['name']} cần vũ khí: " . implode('/', $weaponTypes));
                        return $this->result('invalid_weapon', 0, $defender);
                    }
                }

                // Magical skills scale with dexterity instead of strength
                if ($damageType === 'magical') {
                    $baseDamage = $aStats['dexterity'] * 0.8 + $aStats['strength'] * 0.2;
                }

                $baseDamage *= $skillMul;
                $this->log("⚡ Dùng {$skill['name']} (×{$skillMul}) [{$damageType}]");
            }
        }

        // 5. Crit check (Torn: 12% base, amplified by body part)
        $isCrit = false;
        $critChance = $aStats['critChance'];
        if ($this->roll(100) <= $critChance) {
            $isCrit = true;
        }

        // Apply body part multiplier
        $baseDamage *= $partMul;

        // Apply crit multiplier on top
        if ($isCrit) {
            $baseDamage *= $aStats['critMultiplier'];
        }

        // 6. Defense reduction
        $reduction = StatEngine::calcDamageReduction($dStats['defense']);
        $finalDamage = max(0, (int) round($baseDamage * (1 - $reduction / 100)));

        // Determine hit type label
        $hitLabel = match (true) {
            $finalDamage === 0 => 'glancing',
            $isCrit && $partMul >= 3.5 => 'crit',   // Critical vital hit
            $isCrit => 'crit',
            $partMul >= 2.0 => 'heavy',              // Strong hit
            $partMul <= 0.7 => 'graze',              // Weak hit
            default => 'hit',
        };

        // Log
        if ($finalDamage === 0) {
            $this->log("🛡 {$attacker->name} đánh vào {$bodyPart['name']} nhưng bị chặn hoàn toàn!");
        } else {
            $hitIcon = match ($hitLabel) {
                'crit' => '💥',
                'heavy' => '🔥',
                'graze' => '➰',
                default => '⚔️',
            };
            $critText = $isCrit ? ' CHÍNH MẠNG!' : '';
            $this->log("{$hitIcon} {$attacker->name} → {$bodyPart['name']} ({$defender->name}): {$finalDamage} sát thương{$critText} [×{$partMul}]");
        }

        $defender->takeDamage($finalDamage);

        if (!$defender->isAlive()) {
            $this->log("💀 {$defender->name} đã ngã xuống!");
        } else {
            $this->log("❤️ {$defender->name}: {$defender->currentHp}/{$defender->maxHp}");
        }

        return $this->result($hitLabel, $finalDamage, $defender);
    }

    /**
     * Monster attacks player (similar logic but simpler).
     */
    public function monsterAttack(Monster $attacker, Player $defender): array
    {
        $this->log = [];
        $aStats = $attacker->getStats();
        $dStats = $defender->getFinalStats();

        // Hit check
        $hitChance = StatEngine::calcHitChance($aStats['speed'], $dStats['dexterity']);
        if ($this->roll(100) > $hitChance) {
            $this->log("💨 {$attacker->name} đánh hụt!");
            return $this->playerResult('miss', 0, $defender);
        }

        // Dodge
        $dodgeChance = StatEngine::calcDodgeChance($dStats['dexterity'], $aStats['speed']);
        if ($this->roll(100) <= $dodgeChance) {
            $this->log("🌀 {$defender->name} né được!");
            return $this->playerResult('dodge', 0, $defender);
        }

        // Body part + damage
        $bodyPart = $this->rollBodyPart();
        $baseDamage = $aStats['strength'] * $bodyPart['mul'];

        // Crit (monsters: 5% + dex*0.1)
        $isCrit = false;
        $critChance = 5 + ($aStats['dexterity'] ?? 0) * 0.1;
        if ($this->roll(100) <= $critChance) {
            $isCrit = true;
            $baseDamage *= 1.5;
        }

        $reduction = StatEngine::calcDamageReduction($dStats['defense']);
        $finalDamage = max(0, (int) round($baseDamage * (1 - $reduction / 100)));

        if ($finalDamage === 0) {
            $this->log("🛡 {$defender->name} chặn hoàn toàn đòn vào {$bodyPart['name']}!");
        } else {
            $icon = $isCrit ? '💥' : ($bodyPart['mul'] >= 2.0 ? '🔥' : '⚔️');
            $this->log("{$icon} {$attacker->name} → {$bodyPart['name']} ({$defender->name}): {$finalDamage} sát thương" . ($isCrit ? ' CHÍNH MẠNG!' : ''));
        }

        $defender->takeDamage($finalDamage);

        if (!$defender->isAlive()) {
            $this->log("💀 {$defender->name} đã ngã xuống!");
        } else {
            $this->log("❤️ {$defender->name}: {$defender->currentHp}/{$defender->maxHp}");
        }

        return $this->playerResult($isCrit ? 'crit' : 'hit', $finalDamage, $defender);
    }

    /**
     * Full combat with Torn-style mechanics:
     * - 25 turn limit
     * - Stalemate if turn limit reached
     * - Flee attempt when monster misses
     * - Energy system per turn
     */
    public function fullCombat(Player $player, Monster $monster): array
    {
        $allLogs = [];
        $turn = 0;
        $outcome = 'loss';
        $canFlee = false;

        $maxTurns = self::MAX_TURNS;
        $attackCost = self::ATTACK_COST;

        // Spend energy once at combat start
        if ($player->currentEnergy < self::ATTACK_COST) {
            return [
                'outcome' => 'no_energy',
                'won' => false,
                'turns' => 0,
                'maxTurns' => self::MAX_TURNS,
                'player' => $player->toArray(),
                'monster' => $monster->toArray(),
                'rewards' => null,
                'log' => ["💤 Không đủ linh lực để chiến đấu! ({$player->currentEnergy}/{$player->maxEnergy}, cần {$attackCost})"],
            ];
        }
        $player->spendEnergy(self::ATTACK_COST);
        $allLogs[] = "🔹 -{$attackCost} linh lực ({$player->currentEnergy}/{$player->maxEnergy})";

        while ($player->isAlive() && $monster->isAlive() && $turn < self::MAX_TURNS) {
            $turn++;
            $allLogs[] = "--- Lượt {$turn}/{$maxTurns} ---";

            // Player attacks (no per-turn energy cost)
            $this->attack($player, $monster);
            $allLogs = array_merge($allLogs, $this->log);

            if (!$monster->isAlive()) {
                $outcome = 'win';
                break;
            }

            // Monster turn
            $monsterResult = $this->monsterAttack($monster, $player);
            $allLogs = array_merge($allLogs, $this->log);

            // Flee opportunity: when monster misses, player can try to escape
            if ($monsterResult['type'] === 'miss' || $monsterResult['damage'] === 0) {
                $canFlee = true;
                // Auto-flee check based on DEX vs monster SPD (Torn-style)
                $fleeChance = StatEngine::calcDodgeChance(
                    $player->getFinalStats()['dexterity'],
                    $monster->getStats()['speed']
                );
                // Only attempt flee if HP is critically low
                $hpPercent = $player->maxHp > 0 ? $player->currentHp / $player->maxHp : 1;
                if ($hpPercent < 0.25 && $this->roll(100) <= $fleeChance) {
                    $allLogs[] = "🏃 {$player->name} lợi dụng khoảng hở bỏ chạy thành công!";
                    $outcome = 'flee';
                    break;
                }
            }

            if (!$player->isAlive()) {
                $outcome = 'loss';
                break;
            }
        }

        // Check stalemate (hết turns mà cả 2 còn sống)
        if ($player->isAlive() && $monster->isAlive() && $turn >= self::MAX_TURNS) {
            $outcome = 'stalemate';
            $allLogs[] = "⏰ Hết {$maxTurns} lượt! Cả hai đều kiệt sức.";
        }

        // Calculate rewards based on outcome
        $rewards = null;
        switch ($outcome) {
            case 'win':
                $prevLevel = $player->level;
                $xp = $monster->xpReward;
                $player->gainXp($xp);
                // Gold reward (Phase 2)
                $goldMin = 10 * max(1, $monster->level);
                $goldMax = 30 * max(1, $monster->level);
                $goldReward = mt_rand($goldMin, $goldMax);
                $player->gold += $goldReward;
                $allLogs[] = "🏆 Chiến thắng!";
                $allLogs[] = "💰 +{$goldReward} Linh Thạch";
                if ($player->level > $prevLevel) {
                    $allLogs[] = "🎉 Đột phá! Cấp {$player->level}!";
                }
                $rewards = ['xp' => $xp, 'gold' => $goldReward, 'prevLevel' => $prevLevel, 'monsterLevel' => $monster->level ?? 1];
                break;

            case 'flee':
                $allLogs[] = "🚪 Thoát thân thành công. Không nhận thưởng.";
                break;

            case 'stalemate':
                // Partial XP + gold for stalemate (25%)
                $partialXp = (int) round($monster->xpReward * 0.25);
                $partialGold = mt_rand(5, 10) * max(1, $monster->level);
                $prevLevel = $player->level;
                $player->gainXp($partialXp);
                $player->gold += $partialGold;
                $allLogs[] = "🤝 Bất phân thắng bại. +{$partialXp} XP, +{$partialGold} Linh Thạch";
                if ($player->level > $prevLevel) {
                    $allLogs[] = "🎉 Đột phá! Cấp {$player->level}!";
                }
                $rewards = ['xp' => $partialXp, 'gold' => $partialGold, 'prevLevel' => $prevLevel, 'monsterLevel' => $monster->level ?? 1];
                break;

            case 'loss':
                // Hospital: 30s base + 5s per monster level
                $hospDuration = 30 + ($monster->level ?? 1) * 5;
                $player->hospitalize($hospDuration);
                $allLogs[] = "💀 {$player->name} đã ngã xuống...";
                $allLogs[] = "🏥 Tịnh dưỡng {$hospDuration}s";
                break;
        }

        return [
            'outcome' => $outcome,
            'won' => $outcome === 'win',
            'turns' => $turn,
            'maxTurns' => self::MAX_TURNS,
            'player' => $player->toArray(),
            'monster' => $monster->toArray(),
            'rewards' => $rewards,
            'log' => $allLogs,
        ];
    }

    private function roll(int $max): float
    {
        return mt_rand(1, $max * 100) / 100;
    }

    private function log(string $message): void
    {
        $this->log[] = $message;
    }

    private function result(string $type, int $damage, Monster $target): array
    {
        return [
            'type' => $type,
            'damage' => $damage,
            'targetHp' => $target->currentHp,
            'targetMaxHp' => $target->maxHp,
            'targetAlive' => $target->isAlive(),
            'log' => $this->log,
        ];
    }

    private function playerResult(string $type, int $damage, Player $target): array
    {
        return [
            'type' => $type,
            'damage' => $damage,
            'targetHp' => $target->currentHp,
            'targetMaxHp' => $target->maxHp,
            'targetAlive' => $target->isAlive(),
            'log' => $this->log,
        ];
    }
}
