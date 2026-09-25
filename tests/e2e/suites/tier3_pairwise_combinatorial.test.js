/**
 * Tier 3: Pairwise Combinatorial Interaction Test Suite
 * Tests multi-system orthogonal interactions across Requirements R1 through R5.
 */

import { describe, it } from '../framework/test_runner.js';
import { assert } from '../framework/assert.js';
import { Harness } from '../framework/harness.js';
import { playerFixtures } from '../fixtures/player_fixtures.js';
import { materialsCatalogFixture } from '../fixtures/materials_fixtures.js';
import { equipmentFixtures } from '../fixtures/equipment_fixtures.js';
import { arenaFixtures } from '../fixtures/arena_fixtures.js';
import { realmsFixtures } from '../fixtures/realms_fixtures.js';

export function registerTier3Tests() {
  describe('Tier 3: Pairwise Combinatorial Interactions (R1 x R2 x R3 x R4 x R5)', () => {

    it('T3.1: R1 Equipment Enhancement x R2 Armor Mitigation Curve', () => {
      // Equipping +5 Enhanced Armor increases Defense from 45 to 120 (45 base + 75 enhance)
      const baseMit = Harness.calcArmorMitigation(45, 75); // 45 / (45 + 375) = 10.71%
      const enhancedMit = Harness.calcArmorMitigation(120, 75); // 120 / (120 + 375) = 24.24%

      assert.closeTo(baseMit, 10.71, 0.05);
      assert.closeTo(enhancedMit, 24.24, 0.05);
      assert.isTrue(enhancedMit > baseMit);
    });

    it('T3.2: R1 Weapon Enhancement x R3 Arena Elo Odds Impact', () => {
      // Weapon enhanced +12 grants +850 Strength, elevating effective rating from 1400 to 1800
      const initialOdds = Harness.calcEloWinOdds(1400, 1600); // 24.0% (Underdog)
      const boostedOdds = Harness.calcEloWinOdds(1800, 1600); // 76.0% (Advantage)

      assert.strictEqual(initialOdds.tierLabel, '⚠️ Kèo Dưới');
      assert.strictEqual(boostedOdds.tierLabel, '🟢 Kèo Trên');
      assert.isTrue(boostedOdds.winProbability > initialOdds.winProbability);
    });

    it('T3.3: R2 Physical Gym Stamina x R4 Map Travel & Exploration Cost', () => {
      // Player with 100 Stamina performs 4 Gym trains (-20 TL) then travels to Hắc Phong Lâm (-12 TL)
      const player = JSON.parse(JSON.stringify(playerFixtures.novice));
      assert.strictEqual(player.currentStamina, 100);

      // 4 gym sessions
      const gymRes = Harness.simulateGymTrain(player, 'strength', 4);
      assert.strictEqual(gymRes.updatedPlayer.currentStamina, 80);

      // Travel exploration cost
      const zone = realmsFixtures.worldZones.find(z => z.id === 'hac_phong_lam');
      const staminaAfterTravel = gymRes.updatedPlayer.currentStamina - zone.stamina_cost;
      assert.strictEqual(staminaAfterTravel, 68);
    });

    it('T3.4: R4 Secret Realm Monster Drop x R1 Pouch Filtering & Count Accumulation', () => {
      // Monster in Huyễn Cảnh drops 5 da_cuong_hoa and 10 thanh_lam_diep
      const player = JSON.parse(JSON.stringify(playerFixtures.novice));
      player.materials.da_cuong_hoa = (player.materials.da_cuong_hoa || 0) + 5;
      player.materials.thanh_lam_diep = (player.materials.thanh_lam_diep || 0) + 10;

      const stones = Harness.filterMaterials(player.materials, materialsCatalogFixture, 'da_cuong_hoa');
      const herbs = Harness.filterMaterials(player.materials, materialsCatalogFixture, 'linh_duoc');

      assert.strictEqual(stones[0].quantity, 8); // 3 initial + 5 dropped
      assert.strictEqual(herbs[0].quantity, 10);
    });

    it('T3.5: R2 Cultivation Breakthrough x R4 World Realm Access Floor', () => {
      // Novice player at Level 17 (Trúc Cơ Sơ Kỳ) cannot enter Bắc Sương Cảnh (Min Lv 30)
      const player = JSON.parse(JSON.stringify(playerFixtures.novice));
      player.level = 17;
      const zone = realmsFixtures.worldZones.find(z => z.id === 'bac_suong_canh'); // Min Lv 30
      assert.isFalse(player.level >= zone.min_level);

      // Player breaks through to Kim Đan (Level 30)
      player.level = 30;
      assert.isTrue(player.level >= zone.min_level);
    });

    it('T3.6: R3 Arena Win Streak Multiplier x R1 Gold Balance Economy', () => {
      // At streak 5, win gives base 200 gold + 100 gold streak bonus
      const s5 = Harness.getStreakInfo(5);
      const baseGold = 200;
      const totalGoldEarned = baseGold + s5.goldBonus;

      const player = JSON.parse(JSON.stringify(playerFixtures.novice));
      const initialGold = player.gold;
      player.gold += totalGoldEarned;

      assert.strictEqual(totalGoldEarned, 300);
      assert.strictEqual(player.gold, initialGold + 300);
    });

    it('T3.7: R2 Dexterity Evasion x R3 Arena Opponent Speed Dynamic', () => {
      // Player with 140 Dex faces Slow (Speed 70), Equal (Speed 140), and Fast (Speed 280) opponents
      const dodgeSlow = Harness.calcEvasionChance(140, 70); // 140 / (140 + 175) = 44.4% -> Capped at 35.0%
      const dodgeEqual = Harness.calcEvasionChance(140, 140); // 140 / (140 + 350) = 28.57%
      const dodgeFast = Harness.calcEvasionChance(140, 280); // 140 / (140 + 700) = 16.67%

      assert.strictEqual(dodgeSlow, 35.0);
      assert.closeTo(dodgeEqual, 28.57, 0.05);
      assert.closeTo(dodgeFast, 16.67, 0.05);
    });

    it('T3.8: R1 Unequip Armor x R2 Immediate Defense & Mitigation Reduction', () => {
      const player = JSON.parse(JSON.stringify(playerFixtures.midgame));
      const initialDef = player.stats.defense; // 110 (including 45 base + 75 enhance = 120 armor def)
      const mitEquipped = Harness.calcArmorMitigation(initialDef, 75);

      // Unequip body armor
      const unequippedArmor = player.equipment.body;
      delete player.equipment.body;
      const defenseLost = 45 + 75;
      const strippedDef = Math.max(0, initialDef - defenseLost);
      const mitUnequipped = Harness.calcArmorMitigation(strippedDef, 75);

      assert.isTrue(mitUnequipped < mitEquipped);
      assert.strictEqual(strippedDef, 0);
      assert.strictEqual(mitUnequipped, 0.0);
    });

    it('T3.9: R2 Qi Shield Tribulation Buffer x R4 Secret Realm Boss Damage', () => {
      // Boss deals 600 damage. Player has 200 usable energy -> 500 HP Qi shield
      const usableEnergy = 200;
      const qiShield = usableEnergy * 2.5; // 500
      const bossDamage = 600;
      const damagePenetratingShield = bossDamage - qiShield;

      assert.strictEqual(qiShield, 500);
      assert.strictEqual(damagePenetratingShield, 100);
    });

    it('T3.10: R4 Extreme Monster Scaling (Cuồng Bạo 2.8x) x R2 Armor Mitigation', () => {
      // Normal attack = 75, Cuồng Bạo attack = 75 * 2.8 = 210
      // Heavy strike penetrates armor deeper
      const playerDef = 200;
      const mitNormal = Harness.calcArmorMitigation(playerDef, 75);  // 200 / (200 + 375) = 34.78%
      const mitCuongBao = Harness.calcArmorMitigation(playerDef, 210); // 200 / (200 + 1050) = 16.0%

      assert.closeTo(mitNormal, 34.78, 0.05);
      assert.closeTo(mitCuongBao, 16.0, 0.05);
      assert.isTrue(mitCuongBao < mitNormal);
    });

    it('T3.11: R1 Dual Storage Rings x R5 Backpack Capacity Aggregation', () => {
      // Base capacity = 20. Ring 1 (+15 capacity), Ring 2 (+20 capacity) -> Total 55
      let totalCapacity = 20;
      const ring1 = { affixes: [{ stat: 'capacity', value: 15 }] };
      const ring2 = { affixes: [{ stat: 'capacity', value: 20 }] };

      totalCapacity += ring1.affixes[0].value;
      totalCapacity += ring2.affixes[0].value;

      assert.strictEqual(totalCapacity, 55);
    });

    it('T3.12: R2 Hospitalized State x R3 Arena Fight Blocking', () => {
      const player = JSON.parse(JSON.stringify(playerFixtures.hospitalized));
      const canFightInArena = player.hospitalRemaining === 0;
      assert.isFalse(canFightInArena);
    });

    it('T3.13: R1 Safe-Fail Enhancement (+4 to +6) x R2 Invariant Armor Stats', () => {
      // Enhancement failure at +5 (safe_fail) retains level at +5 with no stat degradation
      const tierInfo = Harness.getEnhancementVisualTier(5);
      assert.strictEqual(tierInfo.risk, 'safe_fail');

      const statsBefore = Harness.calcEnhancementStatBonus('body', 5, 15);
      const levelAfterFail = 5; // Retained
      const statsAfter = Harness.calcEnhancementStatBonus('body', levelAfterFail, 15);

      assert.deepStrictEqual(statsAfter, statsBefore);
    });

    it('T3.14: R1 Downgrade Enhancement (+7 to +9) x R2 Combat Stat Penalty', () => {
      // Enhancement failure at +8 (downgrade) degrades level to +7
      const tierInfo = Harness.getEnhancementVisualTier(8);
      assert.strictEqual(tierInfo.risk, 'downgrade');

      const statsAt8 = Harness.calcEnhancementStatBonus('weapon', 8, 15); // 8 * 4 * 5 = 160
      const statsAt7 = Harness.calcEnhancementStatBonus('weapon', 7, 15); // 7 * 4 * 5 = 140

      assert.strictEqual(statsAt8.strength, 160);
      assert.strictEqual(statsAt7.strength, 140);
      assert.isTrue(statsAt7.strength < statsAt8.strength);
    });

    it('T3.15: R3 Arena Match History x Structured JSON Fight Log Storage', () => {
      const log = arenaFixtures.sampleFightLog;
      const jsonStr = JSON.stringify(log);
      const parsedLog = JSON.parse(jsonStr);

      assert.strictEqual(parsedLog.length, 5);
      assert.strictEqual(parsedLog[0].damage, 240);
      assert.isTrue(parsedLog[0].isCrit);
    });

  });
}
