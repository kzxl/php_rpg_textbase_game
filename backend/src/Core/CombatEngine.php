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
    public array $playerStatus = [];
    public array $monsterStatus = [];

    /** Max turns before stalemate */
    private const MAX_TURNS = 25;

    /**
     * Ngũ Hành (Five Elements) advantage cycle:
     * Hỏa (fire) > Mộc (wood) > Thổ (earth) > Thủy (water) > Hỏa
     * Kim (metal) is neutral — no advantage/disadvantage.
     */
    private const ELEMENT_ADVANTAGE = [
        'fire'  => 'wood',   // Hỏa khắc Mộc
        'wood'  => 'earth',  // Mộc khắc Thổ
        'earth' => 'water',  // Thổ khắc Thủy
        'water' => 'fire',   // Thủy khắc Hỏa
    ];
    private const ELEMENT_BONUS = 0.20; // +20% dmg advantage

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

        // Mechanical flags
        $skillMul = 1.0;
        $lifesteal = 0.0;
        $multiHit = 1;
        $executeScaling = 0.0;
        $guaranteedCrit = false;
        $ignoreDefense = false;
        $damageType = 'physical';
        $statusEffect = null;

        if ($skillId !== null) {
            $skill = $attacker->getActiveSkill($skillId);
            if ($skill) {
                // Phase 5.5: Skill Mastery Leveling
                $levelUp = $attacker->gainSkillXp($skillId, 1);
                if ($levelUp) {
                    $this->log("🎉 Đột phá! {$levelUp['name']} đạt tầng {$levelUp['newLevel']}!");
                }

                $skillMul = $skill['damageMultiplier'] ?? 1.0;
                $damageType = $skill['damageType'] ?? 'physical';
                $statusEffect = $skill['statusEffect'] ?? null;
                $lifesteal = floatval($skill['lifesteal'] ?? 0);
                $multiHit = intval($skill['multiHit'] ?? 1);
                $executeScaling = floatval($skill['executeScaling'] ?? 0);
                $guaranteedCrit = (bool)($skill['guaranteedCrit'] ?? false);
                $ignoreDefense = (bool)($skill['ignoreDefense'] ?? false);

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

                $this->log("⚡ Xuất chiêu: [{$skill['name']}]");
            }
        }

        // Base Stat Damage
        $baseStat = $damageType === 'magical' ? ($aStats['dexterity'] * 0.8 + $aStats['strength'] * 0.2) : $aStats['strength'];
        $baseStat *= $skillMul;
        $totalDamage = 0;
        $finalHitLabel = 'hit';

        for ($i = 0; $i < $multiHit; $i++) {
            if (!$defender->isAlive()) break;

            // 1. Hit check
            $hitChance = StatEngine::calcHitChance($aStats['speed'], $dStats['dexterity']);
            if ($this->roll(100) > $hitChance) {
                $this->log("💨 Nhịp " . ($i+1) . ": {$attacker->name} chém hụt!");
                continue;
            }

            // 2. Dodge check
            $dodgeChance = StatEngine::calcDodgeChance($dStats['dexterity'], $aStats['speed']);
            // Ignore defense Tiên cấp also ignores dodge!
            if (!$ignoreDefense && $this->roll(100) <= $dodgeChance) {
                $this->log("🌀 Nhịp " . ($i+1) . ": {$defender->name} né được!");
                continue;
            }

            // 3. Body part
            $bodyPart = $this->rollBodyPart();
            $partMul = $bodyPart['mul'];
            $currentDamage = $baseStat * $partMul;

            // Execute Scaling (Thiên Cấp)
            if ($executeScaling > 0) {
                $missingHpPct = 1 - ($defender->currentHp / $defender->maxHp);
                $currentDamage *= (1.0 + ($missingHpPct * $executeScaling));
            }

            // 4. Crit check
            $isCrit = $guaranteedCrit || ($this->roll(100) <= $aStats['critChance']);
            if ($isCrit) {
                $currentDamage *= $aStats['critMultiplier'];
                $finalHitLabel = 'crit';
            }

            // 5. Defense reduction
            $def = $ignoreDefense ? 0 : $dStats['defense'];
            $reduction = StatEngine::calcDamageReduction($def);
            $finalDamage = max(0, (int) round($currentDamage * (1 - $reduction / 100)));

            // 6. Elemental Resistance (Phase 7)
            if ($damageType !== 'physical' && $damageType !== 'magical') {
                $resistances = $defender->getRawData()['resistances'] ?? [];
                $resVal = floatval($resistances[$damageType] ?? 0);
                if ($resVal !== 0.0) {
                    $finalDamage = max(0, (int) round($finalDamage * (1 - $resVal)));
                    if ($resVal > 0) $this->log("🛡 {$defender->name} kháng " . ($resVal*100) . "% sát thương {$damageType}!");
                    if ($resVal < 0) $this->log("🔥 {$defender->name} chịu thêm " . abs($resVal*100) . "% sát thương {$damageType}!");
                }
            }

            // 7. Ngũ Hành Advantage (Five Elements)
            $attackerElement = $skill['element'] ?? null;
            $defenderElement = $defender->getElement();
            if ($attackerElement && $defenderElement && $attackerElement !== $defenderElement) {
                $adv = self::ELEMENT_ADVANTAGE[$attackerElement] ?? null;
                $disadv = self::ELEMENT_ADVANTAGE[$defenderElement] ?? null;
                if ($adv === $defenderElement) {
                    $finalDamage = (int) round($finalDamage * (1 + self::ELEMENT_BONUS));
                    $this->log("☯ Ngũ Hành tương khắc! {$this->elementName($attackerElement)} khắc {$this->elementName($defenderElement)} (+" . (self::ELEMENT_BONUS*100) . "%)");
                } elseif ($disadv === $attackerElement) {
                    $finalDamage = (int) round($finalDamage * (1 - self::ELEMENT_BONUS));
                    $this->log("☯ Ngũ Hành tương sinh! {$this->elementName($defenderElement)} khắc {$this->elementName($attackerElement)} (-" . (self::ELEMENT_BONUS*100) . "%)");
                }
            }

            if ($finalDamage === 0) {
                $this->log("🛡 Nhịp " . ($i+1) . ": Đánh vào {$bodyPart['name']} nhưng bị chặn!");
            } else {
                $icon = $isCrit ? '💥' : ($ignoreDefense ? '🌌' : '⚔️');
                $critText = $isCrit ? ' CHÍNH MẠNG!' : '';
                $ignoreText = $ignoreDefense ? ' [Xuyên Giáp]' : '';
                $this->log("{$icon} Nhịp " . ($i+1) . ": Trúng {$bodyPart['name']} — {$finalDamage} sát thương{$critText}{$ignoreText}");
                
                $defender->takeDamage($finalDamage);
                $totalDamage += $finalDamage;

                // Lifesteal (Huyền Cấp)
                if ($lifesteal > 0) {
                    $heal = (int)($finalDamage * $lifesteal);
                    $attacker->currentHp = min($attacker->maxHp, $attacker->currentHp + $heal);
                    $this->log("🩸 Hấp Huyết: +{$heal} HP");
                }
            }
        } // end hit loop

        // Apply Status effect if condition met
        if ($statusEffect && $totalDamage > 0) {
            $chance = $statusEffect['chance'] ?? 100;
            if ($this->roll(100) <= $chance) {
                $this->monsterStatus[] = $statusEffect;
                $typeMap = ['burn' => 'Bốc Cháy', 'poison' => 'Trúng Độc', 'freeze' => 'Đóng Băng'];
                $sName = $typeMap[$statusEffect['type'] ?? ''] ?? $statusEffect['type'];
                $this->log("🧪 {$defender->name} bị [{$sName}] ({$statusEffect['duration']} lượt)!");
            }
        }

        if (!$defender->isAlive()) {
            $this->log("💀 {$defender->name} đã ngã xuống!");
        } else {
            $this->log("❤️ {$defender->name}: {$defender->currentHp}/{$defender->maxHp}");
        }

        return $this->result($finalHitLabel, $totalDamage, $defender);
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

        // Thần Cấp: Thiên Đạo Luân Hồi - Reflect Damage
        $reflectDamagePercent = 0.0;
        foreach ($defender->skills as $ps) {
            $sId = $ps['id'] ?? $ps;
            $s = $defender->getActiveSkill($sId);
            if ($s && ($s['reflectDamage'] ?? 0) > 0) {
                $reflectDamagePercent += floatval($s['reflectDamage']);
            }
        }

        $defender->takeDamage($finalDamage);

        if ($finalDamage > 0 && $reflectDamagePercent > 0) {
            $reflectAmt = (int)($finalDamage * $reflectDamagePercent);
            $attacker->currentHp -= $reflectAmt;
            $this->log("♻️ Thiên Đạo Luân Hồi: Trả lại {$reflectAmt} Chuẩn Sát Thương cho {$attacker->name}!");
            if ($attacker->currentHp <= 0) $attacker->currentHp = 0;
        }

        if (!$defender->isAlive()) {
            $this->log("💀 {$defender->name} đã ngã xuống!");
        } else {
            $this->log("❤️ {$defender->name}: {$defender->currentHp}/{$defender->maxHp}");
            
            // Monster apply effect (poison, etc)
            $mEffects = $attacker->getRawData()['effects'] ?? [];
            foreach ($mEffects as $me) {
                if (in_array($me['type'] ?? '', ['poison', 'burn', 'curse', 'stun'])) {
                    if ($this->roll(100) <= ($me['chance'] ?? 100)) {
                        $this->playerStatus[] = $me;
                        $tName = $me['type'] === 'poison' ? 'Trúng Độc' : ($me['type'] === 'burn' ? 'Bốc Cháy' : $me['type']);
                        $this->log("🧪 {$defender->name} bị [{$tName}] ({$me['duration']} lượt)!");
                    }
                }
            }
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

        // Auto-discover monster for Sương Mù wiki
        $player->discoverMonster($monster->id);

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

            // Process Status Effects & Regen
            $this->processStatus($player, $this->playerStatus, $allLogs);
            $this->processStatus($monster, $this->monsterStatus, $allLogs);

            // Boss Regen (Phase 9 mechanic)
            $mRegen = $monster->getRawData()['regenPerHour'] ?? 0;
            if ($mRegen > 0) {
                // Regen per turn (assume 1 fight = 5 minutes of in-game time = 12 turns, so ~10% of regenPerHour per turn)
                $tickHeal = (int)ceil($mRegen / 12);
                $monster->currentHp = min($monster->maxHp, $monster->currentHp + $tickHeal);
                $allLogs[] = "✨ Yêu thú ngưng kết sinh mệnh lực: +{$tickHeal} HP";
            }
            // Check alive after DoT
            if (!$player->isAlive() || !$monster->isAlive()) {
                $outcome = $player->isAlive() ? 'win' : 'loss';
                break;
            }

            // AI Skill Selection (Tự động tự chọn skill tốn năng lượng)
            $skillToUse = null;
            $activeSkills = array_filter($player->skills ?? [], function($ps) use ($player) {
                $s = $player->getActiveSkill($ps['id'] ?? $ps);
                return $s && ($s['type'] ?? '') === 'active';
            });
            if (!empty($activeSkills)) {
                $affordable = array_filter($activeSkills, function($ps) use ($player) {
                     $s = $player->getActiveSkill($ps['id'] ?? $ps);
                     return $s && $player->currentEnergy >= ($s['cost'] ?? 0);
                });
                if (!empty($affordable)) {
                    $chosenPs = $affordable[array_rand($affordable)];
                    $skillToUse = $chosenPs['id'] ?? $chosenPs;
                    $sData = $player->getActiveSkill($skillToUse);
                    $player->currentEnergy -= ($sData['cost'] ?? 0);
                }
            }

            // Player attacks
            $this->attack($player, $monster, $skillToUse);
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
        } // -> Stalemate if max turns hit

        // End of combat — tick buff durations
        $player->tickCombatBuffs();

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

                // Phase 9: Boss / Monster Drops (Items & Manuals)
                $dropRarity = null;
                if (($monster->getRawData()['isBoss'] ?? false) || $monster->level >= 10) {
                    $dropRoll = mt_rand(1, 100);
                    if ($dropRoll <= 50) $dropRarity = 'epic'; // 50% rớt hàng Epic
                    else if ($dropRoll <= 90) $dropRarity = 'legendary'; // 40%
                } else if (mt_rand(1, 100) <= 5) {
                    $dropRarity = 'rare'; // 5% quái thường rớt Rare
                }

                if ($dropRarity) {
                    $itemSys = new \App\Systems\ItemSystem();
                    $isManual = mt_rand(1, 100) <= 20; // 20% rớt Bí Tịch
                    $item = null;
                    if ($isManual) {
                        $manuals = array_filter($itemSys->getAll(), fn($i) => ($i['category'] ?? '') === 'manual' && ($i['rarity'] ?? 'common') === $dropRarity);
                        if (!empty($manuals)) {
                            $chosen = $manuals[array_rand($manuals)];
                            $item = $itemSys->createItem($chosen['id']);
                        }
                    }
                    if (!$item) {
                        $item = $itemSys->generateRandomItem($dropRarity, null, $monster->level);
                    }
                    $player->inventory[] = $item;
                    $allLogs[] = "🎁 Nhận chiến lợi phẩm: {$item->name} ({$dropRarity})";
                }

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

        // --- Phase 8: Decrement combat buffs duration ---
        if (!empty($player->combatBuffs)) {
            foreach ($player->combatBuffs as $k => &$buff) {
                $buff['duration']--;
                if ($buff['duration'] <= 0) {
                    unset($player->combatBuffs[$k]);
                }
            }
            $player->combatBuffs = array_values($player->combatBuffs);
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

    private function processStatus($target, array &$statuses, array &$logs): void
    {
        foreach ($statuses as $k => &$s) {
            if (($s['duration'] ?? 0) <= 0) {
                unset($statuses[$k]);
                continue;
            }
            if (in_array($s['type'], ['poison', 'burn'])) {
                $dmg = $s['damage'] ?? 5;
                $target->takeDamage($dmg);
                $name = $s['type'] === 'poison' ? 'Độc' : 'Lửa';
                $logs[] = "💔 {$target->name} mất {$dmg} HP do {$name} phát tác!";
            }
            // Decrement duration
            $s['duration']--;
            if ($s['duration'] <= 0) {
                unset($statuses[$k]);
            }
        }
    }

    private function roll(int $max): float
    {
        return mt_rand(1, $max * 100) / 100;
    }

    private function log(string $message): void
    {
        $this->log[] = $message;
    }

    private function elementName(string $element): string
    {
        return match($element) {
            'fire' => 'Hỏa🔥',
            'water' => 'Thủy💧',
            'wood' => 'Mộc🌿',
            'earth' => 'Thổ⛰️',
            'metal' => 'Kim⚔️',
            default => $element,
        };
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

    /**
     * Simulate PvP combat between two players (no real damage applied, stat-based only)
     */
    public function simulatePvP(Player $attacker, Player $defender): array
    {
        $aStr = $attacker->stats['strength'] ?? 10;
        $aSpd = $attacker->stats['speed'] ?? 10;
        $aDex = $attacker->stats['dexterity'] ?? 10;
        $aDef = $attacker->stats['defense'] ?? 10;
        $aHp = $attacker->currentHp;

        $dStr = $defender->stats['strength'] ?? 10;
        $dSpd = $defender->stats['speed'] ?? 10;
        $dDex = $defender->stats['dexterity'] ?? 10;
        $dDef = $defender->stats['defense'] ?? 10;
        $dHp = $defender->currentHp;

        $log = [];
        $maxTurns = 15;

        for ($turn = 1; $turn <= $maxTurns; $turn++) {
            // Attacker attacks
            $aDmg = max(1, (int)(($aStr * 2 + $aDex) * rand(80, 120) / 100 - $dDef * 0.5));
            $dodge = rand(1, 100) <= min(30, $dSpd - $aSpd + 10);
            if ($dodge) {
                $log[] = "Turn {$turn}: {$defender->name} né tránh!";
            } else {
                $dHp -= $aDmg;
                $log[] = "Turn {$turn}: {$attacker->name} gây {$aDmg} sát thương";
            }
            if ($dHp <= 0) { return ['winner' => 'attacker', 'log' => $log]; }

            // Defender attacks
            $dDmg = max(1, (int)(($dStr * 2 + $dDex) * rand(80, 120) / 100 - $aDef * 0.5));
            $dodge2 = rand(1, 100) <= min(30, $aSpd - $dSpd + 10);
            if ($dodge2) {
                $log[] = "Turn {$turn}: {$attacker->name} né tránh!";
            } else {
                $aHp -= $dDmg;
                $log[] = "Turn {$turn}: {$defender->name} gây {$dDmg} sát thương";
            }
            if ($aHp <= 0) { return ['winner' => 'defender', 'log' => $log]; }
        }

        // Stalemate → higher HP ratio wins
        $aRatio = $aHp / max(1, $attacker->maxHp);
        $dRatio = $dHp / max(1, $defender->maxHp);
        return ['winner' => $aRatio >= $dRatio ? 'attacker' : 'defender', 'log' => $log];
    }
}
