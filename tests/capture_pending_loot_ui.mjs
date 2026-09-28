import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const artifactDir = 'C:\\Users\\phong.vo\\.gemini\\antigravity\\brain\\8af4ba60-abcf-430d-af59-a4ca626401be';
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function capture() {
  console.log('Launching Chrome browser for pending loot verification...');
  const tempDir = path.join(__dirname, '.temp_chrome_user_data');
  if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    userDataDir: tempDir,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--window-size=1366,950'
    ],
    defaultViewport: { width: 1366, height: 950 }
  });

  const page = await browser.newPage();

  console.log('Navigating to root to initialize state...');
  await page.goto('http://localhost:3000/?page=combat', { waitUntil: 'networkidle2', timeout: 15000 });
  await new Promise(r => setTimeout(r, 2000));

  // 1. Trigger combat and mount CombatArenaView with full bag & pending loot
  console.log('Triggering combat to simulate pending loot with full bag...');
  await page.evaluate(async () => {
    const ctx = window.__gameCtx;
    if (!ctx) return;

    const res = await ctx.api.request('/combat/full', {
      method: 'POST',
      body: JSON.stringify({
        playerId: ctx.state.playerId,
        monsterId: 'thiet_giap_trung'
      })
    });

    // Ensure pendingLoot is present for visual test
    if (!res.pendingLoot) {
      res.pendingLoot = {
        id: 'test_legendary_sword',
        name: 'Trảm Long Tiên Kiếm',
        baseType: 'kiem_thep',
        slot: 'weapon',
        rarity: 'legendary',
        itemLevel: 105,
        category: 'weapon',
        quantity: 1,
        sellPrice: 500,
        affixes: [
          { stat: 'strength', type: 'flat', value: 88, name: 'Sắc Bén', tier: 5 },
          { stat: 'critRate', type: 'flat', value: 15, name: 'Bạo Nộ', tier: 4 }
        ]
      };
      if (res.rewards && res.rewards.lootItems) {
        res.rewards.lootItems.push({
          name: res.pendingLoot.name,
          type: 'equipment',
          rarity: 'legendary',
          color: '#f59e0b',
          icon: '🌟',
          isPending: true,
          itemData: res.pendingLoot
        });
      }
    }
    ctx.state.player = res.player;
    if (ctx.updateSidebar) ctx.updateSidebar();

    const arenaCont = document.querySelector('#combatArenaContainer');
    if (arenaCont) {
      const { CombatArenaView } = await import('/src/pages/combat/CombatArenaView.js');
      const arenaView = new CombatArenaView({
        ctx,
        combatData: res,
        player: res.player
      });
      arenaView.mount(arenaCont);
      arenaCont.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
  });

  await new Promise(r => setTimeout(r, 1200));

  // Screenshot 1: Combat Arena with Pending Loot Decision Card
  const outPath1 = path.join(artifactDir, 'ui_combat_pending_loot.png');
  await page.screenshot({ path: outPath1, fullPage: false });
  console.log(`Saved screenshot to: ${outPath1}`);

  // Click on "🔄 Bỏ Đồ Trong Túi Để Chứa" to open the swap item picker
  console.log('Opening swap picker...');
  await page.evaluate(() => {
    const btnSwap = document.querySelector('.btn-toggle-swap');
    if (btnSwap) btnSwap.click();
    const picker = document.querySelector('#swapItemPicker');
    if (picker) picker.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise(r => setTimeout(r, 1000));

  // Screenshot 2: Combat Arena with expanded Swap Item Picker
  const outPath2 = path.join(artifactDir, 'ui_combat_swap_picker.png');
  await page.screenshot({ path: outPath2, fullPage: false });
  console.log(`Saved screenshot to: ${outPath2}`);

  // Screenshot 3: Navigate to Inventory and expand first unequipped item showing "Vứt Bỏ" button
  console.log('Navigating to Inventory...');
  await page.goto('http://localhost:3000/?page=inventory', { waitUntil: 'networkidle2', timeout: 15000 });
  await new Promise(r => setTimeout(r, 2000));

  // Click on "Vũ Khí" tab to view unequipped weapons
  await page.evaluate(() => {
    const tabBtn = Array.from(document.querySelectorAll('#invTabsContainer button, .tabs button'))
      .find(b => b.textContent.includes('Vũ Khí'));
    if (tabBtn) tabBtn.click();
  });
  await new Promise(r => setTimeout(r, 1000));

  // Expand first unequipped weapon
  await page.evaluate(() => {
    const firstItem = document.querySelector('.list-item .pointer');
    if (firstItem) firstItem.click();
  });
  await new Promise(r => setTimeout(r, 1000));

  const outPath3 = path.join(artifactDir, 'ui_inventory_discard_button.png');
  await page.screenshot({ path: outPath3, fullPage: false });
  console.log(`Saved screenshot to: ${outPath3}`);

  await browser.close();
  console.log('All verification screenshots captured successfully!');
}

capture().catch(err => {
  console.error('Capture error:', err);
  process.exit(1);
});
