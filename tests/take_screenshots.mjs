import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const artifactDir = 'C:\\Users\\phong.vo\\.gemini\\antigravity\\brain\\8af4ba60-abcf-430d-af59-a4ca626401be';
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const pagesToCapture = [
  { name: 'ui_inventory', url: 'http://localhost:3000/?page=inventory', desc: 'Càn Khôn Túi & Kho Nguyên Liệu' },
  { name: 'ui_stats', url: 'http://localhost:3000/?page=stats', desc: 'Rèn Luyện & Phòng Thủ Chuẩn MDG' },
  { name: 'ui_arena', url: 'http://localhost:3000/?page=arena', desc: 'Luận Đạo Đấu Trường (Card-style ELO & Streaks)' },
  { name: 'ui_dungeon', url: 'http://localhost:3000/?page=dungeon', desc: 'Bí Cảnh Huyễn Cảnh & Thượng Cổ Cấm Địa' },
  { name: 'ui_travel', url: 'http://localhost:3000/?page=travel', desc: 'Ngao Du Bát Hoang 2D Map' },
  { name: 'ui_alchemy', url: 'http://localhost:3000/?page=alchemy', desc: 'Lò Tạo Hóa & Luyện Đan Đúc Khí' },
  { name: 'ui_housing', url: 'http://localhost:3000/?page=housing', desc: 'Động Phủ Tu Tiên & Dược Viên' },
];

async function capture() {
  console.log('Launching Chrome browser...');
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
      '--window-size=1366,768'
    ],
    defaultViewport: { width: 1366, height: 768 }
  });

  const page = await browser.newPage();

  // First visit to ensure dev auto-login completes and token/player is set
  console.log('Navigating to root to initialize state...');
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2', timeout: 15000 });
  await new Promise(r => setTimeout(r, 2000));

  for (const item of pagesToCapture) {
    console.log(`Capturing ${item.name} (${item.desc})...`);
    await page.goto(item.url, { waitUntil: 'networkidle2', timeout: 15000 });
    await new Promise(r => setTimeout(r, 1500));

    const outPath = path.join(artifactDir, `${item.name}.png`);
    await page.screenshot({ path: outPath, fullPage: false });
    console.log(`Saved screenshot to: ${outPath}`);

    // If inventory, also click "Kho Nguyên Liệu" tab and capture
    if (item.name === 'ui_inventory') {
      try {
        await page.evaluate(() => {
          const btn = Array.from(document.querySelectorAll('#invTabsContainer button, .tabs button, button'))
            .find(b => b.textContent.toLowerCase().includes('nguyên liệu'));
          if (btn) {
            btn.click();
          } else {
            console.error('Could not find nguyên liệu tab button');
          }
        });
        await new Promise(r => setTimeout(r, 1200));
        const matPath = path.join(artifactDir, 'ui_inventory_materials.png');
        await page.screenshot({ path: matPath, fullPage: false });
        console.log(`Saved screenshot to: ${matPath}`);
      } catch (e) {
        console.log('Could not capture materials tab:', e.message);
      }
    }

    // If alchemy, also click "Cường Hóa" tab and capture
    if (item.name === 'ui_alchemy') {
      try {
        await page.evaluate(() => {
          const btn = Array.from(document.querySelectorAll('.tabs button, button'))
            .find(b => b.textContent.toLowerCase().includes('cường hóa'));
          if (btn) {
            btn.click();
          } else {
            console.error('Could not find cường hóa tab button');
          }
        });
        await new Promise(r => setTimeout(r, 1200));
        const enhPath = path.join(artifactDir, 'ui_alchemy_enhance.png');
        await page.screenshot({ path: enhPath, fullPage: false });
        console.log(`Saved screenshot to: ${enhPath}`);
      } catch (e) {
        console.log('Could not capture enhance tab:', e.message);
      }
    }

    // If housing, also click "Dược Viên" and "Hộ Phủ Trận Pháp" tabs and capture
    if (item.name === 'ui_housing') {
      try {
        await page.evaluate(() => {
          const btn = Array.from(document.querySelectorAll('#housingTabsNav button, .tab-btn'))
            .find(b => b.textContent.toLowerCase().includes('dược viên'));
          if (btn) btn.click();
        });
        await new Promise(r => setTimeout(r, 1200));
        const gardenPath = path.join(artifactDir, 'ui_housing_garden.png');
        await page.screenshot({ path: gardenPath, fullPage: false });
        console.log(`Saved screenshot to: ${gardenPath}`);

        await page.evaluate(() => {
          const btn = Array.from(document.querySelectorAll('#housingTabsNav button, .tab-btn'))
            .find(b => b.textContent.toLowerCase().includes('trận pháp'));
          if (btn) btn.click();
        });
        await new Promise(r => setTimeout(r, 1200));
        const formPath = path.join(artifactDir, 'ui_housing_formations.png');
        await page.screenshot({ path: formPath, fullPage: false });
        console.log(`Saved screenshot to: ${formPath}`);
      } catch (e) {
        console.log('Could not capture housing subtabs:', e.message);
      }
    }
  }

  await browser.close();
  console.log('All screenshots captured successfully!');
}

capture().catch(err => {
  console.error('Capture error:', err);
  process.exit(1);
});
