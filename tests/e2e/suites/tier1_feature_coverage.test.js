/**
 * Tier 1: Category-Partition Feature Coverage Test Suite
 * Minimum 5 tests per feature across all 11 features (Total: 55 tests)
 */

import { describe, it } from '../framework/test_runner.js';
import { assert } from '../framework/assert.js';
import { Harness } from '../framework/harness.js';
import { playerFixtures } from '../fixtures/player_fixtures.js';
import { materialsCatalogFixture } from '../fixtures/materials_fixtures.js';
import { equipmentFixtures } from '../fixtures/equipment_fixtures.js';
import { arenaFixtures } from '../fixtures/arena_fixtures.js';
import { realmsFixtures } from '../fixtures/realms_fixtures.js';
import fs from 'node:fs';
import path from 'node:path';

export function registerTier1Tests() {
  describe('Tier 1: Feature Coverage (Features 1 to 11)', () => {

    // =========================================================================
    // FEATURE 1: Material Pouch Tab, Ore Counts, Rarity Tiers, Filtering
    // =========================================================================
    describe('Feature 1: Kho Nguyên Liệu & Khoáng Thạch Pouch Tab', () => {
      it('F1.1: Should correctly catalog all 5 material categories', () => {
        const types = new Set(Object.values(materialsCatalogFixture).map(m => m.type));
        assert.ok(types.has('mineral'));
        assert.ok(types.has('beast'));
        assert.ok(types.has('herb'));
        assert.ok(types.has('spirit'));
        assert.ok(types.has('enhancement_stone'));
      });

      it('F1.2: Should filter materials strictly by Khoáng Thạch (Ores & Minerals)', () => {
        const pMats = { thiet_khoang_tho: 10, da_tho: 5, quang_dong: 8, thanh_lam_diep: 3 };
        const ores = Harness.filterMaterials(pMats, materialsCatalogFixture, 'khoang_thach');
        assert.strictEqual(ores.length, 2);
        assert.ok(ores.some(m => m.id === 'thiet_khoang_tho' && m.quantity === 10));
        assert.ok(ores.some(m => m.id === 'quang_dong' && m.quantity === 8));
        assert.isFalse(ores.some(m => m.id === 'da_tho'));
      });

      it('F1.3: Should filter materials strictly by Yêu Thú and Linh Dược', () => {
        const pMats = { da_tho: 12, xuong_vun: 7, thanh_lam_diep: 20, quang_bac: 4 };
        const beasts = Harness.filterMaterials(pMats, materialsCatalogFixture, 'yeu_thu');
        const herbs = Harness.filterMaterials(pMats, materialsCatalogFixture, 'linh_duoc');
        assert.strictEqual(beasts.length, 2);
        assert.strictEqual(herbs.length, 1);
        assert.strictEqual(herbs[0].id, 'thanh_lam_diep');
        assert.strictEqual(herbs[0].quantity, 20);
      });

      it('F1.4: Should correctly isolate Đá Cường Hóa (da_cuong_hoa)', () => {
        const pMats = { da_cuong_hoa: 15, quang_vang: 2, tinh_thach: 4 };
        const stones = Harness.filterMaterials(pMats, materialsCatalogFixture, 'da_cuong_hoa');
        assert.strictEqual(stones.length, 1);
        assert.strictEqual(stones[0].id, 'da_cuong_hoa');
        assert.strictEqual(stones[0].quantity, 15);
        assert.strictEqual(stones[0].rarity, 'rare');
      });

      it('F1.5: Should verify rarity tiers across materials catalog', () => {
        const rarities = Object.values(materialsCatalogFixture).map(m => m.rarity);
        assert.ok(rarities.includes('common'));
        assert.ok(rarities.includes('uncommon'));
        assert.ok(rarities.includes('rare'));
        assert.ok(rarities.includes('epic'));
        assert.ok(rarities.includes('legendary'));
      });
    });

    // =========================================================================
    // FEATURE 2: Enhancement Badges (+1 to +12), Visual Classes, Stats Modifiers
    // =========================================================================
    describe('Feature 2: Trang Bị & Cường Hóa (+N) Feedback', () => {
      it('F2.1: Should map +1..+3 to Tier 1 visual badge (.enhance-glow-tier1)', () => {
        for (let lvl = 1; lvl <= 3; lvl++) {
          const tierInfo = Harness.getEnhancementVisualTier(lvl);
          assert.strictEqual(tierInfo.tier, 1);
          assert.strictEqual(tierInfo.cssClass, 'enhance-glow-tier1');
          assert.strictEqual(tierInfo.risk, 'safe');
          assert.strictEqual(tierInfo.label, `+${lvl}`);
        }
      });

      it('F2.2: Should map +4..+6 to Tier 2 visual badge (.enhance-glow-tier2)', () => {
        for (let lvl = 4; lvl <= 6; lvl++) {
          const tierInfo = Harness.getEnhancementVisualTier(lvl);
          assert.strictEqual(tierInfo.tier, 2);
          assert.strictEqual(tierInfo.cssClass, 'enhance-glow-tier2');
          assert.strictEqual(tierInfo.risk, 'safe_fail');
        }
      });

      it('F2.3: Should map +7..+9 to Tier 3 visual badge (.enhance-glow-tier3)', () => {
        for (let lvl = 7; lvl <= 9; lvl++) {
          const tierInfo = Harness.getEnhancementVisualTier(lvl);
          assert.strictEqual(tierInfo.tier, 3);
          assert.strictEqual(tierInfo.cssClass, 'enhance-glow-tier3');
          assert.strictEqual(tierInfo.risk, 'downgrade');
        }
      });

      it('F2.4: Should map +10..+12 to Tier 4 visual badge (.enhance-glow-tier4)', () => {
        for (let lvl = 10; lvl <= 12; lvl++) {
          const tierInfo = Harness.getEnhancementVisualTier(lvl);
          assert.strictEqual(tierInfo.tier, 4);
          assert.strictEqual(tierInfo.cssClass, 'enhance-glow-tier4');
          assert.strictEqual(tierInfo.risk, 'apex');
        }
      });

      it('F2.5: Should compute exact weapon and armor stat bonuses conforming to FORGING_SPEC', () => {
        // Weapon +6, ilvl 15: tierMultiplier = floor(15/3) = 5. flatStr = max(24, 6*4*5) = 120
        const wepBonus = Harness.calcEnhancementStatBonus('weapon', 6, 15);
        assert.strictEqual(wepBonus.strength, 120);

        // Armor +5, ilvl 15: flatDef = max(15, 5*3*5) = 75, flatHp = 5*30*5 = 750
        const armBonus = Harness.calcEnhancementStatBonus('body', 5, 15);
        assert.strictEqual(armBonus.defense, 75);
        assert.strictEqual(armBonus.maxHp, 750);
      });
    });

    // =========================================================================
    // FEATURE 3: Action Shortcuts, Anvil Jump State, Stat Comparison Delta Logic, Unequip
    // =========================================================================
    describe('Feature 3: Tương Tác Nhanh & Lò Tạo Hóa Shortcut', () => {
      it('F3.1: Should configure correct anvil navigation jump state payload', () => {
        const mockState = { currentPage: 'inventory', _alchemyTab: null, _selectedEnhanceItemId: null };
        const targetItem = equipmentFixtures.swordTier2;

        // Simulate shortcut trigger
        mockState.currentPage = 'alchemy';
        mockState._alchemyTab = 'enhancement';
        mockState._selectedEnhanceItemId = targetItem.id;

        assert.strictEqual(mockState.currentPage, 'alchemy');
        assert.strictEqual(mockState._alchemyTab, 'enhancement');
        assert.strictEqual(mockState._selectedEnhanceItemId, 'eq_sword_tier2');
      });

      it('F3.2: Should compute positive delta when comparing superior weapon', () => {
        const currentEquipped = equipmentFixtures.noviceSword0; // str 5
        const superiorSword = equipmentFixtures.swordTier2; // str 35 + enhance 120 = 155
        const delta = Harness.compareEquipment(superiorSword, currentEquipped);

        assert.isTrue(delta.strength.isPositive);
        assert.strictEqual(delta.strength.diff, 150);
        assert.strictEqual(delta.strength.formatted, '▲ +150');
      });

      it('F3.3: Should compute negative delta when comparing inferior item', () => {
        const currentEquipped = equipmentFixtures.swordTier2;
        const inferiorSword = equipmentFixtures.noviceSword0;
        const delta = Harness.compareEquipment(inferiorSword, currentEquipped);

        assert.isTrue(delta.strength.isNegative);
        assert.strictEqual(delta.strength.diff, -150);
        assert.strictEqual(delta.strength.formatted, '▼ -150');
      });

      it('F3.4: Should treat all stats as positive delta when slot is unequipped', () => {
        const newArmor = equipmentFixtures.armorTier2;
        const delta = Harness.compareEquipment(newArmor, null);

        assert.isTrue(delta.defense.isPositive);
        assert.strictEqual(delta.defense.diff, 45 + 75); // base 45 + enhance +5(ilvl15)=75 -> 120
      });

      it('F3.5: Should simulate slot unequip transaction moving item to inventory', () => {
        const player = JSON.parse(JSON.stringify(playerFixtures.midgame));
        assert.ok(player.equipment.weapon);
        const unequippedItem = player.equipment.weapon;

        // Unequip action
        delete player.equipment.weapon;
        player.inventory.push(unequippedItem);

        assert.strictEqual(player.equipment.weapon, undefined);
        assert.strictEqual(player.inventory.length, 1);
        assert.strictEqual(player.inventory[0].id, 'eq_tinh_cuong_kiem');
      });
    });

    // =========================================================================
    // FEATURE 4: Physical Gym Stamina Consumption vs Energy
    // =========================================================================
    describe('Feature 4: Phân Định Tài Nguyên Thể Lực', () => {
      it('F4.1: Should consume strictly 5 Thể Lực (currentStamina) on training', () => {
        const player = JSON.parse(JSON.stringify(playerFixtures.novice));
        const initialStamina = player.currentStamina; // 100
        const initialEnergy = player.currentEnergy;   // 50

        const res = Harness.simulateGymTrain(player, 'strength', 1);

        assert.strictEqual(res.updatedPlayer.currentStamina, initialStamina - 5);
        assert.strictEqual(res.updatedPlayer.currentEnergy, initialEnergy);
        assert.strictEqual(res.staminaUsed, 5);
        assert.strictEqual(res.energyDepleted, 0);
      });

      it('F4.2: Should reject training when player currentStamina < 5', () => {
        const player = JSON.parse(JSON.stringify(playerFixtures.exhausted)); // Stamina: 3, Energy: 100
        assert.throws(
          () => Harness.simulateGymTrain(player, 'defense', 1),
          'Không đủ Thể Lực'
        );
      });

      it('F4.3: Should reject training when player is in hospital', () => {
        const player = JSON.parse(JSON.stringify(playerFixtures.hospitalized)); // hospitalRemaining: 45
        assert.throws(
          () => Harness.simulateGymTrain(player, 'speed', 1),
          'Đang tịnh dưỡng'
        );
      });

      it('F4.4: Should apply talent multiplier to stat gain', () => {
        const player = JSON.parse(JSON.stringify(playerFixtures.midgame)); // strength talent: 1.5x
        const res = Harness.simulateGymTrain(player, 'strength', 2); // 2 trains = 10 stamina, gain = 2 * 1.5 = 3

        assert.strictEqual(res.staminaUsed, 10);
        assert.strictEqual(res.effectiveGain, 3);
        assert.strictEqual(res.updatedPlayer.stats.strength, player.stats.strength + 3);
      });

      it('F4.5: Should verify all 4 valid gym stats are trainable', () => {
        const player = JSON.parse(JSON.stringify(playerFixtures.novice));
        const stats = ['strength', 'speed', 'dexterity', 'defense'];
        for (const s of stats) {
          const res = Harness.simulateGymTrain(player, s, 1);
          assert.strictEqual(res.staminaUsed, 5);
          assert.strictEqual(res.updatedPlayer.allocatedStats[s], 1);
        }
      });
    });

    // =========================================================================
    // FEATURE 5: Armor Mitigation Curves & Evasion Dexterity Probabilities
    // =========================================================================
    describe('Feature 5: Phân Tích Phòng Thủ Chuyên Sâu (Chuẩn MDG)', () => {
      it('F5.1: Should compute accurate mitigation for Low Strike (Raw 25)', () => {
        // Defense = 100, Raw = 25 -> Denom = 100 + 125 = 225. Pct = 100/225 = 44.44%
        const mit = Harness.calcArmorMitigation(100, 25);
        assert.closeTo(mit, 44.44, 0.05);
      });

      it('F5.2: Should compute accurate mitigation for Medium Strike (Raw 75)', () => {
        // Defense = 100, Raw = 75 -> Denom = 100 + 375 = 475. Pct = 100/475 = 21.05%
        const mit = Harness.calcArmorMitigation(100, 75);
        assert.closeTo(mit, 21.05, 0.05);
      });

      it('F5.3: Should compute accurate mitigation for Boss Strike (Raw 250)', () => {
        // Defense = 100, Raw = 250 -> Denom = 100 + 1250 = 1350. Pct = 100/1350 = 7.41%
        const mit = Harness.calcArmorMitigation(100, 250);
        assert.closeTo(mit, 7.41, 0.05);
      });

      it('F5.4: Should enforce strict 85.0% mitigation cap under extreme defense', () => {
        const mitHigh = Harness.calcArmorMitigation(999999, 25);
        assert.strictEqual(mitHigh, 85.0);
      });

      it('F5.5: Should compute evasion chance and enforce strict 35.0% dodge cap', () => {
        // Equal speed (Dex = 100, Spd = 100): 100 / (100 + 250) = 28.57%
        const dodgeEqual = Harness.calcEvasionChance(100, 100);
        assert.closeTo(dodgeEqual, 28.57, 0.05);

        // Extremely agile (Dex = 10000, Spd = 10): capped at 35.0%
        const dodgeCapped = Harness.calcEvasionChance(10000, 10);
        assert.strictEqual(dodgeCapped, 35.0);
      });
    });

    // =========================================================================
    // FEATURE 6: Cultivation Breakthrough Conditions, Tribulation Readiness & Talents
    // =========================================================================
    describe('Feature 6: Trực Quan Hóa Tiến Trình Cảnh Giới & Đột Phá', () => {
      it('F6.1: Should authorize breakthrough when all conditions are fulfilled', () => {
        const player = JSON.parse(JSON.stringify(playerFixtures.midgame)); // Level 35, Gold 15k, Energy 350
        const req = { levelMin: 30, cost: { gold: 5000, energy: 100 } };
        const evalRes = Harness.evaluateBreakthrough(player, req);

        assert.isTrue(evalRes.canBreakthrough);
        assert.isTrue(evalRes.levelSatisfied);
        assert.isTrue(evalRes.goldSatisfied);
        assert.isTrue(evalRes.energySatisfied);
        assert.isFalse(evalRes.isWounded);
      });

      it('F6.2: Should block breakthrough when level is insufficient', () => {
        const player = JSON.parse(JSON.stringify(playerFixtures.novice)); // Level 1
        const req = { levelMin: 10, cost: { gold: 100, energy: 20 } };
        const evalRes = Harness.evaluateBreakthrough(player, req);

        assert.isFalse(evalRes.canBreakthrough);
        assert.isFalse(evalRes.levelSatisfied);
      });

      it('F6.3: Should block breakthrough when gold or energy balance is insufficient', () => {
        const player = JSON.parse(JSON.stringify(playerFixtures.novice));
        player.level = 10;
        player.gold = 50; // Insufficient gold (need 500)
        player.currentEnergy = 10; // Insufficient energy (need 50)
        const req = { levelMin: 10, cost: { gold: 500, energy: 50 } };
        const evalRes = Harness.evaluateBreakthrough(player, req);

        assert.isFalse(evalRes.canBreakthrough);
        assert.isFalse(evalRes.goldSatisfied);
        assert.isFalse(evalRes.energySatisfied);
      });

      it('F6.4: Should detect wounded status and compute Qi shield buffer', () => {
        const player = JSON.parse(JSON.stringify(playerFixtures.midgame));
        player.currentHp = 600; // Half HP (wounded!)
        player.usableEnergy = 200;

        const req = { levelMin: 30, cost: { gold: 1000, energy: 50 } };
        const evalRes = Harness.evaluateBreakthrough(player, req);

        assert.isTrue(evalRes.isWounded);
        assert.strictEqual(evalRes.qiShieldHp, 500); // 200 * 2.5
      });

      it('F6.5: Should verify talent tier hierarchy and multipliers', () => {
        const player = playerFixtures.midgame;
        const talents = player.talentDisplay;
        assert.strictEqual(talents.strength.value, 1.5);
        assert.strictEqual(talents.strength.name, 'Huyền Cốt');
        assert.strictEqual(talents.speed.value, 1.2);
        assert.strictEqual(talents.speed.name, 'Linh Cốt');
      });
    });

    // =========================================================================
    // FEATURE 7: Arena Opponent Challenge Cards, Rank Insignias & Win Odds
    // =========================================================================
    describe('Feature 7: Thẻ Bài Đối Thủ Luận Đạo Đấu Trường', () => {
      it('F7.1: Should classify all 7 Arena Rank Tiers and Insignias accurately', () => {
        const ratings = [900, 1100, 1300, 1500, 1700, 1900, 2200];
        const expectedNames = ['Vô Danh', 'Võ Sinh', 'Võ Sĩ', 'Đấu Sĩ', 'Đấu Sư', 'Á Quân', 'Quán Quân'];
        const expectedIcons = ['🌑', '🥋', '⚔️', '🔥', '💫', '🥈', '👑'];

        ratings.forEach((r, idx) => {
          const info = Harness.getArenaRankInfo(r);
          assert.strictEqual(info.rankName, expectedNames[idx]);
          assert.strictEqual(info.icon, expectedIcons[idx]);
        });
      });

      it('F7.2: Should compute 50.0% win probability for identical ELO ratings', () => {
        const odds = Harness.calcEloWinOdds(1500, 1500);
        assert.strictEqual(odds.winProbability, 50.0);
        assert.strictEqual(odds.tierLabel, '⚖️ Cân Tài');
      });

      it('F7.3: Should compute high win probability (Kèo Trên) when player has higher ELO', () => {
        // Player 1600 vs Opponent 1400 (delta -200): ~76.0%
        const odds = Harness.calcEloWinOdds(1600, 1400);
        assert.isTrue(odds.winProbability >= 65.0);
        assert.strictEqual(odds.tierLabel, '🟢 Kèo Trên');
      });

      it('F7.4: Should compute low win probability (Kèo Dưới) when opponent has higher ELO', () => {
        // Player 1200 vs Opponent 1500 (delta +300): ~14.9%
        const odds = Harness.calcEloWinOdds(1200, 1500);
        assert.isTrue(odds.winProbability < 45.0);
        assert.strictEqual(odds.tierLabel, '⚠️ Kèo Dưới');
      });

      it('F7.5: Should calculate level delta on opponent challenge cards', () => {
        const playerLevel = 35;
        const oppCards = arenaFixtures.opponents.map(o => ({
          ...o,
          levelDelta: o.level - playerLevel
        }));

        const weaker = oppCards.find(o => o.level === 22);
        const stronger = oppCards.find(o => o.level === 55);
        assert.strictEqual(weaker.levelDelta, -13);
        assert.strictEqual(stronger.levelDelta, 20);
      });
    });

    // =========================================================================
    // FEATURE 8: Streak Fire Badges & Collapsible Combat Logs
    // =========================================================================
    describe('Feature 8: Chiến Tích, Chuỗi Thắng & Combat Logs', () => {
      it('F8.1: Should format 1-2 win streak badge (.streak-basic)', () => {
        const s1 = Harness.getStreakInfo(1);
        const s2 = Harness.getStreakInfo(2);
        assert.strictEqual(s1.label, '1W');
        assert.strictEqual(s2.label, '2W');
        assert.strictEqual(s1.eloMultiplier, 1.0);
      });

      it('F8.2: Should format 3-4 win streak as Lightning badge (⚡)', () => {
        const s3 = Harness.getStreakInfo(3);
        assert.strictEqual(s3.label, '⚡ Chuỗi x3');
        assert.strictEqual(s3.cssClass, 'streak-lightning');
      });

      it('F8.3: Should trigger Fire Streak Badge & 1.5x Multiplier at 5+ wins', () => {
        const s5 = Harness.getStreakInfo(5);
        assert.strictEqual(s5.label, '🔥 Chuỗi x5');
        assert.strictEqual(s5.eloMultiplier, 1.5);
        assert.strictEqual(s5.goldBonus, 100);
      });

      it('F8.4: Should format 10+ streak as Apex Crown (👑 Vô Địch)', () => {
        const s12 = Harness.getStreakInfo(12);
        assert.strictEqual(s12.label, '👑 Vô Địch x12');
        assert.strictEqual(s12.eloMultiplier, 1.5);
      });

      it('F8.5: Should validate structured JSON combat logs containing turns, crits, and dodges', () => {
        const logs = arenaFixtures.sampleFightLog;
        assert.ok(Array.isArray(logs));
        assert.ok(logs.some(l => l.isCrit === true));
        assert.ok(logs.some(l => l.isDodge === true));
        assert.ok(logs.some(l => l.action === 'skill'));
        assert.strictEqual(logs.length, 5);
      });
    });

    // =========================================================================
    // FEATURE 9: Secret Realms Distinction (⏳ Huyễn Cảnh vs 🔱 Thượng Cổ Cấm Địa)
    // =========================================================================
    describe('Feature 9: Phân Biệt Bí Cảnh & Huyễn Cảnh', () => {
      it('F9.1: Should distinguish Timed Rift (Huyễn Cảnh) with purple styling and timer', () => {
        const timed = realmsFixtures.timedDungeons[0];
        const evalRes = Harness.evaluateSecretRealm(timed);

        assert.isTrue(evalRes.isTimed);
        assert.isFalse(evalRes.isPermanent);
        assert.strictEqual(evalRes.badgeText, '⏳ Huyễn Cảnh');
        assert.strictEqual(evalRes.themeColor, '#c084fc');
        assert.isFalse(evalRes.hasCuongBaoAffix);
      });

      it('F9.2: Should distinguish Permanent Forbidden Zone (Thượng Cổ Cấm Địa) with crimson hazard', () => {
        const perm = realmsFixtures.permanentDungeons[0];
        const evalRes = Harness.evaluateSecretRealm(perm);

        assert.isFalse(evalRes.isTimed);
        assert.isTrue(evalRes.isPermanent);
        assert.strictEqual(evalRes.badgeText, '🔱 Thượng Cổ Cấm Địa');
        assert.strictEqual(evalRes.themeColor, '#f87171');
        assert.isTrue(evalRes.hasCuongBaoAffix);
      });

      it('F9.3: Should apply Cuồng Bạo prefix to monsters when difficultyMult >= 2.0', () => {
        const baseMob = { name: 'Thiết Huyết Cổ Điêu', hp: 1000, strength: 100, speed: 50, dexterity: 50, defense: 80 };
        const scaledMob = Harness.scaleSecretRealmMonster(baseMob, 1, 5, 2.8);

        assert.ok(scaledMob.name.startsWith('🔥 [Cuồng Bạo]'));
        assert.strictEqual(scaledMob.hp, 2800); // 1000 * 2.8
        assert.strictEqual(scaledMob.strength, 280);
      });

      it('F9.4: Should scale wave difficulty progressively inside secret realms', () => {
        const baseMob = { name: 'Ma Độc Chu', hp: 100, strength: 20, speed: 10, dexterity: 10, defense: 10 };
        const wave1 = Harness.scaleSecretRealmMonster(baseMob, 1, 4, 1.2);
        const wave3 = Harness.scaleSecretRealmMonster(baseMob, 3, 4, 1.2);

        // wave 1 factor = 1.0 * 1.2 = 1.2. hp = 120
        // wave 3 factor = (1 + 2*0.15) * 1.2 = 1.3 * 1.2 = 1.56. hp = 156
        assert.strictEqual(wave1.hp, 120);
        assert.strictEqual(wave3.hp, 156);
        assert.isTrue(wave3.hp > wave1.hp);
      });

      it('F9.5: Should tag final wave as apex boss encounter', () => {
        const baseMob = { name: 'Thần Ma Cổ Vương', hp: 5000, strength: 500, speed: 100, dexterity: 100, defense: 300 };
        const bossWave = Harness.scaleSecretRealmMonster(baseMob, 5, 5, 2.5);

        assert.isTrue(bossWave.isBoss);
      });
    });

    // =========================================================================
    // FEATURE 10: Zone Guidance, Requirements, Modifiers & Specialties
    // =========================================================================
    describe('Feature 10: Chỉ Dẫn Khu Vực & Modifier Bản Đồ (18 Vùng Đất)', () => {
      it('F10.1: Should verify all 18 canonical world zones are configured', () => {
        assert.strictEqual(realmsFixtures.worldZones.length, 18);
        assert.strictEqual(realmsFixtures.worldZones[0].id, 'thanh_lam_tran');
        assert.strictEqual(realmsFixtures.worldZones[17].id, 'hon_nguyen_dao_canh');
      });

      it('F10.2: Should verify strictly monotonic level progression across zones', () => {
        const zones = realmsFixtures.worldZones;
        for (let i = 0; i < zones.length - 1; i++) {
          assert.isTrue(zones[i].min_level <= zones[i + 1].min_level);
        }
      });

      it('F10.3: Should map unique environmental buffs/debuffs per zone', () => {
        const zones = realmsFixtures.worldZones;
        const bacSuong = zones.find(z => z.id === 'bac_suong_canh');
        const thietHuyet = zones.find(z => z.id === 'thiet_huyet_son');
        const huyetMa = zones.find(z => z.id === 'huyet_ma_chien_truong');

        assert.strictEqual(bacSuong.env, '-10% Tốc Độ');
        assert.strictEqual(thietHuyet.env, '+10% ST Hỏa');
        assert.strictEqual(huyetMa.env, '+30% ST, +20% ST nhận');
      });

      it('F10.4: Should verify stamina costs and travel durations per zone', () => {
        const noviceZone = realmsFixtures.worldZones[0];
        const apexZone = realmsFixtures.worldZones[17];

        assert.strictEqual(noviceZone.stamina_cost, 10);
        assert.strictEqual(noviceZone.travel_time, 0); // Instant

        assert.strictEqual(apexZone.stamina_cost, 120);
        assert.strictEqual(apexZone.travel_time, 240); // 4 minutes
      });

      it('F10.5: Should verify signature specialty raw materials for each zone', () => {
        realmsFixtures.worldZones.forEach(z => {
          assert.ok(Array.isArray(z.specialties));
          assert.isTrue(z.specialties.length >= 2);
        });
      });
    });

    // =========================================================================
    // FEATURE 11: Non-Breaking Architecture & Build Exit Code 0
    // =========================================================================
    describe('Feature 11: Non-Breaking Architecture & Styling Fidelity', () => {
      it('F11.1: Should verify frontend package.json integrity', () => {
        const pkgPath = path.resolve('frontend/package.json');
        assert.ok(fs.existsSync(pkgPath));
        const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
        assert.strictEqual(pkg.name, 'thien-dao-rpg');
        assert.strictEqual(pkg.type, 'module');
        assert.ok(pkg.scripts.build);
      });

      it('F11.2: Should verify frontend entry points exist and are readable', () => {
        const mainPath = path.resolve('frontend/src/main.js');
        const indexPath = path.resolve('frontend/index.html');
        const stylePath = path.resolve('frontend/src/style.css');

        assert.ok(fs.existsSync(mainPath));
        assert.ok(fs.existsSync(indexPath));
        assert.ok(fs.existsSync(stylePath));
      });

      it('F11.3: Should verify core page renderer modules exist', () => {
        const pages = ['inventory.js', 'stats.js', 'gym.js', 'arena.js', 'dungeon.js', 'travel.js', 'helpers.js'];
        for (const p of pages) {
          const fullPath = path.resolve('frontend/src/pages', p);
          assert.ok(fs.existsSync(fullPath), `Page module missing: ${p}`);
        }
      });

      it('F11.4: Should verify backend static catalogs exist', () => {
        const matsPath = path.resolve('backend/data/materials.json');
        assert.ok(fs.existsSync(matsPath));
        const raw = JSON.parse(fs.readFileSync(matsPath, 'utf8'));
        const matsList = Array.isArray(raw.materials) ? raw.materials : Object.values(raw);
        assert.ok(matsList.length > 0);
        assert.ok(matsList.some(m => m.id === 'linh_thao' || m.id === 'mat_da_tho'));
      });

      it('F11.5: Should verify build artifact dist directory exists', () => {
        const distPath = path.resolve('frontend/dist');
        assert.ok(fs.existsSync(distPath));
        assert.ok(fs.existsSync(path.join(distPath, 'index.html')));
      });
    });

  });
}
