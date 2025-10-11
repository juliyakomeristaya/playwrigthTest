import { test, expect } from "@playwright/test";

test.describe("Sign In tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.locator('//button[contains(@class, "header_signin")]').click();
  });

  test("Successful sign in", async ({ page }) => {
    await page
      .locator('//input[@id="signinEmail"]')
      .fill("juliyakomeristaya@gmail.com");
    await page.locator('//input[@id="signinPassword"]').fill("Test12345!");
    await page
      .locator(
        '//div[contains(@class, "modal-footer")]// button[@class="btn btn-primary"]',
      )
      .click();
    await expect(page).toHaveURL("https://qauto.forstudy.space/panel/garage");
  });

  test("Sign In without email", async ({ page }) => {
    await page.locator('//input[@id="signinEmail"]').focus();
    await page.locator('//input[@id="signinEmail"]').blur();
    await expect(
      page.locator('//div[@class="invalid-feedback"]//p'),
    ).toHaveText("Email required");
  });

  test("Sign In without password", async ({ page }) => {
    await page.locator('//input[@id="signinPassword"]').focus();
    await page.locator('//input[@id="signinPassword"]').blur();
    await expect(
      page.locator('//div[@class="invalid-feedback"]//p'),
    ).toHaveText("Password required");
  });

  test('Open "Registration" form ', async ({ page }) => {
    await page.getByRole("button", { name: "Registration" }).click();
    await expect(page.locator('//h4[@class="modal-title"]')).toHaveCount(1);
    await expect(page.locator('//h4[@class="modal-title"]')).toHaveText(
      "Registration",
    );
  });

  test('Open "Restore access" form ', async ({ page }) => {
    await page.getByRole("button", { name: "Forgot password" }).click();
    await expect(page.locator('//h4[@class="modal-title"]')).toHaveCount(1);
    await expect(page.locator('//h4[@class="modal-title"]')).toHaveText(
      "Restore access",
    );
  });

  test.skip("Screenshot testing", async ({ page }) => {
    await page
      .locator('//input[@id="signinEmail"]')
      .fill("juliyakomeristaya@gmail.com");
    await page.locator('//input[@id="signinPassword"]').fill("Test12345!");
    await page
      .locator(
        '//div[contains(@class, "modal-footer")]// button[@class="btn btn-primary"]',
      )
      .click();
    await expect(page).toHaveURL("https://qauto.forstudy.space/panel/garage");

    await expect(
      page.locator('//li[@class="car-item"]').first(),
    ).toHaveScreenshot("last-added-car.png");
  });
});
