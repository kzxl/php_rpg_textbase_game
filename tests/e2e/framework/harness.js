/**
 * Simulation and Calculation Harness for Nghịch Thiên Ký E2E Test Suite
 * Conforms strictly to specifications in PROJECT.md, FORGING_SPEC, and MDG formulas.
 */

export const Harness = {
  // ==========================================
  // R1: INVENTORY, MATERIALS & ENHANCEMENT
  // ==========================================

  /**
   * Determine visual tier and CSS classes for equipment enhancement (+1 to +12)
   */
  getEnhancementVisualTier(level) {
    if (!level || level <= 0) {
      return { tier: 0, cssClass: '', badgeColor: '', risk: 'none', label: '+0' };
    }
    if (level >= 1 && level <= 3) {
      return { tier: 1, cssClass: 'enhance-glow-tier1', badgeColor: '#22c55e', risk: 'safe', label: `+${level}` };
    }
    if (level >= 4 && level <= 6) {
      return { tier: 2, cssClass: 'enhance-glow-tier2', badgeColor: '#06b6d4', risk: 'safe_fail', label: `+${level}` };
    }
    if (level >= 7 && level <= 9) {
      return { tier: 3, cssClass: 'enhance-glow-tier3', badgeColor: '#a855f7', risk: 'downgrade', label: `+${level}` };
    }
    if (level >= 10 && level <= 12) {
      return { tier: 4, cssClass: 'enhance-glow-tier4', badgeColor: '#f59e0b', risk: 'apex', label: `+${level}` };
    }
    throw new Error(`Invalid enhancement level: ${level}. Must be between 0 and 12.`);
  },

  /**
   * Calculate exact combat stat bonus from equipment enhancement level
   * Formula source: docs/FORGING_AND_ENHANCEMENT_SPEC.md §3.2
   */
  calcEnhancementStatBonus(slot, level, ilvl = 1) {
    if (!level || level <= 0) return {};
    const lvl = Math.min(12, Math.max(1, level));
    const tierMultiplier = Math.floor(ilvl / 3);

    if (slot === 'weapon') {
      const flatStrength = Math.max(4 * lvl, Math.round(lvl * 4 * tierMultiplier));
      return { strength: flatStrength, damage: flatStrength * 2 };
    }

    if (slot === 'body' || slot === 'shield' || slot === 'armor') {
      const flatDefense = Math.max(3 * lvl, Math.round(lvl * 3 * tierMultiplier));
      const flatMaxHp = lvl * 30 * Math.max(1, tierMultiplier);
      return { defense: flatDefense, maxHp: flatMaxHp };
    }

    if (slot === 'feet' || slot === 'boots') {
      const flatSpeed = Math.max(2 * lvl, Math.round(lvl * 3 * tierMultiplier));
      const flatDexterity = Math.max(1 * lvl, Math.round(flatSpeed * 0.6));
      return { speed: flatSpeed, dexterity: flatDexterity };
    }

    if (slot === 'ring' || slot === 'ring1' || slot === 'ring2' || slot === 'accessory') {
      const flatAll = Math.max(2 * lvl, Math.round(lvl * 2 * tierMultiplier));
      return { strength: flatAll, dexterity: flatAll };
    }

    return {};
  },

  /**
   * Filter player materials according to category tab
   */
  filterMaterials(playerMaterials = {}, catalog = {}, category = 'all') {
    const categoryMap = {
      'khoang_thach': ['mineral', 'ore'],
      'yeu_thu': ['beast', 'monster_part'],
      'linh_duoc': ['herb', 'plant'],
      'linh_tinh': ['spirit', 'catalyst', 'gem'],
      'da_cuong_hoa': ['enhancement_stone', 'da_cuong_hoa']
    };

    const results = [];
    for (const [matId, qty] of Object.entries(playerMaterials)) {
      if (qty <= 0) continue;
      const meta = catalog[matId] || { id: matId, name: matId, type: 'mineral', rarity: 'common' };
      const metaType = meta.type || meta.category || 'mineral';

      if (category === 'all' || category === 'tat_ca') {
        results.push({ id: matId, quantity: qty, ...meta });
      } else {
        const allowed = categoryMap[category] || [category];
        if (allowed.includes(metaType) || (category === 'da_cuong_hoa' && matId === 'da_cuong_hoa')) {
          results.push({ id: matId, quantity: qty, ...meta });
        }
      }
    }
    return results;
  },

  /**
   * Calculate stat comparison delta between two items of the same slot
   */
  compareEquipment(newItem, currentEquippedItem = null) {
    if (!newItem && !currentEquippedItem) return {};

    const extractStats = (item) => {
      if (!item) return { strength: 0, defense: 0, speed: 0, dexterity: 0, maxHp: 0, capacity: 0 };
      const stats = { strength: 0, defense: 0, speed: 0, dexterity: 0, maxHp: 0, capacity: 0 };
      (item.affixes || []).forEach(a => {
        if (a.stat && typeof a.value === 'number') {
          stats[a.stat] = (stats[a.stat] || 0) + a.value;
        }
      });
      // Add enhancement bonuses if any
      const enhanceBonus = Harness.calcEnhancementStatBonus(item.slot, item.enhanceLevel, item.itemLevel);
      for (const [s, val] of Object.entries(enhanceBonus)) {
        stats[s] = (stats[s] || 0) + val;
      }
      return stats;
    };

    const newStats = extractStats(newItem);
    const currStats = extractStats(currentEquippedItem);

    const delta = {};
    const allKeys = new Set([...Object.keys(newStats), ...Object.keys(currStats)]);
    for (const key of allKeys) {
      const diff = (newStats[key] || 0) - (currStats[key] || 0);
      delta[key] = {
        diff,
        formatted: diff > 0 ? `▲ +${diff}` : diff < 0 ? `▼ ${diff}` : `= 0`,
        isPositive: diff > 0,
        isNegative: diff < 0
      };
    }
    return delta;
  },

  // ==========================================
  // R2: CULTIVATION & STATS
  // ==========================================

  /**
   * Physical Gym Training simulation
   * Strictly consumes Thể Lực (currentStamina), NOT Linh Lực (currentEnergy)
   */
  simulateGymTrain(player, stat, count = 1) {
    const staminaCostPerUnit = 5;
    const totalCost = staminaCostPerUnit * count;

    if (player.hospitalRemaining && player.hospitalRemaining > 0) {
      throw new Error(`Đang tịnh dưỡng (${player.hospitalRemaining}s), không thể rèn luyện!`);
    }

    const currentStamina = player.currentStamina ?? 100;
    if (currentStamina < totalCost) {
      throw new Error(`Không đủ Thể Lực để rèn luyện! Cần ${totalCost} Thể Lực, hiện có ${currentStamina}.`);
    }

    const allowedStats = ['strength', 'speed', 'dexterity', 'defense'];
    if (!allowedStats.includes(stat)) {
      throw new Error(`Invalid training stat: ${stat}`);
    }

    const initialEnergy = player.currentEnergy;
    const talentObj = player.talentDisplay?.[stat] || { value: 1.0 };
    const effectiveGain = Math.round(count * talentObj.value);

    // Apply mutation on cloned state to ensure pure simulation
    const updated = JSON.parse(JSON.stringify(player));
    updated.currentStamina = currentStamina - totalCost;
    if (!updated.stats) updated.stats = {};
    updated.stats[stat] = (updated.stats[stat] || 0) + effectiveGain;
    if (!updated.allocatedStats) updated.allocatedStats = {};
    updated.allocatedStats[stat] = (updated.allocatedStats[stat] || 0) + count;

    return {
      updatedPlayer: updated,
      effectiveGain,
      staminaUsed: totalCost,
      energyDepleted: initialEnergy - updated.currentEnergy // Must be 0!
    };
  },

  /**
   * MDG Physical Armor Mitigation Curve
   * Formula: min(85.0, round((defense / (defense + 5.0 * rawDamage)) * 100, 2))
   */
  calcArmorMitigation(defense, rawDamage) {
    if (defense <= 0) return 0.0;
    const effectiveDmg = Math.max(8.0, rawDamage);
    const denominator = defense + 5.0 * effectiveDmg;
    const pct = (defense / denominator) * 100;
    const rounded = Math.round(pct * 100) / 100;
    return Math.min(85.0, rounded);
  },

  /**
   * MDG Evasion Dexterity Probability
   * Formula: min(35.0, round((dexterity / (dexterity + 2.5 * enemySpeed)) * 100, 2))
   */
  calcEvasionChance(dexterity, enemySpeed) {
    if (dexterity <= 0) return 0.0;
    const effectiveSpeed = Math.max(1.0, enemySpeed);
    const denominator = dexterity + 2.5 * effectiveSpeed;
    const pct = (dexterity / denominator) * 100;
    const rounded = Math.round(pct * 100) / 100;
    return Math.min(35.0, rounded);
  },

  /**
   * Cultivation Breakthrough Readiness Evaluator
   */
  evaluateBreakthrough(player, nextRealmRequirement) {
    const curLevel = player.level || 1;
    const reqLevel = nextRealmRequirement.levelMin || 10;
    const goldCost = nextRealmRequirement.cost?.gold || 0;
    const energyCost = nextRealmRequirement.cost?.energy || 0;

    const levelSatisfied = curLevel >= reqLevel;
    const goldSatisfied = (player.gold || 0) >= goldCost;
    const energySatisfied = (player.currentEnergy || 0) >= energyCost;
    const isWounded = (player.currentHp || 0) < (player.stats?.maxHp || player.maxHp || 100);

    const qiShieldHp = (player.usableEnergy || player.currentEnergy || 0) * 2.5;

    const canBreakthrough = levelSatisfied && goldSatisfied && energySatisfied && !player.hospitalRemaining;

    return {
      canBreakthrough,
      levelSatisfied,
      goldSatisfied,
      energySatisfied,
      isWounded,
      qiShieldHp,
      readinessScore: (levelSatisfied ? 40 : 0) + (goldSatisfied ? 20 : 0) + (energySatisfied ? 20 : 0) + (!isWounded ? 20 : 0)
    };
  },

  // ==========================================
  // R3: LUẬN ĐẠO ĐẤU TRƯỜNG (PVP ARENA)
  // ==========================================

  /**
   * Standard Elo win probability calculation
   * Formula: round(1 / (1 + 10 ** ((oppRating - myRating) / 400)) * 100, 1)
   */
  calcEloWinOdds(myRating, oppRating) {
    const exponent = (oppRating - myRating) / 400;
    const probability = 1 / (1 + Math.pow(10, exponent));
    const winPct = Math.round(probability * 1000) / 10;

    let tierLabel = '⚖️ Cân Tài';
    let badgeColor = '#f59e0b';
    if (winPct >= 65.0) {
      tierLabel = '🟢 Kèo Trên';
      badgeColor = '#22c55e';
    } else if (winPct < 45.0) {
      tierLabel = '⚠️ Kèo Dưới';
      badgeColor = '#ef4444';
    }

    return {
      winProbability: winPct,
      tierLabel,
      badgeColor,
      eloDelta: oppRating - myRating
    };
  },

  /**
   * Resolve Arena Rank Tier and Insignia from ELO rating
   */
  getArenaRankInfo(rating) {
    const r = rating ?? 1000;
    if (r < 1000) return { rankName: 'Vô Danh', icon: '🌑', color: '#666666', tier: 1 };
    if (r < 1200) return { rankName: 'Võ Sinh', icon: '🥋', color: '#5ba3cf', tier: 2 };
    if (r < 1400) return { rankName: 'Võ Sĩ', icon: '⚔️', color: '#6a8f3f', tier: 3 };
    if (r < 1600) return { rankName: 'Đấu Sĩ', icon: '🔥', color: '#d4a017', tier: 4 };
    if (r < 1800) return { rankName: 'Đấu Sư', icon: '💫', color: '#b06cff', tier: 5 };
    if (r < 2000) return { rankName: 'Á Quân', icon: '🥈', color: '#c0c0c0', tier: 6 };
    return { rankName: 'Quán Quân', icon: '👑', color: '#ff4500', tier: 7 };
  },

  /**
   * Resolve Win Streak Badge & Multiplier
   */
  getStreakInfo(streakCount) {
    const s = streakCount || 0;
    if (s >= 10) {
      return { label: `👑 Vô Địch x${s}`, cssClass: 'streak-fire-apex', eloMultiplier: 1.5, goldBonus: 100 };
    }
    if (s >= 5) {
      return { label: `🔥 Chuỗi x${s}`, cssClass: 'streak-fire-high', eloMultiplier: 1.5, goldBonus: 100 };
    }
    if (s >= 3) {
      return { label: `⚡ Chuỗi x${s}`, cssClass: 'streak-lightning', eloMultiplier: 1.0, goldBonus: 0 };
    }
    if (s > 0) {
      return { label: `${s}W`, cssClass: 'streak-basic', eloMultiplier: 1.0, goldBonus: 0 };
    }
    if (s < 0) {
      return { label: `${Math.abs(s)}L`, cssClass: 'streak-loss', eloMultiplier: 1.0, goldBonus: 0 };
    }
    return { label: '0W', cssClass: 'streak-none', eloMultiplier: 1.0, goldBonus: 0 };
  },

  // ==========================================
  // R4: NGAO DU BÁT HOANG & BÍ CẢNH
  // ==========================================

  /**
   * Secret Realm Classifier & Scaling Evaluator
   */
  evaluateSecretRealm(realm) {
    const isTimed = realm.realm_type === 'timed' || Boolean(realm.expires_at && realm.expires_at > 0);
    const diffMult = realm.difficulty_mult || realm.difficultyMult || (isTimed ? 1.2 : 2.5);

    return {
      isTimed,
      isPermanent: !isTimed,
      badgeText: isTimed ? '⏳ Huyễn Cảnh' : '🔱 Thượng Cổ Cấm Địa',
      themeColor: isTimed ? '#c084fc' : '#f87171',
      hasCuongBaoAffix: diffMult >= 2.0,
      difficultyMult: diffMult,
      isExtremeDanger: diffMult >= 2.0
    };
  },

  /**
   * Scale monster combat stats for Secret Realm Waves
   */
  scaleSecretRealmMonster(baseMonster, wave, totalWaves, difficultyMult) {
    const waveFactor = 1 + (wave - 1) * 0.15;
    const finalMult = waveFactor * difficultyMult;

    const scaled = {
      name: difficultyMult >= 2.0 ? `🔥 [Cuồng Bạo] ${baseMonster.name}` : baseMonster.name,
      hp: Math.round(baseMonster.hp * finalMult),
      strength: Math.round(baseMonster.strength * finalMult),
      speed: Math.round(baseMonster.speed * (1 + (difficultyMult - 1) * 0.35)),
      dexterity: Math.round(baseMonster.dexterity * (1 + (difficultyMult - 1) * 0.35)),
      defense: Math.round(baseMonster.defense * (1 + (difficultyMult - 1) * 0.45)),
      isBoss: wave === totalWaves
    };
    return scaled;
  }
};
