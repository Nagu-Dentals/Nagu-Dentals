const { test } = require('@playwright/test');

test('capture rebuild screenshot', async ({ page }) => {
    await page.goto(`file://${process.cwd()}/index.html`);
    await page.setViewportSize({ width: 390, height: 844 }); // Mobile view
    // Wait for animations to settle
    await page.waitForTimeout(3000);
    await page.screenshot({ path: 'rebuild_final.png', fullPage: true });
});
