// Full-page screenshots of every page at mobile, tablet and desktop widths.
// Usage: node scripts/screenshots.mjs [baseUrl]   (default http://localhost:3000)
// Uses the locally installed Google Chrome, so no browser download is needed.
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const baseUrl = process.argv[2] ?? "http://localhost:3000";
const outDir = new URL("../screenshots/", import.meta.url);
const pages = ["/", "/about", "/menu", "/gallery", "/contact"];
const widths = [
  { name: "375", width: 375, height: 812 },
  { name: "768", width: 768, height: 1024 },
  { name: "1440", width: 1440, height: 900 },
];

await mkdir(outDir, { recursive: true });
const browser = await chromium.launch({ channel: "chrome" });
const problems = [];

for (const vp of widths) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  page.on("console", (msg) => {
    if (msg.type() === "error") problems.push(`[${vp.name}] console: ${msg.text()}`);
  });
  page.on("pageerror", (err) => problems.push(`[${vp.name}] pageerror: ${err.message}`));

  for (const path of pages) {
    await page.goto(baseUrl + path, { waitUntil: "load", timeout: 60_000 });
    // Scroll through so lazy images load, then return to the top.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 500) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 120));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForLoadState("networkidle", { timeout: 30_000 }).catch(() => {});
    await page.waitForFunction(() => [...document.images].every((img) => img.complete), null, { timeout: 30_000 }).catch(() =>
      problems.push(`[${vp.name}] ${path} some images did not finish loading`),
    );

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    if (overflow > 0) problems.push(`[${vp.name}] ${path} overflows horizontally by ${overflow}px`);

    const file = `${path === "/" ? "home" : path.slice(1)}-${vp.name}.png`;
    await page.screenshot({ path: fileURLToPath(new URL(file, outDir)), fullPage: true });
    console.log("saved", file);
  }
  await context.close();
}

await browser.close();
console.log(problems.length ? `\nProblems:\n${problems.join("\n")}` : "\nNo console errors or horizontal overflow.");
