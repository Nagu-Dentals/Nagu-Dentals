const { test, expect } = require('@playwright/test');

test.describe('Nagu Dental Website Rebuild Verification', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(`file://${process.cwd()}/index.html`);
    });

    test('should have the correct brand name', async ({ page }) => {
        const brand = page.locator('.brand');
        await expect(brand).toContainText('Nagu Dental');
    });

    test('should display the core metrics in about section', async ({ page }) => {
        const aboutSection = page.locator('#about');
        await aboutSection.scrollIntoViewIfNeeded();

        const statCards = aboutSection.locator('.stat-card h3');
        const texts = await statCards.allInnerTexts();

        expect(texts).toContain('12k+');
        expect(texts).toContain('4.9/5');
        expect(texts).toContain('15+');
    });

    test('should verify the services grid presence', async ({ page }) => {
        const servicesGrid = page.locator('.services-grid');
        await expect(servicesGrid).toBeVisible();

        const serviceCards = servicesGrid.locator('.service-card');
        const count = await serviceCards.count();
        expect(count).toBe(9);
    });

    test('should verify the specialists section', async ({ page }) => {
        const specialistsGrid = page.locator('.specialists-grid');
        await expect(specialistsGrid).toBeVisible();

        const specialistCards = specialistsGrid.locator('.specialist-card');
        const count = await specialistCards.count();
        expect(count).toBe(4);
    });

    test('should verify the gallery section', async ({ page }) => {
        const galleryGrid = page.locator('.gallery-grid');
        await expect(galleryGrid).toBeVisible();

        const galleryItems = galleryGrid.locator('.gallery-item');
        const count = await galleryItems.count();
        expect(count).toBe(6);
    });

    test('should verify the booking form fields', async ({ page }) => {
        await expect(page.locator('input[placeholder="Your name"]')).toBeVisible();
        await expect(page.locator('input[placeholder="+91 88619 32535"]')).toBeVisible();
        await expect(page.locator('input[placeholder="yourname@example.com"]')).toBeVisible();
        await expect(page.locator('button:has-text("Request Appointment")')).toBeVisible();
    });

    test('should verify the contact details in booking section', async ({ page }) => {
        const contactList = page.locator('.contact-list');
        await expect(contactList).toContainText('+91 88619 32535');
        await expect(contactList).toContainText('nagunadental@gmail.com');
    });

    test('should open mobile menu when clicking the mobile menu toggle', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 812 });

        const mobileToggle = page.locator('#mobileToggle');
        await expect(mobileToggle).toBeVisible();

        const nav = page.locator('#nav');
        // Check that nav-links are hidden initially (in mobile view)
        const navLinks = page.locator('.nav-links');
        await expect(navLinks).not.toBeVisible();

        await mobileToggle.click();
        await expect(nav).toHaveClass(/open/);
        await expect(navLinks).toBeVisible();

        await mobileToggle.click();
        await expect(nav).not.toHaveClass(/open/);
    });
});
