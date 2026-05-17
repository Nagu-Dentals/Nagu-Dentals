import { test, expect } from '@playwright/test';
import path from 'path';

test('verify Nagu Dental overhaul', async ({ page }) => {
  const filePath = `file://${path.resolve('index.html')}`;
  await page.goto(filePath);

  // Scroll to bottom to trigger all reveal animations
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 50);
    });
  });

  // Wait for animations to complete
  await page.waitForTimeout(2000);

  // Check Title
  await expect(page).toHaveTitle(/Nagu Dental/);

  // Check Header
  const header = page.locator('nav');
  await expect(header).toBeVisible();
  await expect(header).toContainText('NAGU DENTAL');

  // Check Hero Trust Badges
  const hero = page.locator('#home');
  await expect(hero).toContainText('98%');
  await expect(hero).toContainText('5000+');
  await expect(hero).toContainText('15+');

  // Check Services Section
  const services = page.locator('#services');
  await expect(services).toBeVisible();
  await expect(services).toContainText('Clinical Offerings');
  await expect(services).toContainText('Dental Implants');
  await expect(services).toContainText('Root Canal Treatment');
  await expect(services).toContainText('Crowns & Bridges');
  await expect(services).toContainText('Laser Whitening');
  await expect(services).toContainText('Dentures');
  await expect(services).toContainText('Tooth Extractions');
  await expect(services).toContainText('Cleaning & Polishing');

  // Check Specialization Section
  const specialties = page.locator('#specialties');
  await expect(specialties).toContainText('Areas of Specialization');
  await expect(specialties).toContainText('Complete Smile Restoration');
  await expect(specialties).toContainText('Clear Aligners');
  await expect(specialties).toContainText('Cosmetic & Aesthetic Dentistry');
  await expect(specialties).toContainText('Oral & Maxillofacial Surgery');
  await expect(specialties).toContainText('Smile Makeover & Design');

  // Check Booking Form
  const form = page.locator('#book form');
  await expect(form.locator('input[placeholder="John Doe"]')).toBeVisible();
  await expect(form.locator('input[placeholder="john@example.com"]')).toBeVisible();
  await expect(form.locator('select')).toContainText('Crowns & Bridges');
  await expect(form.locator('select')).toContainText('Invisalign aligners');
  await expect(form.locator('textarea')).toBeVisible();

  // Check Footer Timing
  const footer = page.locator('footer');
  await expect(footer).toContainText('Mon-Sat: 9:00 AM - 8:00 PM');
  await expect(footer).toContainText('Sun: 10:00 AM - 6:00 PM');

  // Screenshots
  await page.screenshot({ path: 'tests/overhaul_full.png', fullPage: true });
});
