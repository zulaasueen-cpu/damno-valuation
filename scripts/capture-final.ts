import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const outDir = process.argv[2];
if (!outDir) throw new Error("Output directory required");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function capture() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.goto("http://localhost:3000/mn", { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1200);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(outDir, "design.png"), fullPage: true });
  console.log("Captured final design");
  await browser.close();
}

capture().catch((err) => {
  console.error(err);
  process.exit(1);
});
