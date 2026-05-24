/**
 * A4海报截图脚本
 * 用法: node screenshot.js <html-path> <output-png-path>
 * 
 * 依赖: playwright (npm install playwright)
 * 输出: 1588x2246px (2x高清A4)
 */

const { chromium } = require('playwright');
const path = require('path');

async function screenshot(htmlPath, outputPath) {
  const absHtmlPath = path.resolve(htmlPath);
  const absOutputPath = path.resolve(outputPath);

  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 794, height: 1200 },
    deviceScaleFactor: 2
  });

  await page.goto(`file://${absHtmlPath}`, { waitUntil: 'networkidle' });
  await new Promise(r => setTimeout(r, 3000));

  // 测量真实内容高度
  const info = await page.evaluate(() => {
    const poster = document.querySelector('.poster');
    if (!poster) return { error: 'No .poster element found' };
    const clone = poster.cloneNode(true);
    clone.style.height = 'auto';
    clone.style.overflow = 'visible';
    poster.parentNode.appendChild(clone);
    const realHeight = clone.scrollHeight;
    poster.parentNode.removeChild(clone);
    return {
      realContentHeight: realHeight,
      a4Height: 1123,
      fits: realHeight <= 1123,
      overflow: Math.max(0, realHeight - 1123)
    };
  });

  console.log(JSON.stringify(info, null, 2));

  // 截取poster元素
  const poster = await page.$('.poster');
  if (poster) {
    await poster.screenshot({ path: absOutputPath });
    console.log(`Screenshot saved: ${absOutputPath}`);
  } else {
    console.error('Error: .poster element not found');
  }

  await browser.close();
  return info;
}

// CLI entry
const args = process.argv.slice(2);
if (args.length < 2) {
  console.error('Usage: node screenshot.js <html-path> <output-png-path>');
  process.exit(1);
}

screenshot(args[0], args[1]).catch(err => {
  console.error(err);
  process.exit(1);
});
