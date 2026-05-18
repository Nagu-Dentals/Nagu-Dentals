const { test, expect } = require('@playwright/test');

test.describe('NAGU Dental Website Rebuild Verification', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(`file://${process.cwd()}/index.html`);
    });

    test('should have the correct brand name and logo', async ({ page }) => {
        // Use first() to avoid strict mode violation (header vs footer)
        await expect(page.locator('header span.font-display', { hasText: 'NAGU' })).toBeVisible();
        await expect(page.locator('header img[alt="NAGU Logo"]')).toBeVisible();
    });

    test('should display the core metrics accurately', async ({ page }) => {
        // Scroll to the metrics section to trigger Intersection Observer
        const metricsRow = page.locator('#hero .grid');
        await metricsRow.scrollIntoViewIfNeeded();

        // Wait for the counters to finish animating (2 seconds duration in script.js)
        await page.waitForTimeout(3000);

        const yearsMetric = page.locator('[data-target="15"]');
        const patientsMetric = page.locator('[data-target="5000"]');
        const successMetric = page.locator('[data-target="99"]');

        await expect(yearsMetric).toContainText('15+');
        await expect(patientsMetric).toContainText('5K+');
        await expect(successMetric).toContainText('99%');
    });

    test('should have the shining aura animation class on key images', async ({ page }) => {
        const heroAura = page.locator('#hero .shining-border-container');
        await expect(heroAura).toBeVisible();

        const infraAuras = page.locator('#infrastructure .shining-border-container');
        const count = await infraAuras.count();
        expect(count).toBe(4);
    });

    test('should verify the services carousel presence', async ({ page }) => {
        const carouselTrack = page.locator('.carousel-track');
        await expect(carouselTrack).toBeVisible();

        const serviceCards = carouselTrack.locator('.w-80');
        const count = await serviceCards.count();
        expect(count).toBeGreaterThanOrEqual(8);
    });

    test('should verify the appointment form fields', async ({ page }) => {
        await expect(page.locator('input[placeholder="Jane Doe"]')).toBeVisible();
        await expect(page.locator('input[placeholder="+91 98765 43210"]')).toBeVisible();
        await expect(page.locator('button:has-text("Confirm Appointment")')).toBeVisible();
    });

    test('should verify the contact details in footer', async ({ page }) => {
        // Use footer specific locator
        const footer = page.locator('footer');
        await expect(page.locator('h3:has-text("Connect Now") + p')).toContainText('+91 88619 32535');
        await expect(page.locator('h3:has-text("Connect Now") + p + p')).toContainText('nagunadental@gmail.com');
    });

    test('should open mobile menu when clicking the mobile menu toggle', async ({ page }) => {
        // Set viewport to mobile
        await page.setViewportSize({ width: 375, height: 812 });

        const menuToggleMobile = page.locator('#menu-toggle-mobile');
        await expect(menuToggleMobile).toBeVisible();

        const mobileMenu = page.locator('#mobile-menu');
        await expect(mobileMenu).toHaveClass(/opacity-0/);

        await menuToggleMobile.click();
        await expect(mobileMenu).not.toHaveClass(/opacity-0/);

        const closeBtn = page.locator('#menu-close');
        await closeBtn.click();
        await expect(mobileMenu).toHaveClass(/opacity-0/);
    });
});
