import { test as base, Page } from "@playwright/test";

type UserGaragePage = {
  testUserPage: Page;
  adminUserPage: Page;
};

export const test = base.extend<UserGaragePage>({
  testUserPage: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: ".auth/testUser.json",
    });
    const page = await context.newPage();
    await use(page);
    await context.close();
  },

  adminUserPage: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: ".auth/adminUser.json",
    });
    const page = await context.newPage();
    await use(page);
    await context.close();
  },
});

export { expect } from "@playwright/test";
