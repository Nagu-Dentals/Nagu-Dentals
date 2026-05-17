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
      }, 100);
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
  await expect(header.locator('a[href="#home"]')).toBeVisible();
  await expect(header.locator('a[href="#services"]')).toBeVisible();
  await expect(header.locator('a[href="#specialties"]')).toBeVisible();
  await expect(header.locator('a[href="#book"]').first()).toBeVisible();
  await expect(header.locator('a[href="#contact"]')).toBeVisible();

  // Check Hero CTAs
  const hero = page.locator('#home');
  await expect(hero.locator('a:has-text("Schedule an Appointment")')).toBeVisible();
  await expect(hero.locator('a:has-text("Call Clinic")')).toHaveAttribute('href', 'tel:+918861932535');

  // Check Specialty Matrix
  const specialties = page.locator('#specialties');
  await expect(specialties).toContainText('Dental Implants');
  await expect(specialties).toContainText('Root Canal Therapy');
  await expect(specialties).toContainText('Cosmetic Smile Design');

  // Check Booking Form
  const form = page.locator('#book form');
  await expect(form.locator('input[placeholder="Full Name"]')).toBeVisible();
  await expect(form.locator('input[placeholder="+91 00000 00000"]')).toBeVisible();
  await expect(form.locator('select')).toBeVisible();
  await expect(form.locator('input[value="JP Nagar"]')).toBeVisible();
  await expect(form.locator('input[value="Chandra Layout"]')).toBeVisible();
  await expect(form.locator('input[value="RR Nagar"]')).toBeVisible();

  // Check Footer
  const footer = page.locator('footer');
  await expect(footer).toBeVisible();
  await expect(footer).toContainText('JP NAGAR');
  await expect(footer).toContainText('CHANDRA LAYOUT');
  await expect(footer).toContainText('RR NAGAR');

  // Screenshots
  await page.screenshot({ path: 'tests/overhaul_full.png', fullPage: true });
  await hero.screenshot({ path: 'tests/hero.png' });
  await specialties.screenshot({ path: 'tests/specialties.png' });
  await page.locator('#book').screenshot({ path: 'tests/booking_form.png' });
});
