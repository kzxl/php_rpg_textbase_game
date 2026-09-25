/**
 * Arena Opponents and Match Fixtures for Nghịch Thiên Ký E2E Suite
 */

export const arenaFixtures = {
  // Opponents across all 7 rank tiers
  opponents: [
    {
      player_id: 'opp_vo_danh_01',
      name: 'Mặc Vô Danh',
      level: 12,
      rating: 850,
      streak: 0,
      rank: { name: 'Vô Danh', icon: '🌑', color: '#666666', tier: 1 }
    },
    {
      player_id: 'opp_vo_sinh_02',
      name: 'Lý Sơ Học',
      level: 22,
      rating: 1120,
      streak: 2,
      rank: { name: 'Võ Sinh', icon: '🥋', color: '#5ba3cf', tier: 2 }
    },
    {
      player_id: 'opp_vo_si_03',
      name: 'Triệu Thô Bạo',
      level: 38,
      rating: 1350,
      streak: -1,
      rank: { name: 'Võ Sĩ', icon: '⚔️', color: '#6a8f3f', tier: 3 }
    },
    {
      player_id: 'opp_dau_si_04',
      name: 'Viêm Liệt Hỏa',
      level: 55,
      rating: 1540,
      streak: 4,
      rank: { name: 'Đấu Sĩ', icon: '🔥', color: '#d4a017', tier: 4 }
    },
    {
      player_id: 'opp_dau_su_05',
      name: 'Tử Nguyệt Kiếm',
      level: 78,
      rating: 1720,
      streak: 6,
      rank: { name: 'Đấu Sư', icon: '💫', color: '#b06cff', tier: 5 }
    },
    {
      player_id: 'opp_a_quan_06',
      name: 'Bạch Ngân Chiến Thần',
      level: 110,
      rating: 1910,
      streak: 8,
      rank: { name: 'Á Quân', icon: '🥈', color: '#c0c0c0', tier: 6 }
    },
    {
      player_id: 'opp_quan_quan_07',
      name: 'Thiên Đạo Vô Song',
      level: 155,
      rating: 2350,
      streak: 15,
      rank: { name: 'Quán Quân', icon: '👑', color: '#ff4500', tier: 7 }
    }
  ],

  // Sample duel combat logs stored in JSON
  sampleFightLog: [
    { turn: 1, attacker: 'player', action: 'skill', skillName: 'Thần Hành Báo Lôi', damage: 240, isCrit: true, isDodge: false, text: '⚡ [Kích Hoạt] Thần Hành Báo Lôi gây 240 ST (CHÍ MẠNG!)' },
    { turn: 1, attacker: 'opponent', action: 'attack', damage: 85, isCrit: false, isDodge: false, text: '⚔️ Đối thủ phản kích gây 85 ST' },
    { turn: 2, attacker: 'player', action: 'attack', damage: 150, isCrit: false, isDodge: false, text: '⚔️ Xuất thường công gây 150 ST' },
    { turn: 2, attacker: 'opponent', action: 'skill', damage: 0, isCrit: false, isDodge: true, text: '🎯 Bạn thi triển Thân Pháp né tránh hoàn toàn đòn đánh!' },
    { turn: 3, attacker: 'player', action: 'attack', damage: 320, isCrit: true, isDodge: false, text: '🔥 Tuyệt sát kích sát đối thủ!' }
  ]
};
