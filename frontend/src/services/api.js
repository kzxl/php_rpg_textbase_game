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
  enrollCourse(id, courseId) {
    return this.request(`/player/${id}/enroll`, {
      method: 'POST', body: JSON.stringify({ courseId }),
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
}

export const api = new GameAPI()
