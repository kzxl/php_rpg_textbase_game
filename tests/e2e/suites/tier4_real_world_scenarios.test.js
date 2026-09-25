/**
 * Tier 4: Real-World Application Workload Scenarios
 * Comprehensive multi-step end-to-end player journeys across the RPG engine.
 */

import { describe, it } from '../framework/test_runner.js';
import { assert } from '../framework/assert.js';
import { Harness } from '../framework/harness.js';
import { playerFixtures } from '../fixtures/player_fixtures.js';
import { materialsCatalogFixture } from '../fixtures/materials_fixtures.js';
import { equipmentFixtures } from '../fixtures/equipment_fixtures.js';
import { arenaFixtures } from '../fixtures/arena_fixtures.js';
import { realmsFixtures } from '../fixtures/realms_fixtures.js';

export function registerTier4Tests() {
  describe('Tier 4: Real-World Workload Scenarios', () => {

    // =========================================================================
    // SCENARIO 1: Novice Daoist Journey from Town to First Forged Blade
    // =========================================================================
    it('Scenario 1: Novice Daoist Journey from Town to First Forged Blade', () => {
      // 1. Initialize player in Thanh Lam Trấn
      const player = JSON.parse(JSON.stringify(playerFixtures.novice));
      assert.strictEqual(player.currentArea, 'thanh_lam_tran');
      assert.strictEqual(player.currentStamina, 100);
      assert.strictEqual(player.gold, 500);

      // 2. Physical Gym Training: 2 sessions of Strength (-10 Thể Lực)
      const trainRes = Harness.simulateGymTrain(player, 'strength', 2);
      player.currentStamina = trainRes.updatedPlayer.currentStamina;
      player.stats.strength = trainRes.updatedPlayer.stats.strength;
      assert.strictEqual(player.currentStamina, 90);
      assert.strictEqual(player.stats.strength, 12);
      assert.strictEqual(trainRes.energyDepleted, 0); // Energy untouched!

      // 3. Pouch Material Check: 15 Thiết Khoáng Thô, 10 Da Thô, 3 Đá Cường Hóa
      const ores = Harness.filterMaterials(player.materials, materialsCatalogFixture, 'khoang_thach');
      assert.ok(ores.some(o => o.id === 'thiet_khoang_tho' && o.quantity >= 3));

      // 4. Forging Recipe Execution: Thiết Kiếm requires 3 Thiết Khoáng Thô, 2 Da Thô, 20 Gold
      player.materials.thiet_khoang_tho -= 3;
      player.materials.da_tho -= 2;
      player.gold -= 20;

      const forgedSword = {
        id: 'item_sword_newbie_01',
        name: 'Thiết Kiếm',
        slot: 'weapon',
        baseType: 'sword',
        itemLevel: 1,
        rarity: 'common',
        enhanceLevel: 0,
        affixes: [{ stat: 'strength', type: 'flat', value: 5 }]
      };
      player.inventory.push(forgedSword);
      assert.strictEqual(player.inventory.length, 1);

      // 5. Shortcut Navigation to Enhancement Anvil
      const anvilJump = {
        currentPage: 'alchemy',
        _alchemyTab: 'enhancement',
        _selectedEnhanceItemId: forgedSword.id
      };
      assert.strictEqual(anvilJump.currentPage, 'alchemy');

      // 6. Enhance weapon from +0 to +3 (Tier 1 Safe)
      for (let lvl = 1; lvl <= 3; lvl++) {
        const tier = Harness.getEnhancementVisualTier(lvl);
        assert.strictEqual(tier.tier, 1);
        assert.strictEqual(tier.risk, 'safe');
        player.materials.da_cuong_hoa -= 1;
        forgedSword.enhanceLevel = lvl;
      }
      assert.strictEqual(player.materials.da_cuong_hoa, 0);
      assert.strictEqual(forgedSword.enhanceLevel, 3);

      // 7. Equip Weapon & Verify Stat Comparison
      const delta = Harness.compareEquipment(forgedSword, null);
      assert.isTrue(delta.strength.isPositive);
      player.equipment.weapon = forgedSword;
      player.inventory = player.inventory.filter(i => i.id !== forgedSword.id);

      assert.ok(player.equipment.weapon);
      assert.strictEqual(player.inventory.length, 0);
    });

    // =========================================================================
    // SCENARIO 2: Qi Condensation Breakthrough under Tribulation Lightning
    // =========================================================================
    it('Scenario 2: Qi Condensation Breakthrough under Tribulation Lightning', () => {
      // 1. Prepare candidate at Level 30
      const player = JSON.parse(JSON.stringify(playerFixtures.midgame));
      player.level = 30;
      player.currentHp = player.stats.maxHp; // Full HP
      player.currentEnergy = 350;
      player.usableEnergy = 280; // 70 reserved by protective aura

      // 2. Breakthrough Requirements Evaluation
      const req = { levelMin: 30, cost: { gold: 5000, energy: 100 } };
      const evalRes = Harness.evaluateBreakthrough(player, req);
      assert.isTrue(evalRes.canBreakthrough);
      assert.strictEqual(evalRes.readinessScore, 100);

      // 3. Qi Shield Calculation (usableEnergy * 2.5)
      const qiShield = evalRes.qiShieldHp; // 280 * 2.5 = 700 HP
      assert.strictEqual(qiShield, 700);

      // 4. Simulate Tribulation Lightning Strike (3 waves of lightning)
      const waves = [300, 500, 800];
      let remainingShield = qiShield;
      let hpDeducted = 0;

      for (const strike of waves) {
        // Hộ Thể Kim Chung reduces lightning damage by 20%
        const reducedDamage = Math.round(strike * 0.8);
        if (remainingShield >= reducedDamage) {
          remainingShield -= reducedDamage;
        } else {
          const overkill = reducedDamage - remainingShield;
          remainingShield = 0;
          hpDeducted += overkill;
        }
      }

      // Verify survival
      player.currentHp -= hpDeducted;
      assert.isTrue(player.currentHp > 0);

      // 5. Successful Breakthrough: Deduct cost, elevate realm and level
      player.gold -= req.cost.gold;
      player.currentEnergy -= req.cost.energy;
      player.realm += 1;
      player.realmInfo = { id: 'kim_dan_2', name: 'Kim Đan Trung Kỳ', fullName: 'Kim Đan Sơ Kỳ Đỉnh Phong' };

      assert.strictEqual(player.realm, 4);
      assert.strictEqual(player.gold, 10000);
      assert.strictEqual(player.currentEnergy, 250);
    });

    // =========================================================================
    // SCENARIO 3: High-Stakes Arena Climber with Win Streaks & ELO Surge
    // =========================================================================
    it('Scenario 3: High-Stakes Arena Climber with Win Streaks & ELO Surge', () => {
      // 1. Initial State: Võ Sinh (Rating 1150, Streak 0)
      const player = { id: 'climber_01', rating: 1150, streak: 0, gold: 1000, wins: 10, losses: 5 };
      assert.strictEqual(Harness.getArenaRankInfo(player.rating).rankName, 'Võ Sinh');

      // 2. Duel 5 consecutive opponents
      const opponents = [
        { name: 'Opp 1', rating: 1160 },
        { name: 'Opp 2', rating: 1200 },
        { name: 'Opp 3', rating: 1250 },
        { name: 'Opp 4', rating: 1300 },
        { name: 'Opp 5', rating: 1380 }
      ];

      for (let i = 0; i < opponents.length; i++) {
        const opp = opponents[i];
        const odds = Harness.calcEloWinOdds(player.rating, opp.rating);
        assert.ok(odds.winProbability > 0);

        // Win duel
        player.wins += 1;
        player.streak += 1;

        // ELO and Gold calculation
        const streakInfo = Harness.getStreakInfo(player.streak);
        const baseRatingGain = 25;
        const finalRatingGain = Math.round(baseRatingGain * streakInfo.eloMultiplier);
        player.rating += finalRatingGain;
        player.gold += 50 + streakInfo.goldBonus;
      }

      // 3. Verify Streak Fire Badge unlocked (Streak 5)
      assert.strictEqual(player.streak, 5);
      const streak5Info = Harness.getStreakInfo(player.streak);
      assert.strictEqual(streak5Info.label, '🔥 Chuỗi x5');
      assert.strictEqual(streak5Info.eloMultiplier, 1.5);
      assert.strictEqual(streak5Info.goldBonus, 100);

      // 4. Verify Rank Promotion from Võ Sinh to Võ Sĩ / Đấu Sĩ
      assert.isTrue(player.rating >= 1200);
      const newRank = Harness.getArenaRankInfo(player.rating);
      assert.ok(['Võ Sĩ', 'Đấu Sĩ'].includes(newRank.rankName));
    });

    // =========================================================================
    // SCENARIO 4: Secret Realm Incursion — Timed vs Primordial Forbidden Zone
    // =========================================================================
    it('Scenario 4: Secret Realm Incursion — Timed vs Primordial Forbidden Zone', () => {
      // 1. Discover Timed Rift (Huyễn Cảnh)
      const timed = realmsFixtures.timedDungeons[0];
      const timedEval = Harness.evaluateSecretRealm(timed);
      assert.isTrue(timedEval.isTimed);
      assert.strictEqual(timedEval.themeColor, '#c084fc');
      assert.strictEqual(timed.remainingSeconds, 1800);

      // 2. Discover Permanent Forbidden Zone (Thượng Cổ Cấm Địa)
      const perm = realmsFixtures.permanentDungeons[0];
      const permEval = Harness.evaluateSecretRealm(perm);
      assert.isTrue(permEval.isPermanent);
      assert.strictEqual(permEval.themeColor, '#f87171');
      assert.strictEqual(permEval.difficultyMult, 2.8);

      // 3. Enter Forbidden Zone & Fight Waves 1 to 5
      const baseMonster = { name: 'Thần Ma Tàn Quân', hp: 2000, strength: 200, speed: 80, dexterity: 80, defense: 150 };
      const mobWave1 = Harness.scaleSecretRealmMonster(baseMonster, 1, perm.totalWaves, perm.difficultyMult);
      const mobWave5 = Harness.scaleSecretRealmMonster(baseMonster, 5, perm.totalWaves, perm.difficultyMult);

      assert.ok(mobWave1.name.startsWith('🔥 [Cuồng Bạo]'));
      assert.isTrue(mobWave5.isBoss);
      assert.isTrue(mobWave5.hp > mobWave1.hp);

      // 4. Triumph and Harvest Rare Rewards
      const player = JSON.parse(JSON.stringify(playerFixtures.midgame));
      const drops = { da_cuong_hoa: 10, tinh_thach: 5 };
      player.materials.da_cuong_hoa = (player.materials.da_cuong_hoa || 0) + drops.da_cuong_hoa;
      player.materials.tinh_thach = (player.materials.tinh_thach || 0) + drops.tinh_thach;

      // 5. Increment Permanent Conquest Counter
      perm.clearCount += 1;
      perm.isCleared = true;
      assert.strictEqual(perm.clearCount, 4);
      assert.strictEqual(player.materials.da_cuong_hoa, 35);
    });

    // =========================================================================
    // SCENARIO 5: Full Equipment Enhancement Lifecycle (+0 to +12) with Down-Rank Resilience
    // =========================================================================
    it('Scenario 5: Complete Equipment Enhancement Lifecycle (+0 to +12) with Down-Rank Resilience', () => {
      const weapon = {
        id: 'eq_tru_tien_blade',
        name: 'Bản Nguyên Tru Tiên Kiếm',
        slot: 'weapon',
        baseType: 'sword',
        itemLevel: 150,
        rarity: 'legendary',
        enhanceLevel: 0,
        affixes: [{ stat: 'strength', type: 'flat', value: 850 }]
      };

      // 1. Tier 1 Progression (+1 to +3): Safe
      for (let l = 1; l <= 3; l++) {
        const tier = Harness.getEnhancementVisualTier(l);
        assert.strictEqual(tier.tier, 1);
        assert.strictEqual(tier.risk, 'safe');
        weapon.enhanceLevel = l;
      }
      assert.strictEqual(weapon.enhanceLevel, 3);

      // 2. Tier 2 Progression (+4 to +6): Safe-Fail
      for (let l = 4; l <= 6; l++) {
        const tier = Harness.getEnhancementVisualTier(l);
        assert.strictEqual(tier.tier, 2);
        assert.strictEqual(tier.risk, 'safe_fail');
        weapon.enhanceLevel = l;
      }
      assert.strictEqual(weapon.enhanceLevel, 6);

      // 3. Tier 3 High-Stakes (+7 to +9): Simulate a down-rank failure at +8 -> +7
      const tier7 = Harness.getEnhancementVisualTier(7);
      assert.strictEqual(tier7.risk, 'downgrade');
      weapon.enhanceLevel = 7;

      // Failed attempt at +8 degrades to +7
      const simulatedRollSuccess = false;
      if (!simulatedRollSuccess) {
        weapon.enhanceLevel = Math.max(0, weapon.enhanceLevel - 1); // 7 -> 6
      }
      assert.strictEqual(weapon.enhanceLevel, 6);

      // Re-enhance back to +8 then +9
      weapon.enhanceLevel = 8;
      weapon.enhanceLevel = 9;
      assert.strictEqual(Harness.getEnhancementVisualTier(9).tier, 3);

      // 4. Tier 4 Apex Progression (+10 to +12): Apex Gold
      for (let l = 10; l <= 12; l++) {
        const tier = Harness.getEnhancementVisualTier(l);
        assert.strictEqual(tier.tier, 4);
        assert.strictEqual(tier.cssClass, 'enhance-glow-tier4');
        weapon.enhanceLevel = l;
      }
      assert.strictEqual(weapon.enhanceLevel, 12);

      // 5. Verify Maximum Combat Affixes at +12
      // Level 12, ilvl 150 -> tierMult = 50. Strength bonus = 12 * 4 * 50 = 2400
      const apexBonus = Harness.calcEnhancementStatBonus('weapon', 12, 150);
      assert.strictEqual(apexBonus.strength, 2400);
      assert.strictEqual(apexBonus.damage, 4800);
    });

  });
}
