import { it, expect } from "@playwright/test";

it("loads the app", async ({ page }) => {
  await page.goto(process.env.APP_URL);
  const title = await page.title();
  expect(title).toBe("Sunrise Standup");
});
