import { it, expect } from "./fixtures";

const acsFrameUrl = /.*gentle-pond-06daa3a1e.azurestaticapps.net.*/;

it("loads the app", async ({ page, isMobile }) => {
  await page.goto(process.env.APP_URL);
  const title = await page.title();
  expect(title).toBe("Sunrise Standup");
});

it("clicks on go live button", async ({ page, isMobile }) => {
  await Promise.all([
    page.waitForResponse(acsFrameUrl),
    page.goto(process.env.APP_URL)
  ]);

  if (isMobile) {
    await page.click('button#burger');
  }

  await page.click('"Go Live"');
  await page.waitForSelector('.frame');
  const acsFrame = page.frame({ url: /.*gentle-pond-06daa3a1e.azurestaticapps.net.*/ });
  await acsFrame.waitForSelector('input[placeholder="Enter your name"]');
});
