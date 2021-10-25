const { test, expect } = require('@playwright/test');

test('map', async ({ page }) => {

  // Go to https://www.sunrisestandup.com/
  await page.goto('http://localhost:3000/');

  // Click text=Map
  await page.click('text=Map');
  await expect(page).toHaveURL('http://localhost:3000/map');

});