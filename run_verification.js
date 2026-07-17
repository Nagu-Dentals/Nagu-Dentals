const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    recordVideo: {
      dir: '/home/jules/verification/videos',
      size: { width: 1280, height: 720 }
    },
    viewport: { width: 1280, height: 720 }
  });

  const page = await context.newPage();
  const filePath = `file://${path.resolve('index.html')}`;

  console.log('Navigating to ' + filePath);
  await page.goto(filePath);
  await page.waitForTimeout(1000);

  // Scroll to about section
  console.log('Scrolling to About...');
  await page.evaluate(() => {
    document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
  });
  await page.waitForTimeout(1500);

  // Scroll to FAQ section
  console.log('Scrolling to FAQ...');
  await page.evaluate(() => {
    document.getElementById('faq').scrollIntoView({ behavior: 'smooth' });
  });
  await page.waitForTimeout(1500);

  // Interact with the FAQ accordion (Click first item)
  console.log('Clicking the first FAQ item...');
  const firstFaqBtn = page.locator('.faq-question-btn').first();
  await firstFaqBtn.click();
  await page.waitForTimeout(1500);

  // Take screenshot of FAQ section expanded
  console.log('Taking screenshot...');
  await page.screenshot({ path: '/home/jules/verification/screenshots/verification.png' });

  // Close context and browser to save video
  await context.close();
  await browser.close();
  console.log('Verification script completed successfully.');
})();
