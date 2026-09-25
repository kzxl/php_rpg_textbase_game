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

    /** @var string|null Vết Nứt Thiên Đạo xuất hiện trên cơ thể quái vật ở hiệp này */
    public ?string $activeWeakpoint = null;

    /** @var array Danh sách sự kiện Glitch xảy ra trong combat */
    public array $glitchEvents = [];

    /** @var float Giảm sát thương của quái vật do bị Glitch Shock */
    public float $monsterGlitchDebuff = 0.0;

    /** @var array Hiệu ứng bổ trợ từ Thông Thạo Quái Vật (Monster Mastery) */
    public array $monsterMasteryBonus = [];

    /** Max turns before stalemate */
    private const MAX_TURNS = 25;

    /**
     * Roll 1 Vết Nứt Thiên Đạo trên thân quái vật
     */
    public function rollWeakpoint(string $stance = 'breaker'): string
    {
        $weakpointCandidates = ['Đầu', 'Ngực', 'Tim', 'Cổ', 'Bụng', 'Tay', 'Chân'];
        // Thế Phá Quy (breaker) tăng ưu tiên các điểm chí mạng (Đầu, Tim, Ngực)
        if ($stance === 'breaker') {
            $critCandidates = ['Đầu', 'Tim', 'Ngực', 'Đầu', 'Tim'];
            $weakpointCandidates = array_merge($weakpointCandidates, $critCandidates);
        }
        $this->activeWeakpoint = $weakpointCandidates[array_rand($weakpointCandidates)];
        return $this->activeWeakpoint;
    }

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
                    $isValidWeapon = ($weapon !== null) && ($weaponBase === 'weapon' || in_array($weaponBase, $weaponTypes));
                    if (!$isValidWeapon) {
                        $this->log("❌ {$skill['name']} cần vũ khí: " . implode('/', $weaponTypes));
                        return $this->result('invalid_weapon', 0, $defender);
                    }
                }

                $this->log("⚡ Xuất chiêu: [{$skill['name']}]");
            }
        } else {
            $this->log("⚔️ {$attacker->name} vận kình xuất thường công");
        }

        // Kiểm tra hành vi Liều Mạng (Near-death attack)
        if (($attacker->currentHp / max(1, $attacker->maxHp)) < 0.15) {
            \App\Systems\GlitchSystem::trackBehavior($attacker, 'near_death_attacks', 1);
        }

        // Tự động roll Vết Nứt Thiên Đạo nếu chưa có
        if ($this->activeWeakpoint === null) {
            $this->rollWeakpoint($attacker->activeStance ?? 'breaker');
        }

        // Base Stat Damage
        $baseStat = $damageType === 'magical' ? ($aStats['dexterity'] * 0.8 + $aStats['strength'] * 0.2) : $aStats['strength'];
        $baseStat *= $skillMul;

        // Thế Nghịch Hành (Glitch Stance): Máu càng thấp sát thương càng cao
        if (($attacker->activeStance ?? '') === 'glitch') {
            $missingHpRatio = max(0, 1 - ($attacker->currentHp / max(1, $attacker->maxHp)));
            $baseStat *= (1.0 + ($missingHpRatio * 0.8));
        }

        // Dấu ấn Tử Địa Hậu Sinh (death_gambit)
        $hasDeathGambit = in_array('death_gambit', $attacker->unlockedImprints ?? [], true);
        if ($hasDeathGambit && ($attacker->currentHp / max(1, $attacker->maxHp)) < 0.25) {
            $guaranteedCrit = true;
            $lifesteal = max($lifesteal, 0.15);
        }

        $totalDamage = 0;
        $finalHitLabel = 'hit';

        for ($i = 0; $i < $multiHit; $i++) {
            if (!$defender->isAlive()) break;

            // 1. Hit check
            $hitChance = StatEngine::calcHitChance($aStats['speed'], $dStats['dexterity']);
            if ($this->roll(100) > $hitChance) {
                $this->log("💨 Nhịp " . ($i+1) . ": {$attacker->name} chém hụt!");
                \App\Systems\GlitchSystem::trackBehavior($attacker, 'miss_attack_count', 1);
                continue;
            }

            // 2. Dodge check
            $dodgeChance = StatEngine::calcDodgeChance($dStats['dexterity'], $aStats['speed']);
            // Ignore defense Tiên cấp also ignores dodge!
            if (!$ignoreDefense && $this->roll(100) <= $dodgeChance) {
                $this->log("🌀 Nhịp " . ($i+1) . ": {$defender->name} né được!");
                continue;
            }

            // 3. Body part & Glitch Weakpoint check
            $bodyPart = $this->rollBodyPart();
            $partMul = $bodyPart['mul'];
            $isWeakpointHit = ($bodyPart['name'] === $this->activeWeakpoint);

            // Monster Mastery Tier 4 (Khắc Chế): 25% redirect hit into weakpoint
            if (!$isWeakpointHit && ($this->monsterMasteryBonus['weakpointMul'] ?? 1.0) >= 2.0 && $this->roll(100) <= 25) {
                $isWeakpointHit = true;
                $bodyPart['name'] = $this->activeWeakpoint;
                $this->log("👁️ [Khắc Chế ★★★★☆] Thấu hiểu sơ hở, đòn đánh tự chuyển hướng trúng Vết Nứt!");
            }

            if ($isWeakpointHit) {
                $weakpointMul = 2.5;
                if (in_array('weakpoint_striker', $attacker->unlockedImprints ?? [], true)) {
                    $weakpointMul += 0.5;
                }
                if (($attacker->activeStance ?? '') === 'breaker') {
                    $weakpointMul *= 1.2;
                }
                $partMul = max($partMul, $weakpointMul);
            }

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

            // 5. MDG Standard: Dynamic Defense reduction & Level Suppression
            $def = $ignoreDefense ? 0 : $dStats['defense'];
            if (in_array('monster_insight', $attacker->unlockedImprints ?? [], true)) {
                $def = (int)round($def * 0.85);
            }
            $reduction = StatEngine::calcDamageReduction($def, $currentDamage);
            $suppression = StatEngine::calcLevelSuppression($attacker->level, $defender->level);
            $finalDamage = max(1, (int) round($currentDamage * (1 - $reduction / 100) * $suppression));

            // Monster Mastery Tier 2/4/5: Sát thương tăng thêm
            if (($this->monsterMasteryBonus['damageBonusPct'] ?? 0) > 0) {
                $finalDamage = (int)round($finalDamage * (1 + $this->monsterMasteryBonus['damageBonusPct'] / 100));
            }

            // Monster Mastery Tier 5 (Tuyệt Diệt): 10% Trảm Sát trực tiếp khi quái vật <= 15% HP
            if (!empty($this->monsterMasteryBonus['canExecute']) && ($defender->currentHp / max(1, $defender->maxHp)) <= 0.15 && $this->roll(100) <= 10) {
                $finalDamage = $defender->currentHp;
                $this->log("⚔️ [Tuyệt Diệt ★★★★★] Nhìn thấu điểm tử huyệt, Trảm Sát trực tiếp {$defender->name}!");
            }

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
                $icon = $isWeakpointHit ? '🌌' : ($isCrit ? '💥' : ($ignoreDefense ? '⚡' : '⚔️'));
                $critText = $isCrit ? ' CHÍNH MẠNG!' : '';
                $ignoreText = $ignoreDefense ? ' [Xuyên Giáp]' : '';
                $weakpointText = $isWeakpointHit ? ' [VẾT NỨT THIÊN ĐẠO]' : '';
                
                $this->log("{$icon} Nhịp " . ($i+1) . ": Trúng {$bodyPart['name']} — {$finalDamage} sát thương{$critText}{$ignoreText}{$weakpointText}");
                
                // Khai thác Lỗi Thiên Đạo khi trúng Weakpoint
                if ($isWeakpointHit) {
                    $attacker->glitchInsight = ($attacker->glitchInsight ?? 0) + 5;
                    $this->monsterGlitchDebuff = 0.25; // Giảm 25% dmg lượt sau của quái
                    \App\Systems\GlitchSystem::trackBehavior($attacker, 'weakpoint_hits', 1);
                    $this->glitchEvents[] = [
                        'type' => 'weakpoint_burst',
                        'part' => $bodyPart['name'],
                        'damage' => $finalDamage,
                        'insightGained' => 5
                    ];
                    $this->log("🌀 Khai thác Lỗi Thiên Đạo! Quy luật không gian vỡ vụn (+5 Thấu Triệt, Quái bị Nghịch Mạch giảm 25% sát thương)!");
                }
                
                $defender->takeDamage($finalDamage);
                $totalDamage += $finalDamage;

                // Lifesteal (Huyền Cấp & Tử Địa Hậu Sinh)
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
            // Thế Du Đạo (flow stance): Né hồi linh lực & phản chấn
            if (($defender->activeStance ?? '') === 'flow') {
                $defender->currentEnergy = min($defender->maxEnergy, $defender->currentEnergy + 6);
                $flowReflect = max(1, (int)round($aStats['strength'] * 0.25));
                $attacker->takeDamage($flowReflect);
                $this->log("🌀 [Thế Du Đạo] {$defender->name} nương theo kẽ hở quy luật né đòn, hồi 6 Linh Lực & phản chấn {$flowReflect} sát thương!");
            } else {
                $this->log("🌀 {$defender->name} né được!");
            }
            return $this->playerResult('dodge', 0, $defender);
        }

        // Body part + damage
        $bodyPart = $this->rollBodyPart();
        $baseDamage = $aStats['strength'] * $bodyPart['mul'];

        // Glitch Shock Debuff từ lượt đánh trúng Vết Nứt trước
        if ($this->monsterGlitchDebuff > 0) {
            $baseDamage *= (1.0 - $this->monsterGlitchDebuff);
            $this->monsterGlitchDebuff = 0.0; // Reset debuff
        }

        // Crit (monsters: 5% + dex*0.1)
        $isCrit = false;
        $critChance = 5 + ($aStats['dexterity'] ?? 0) * 0.1;
        if ($this->roll(100) <= $critChance) {
            $isCrit = true;
            $baseDamage *= 1.5;
        }

        $reduction = StatEngine::calcDamageReduction($dStats['defense'], $baseDamage);
        $suppression = StatEngine::calcLevelSuppression($attacker->level, $defender->level);
        $finalDamage = max(0, (int) round($baseDamage * (1 - $reduction / 100) * $suppression));

        // Monster Mastery Tier 3+ (Đại Thành): Giảm sát thương nhận vào từ quái vật này
        if (($this->monsterMasteryBonus['damageReductionPct'] ?? 0) > 0 && $finalDamage > 0) {
            $dmgRed = (int)round($finalDamage * ($this->monsterMasteryBonus['damageReductionPct'] / 100));
            $finalDamage = max(1, $finalDamage - $dmgRed);
        }

        // Dấu ấn Kim Thân Bất Diệt (undying_flesh): HP < 20% giảm 30% sát thương
        $hasUndying = in_array('undying_flesh', $defender->unlockedImprints ?? [], true);
        if ($hasUndying && ($defender->currentHp / max(1, $defender->maxHp)) < 0.20) {
            $finalDamage = (int)round($finalDamage * 0.70);
            $this->log("🛡️ [Kim Thân Bất Diệt] Quy luật chai sạn kích hoạt, triệt tiêu 30% sát thương!");
        }

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

        // Load Monster Mastery Combat Bonuses
        $this->monsterMasteryBonus = \App\Systems\MonsterMasterySystem::getCombatBonuses($player->id, $monster->id);
        if ($this->monsterMasteryBonus['tier'] >= 1) {
            $allLogs[] = "🐺 [Thông Thạo Quái: {$this->monsterMasteryBonus['tierName']}] {$this->monsterMasteryBonus['stars']} (Đã trảm {$this->monsterMasteryBonus['kills']} con)";
            if (($this->monsterMasteryBonus['damageBonusPct'] ?? 0) > 0) {
                $allLogs[] = "✨ Khắc chế tập tính: +{$this->monsterMasteryBonus['damageBonusPct']}% Sát thương lên loài này";
            }
        }

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

            // ⚔️ XÁC SUẤT XUẤT CHIÊU KỸ NĂNG CHỦ ĐỘNG (Active Skill Trigger Chance)
            $skillToUse = null;
            $equippedActives = $player->getEquippedActiveSkills();
            if (!empty($equippedActives)) {
                $candidates = $equippedActives;
                shuffle($candidates);
                foreach ($candidates as $cand) {
                    $sId = is_array($cand) ? ($cand['id'] ?? '') : $cand;
                    $sData = $player->getActiveSkill($sId);
                    if (!$sData) continue;

                    $cost = (int)($sData['cost'] ?? 0);
                    // Phải đủ Linh Lực khả dụng để xuất chiêu
                    if ($player->currentEnergy >= $cost) {
                        $chance = $player->getSkillTriggerChance($sData);
                        $roll = mt_rand(1, 100);
                        if ($roll <= $chance) {
                            $skillToUse = $sId;
                            $player->currentEnergy -= $cost;
                            $allLogs[] = "⚡ [Kích Hoạt {$chance}%] {$player->name} bạo phát linh lực, thi triển [{$sData['name']}]! (-{$cost} Linh Lực)";
                            break; // Đã kích hoạt 1 chiêu thức hiệp này
                        }
                    }
                }
            }

            // Roll Vết Nứt Thiên Đạo xuất hiện ở hiệp này
            $this->rollWeakpoint($player->activeStance ?? 'breaker');

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

                // Monster Mastery: Ghi nhận trảm sát và kiểm tra đột phá tầng
                $masteryResult = \App\Systems\MonsterMasterySystem::recordKill($player->id, $monster->id);
                $allLogs[] = "🐺 Ghi nhận trảm sát [{$monster->name}]: Tổng {$masteryResult['mastery']['kills']} con";
                if ($masteryResult['tierUp']) {
                    $newTierInfo = $masteryResult['mastery']['tierInfo'];
                    $allLogs[] = "🌟 THÔNG THẠO QUÁI VẬT ĐỘT PHÁ! [{$monster->name}] đạt Tầng {$masteryResult['newTier']} — {$newTierInfo['name']} ({$newTierInfo['stars']})!";
                    $allLogs[] = "📜 Kích hoạt: {$newTierInfo['desc']}";
                    \App\Core\GameDataRepository::addEvent($player->id, 'mastery', "Thông thạo quái vật [{$monster->name}] đạt {$newTierInfo['name']} ({$newTierInfo['stars']})!");
                }

                // ========================================================
                // THE 5-STEP DROP PIPELINE (MDG STANDARD LOOT ENGINE)
                // 1. IIQ (Item Quantity)
                // 2. IIR (Item Rarity)
                // 3. iLvl (Item Level scaling)
                // 4. Multi-Category Drops (Materials, Catalysts, Gear, Meds)
                // 5. Visual Loot Feedback & Dopamine Tiering
                // ========================================================
                $dropBonus = (int)($this->monsterMasteryBonus['dropBonusPct'] ?? 0);
                $mRaw = $monster->getRawData();
                $isBoss = !empty($mRaw['isBoss']) || in_array('boss', $mRaw['tags'] ?? []) || ($monster->level >= 15);
                $lootItems = [];

                // 1. Monster Signature Materials (from monster drops table)
                foreach ($mRaw['drops'] ?? [] as $dr) {
                    $effChance = min(95, ($dr['chance'] ?? 30) + $dropBonus);
                    if (mt_rand(1, 100) <= $effChance) {
                        $minQ = $dr['qty'][0] ?? 1;
                        $maxQ = $dr['qty'][1] ?? 1;
                        $qty = mt_rand($minQ, $maxQ);
                        $dType = $dr['type'] ?? 'material';
                        $itemId = $dr['itemId'];

                        if ($dType === 'medicine') {
                            $player->medicines[$itemId] = ($player->medicines[$itemId] ?? 0) + $qty;
                        } else {
                            $player->materials[$itemId] = ($player->materials[$itemId] ?? 0) + $qty;
                        }

                        $matInfo = \App\Core\GameDataRepository::getMaterialById($itemId);
                        $matName = $matInfo ? $matInfo['name'] : $itemId;
                        $lootItems[] = [
                            'name' => $matName,
                            'type' => $dType,
                            'quantity' => $qty,
                            'rarity' => 'common',
                            'color' => '#34d399',
                            'icon' => '📦'
                        ];
                        $allLogs[] = "📦 Thu hoạch yêu thú: {$matName} x{$qty}";
                    }
                }

                // 2. Crafting Catalysts & Essence (Tinh Thạch / Kim Loại Linh / Đá Cường Hóa)
                $catalystChance = $isBoss ? 85 : (25 + $dropBonus);
                if (mt_rand(1, 100) <= $catalystChance) {
                    $catPool = ['mat_tinh_thach', 'mat_kim_loai_linh', 'da_cuong_hoa', 'mat_tinh_hoa'];
                    $catId = $catPool[array_rand($catPool)];
                    $catQty = $isBoss ? mt_rand(2, 4) : mt_rand(1, 2);
                    $player->materials[$catId] = ($player->materials[$catId] ?? 0) + $catQty;
                    $matInfo = \App\Core\GameDataRepository::getMaterialById($catId);
                    $catName = $matInfo ? $matInfo['name'] : $catId;
                    $lootItems[] = [
                        'name' => $catName,
                        'type' => 'catalyst',
                        'quantity' => $catQty,
                        'rarity' => 'uncommon',
                        'color' => '#38bdf8',
                        'icon' => '💎'
                    ];
                    $allLogs[] = "💎 Tinh thạch rèn đúc: {$catName} x{$catQty}";
                }

                // 3. Equipment & Manual Drops with IIR Tiering (Trang Bị & Bí Tịch)
                $equipChance = $isBoss ? 100 : (20 + $dropBonus);
                if (mt_rand(1, 100) <= $equipChance) {
                    $rRoll = mt_rand(1, 100) - $dropBonus;
                    if ($isBoss) {
                        if ($rRoll <= 20) $dropRarity = 'legendary';
                        elseif ($rRoll <= 60) $dropRarity = 'epic';
                        else $dropRarity = 'rare';
                    } else {
                        if ($rRoll <= 2) $dropRarity = 'legendary';
                        elseif ($rRoll <= 10) $dropRarity = 'epic';
                        elseif ($rRoll <= 30) $dropRarity = 'rare';
                        elseif ($rRoll <= 65) $dropRarity = 'uncommon';
                        else $dropRarity = 'common';
                    }

                    $itemSys = new \App\Systems\ItemSystem();
                    $isManual = (mt_rand(1, 100) <= 15);
                    $item = null;
                    if ($isManual) {
                        $manuals = array_filter($itemSys->getAll(), fn($i) => ($i['category'] ?? '') === 'manual' && ($i['rarity'] ?? 'common') === $dropRarity);
                        if (!empty($manuals)) {
                            $chosen = $manuals[array_rand($manuals)];
                            $item = $itemSys->createItem($chosen['id']);
                        }
                    }
                    if (!$item) {
                        $item = $itemSys->generateRandomItem($dropRarity, null, max(1, $monster->level));
                    }

                    $player->inventory[] = $item;

                    $rarityColors = [
                        'legendary' => '#f59e0b',
                        'epic'      => '#a855f7',
                        'rare'      => '#facc15',
                        'uncommon'  => '#10b981',
                        'common'    => '#94a3b8'
                    ];
                    $rColor = $rarityColors[$dropRarity] ?? '#94a3b8';
                    $lootItems[] = [
                        'name' => $item->name,
                        'type' => 'equipment',
                        'rarity' => $dropRarity,
                        'color' => $rColor,
                        'icon' => ($dropRarity === 'legendary' || $dropRarity === 'epic') ? '🌟' : '⚔️'
                    ];

                    if ($dropRarity === 'legendary' || $dropRarity === 'epic') {
                        $allLogs[] = "🌟 [CHIẾN LỢI PHẨM CỰC PHẨM] Nhận được {$item->name} ({$dropRarity})!";
                    } else {
                        $allLogs[] = "⚔️ Nhận trang bị: {$item->name} ({$dropRarity})";
                    }
                }

                // 4. Medicine Drops (Hồi Huyết & Đan Dược Thăng Cấp)
                $medChance = $isBoss ? 55 : (15 + (int)($dropBonus / 2));
                if (mt_rand(1, 100) <= $medChance) {
                    $medPool = ($monster->level >= 10 || $isBoss) ? ['tay_tuy_dan', 'hoan_cot_dan'] : ['mat_huyet_tinh', 'tay_tuy_dan'];
                    $medId = $medPool[array_rand($medPool)];
                    $player->medicines[$medId] = ($player->medicines[$medId] ?? 0) + 1;
                    $medName = ($medId === 'tay_tuy_dan') ? 'Tẩy Tủy Đan' : (($medId === 'hoan_cot_dan') ? 'Hoàn Cốt Đan' : 'Huyết Tinh');
                    $lootItems[] = [
                        'name' => $medName,
                        'type' => 'medicine',
                        'quantity' => 1,
                        'rarity' => 'rare',
                        'color' => '#fb923c',
                        'icon' => '💊'
                    ];
                    $allLogs[] = "💊 Đan dược cơ duyên: {$medName} x1";
                }

                if ($player->level > $prevLevel) {
                    $allLogs[] = "🎉 Đột phá! Cấp {$player->level}!";
                }
                $rewards = [
                    'xp' => $xp,
                    'gold' => $goldReward,
                    'prevLevel' => $prevLevel,
                    'monsterLevel' => $monster->level ?? 1,
                    'lootItems' => $lootItems
                ];
                $unlocked = \App\Systems\GlitchSystem::trackBehavior($player, 'monster_kills', 1);
                if ($player->currentHp > 0 && ($player->currentHp / max(1, $player->maxHp)) <= 0.10) {
                    $unlockedClutch = \App\Systems\GlitchSystem::trackBehavior($player, 'clutch_kills', 1);
                    $unlocked = array_merge($unlocked, $unlockedClutch);
                }
                foreach ($unlocked as $u) {
                    $allLogs[] = "🌌 [PHÁT HIỆN LỖI THIÊN ĐẠO] Mở khóa Dấu Ấn: {$u['name']} ({$u['title']})!";
                }
                break;

            case 'flee':
                $allLogs[] = "🚪 Thoát thân thành công. Không nhận thưởng.";
                $unlocked = \App\Systems\GlitchSystem::trackBehavior($player, 'flee_count', 1);
                foreach ($unlocked as $u) {
                    $allLogs[] = "🌌 [PHÁT HIỆN LỖI THIÊN ĐẠO] Mở khóa Dấu Ấn: {$u['name']} ({$u['title']})!";
                }
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
                $unlocked = \App\Systems\GlitchSystem::trackBehavior($player, 'hospital_count', 1);
                foreach ($unlocked as $u) {
                    $allLogs[] = "🌌 [PHÁT HIỆN LỖI THIÊN ĐẠO] Mở khóa Dấu Ấn: {$u['name']} ({$u['title']})!";
                }
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
            'weakpoint' => $this->activeWeakpoint,
            'glitchEvents' => $this->glitchEvents,
            'glitchInsight' => $player->glitchInsight,
            'activeStance' => $player->activeStance,
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
            // Attacker roll active skill
            $aSkill = null;
            $aMul = 1.0;
            $aActives = $attacker->getEquippedActiveSkills();
            if (!empty($aActives)) {
                shuffle($aActives);
                foreach ($aActives as $sk) {
                    $chance = $attacker->getSkillTriggerChance($sk);
                    if (mt_rand(1, 100) <= $chance) {
                        $aSkill = $sk;
                        $aMul = (float)($sk['damageMultiplier'] ?? 1.3);
                        break;
                    }
                }
            }

            // Attacker attacks
            $aDmg = max(1, (int)((($aStr * 2 + $aDex) * $aMul) * rand(80, 120) / 100 - $dDef * 0.5));
            $dodge = rand(1, 100) <= min(30, $dSpd - $aSpd + 10);
            if ($dodge) {
                $log[] = "Turn {$turn}: {$defender->name} né tránh!";
            } else {
                $dHp -= $aDmg;
                if ($aSkill) {
                    $log[] = "Turn {$turn}: ⚡ [Kích Hoạt] {$attacker->name} thi triển [{$aSkill['name']}] gây {$aDmg} sát thương!";
                } else {
                    $log[] = "Turn {$turn}: ⚔️ {$attacker->name} xuất thường công gây {$aDmg} sát thương";
                }
            }
            if ($dHp <= 0) { return ['winner' => 'attacker', 'log' => $log]; }

            // Defender roll active skill
            $dSkill = null;
            $dMul = 1.0;
            $dActives = $defender->getEquippedActiveSkills();
            if (!empty($dActives)) {
                shuffle($dActives);
                foreach ($dActives as $sk) {
                    $chance = $defender->getSkillTriggerChance($sk);
                    if (mt_rand(1, 100) <= $chance) {
                        $dSkill = $sk;
                        $dMul = (float)($sk['damageMultiplier'] ?? 1.3);
                        break;
                    }
                }
            }

            // Defender attacks
            $dDmg = max(1, (int)((($dStr * 2 + $dDex) * $dMul) * rand(80, 120) / 100 - $aDef * 0.5));
            $dodge2 = rand(1, 100) <= min(30, $aSpd - $dSpd + 10);
            if ($dodge2) {
                $log[] = "Turn {$turn}: {$attacker->name} né tránh!";
            } else {
                $aHp -= $dDmg;
                if ($dSkill) {
                    $log[] = "Turn {$turn}: ⚡ [Kích Hoạt] {$defender->name} thi triển [{$dSkill['name']}] gây {$dDmg} sát thương!";
                } else {
                    $log[] = "Turn {$turn}: ⚔️ {$defender->name} xuất thường công gây {$dDmg} sát thương";
                }
            }
            if ($aHp <= 0) { return ['winner' => 'defender', 'log' => $log]; }
        }

        // Stalemate → higher HP ratio wins
        $aRatio = $aHp / max(1, $attacker->maxHp);
        $dRatio = $dHp / max(1, $defender->maxHp);
        return ['winner' => $aRatio >= $dRatio ? 'attacker' : 'defender', 'log' => $log];
    }
}
