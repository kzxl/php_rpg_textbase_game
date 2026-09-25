import { createRequire } from 'module';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(path.join(__dirname, '../tests/dummy.js'));
const puppeteer = require('puppeteer-core');

const artifactDir = 'C:\\Users\\phong.vo\\.gemini\\antigravity\\brain\\8af4ba60-abcf-430d-af59-a4ca626401be';
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const pagesToCapture = [
  { name: 'ui_inventory', url: 'http://localhost:3000/?page=inventory', desc: 'Càn Khôn Túi & Kho Nguyên Liệu' },
  { name: 'ui_stats', url: 'http://localhost:3000/?page=stats', desc: 'Rèn Luyện & Phòng Thủ Chuẩn MDG' },
  { name: 'ui_arena', url: 'http://localhost:3000/?page=arena', desc: 'Luận Đạo Đấu Trường (Card-style ELO & Streaks)' },
  { name: 'ui_dungeon', url: 'http://localhost:3000/?page=dungeon', desc: 'Bí Cảnh Huyễn Cảnh & Thượng Cổ Cấm Địa' },
  { name: 'ui_travel', url: 'http://localhost:3000/?page=travel', desc: 'Ngao Du Bát Hoang 2D Map' },
  { name: 'ui_alchemy', url: 'http://localhost:3000/?page=alchemy', desc: 'Lò Tạo Hóa & Luyện Đan Đúc Khí' },
];

async function capture() {
  console.log('Launching Edge browser...');
  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--window-size=1366,768'],
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
  }

  await browser.close();
  console.log('All screenshots captured successfully!');
}

capture().catch(err => {
  console.error('Capture error:', err);
  process.exit(1);
});
