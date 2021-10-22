const { test, expect } = require('@playwright/test');

test('map', async ({ page }) => {

  // Go to https://www.sunrisestandup.com/
  await page.goto('https://www.sunrisestandup.com/');

  // Click text=Map
  await page.click('text=Maps');
  await expect(page).toHaveURL('https://www.sunrisestandup.com/map');

});