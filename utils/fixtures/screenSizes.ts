import { test as base, Page } from "@playwright/test";

type sizePages = {
  pageSmall: Page;
  pageMedium: Page;
  pageBig: Page;
};

export const test = base.extend<sizePages>({
  pageSmall: async ({ page }, use) => {
    await page.setViewportSize({ width: 300, height: 300 });
    await use(page);
  },
  pageMedium: async ({ page }, use) => {
    await page.setViewportSize({ width: 700, height: 700 });
    await use(page);
  },
  pageBig: async ({ page }, use) => {
    await page.setViewportSize({ width: 1300, height: 1300 });
    await use(page);
  },
});
export { expect } from "@playwright/test";
