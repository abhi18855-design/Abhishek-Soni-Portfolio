import { test, expect } from '@playwright/test';
const sizes = [[1440,900],[1280,800],[1024,768],[768,1024],[430,932],[390,844]];
for (const [width,height] of sizes) {
  test(`layout and browsing at ${width}x${height}`, async ({ page }) => {
    const errors: string[] = []; page.on('pageerror', error => errors.push(error.message));
    await page.setViewportSize({width,height}); await page.goto('./');
    await expect(page.getByRole('heading',{name:'ABHISHEK SONI'})).toBeVisible();
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.locator('#work').scrollIntoViewIfNeeded();
    await page.getByRole('button',{name:'Next project',exact:true}).click();
    await expect(page.locator('.carousel-controls [aria-live]')).toHaveText('02 — 06');
    await page.getByRole('button',{name:'Previous project',exact:true}).click();
    await expect(page.locator('.carousel-controls [aria-live]')).toHaveText('01 — 06');
    await page.getByRole('button',{name:'PROJECT INDEX'}).click(); await page.locator('#project-index button').nth(5).click();
    await expect(page.locator('.carousel-controls [aria-live]')).toHaveText('06 — 06');
    await page.locator('.project-track').focus(); await page.keyboard.press('ArrowRight');
    await expect(page.locator('.carousel-controls [aria-live]')).toHaveText('01 — 06');
    await page.locator('.project-card').first().getByRole('link',{name:'VIEW PROJECT ↗',exact:true}).click();
    await expect(page).toHaveURL(/#\/project\/tissot-time-refined/); await expect(page.locator('.detail h1')).toContainText('TISSOT');
    await page.reload(); await expect(page.locator('.detail h1')).toContainText('TISSOT'); expect(errors).toEqual([]);
  });
}
test('mobile menu, skills, invalid route, reduced motion',async({page})=>{
  await page.setViewportSize({width:390,height:844}); await page.emulateMedia({reducedMotion:'reduce'}); await page.goto('./');
  await expect(page.locator('.custom-cursor')).toHaveCount(0); await expect(page.locator('.hero-scene canvas')).toHaveCount(0);
  await page.getByRole('button',{name:'MENU +'}).click(); await expect(page.locator('#mobile-menu')).toBeVisible();
  await page.keyboard.press('Escape'); await expect(page.locator('#mobile-menu')).toHaveCount(0);
  await page.getByRole('button',{name:'MENU +'}).click(); await page.getByRole('navigation',{name:'Mobile navigation'}).getByRole('link',{name:'About'}).click();
  await expect(page.locator('#mobile-menu')).toHaveCount(0); await page.getByRole('tab',{name:'AI',exact:true}).click(); await expect(page.getByRole('tabpanel')).toContainText('Generative Video');
  await page.goto('./#/project/missing'); await expect(page.getByRole('heading',{name:'This story isn’t here.'})).toBeVisible();
});
