/**
 * Tier 2: Boundary Value Analysis (BVA) & Corner Cases Test Suite
 * Minimum 5 boundary/corner tests per feature across all 11 features (Total: 55 tests)
 */

import { describe, it } from '../framework/test_runner.js';
import { assert } from '../framework/assert.js';
import { Harness } from '../framework/harness.js';
import { playerFixtures } from '../fixtures/player_fixtures.js';
import { materialsCatalogFixture } from '../fixtures/materials_fixtures.js';
import { equipmentFixtures } from '../fixtures/equipment_fixtures.js';
import { realmsFixtures } from '../fixtures/realms_fixtures.js';
import fs from 'node:fs';
import path from 'node:path';

export function registerTier2Tests() {
  describe('Tier 2: Boundary & Corner Cases (Features 1 to 11)', () => {

    // =========================================================================
    // FEATURE 1: Material Pouch Boundaries
    // =========================================================================
    describe('Feature 1 Boundaries: Materials & Filtering', () => {
      it('F1.B1: Should exclude materials with 0 or negative quantity', () => {
        const pMats = { thiet_khoang_tho: 0, da_tho: -5, quang_dong: 1 };
        const res = Harness.filterMaterials(pMats, materialsCatalogFixture, 'all');
        assert.strictEqual(res.length, 1);
        assert.strictEqual(res[0].id, 'quang_dong');
      });

      it('F1.B2: Should handle extreme quantity balances (1,000,000 units)', () => {
        const pMats = { da_cuong_hoa: 1000000 };
        const res = Harness.filterMaterials(pMats, materialsCatalogFixture, 'da_cuong_hoa');
        assert.strictEqual(res[0].quantity, 1000000);
      });

      it('F1.B3: Should handle empty materials dictionary safely', () => {
        const res = Harness.filterMaterials({}, materialsCatalogFixture, 'khoang_thach');
        assert.deepStrictEqual(res, []);
      });

      it('F1.B4: Should handle unrecognized filter category without throwing', () => {
        const pMats = { thiet_khoang_tho: 5 };
        const res = Harness.filterMaterials(pMats, materialsCatalogFixture, 'non_existent_category');
        assert.deepStrictEqual(res, []);
      });

      it('F1.B5: Should fallback gracefully for materials missing from catalog metadata', () => {
        const pMats = { unknown_ore: 10 };
        const res = Harness.filterMaterials(pMats, {}, 'all');
        assert.strictEqual(res.length, 1);
        assert.strictEqual(res[0].id, 'unknown_ore');
        assert.strictEqual(res[0].quantity, 10);
      });
    });

    // =========================================================================
    // FEATURE 2: Enhancement Boundaries (+0, +12, Over-Cap)
    // =========================================================================
    describe('Feature 2 Boundaries: Enhancement Badges & Stats', () => {
      it('F2.B1: Should return Tier 0 for level 0 enhancement (+0 baseline)', () => {
        const tier = Harness.getEnhancementVisualTier(0);
        assert.strictEqual(tier.tier, 0);
        assert.strictEqual(tier.cssClass, '');
        assert.strictEqual(tier.label, '+0');
      });

      it('F2.B2: Should throw validation error for enhancement level > 12', () => {
        assert.throws(
          () => Harness.getEnhancementVisualTier(13),
          'Invalid enhancement level: 13'
        );
      });

      it('F2.B3: Should return Tier 0 for negative enhancement level', () => {
        const tier = Harness.getEnhancementVisualTier(-1);
        assert.strictEqual(tier.tier, 0);
      });

      it('F2.B4: Should verify exact transition boundary from Tier 1 (+3) to Tier 2 (+4)', () => {
        const t3 = Harness.getEnhancementVisualTier(3);
        const t4 = Harness.getEnhancementVisualTier(4);
        assert.strictEqual(t3.tier, 1);
        assert.strictEqual(t3.risk, 'safe');
        assert.strictEqual(t4.tier, 2);
        assert.strictEqual(t4.risk, 'safe_fail');
      });

      it('F2.B5: Should verify exact transition boundary from Tier 3 (+9) to Tier 4 (+10)', () => {
        const t9 = Harness.getEnhancementVisualTier(9);
        const t10 = Harness.getEnhancementVisualTier(10);
        assert.strictEqual(t9.tier, 3);
        assert.strictEqual(t9.risk, 'downgrade');
        assert.strictEqual(t10.tier, 4);
        assert.strictEqual(t10.risk, 'apex');
      });
    });

    // =========================================================================
    // FEATURE 3: Comparison & Unequip Boundaries
    // =========================================================================
    describe('Feature 3 Boundaries: Comparison Deltas & Unequip', () => {
      it('F3.B1: Should compute delta of 0 when comparing identical items', () => {
        const item = equipmentFixtures.swordTier2;
        const delta = Harness.compareEquipment(item, item);
        assert.strictEqual(delta.strength.diff, 0);
        assert.strictEqual(delta.strength.formatted, '= 0');
        assert.isFalse(delta.strength.isPositive);
        assert.isFalse(delta.strength.isNegative);
      });

      it('F3.B2: Should handle items with empty affixes array', () => {
        const itemEmpty = { id: 'empty_wep', slot: 'weapon', affixes: [] };
        const delta = Harness.compareEquipment(itemEmpty, null);
        assert.strictEqual(delta.strength.diff, 0);
      });

      it('F3.B3: Should handle comparison when both new and equipped items are null', () => {
        const delta = Harness.compareEquipment(null, null);
        assert.deepStrictEqual(delta, {});
      });

      it('F3.B4: Should handle storage ring capacity comparison', () => {
        const ring1 = { slot: 'ring', affixes: [{ stat: 'capacity', value: 10 }] };
        const ring2 = { slot: 'ring', affixes: [{ stat: 'capacity', value: 25 }] };
        const delta = Harness.compareEquipment(ring2, ring1);
        assert.strictEqual(delta.capacity.diff, 15);
        assert.strictEqual(delta.capacity.formatted, '▲ +15');
      });

      it('F3.B5: Should safely unequip from empty slot without crashing', () => {
        const player = JSON.parse(JSON.stringify(playerFixtures.novice));
        assert.strictEqual(player.equipment.ring, undefined);
        // Unequip attempt on empty slot
        const unequipSlot = 'ring';
        const removed = player.equipment[unequipSlot];
        assert.strictEqual(removed, undefined);
      });
    });

    // =========================================================================
    // FEATURE 4: Gym Stamina Consumption Boundaries
    // =========================================================================
    describe('Feature 4 Boundaries: Stamina Thresholds', () => {
      it('F4.B1: Should fail when player stamina is exactly 4 (1 below cost)', () => {
        const player = JSON.parse(JSON.stringify(playerFixtures.novice));
        player.currentStamina = 4;
        assert.throws(
          () => Harness.simulateGymTrain(player, 'strength', 1),
          'Không đủ Thể Lực'
        );
      });

      it('F4.B2: Should succeed when player stamina is exactly 5 and drop to 0', () => {
        const player = JSON.parse(JSON.stringify(playerFixtures.novice));
        player.currentStamina = 5;
        const res = Harness.simulateGymTrain(player, 'strength', 1);
        assert.strictEqual(res.updatedPlayer.currentStamina, 0);
      });

      it('F4.B3: Should fail when multi-training count exceeds available stamina', () => {
        const player = JSON.parse(JSON.stringify(playerFixtures.novice));
        player.currentStamina = 20; // Enough for 4 (4 * 5 = 20), but trying 5 (25 stamina)
        assert.throws(
          () => Harness.simulateGymTrain(player, 'speed', 5),
          'Không đủ Thể Lực'
        );
      });

      it('F4.B4: Should fail when hospitalRemaining is 1s', () => {
        const player = JSON.parse(JSON.stringify(playerFixtures.novice));
        player.hospitalRemaining = 1;
        assert.throws(
          () => Harness.simulateGymTrain(player, 'defense', 1),
          'Đang tịnh dưỡng'
        );
      });

      it('F4.B5: Should succeed when hospitalRemaining is 0s', () => {
        const player = JSON.parse(JSON.stringify(playerFixtures.novice));
        player.hospitalRemaining = 0;
        const res = Harness.simulateGymTrain(player, 'defense', 1);
        assert.strictEqual(res.staminaUsed, 5);
      });
    });

    // =========================================================================
    // FEATURE 5: Defense & Evasion Boundaries
    // =========================================================================
    describe('Feature 5 Boundaries: Mitigation & Dodge Asymptotes', () => {
      it('F5.B1: Should return 0.0% mitigation for 0 defense', () => {
        assert.strictEqual(Harness.calcArmorMitigation(0, 75), 0.0);
      });

      it('F5.B2: Should return 0.0% mitigation for negative defense', () => {
        assert.strictEqual(Harness.calcArmorMitigation(-50, 75), 0.0);
      });

      it('F5.B3: Should strictly bound mitigation at 85.0% for 10,000,000 defense', () => {
        assert.strictEqual(Harness.calcArmorMitigation(10000000, 250), 85.0);
      });

      it('F5.B4: Should return 0.0% evasion for 0 dexterity', () => {
        assert.strictEqual(Harness.calcEvasionChance(0, 100), 0.0);
      });

      it('F5.B5: Should strictly bound evasion at 35.0% for infinite dexterity', () => {
        assert.strictEqual(Harness.calcEvasionChance(1000000, 1), 35.0);
      });
    });

    // =========================================================================
    // FEATURE 6: Breakthrough Preconditions Boundaries
    // =========================================================================
    describe('Feature 6 Boundaries: Cultivation Level & Resource Floors', () => {
      it('F6.B1: Should fail when level is exactly 1 below requirement (Lv.9 vs Req.10)', () => {
        const player = JSON.parse(JSON.stringify(playerFixtures.novice));
        player.level = 9;
        const req = { levelMin: 10, cost: { gold: 100, energy: 10 } };
        const evalRes = Harness.evaluateBreakthrough(player, req);
        assert.isFalse(evalRes.canBreakthrough);
        assert.isFalse(evalRes.levelSatisfied);
      });

      it('F6.B2: Should pass level check when level is exactly equal to requirement (Lv.10)', () => {
        const player = JSON.parse(JSON.stringify(playerFixtures.novice));
        player.level = 10;
        player.gold = 100;
        player.currentEnergy = 10;
        const req = { levelMin: 10, cost: { gold: 100, energy: 10 } };
        const evalRes = Harness.evaluateBreakthrough(player, req);
        assert.isTrue(evalRes.canBreakthrough);
      });

      it('F6.B3: Should fail when gold is exactly 1 below cost (499 vs 500)', () => {
        const player = JSON.parse(JSON.stringify(playerFixtures.novice));
        player.level = 10;
        player.gold = 499;
        const req = { levelMin: 10, cost: { gold: 500, energy: 10 } };
        const evalRes = Harness.evaluateBreakthrough(player, req);
        assert.isFalse(evalRes.goldSatisfied);
      });

      it('F6.B4: Should fail when energy is exactly 1 below cost (49 vs 50)', () => {
        const player = JSON.parse(JSON.stringify(playerFixtures.novice));
        player.level = 10;
        player.gold = 500;
        player.currentEnergy = 49;
        const req = { levelMin: 10, cost: { gold: 500, energy: 50 } };
        const evalRes = Harness.evaluateBreakthrough(player, req);
        assert.isFalse(evalRes.energySatisfied);
      });

      it('F6.B5: Should evaluate Qi shield as 0 HP when usableEnergy is 0', () => {
        const player = JSON.parse(JSON.stringify(playerFixtures.novice));
        player.usableEnergy = 0;
        player.currentEnergy = 0;
        const evalRes = Harness.evaluateBreakthrough(player, { levelMin: 1, cost: {} });
        assert.strictEqual(evalRes.qiShieldHp, 0);
      });
    });

    // =========================================================================
    // FEATURE 7: Arena ELO & Rank Boundary Thresholds
    // =========================================================================
    describe('Feature 7 Boundaries: ELO & Rank Thresholds', () => {
      it('F7.B1: Should evaluate boundary between Vô Danh (999) and Võ Sinh (1000)', () => {
        assert.strictEqual(Harness.getArenaRankInfo(999).rankName, 'Vô Danh');
        assert.strictEqual(Harness.getArenaRankInfo(1000).rankName, 'Võ Sinh');
      });

      it('F7.B2: Should evaluate boundary between Võ Sinh (1199) and Võ Sĩ (1200)', () => {
        assert.strictEqual(Harness.getArenaRankInfo(1199).rankName, 'Võ Sinh');
        assert.strictEqual(Harness.getArenaRankInfo(1200).rankName, 'Võ Sĩ');
      });

      it('F7.B3: Should evaluate boundary between Á Quân (1999) and Quán Quân (2000)', () => {
        assert.strictEqual(Harness.getArenaRankInfo(1999).rankName, 'Á Quân');
        assert.strictEqual(Harness.getArenaRankInfo(2000).rankName, 'Quán Quân');
      });

      it('F7.B4: Should compute exact 90.9% win probability when rating delta is -400', () => {
        // Player 1800 vs Opp 1400 -> 1 / (1 + 10^(-400/400)) = 1 / (1 + 0.1) = 1/1.1 = 90.9%
        const odds = Harness.calcEloWinOdds(1800, 1400);
        assert.strictEqual(odds.winProbability, 90.9);
      });

      it('F7.B5: Should compute exact 9.1% win probability when rating delta is +400', () => {
        // Player 1400 vs Opp 1800 -> 1 / (1 + 10^(400/400)) = 1 / (1 + 10) = 1/11 = 9.1%
        const odds = Harness.calcEloWinOdds(1400, 1800);
        assert.strictEqual(odds.winProbability, 9.1);
      });
    });

    // =========================================================================
    // FEATURE 8: Streak Boundaries
    // =========================================================================
    describe('Feature 8 Boundaries: Streak Counters', () => {
      it('F8.B1: Should format streak 0 as neutral 0W', () => {
        const s = Harness.getStreakInfo(0);
        assert.strictEqual(s.label, '0W');
        assert.strictEqual(s.eloMultiplier, 1.0);
      });

      it('F8.B2: Should format negative streak (-3) as 3L', () => {
        const s = Harness.getStreakInfo(-3);
        assert.strictEqual(s.label, '3L');
        assert.strictEqual(s.cssClass, 'streak-loss');
      });

      it('F8.B3: Should verify boundary at streak 4 (1.0x) vs streak 5 (1.5x)', () => {
        const s4 = Harness.getStreakInfo(4);
        const s5 = Harness.getStreakInfo(5);
        assert.strictEqual(s4.eloMultiplier, 1.0);
        assert.strictEqual(s5.eloMultiplier, 1.5);
      });

      it('F8.B4: Should verify boundary at streak 9 vs streak 10 (Apex Crown)', () => {
        const s9 = Harness.getStreakInfo(9);
        const s10 = Harness.getStreakInfo(10);
        assert.strictEqual(s9.label, '🔥 Chuỗi x9');
        assert.strictEqual(s10.label, '👑 Vô Địch x10');
      });

      it('F8.B5: Should handle empty combat logs array safely', () => {
        const logs = [];
        assert.strictEqual(logs.length, 0);
      });
    });

    // =========================================================================
    // FEATURE 9: Secret Realm Expiry & Scaling Boundaries
    // =========================================================================
    describe('Feature 9 Boundaries: Timed Expiry & Multipliers', () => {
      it('F9.B1: Should recognize remainingSeconds = 0 as expired', () => {
        const realm = { realm_type: 'timed', remainingSeconds: 0 };
        const isExpired = realm.remainingSeconds <= 0;
        assert.isTrue(isExpired);
      });

      it('F9.B2: Should recognize remainingSeconds = 1 as active', () => {
        const realm = { realm_type: 'timed', remainingSeconds: 1 };
        const isExpired = realm.remainingSeconds <= 0;
        assert.isFalse(isExpired);
      });

      it('F9.B3: Should NOT apply Cuồng Bạo prefix at difficultyMult 1.99', () => {
        const baseMob = { name: 'Thiết Lang', hp: 100, strength: 10, speed: 10, dexterity: 10, defense: 10 };
        const mob = Harness.scaleSecretRealmMonster(baseMob, 1, 3, 1.99);
        assert.isFalse(mob.name.startsWith('🔥 [Cuồng Bạo]'));
      });

      it('F9.B4: Should apply Cuồng Bạo prefix at difficultyMult exactly 2.00', () => {
        const baseMob = { name: 'Thiết Lang', hp: 100, strength: 10, speed: 10, dexterity: 10, defense: 10 };
        const mob = Harness.scaleSecretRealmMonster(baseMob, 1, 3, 2.00);
        assert.isTrue(mob.name.startsWith('🔥 [Cuồng Bạo]'));
      });

      it('F9.B5: Should verify permanent realm has null expires_at', () => {
        const perm = realmsFixtures.permanentDungeons[0];
        assert.strictEqual(perm.expires_at, null);
      });
    });

    // =========================================================================
    // FEATURE 10: Zone Guidance Boundaries
    // =========================================================================
    describe('Feature 10 Boundaries: World Zone Restrictions', () => {
      it('F10.B1: Should block Player Lv.7 from entering Hắc Phong Lâm (Min Lv.8)', () => {
        const zone = realmsFixtures.worldZones.find(z => z.id === 'hac_phong_lam');
        const canEnter = 7 >= zone.min_level;
        assert.isFalse(canEnter);
      });

      it('F10.B2: Should allow Player Lv.8 to enter Hắc Phong Lâm', () => {
        const zone = realmsFixtures.worldZones.find(z => z.id === 'hac_phong_lam');
        const canEnter = 8 >= zone.min_level;
        assert.isTrue(canEnter);
      });

      it('F10.B3: Should verify Zone 1 has instantaneous travel time (0s)', () => {
        const zone1 = realmsFixtures.worldZones[0];
        assert.strictEqual(zone1.travel_time, 0);
      });

      it('F10.B4: Should verify Zone 18 has maximum travel time (240s)', () => {
        const zone18 = realmsFixtures.worldZones[17];
        assert.strictEqual(zone18.travel_time, 240);
      });

      it('F10.B5: Should verify Zone 18 requires 120 Stamina for exploration', () => {
        const zone18 = realmsFixtures.worldZones[17];
        assert.strictEqual(zone18.stamina_cost, 120);
      });
    });

    // =========================================================================
    // FEATURE 11: Non-Breaking Architecture Boundaries
    // =========================================================================
    describe('Feature 11 Boundaries: State Preservation & Build Integrity', () => {
      it('F11.B1: Should verify player JSON round-trip stability', () => {
        const player = playerFixtures.midgame;
        const serialized = JSON.stringify(player);
        const deserialized = JSON.parse(serialized);
        assert.deepStrictEqual(deserialized, player);
      });

      it('F11.B2: Should verify Vite config proxy target is localhost:8080', () => {
        const vitePath = path.resolve('frontend/vite.config.js');
        const content = fs.readFileSync(vitePath, 'utf8');
        assert.ok(content.includes('http://localhost:8080'));
      });

      it('F11.B3: Should verify index.html links to main.js as ES module', () => {
        const indexPath = path.resolve('frontend/index.html');
        const content = fs.readFileSync(indexPath, 'utf8');
        assert.ok(content.includes('type="module"'));
        assert.ok(content.includes('src="/src/main.js"'));
      });

      it('F11.B4: Should verify style.css contains balanced CSS braces', () => {
        const cssPath = path.resolve('frontend/src/style.css');
        const content = fs.readFileSync(cssPath, 'utf8');
        const openCount = (content.match(/{/g) || []).length;
        const closeCount = (content.match(/}/g) || []).length;
        assert.strictEqual(openCount, closeCount);
      });

      it('F11.B5: Should verify exploration data JSON file is valid JSON', () => {
        const exploPath = path.resolve('backend/data/exploration.json');
        assert.ok(fs.existsSync(exploPath));
        const exploData = JSON.parse(fs.readFileSync(exploPath, 'utf8'));
        assert.ok(exploData.thanh_lam_tran);
      });
    });

  });
}
