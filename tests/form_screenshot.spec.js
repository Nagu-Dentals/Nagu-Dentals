const { test } = require('@playwright/test');

test('capture booking form screenshot', async ({ page }) => {
    await page.goto(`file://${process.cwd()}/index.html`);
    await page.setViewportSize({ width: 1280, height: 900 }); // Desktop view
    // Scroll to the booking form
    const bookingForm = page.locator('#booking');
    await bookingForm.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000); // let any animation finish
    await bookingForm.screenshot({ path: 'booking_form_screenshot.png' });
});
