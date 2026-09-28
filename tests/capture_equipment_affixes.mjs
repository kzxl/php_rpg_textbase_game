import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const artifactDir = 'C:\\Users\\phong.vo\\.gemini\\antigravity\\brain\\8af4ba60-abcf-430d-af59-a4ca626401be';
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function capture() {
  console.log('Launching Chrome browser for equipment & talisman verification...');
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
      '--window-size=1366,850'
    ],
    defaultViewport: { width: 1366, height: 850 }
  });

  const page = await browser.newPage();

  console.log('Navigating to root to initialize state...');
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2', timeout: 15000 });
  await new Promise(r => setTimeout(r, 2000));

  // 1. Capture Inventory with expanded equipment item
  console.log('Navigating to Inventory page...');
  await page.goto('http://localhost:3000/?page=inventory', { waitUntil: 'networkidle2', timeout: 15000 });
  await new Promise(r => setTimeout(r, 1500));

  // Click on the first equipped item row header to expand details
  await page.evaluate(() => {
    const detailHeaders = Array.from(document.querySelectorAll('.equipment-view .list-item .pointer, .list-item .pointer'));
    if (detailHeaders.length > 0) {
      detailHeaders[0].click();
    }
  });
  await new Promise(r => setTimeout(r, 1000));

  const invOutPath = path.join(artifactDir, 'ui_inventory_equipment.png');
  await page.screenshot({ path: invOutPath, fullPage: false });
  console.log(`Saved screenshot to: ${invOutPath}`);

  // 2. Capture Alchemy Phù Văn tab
  console.log('Navigating to Alchemy page...');
  await page.goto('http://localhost:3000/?page=alchemy', { waitUntil: 'networkidle2', timeout: 15000 });
  await new Promise(r => setTimeout(r, 1500));

  await page.evaluate(() => {
    const phuVanBtn = Array.from(document.querySelectorAll('#alchemyTabsNav button, .tabs button, button'))
      .find(b => b.textContent.includes('Phù Văn'));
    if (phuVanBtn) phuVanBtn.click();
  });
  await new Promise(r => setTimeout(r, 1500));

  const talOutPath = path.join(artifactDir, 'ui_alchemy_talisman.png');
  await page.screenshot({ path: talOutPath, fullPage: false });
  console.log(`Saved screenshot to: ${talOutPath}`);

  await browser.close();
  console.log('Done capturing verification screenshots!');
}

capture().catch(err => {
  console.error('Capture error:', err);
  process.exit(1);
});
