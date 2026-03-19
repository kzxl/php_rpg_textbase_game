/**
 * API Service – calls PHP backend
 */
const BASE_URL = '/api'

class GameAPI {
  async request(path, options = {}) {
    try {
      const res = await fetch(`${BASE_URL}${path}`, {
        headers: { 'Content-Type': 'application/json', ...options.headers },
        ...options,
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`)
      return data
    } catch (err) {
      console.error(`API Error [${path}]:`, err)
      throw err
    }
  }

  // Auth
  register(username, password, name, gender) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, password, name, gender }),
    })
  }

  login(username, password) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    })
  }

  // Player (legacy)
  createPlayer(name, gender) {
    return this.request('/player/create', {
      method: 'POST',
      body: JSON.stringify({ name, gender }),
    })
  }

  getPlayer(id) {
    return this.request(`/player/${id}`)
  }

  allocateStat(id, stat, points = 1) {
    return this.request(`/player/${id}/allocate`, {
      method: 'POST',
      body: JSON.stringify({ stat, points }),
    })
  }

  equipItem(id, itemId) {
    return this.request(`/player/${id}/equip`, {
      method: 'POST',
      body: JSON.stringify({ itemId }),
    })
  }

  learnSkill(id, skillId) {
    return this.request(`/player/${id}/learn-skill`, {
      method: 'POST',
      body: JSON.stringify({ skillId }),
    })
  }

  equipSkill(id, skillId, equip = true) {
    return this.request(`/player/${id}/equip-skill`, {
      method: 'POST',
      body: JSON.stringify({ skillId, equip }),
    })
  }

  healPlayer(id) {
    return this.request(`/player/${id}/heal`, { method: 'POST' })
  }

  useMedicine(id, medicineId) {
    return this.request(`/player/${id}/use-medicine`, {
      method: 'POST',
      body: JSON.stringify({ medicineId }),
    })
  }

  trainStat(id, stat) {
    return this.request(`/player/${id}/train`, {
      method: 'POST',
      body: JSON.stringify({ stat }),
    })
  }

  // Combat
  fullCombat(playerId, monsterId = null) {
    return this.request('/combat/full', {
      method: 'POST',
      body: JSON.stringify({ playerId, monsterId }),
    })
  }

  // Data
  getMonsters() { return this.request('/data/monsters') }
  getSkills() { return this.request('/data/skills') }
  getItems() { return this.request('/data/items') }
  getMedicines() { return this.request('/data/medicines') }
  getCrimes() { return this.request('/data/crimes') }
  getEducation() { return this.request('/data/education') }
  getExploration() { return this.request('/data/exploration') }
  getRecipes() { return this.request('/recipes') }

  // Inventory / Equipment
  equipItem(id, itemId) {
    return this.request(`/player/${id}/equip`, {
      method: 'POST', body: JSON.stringify({ itemId })
    })
  }
  useItem(id, itemId) {
    return this.request(`/player/${id}/use`, {
      method: 'POST', body: JSON.stringify({ itemId })
    })
  }
  useMedicine(id, medicineId) {
    return this.request(`/player/${id}/use-medicine`, {
      method: 'POST', body: JSON.stringify({ medicineId })
    })
  }
  generateItem(id, rarity) {
    return this.request('/items/generate', {
      method: 'POST', body: JSON.stringify({ rarity, playerId: id })
    })
  }

  // Stats / Training / Realm
  trainStat(id, stat, count = 1) {
    return this.request(`/player/${id}/train`, {
      method: 'POST', body: JSON.stringify({ stat, count })
    })
  }
  allocateStat(id, stat) {
    return this.request(`/player/${id}/allocate`, {
      method: 'POST', body: JSON.stringify({ stat })
    })
  }
  attemptBreakthrough(id) {
    return this.request(`/player/${id}/breakthrough`, { method: 'POST' })
  }
  getRealm(id) { return this.request(`/player/${id}/realm`) }

  // Crafting
  craftItem(id, recipeId) {
    return this.request(`/player/${id}/craft`, {
      method: 'POST', body: JSON.stringify({ recipeId })
    })
  }
  getCurrencies() { return this.request('/crafting/currencies') }
  applyCurrency(id, currencyId, itemId, lockAffixIndex = -1) {
    return this.request(`/player/${id}/crafting/apply`, {
      method: 'POST', body: JSON.stringify({ currencyId, itemId, lockAffixIndex })
    })
  }

  // Crimes
  commitCrime(id, crimeId) {
    return this.request(`/player/${id}/commit-crime`, {
      method: 'POST', body: JSON.stringify({ crimeId }),
    })
  }

  // Jail
  escapeJail(id) {
    return this.request(`/player/${id}/escape-jail`, { method: 'POST' })
  }
  bail(id) {
    return this.request(`/player/${id}/bail`, { method: 'POST' })
  }

  // Education
  enrollNode(id, nodeId, treeId) {
    return this.request(`/player/${id}/enroll`, {
      method: 'POST', body: JSON.stringify({ nodeId, treeId }),
    })
  }
  checkEducation(id) {
    return this.request(`/player/${id}/check-education`, { method: 'POST' })
  }

  generateItem(rarity = 'common', slot = null) {
    return this.request('/items/generate', {
      method: 'POST',
      body: JSON.stringify({ rarity, slot }),
    })
  }

  // Exploration
  explore(id) {
    return this.request(`/player/${id}/explore`, { method: 'POST' })
  }
  trackMonster(id, monsterId) {
    return this.request(`/player/${id}/track-monster`, {
      method: 'POST', body: JSON.stringify({ monsterId }),
    })
  }
  getAreaMonsters(id) {
    return this.request(`/player/${id}/area-monsters`)
  }

  // NPC & Quests
  getNpc(npcId) { return this.request(`/npc/${npcId}`) }
  getNpcs() { return this.request('/data/npcs') }
  acceptQuest(id, npcId, questId) {
    return this.request(`/player/${id}/accept-quest`, {
      method: 'POST', body: JSON.stringify({ npcId, questId }),
    })
  }
  completeQuest(id, questId) {
    return this.request(`/player/${id}/complete-quest`, {
      method: 'POST', body: JSON.stringify({ questId }),
    })
  }
  getQuests(id) { return this.request(`/player/${id}/quests`) }

  // Social (Giao Tế)
  searchPlayers(q) { return this.request(`/players/search?q=${encodeURIComponent(q)}`) }
  getRelationships(id) { return this.request(`/player/${id}/relationships`) }
  interactPlayer(id, targetId, action, amount) {
    return this.request(`/player/${id}/interact`, {
      method: 'POST', body: JSON.stringify({ targetId, action, amount }),
    })
  }
  addFriend(id, targetId) {
    return this.request(`/player/${id}/add-friend`, {
      method: 'POST', body: JSON.stringify({ targetId }),
    })
  }
  acceptFriend(id, targetId) {
    return this.request(`/player/${id}/accept-friend`, {
      method: 'POST', body: JSON.stringify({ targetId }),
    })
  }
  rejectFriend(id, targetId) {
    return this.request(`/player/${id}/reject-friend`, {
      method: 'POST', body: JSON.stringify({ targetId }),
    })
  }
  removeFriend(id, targetId) {
    return this.request(`/player/${id}/remove-friend`, {
      method: 'POST', body: JSON.stringify({ targetId }),
    })
  }
  addEnemy(id, targetId) {
    return this.request(`/player/${id}/add-enemy`, {
      method: 'POST', body: JSON.stringify({ targetId }),
    })
  }
  removeEnemy(id, targetId) {
    return this.request(`/player/${id}/remove-enemy`, {
      method: 'POST', body: JSON.stringify({ targetId }),
    })
  }

  // Chat (Giang Hồ Truyền Âm)
  getGlobalChat(afterId = 0) { return this.request(`/chat/global?afterId=${afterId}`) }
  getPrivateChat(id, withId, afterId = 0) { return this.request(`/chat/private/${id}?with=${withId}&afterId=${afterId}`) }
  getChatFriends(id) { return this.request(`/chat/friends/${id}`) }
  sendChat(senderId, channel, receiverId, message) {
    return this.request('/chat/send', {
      method: 'POST', body: JSON.stringify({ senderId, channel, receiverId, message }),
    })
  }

  // Market (Giao Dịch Đài)
  getMarketListings(type = '', sort = 'newest') {
    const params = new URLSearchParams()
    if (type) params.set('type', type)
    if (sort) params.set('sort', sort)
    return this.request(`/market?${params.toString()}`)
  }
  getMyListings(id) { return this.request(`/market/my/${id}`) }
  listForSale(sellerId, itemType, itemId, quantity, price) {
    return this.request('/market/list', {
      method: 'POST', body: JSON.stringify({ sellerId, itemType, itemId, quantity, price }),
    })
  }
  buyFromMarket(buyerId, listingId, quantity = 1) {
    return this.request('/market/buy', {
      method: 'POST', body: JSON.stringify({ buyerId, listingId, quantity }),
    })
  }
  cancelListing(sellerId, listingId) {
    return this.request('/market/cancel', {
      method: 'POST', body: JSON.stringify({ sellerId, listingId }),
    })
  }

  // Realm (Cảnh Giới)
  getRealmInfo(id) { return this.request(`/player/${id}/realm`) }
  attemptBreakthrough(id) {
    return this.request(`/player/${id}/breakthrough`, { method: 'POST' })
  }
  getAllRealms() { return this.request('/data/realms') }

  // Mugging (Cướp Đoạt)
  getMugTargets(id) { return this.request(`/player/${id}/mug-targets`) }
  mugPlayer(id, victimId) {
    return this.request(`/player/${id}/mug`, {
      method: 'POST', body: JSON.stringify({ victimId }),
    })
  }
  getMugLog(id) { return this.request(`/player/${id}/mug-log`) }

  // Dungeon (Bí Cảnh)
  getMapItems(id) { return this.request(`/player/${id}/map-items`) }
  enterDungeon(id, mapItemId) {
    return this.request(`/player/${id}/dungeon/enter`, {
      method: 'POST', body: JSON.stringify({ mapItemId }),
    })
  }
  fightDungeonWave(id) {
    return this.request(`/player/${id}/dungeon/fight`, { method: 'POST' })
  }
  abandonDungeon(id) {
    return this.request(`/player/${id}/dungeon/abandon`, { method: 'POST' })
  }
  getDungeonHistory(id) { return this.request(`/player/${id}/dungeon/history`) }

  // Housing (Động Phủ)
  getHousing(id) { return this.request(`/player/${id}/housing`) }
  buyHousing(id) {
    return this.request(`/player/${id}/housing/buy`, { method: 'POST' })
  }
  plantHerb(id, herbId, slotIndex) {
    return this.request(`/player/${id}/housing/plant`, {
      method: 'POST', body: JSON.stringify({ herbId, slotIndex }),
    })
  }
  harvestGarden(id) {
    return this.request(`/player/${id}/housing/harvest`, { method: 'POST' })
  }
  upgradeFormation(id, formationId) {
    return this.request(`/player/${id}/housing/formation`, {
      method: 'POST', body: JSON.stringify({ formationId }),
    })
  }
  payMaintenance(id) {
    return this.request(`/player/${id}/housing/maintenance`, { method: 'POST' })
  }
  listForRent(id, pricePerDay) {
    return this.request(`/player/${id}/housing/rent/list`, {
      method: 'POST', body: JSON.stringify({ pricePerDay }),
    })
  }
  getRentals() { return this.request('/housing/rentals') }
  rentRoom(id, rentalId) {
    return this.request(`/player/${id}/housing/rent/take`, {
      method: 'POST', body: JSON.stringify({ rentalId }),
    })
  }

  // Guild (Tông Môn)
  getMyGuild(id) { return this.request(`/player/${id}/guild`) }
  createGuild(id, name, tag, description) {
    return this.request(`/player/${id}/guild/create`, {
      method: 'POST', body: JSON.stringify({ name, tag, description }),
    })
  }
  contributeGuild(id, amount) {
    return this.request(`/player/${id}/guild/contribute`, {
      method: 'POST', body: JSON.stringify({ amount }),
    })
  }
  upgradeGuild(id) {
    return this.request(`/player/${id}/guild/upgrade`, { method: 'POST' })
  }
  joinGuild(id, guildId) {
    return this.request(`/player/${id}/guild/join`, {
      method: 'POST', body: JSON.stringify({ guildId }),
    })
  }
  leaveGuild(id) {
    return this.request(`/player/${id}/guild/leave`, { method: 'POST' })
  }
  listGuilds() { return this.request('/guilds') }
  payGuildUpkeep(guildId) {
    return this.request(`/guild/${guildId}/upkeep`, { method: 'POST' })
  }

  // Tribulation (Độ Kiếp)
  getTribulation(id) { return this.request(`/player/${id}/tribulation`) }
  fightTribulation(id) {
    return this.request(`/player/${id}/tribulation/fight`, { method: 'POST' })
  }

  // Currency Crafting (Tiền Tệ Chế Tác)
  getCurrencies() { return this.request('/crafting/currencies') }
  applyCurrency(id, currencyId, itemId, lockAffixIndex = -1) {
    return this.request(`/player/${id}/crafting/apply`, {
      method: 'POST', body: JSON.stringify({ currencyId, itemId, lockAffixIndex }),
    })
  }

  // NPC Shop (Thương Nhân NPC)
  getShops(id) { return this.request('/shops') }
  buyFromShop(id, shopId, itemId, quantity = 1) {
    return this.request(`/player/${id}/shop/buy`, {
      method: 'POST', body: JSON.stringify({ shopId, itemId, quantity }),
    })
  }
  getMarketTax() { return this.request('/market/tax') }

  // Player Profile (Tìm Người Chơi)
  searchPlayers(q) { return this.request(`/players/lookup?q=${encodeURIComponent(q)}`) }
  getPlayerProfile(id) { return this.request(`/player/${id}/profile`) }

  // PvP Arena
  getArena(id) { return this.request(`/player/${id}/arena`) }
  arenaFight(id) { return this.request(`/player/${id}/arena/fight`, { method: 'POST' }) }

  // Auction House
  getAuctions(q = '') { return this.request(`/auction${q ? '?q=' + encodeURIComponent(q) : ''}`) }
  getMyAuctions(id) { return this.request(`/player/${id}/auction/mine`) }
  listAuction(id, itemId, buyoutPrice, durationHours = 24) {
    return this.request(`/player/${id}/auction/list`, { method: 'POST', body: JSON.stringify({ itemId, buyoutPrice, durationHours }) })
  }
  buyAuction(id, listingId) { return this.request(`/player/${id}/auction/buy`, { method: 'POST', body: JSON.stringify({ listingId }) }) }
  cancelAuction(id, listingId) { return this.request(`/player/${id}/auction/cancel`, { method: 'POST', body: JSON.stringify({ listingId }) }) }

  // Daily Quests
  getDailyQuests(id) { return this.request(`/player/${id}/daily-quests`) }
  claimDailyQuest(id, questId) { return this.request(`/player/${id}/daily-quests/claim`, { method: 'POST', body: JSON.stringify({ questId }) }) }

  // World Boss
  getWorldBoss() { return this.request('/world-boss') }
  attackWorldBoss(id) { return this.request(`/player/${id}/world-boss/attack`, { method: 'POST' }) }

  // Gacha
  getGachaPools() { return this.request('/gacha/pools') }
  getGachaPity(id) { return this.request(`/player/${id}/gacha/pity`) }
  gachaPull(id, poolId, pulls = 1) { return this.request(`/player/${id}/gacha/pull`, { method: 'POST', body: JSON.stringify({ poolId, pulls }) }) }

  // Leaderboard
  getLeaderboard(type) { return this.request(`/leaderboard/${type}`) }

  // Time Events
  getActiveEvents() { return this.request('/events/active') }
  quickEvent(type) { return this.request(`/events/quick/${type}`, { method: 'POST' }) }
}

export const api = new GameAPI()
