import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const outDir = path.resolve(process.argv[2] || "./screenshots");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function capture() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await context.clearCookies();

  for (const option of ["a", "b", "c"]) {
    await page.goto("http://localhost:3000/mn", { waitUntil: "networkidle" });
    const label = option === "a" ? "Horizontal Parallax" : option === "b" ? "Masonry Grid" : "Sticky Split Scroll";
    await page.waitForSelector(`button:has-text("${label}")`, { timeout: 5000 });
    await page.click(`button:has-text("${label}")`);
    await page.waitForTimeout(1200);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(800);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);
    await page.screenshot({
      path: path.join(outDir, `homepage-option-${option}.png`),
      fullPage: true,
    });
    console.log(`Captured option ${option}`);
  }

  await browser.close();
}

capture().catch((err) => {
  console.error(err);
  process.exit(1);
});
