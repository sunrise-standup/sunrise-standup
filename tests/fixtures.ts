import { folio as baseFolio } from '@playwright/test';
import { devices } from "playwright";

const builder = baseFolio.extend<{}, {}, { isMobile: boolean }>();

builder.isMobile.initParameter('Set to true to enable mobile emulation', false);

builder.contextOptions.override(async ({ contextOptions, isMobile, browserName }, runTest) => {
  if (isMobile) {
    const device = browserName === 'webkit' ? devices['iPhone 11'] : devices['Pixel 2'];
    await runTest({
      ...contextOptions,
      ...device
    });
  } else {
    await runTest({
      ...contextOptions,
    });
  }
});

const folio = builder.build();
export const it = folio.it;
export const expect = folio.expect;