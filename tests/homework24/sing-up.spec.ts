import { test, expect } from "@playwright/test";
import { validData } from "./data/data.json";

test.describe("Sign Up tests", () => {
  let email = `${validData.emailPrefix}+${Date.now()}${validData.emailDomain}`;

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page
      .locator(
        '//button[contains(@class, "hero-descriptor_btn btn btn-primary")]',
      )
      .click();
  });

  test("Successful sign up", async ({ page }) => {
    await page.locator('//input[@id="signupName"]').fill(validData.name);
    await page
      .locator('//input[@id="signupLastName"]')
      .fill(validData.lastName);
    await page.locator('//input[@id="signupEmail"]').fill(email);
    await page
      .locator('//input[@id="signupPassword"]')
      .fill(validData.password);
    await page
      .locator('//input[@id="signupRepeatPassword"]')
      .fill(validData.repeatPassword);
    await expect(
      page.locator(
        '//div[contains(@class, "modal-footer")]// button[@class="btn btn-primary"]',
      ),
    ).toBeEnabled();
    await page
      .locator(
        '//div[contains(@class, "modal-footer")]// button[@class="btn btn-primary"]',
      )
      .click();
    await expect(page).toHaveURL("https://qauto.forstudy.space/panel/garage");
  });

  test("User already exists", async ({ page }) => {
    await page.locator('//input[@id="signupName"]').fill(validData.name);
    await page
      .locator('//input[@id="signupLastName"]')
      .fill(validData.lastName);
    await page.locator('//input[@id="signupEmail"]').fill(email);
    await page
      .locator('//input[@id="signupPassword"]')
      .fill(validData.password);
    await page
      .locator('//input[@id="signupRepeatPassword"]')
      .fill(validData.repeatPassword);
    await page
      .locator(
        '//div[contains(@class, "modal-footer")]// button[@class="btn btn-primary"]',
      )
      .click();
    await expect(page.locator('//p[@class="alert alert-danger"]')).toHaveText(
      "User already exists",
    );
    await expect(
      page.locator(
        '//div[contains(@class, "modal-footer")]// button[@class="btn btn-primary"]',
      ),
    ).toBeEnabled();
  });

  test("Sign up modal titles", async ({ page }) => {
    await expect(
      page.locator('//h4[contains(@class, "modal-title")]'),
    ).toHaveText("Registration");
    await expect(
      page.locator('//button[contains(@aria-label, "Close")]'),
    ).toBeEnabled();
    await expect(
      page.locator('(//label[contains(@for, "signupEmail")])[position() = 1]'),
    ).toHaveText("Name");
    await expect(
      page.locator('(//label[contains(@for, "signupEmail")])[position() = 2]'),
    ).toHaveText("Last name");
    await expect(
      page.locator('(//label[contains(@for, "signupEmail")])[position() = 3]'),
    ).toHaveText("Email");
    await expect(page.locator('//label[@for="signupPassword"]')).toHaveText(
      "Password",
    );
    await expect(
      page.locator('//label[@for="signupRepeatPassword"]'),
    ).toHaveText("Re-enter password");
    await expect(
      page.locator(
        '//div[contains(@class, "modal-footer")]// button[@class="btn btn-primary"]',
      ),
    ).toBeDisabled();
  });

  test.describe("Validation tests email", () => {
    test("Sign Up without email", async ({ page }) => {
      await page.locator('//input[@id="signupEmail"]').focus();
      await page.locator('//input[@id="signupEmail"]').blur();
      const locatorError = page.locator('//div[@class="invalid-feedback"]//p');
      await expect(locatorError).toHaveText("Email required");
      await expect(locatorError).toHaveCSS("color", "rgb(220, 53, 69)");
      const locatorInput = page.locator('//input[@id="signupEmail"]');
      await expect(locatorInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
      await expect(
        page.locator(
          '//div[contains(@class, "modal-footer")]// button[@class="btn btn-primary"]',
        ),
      ).toBeDisabled();
    });

    test("Sign Up with invalid email (only one character)", async ({
      page,
    }) => {
      await page.locator('//input[@id="signupEmail"]').fill("r");
      await page.locator('//input[@id="signupEmail"]').blur();
      const locatorError = page.locator('//div[@class="invalid-feedback"]//p');
      await expect(locatorError).toHaveText("Email is incorrect");
      await expect(locatorError).toHaveCSS("color", "rgb(220, 53, 69)");
      const locatorInput = page.locator('//input[@id="signupEmail"]');
      await expect(locatorInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
      await expect(
        page.locator(
          '//div[contains(@class, "modal-footer")]// button[@class="btn btn-primary"]',
        ),
      ).toBeDisabled();
    });

    test("Sign Up with invalid email (more than 257 character)", async ({
      page,
    }) => {
      await page
        .locator('//input[@id="signupEmail"]')
        .fill(
          "symbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbol@gmailcomolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbol",
        );
      await page.locator('//input[@id="signupEmail"]').blur();
      const locatorError = page.locator('//div[@class="invalid-feedback"]//p');
      await expect(locatorError).toHaveText("Email is incorrect");
      await expect(locatorError).toHaveCSS("color", "rgb(220, 53, 69)");
      const locatorInput = page.locator('//input[@id="signupEmail"]');
      await expect(locatorInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
      await expect(
        page.locator(
          '//div[contains(@class, "modal-footer")]// button[@class="btn btn-primary"]',
        ),
      ).toBeDisabled();
    });

    test("Sign Up with invalid email (only text)", async ({ page }) => {
      await page.locator('//input[@id="signupEmail"]').fill("test");
      await page.locator('//input[@id="signupEmail"]').blur();
      const locatorError = page.locator('//div[@class="invalid-feedback"]//p');
      await expect(locatorError).toHaveText("Email is incorrect");
      await expect(locatorError).toHaveCSS("color", "rgb(220, 53, 69)");
      const locatorInput = page.locator('//input[@id="signupEmail"]');
      await expect(locatorInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
      await expect(
        page.locator(
          '//div[contains(@class, "modal-footer")]// button[@class="btn btn-primary"]',
        ),
      ).toBeDisabled();
    });

    test("Sign Up with invalid email (only text without domain)", async ({
      page,
    }) => {
      await page.locator('//input[@id="signupEmail"]').fill("test@test");
      await page.locator('//input[@id="signupEmail"]').blur();
      const locatorError = page.locator('//div[@class="invalid-feedback"]//p');
      await expect(locatorError).toHaveText("Email is incorrect");
      await expect(locatorError).toHaveCSS("color", "rgb(220, 53, 69)");
      const locatorInput = page.locator('//input[@id="signupEmail"]');
      await expect(locatorInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
      await expect(
        page.locator(
          '//div[contains(@class, "modal-footer")]// button[@class="btn btn-primary"]',
        ),
      ).toBeDisabled();
    });
    test("Sign Up with valid email (other fields are not filled)", async ({
      page,
    }) => {
      await page.locator('//input[@id="signupEmail"]').fill("test@gmail.com");
      await page.locator('//input[@id="signupEmail"]').blur();
      const locatorInput = page.locator('//input[@id="signupEmail"]');
      await expect(locatorInput).toHaveCSS(
        "border-color",
        "rgb(206, 212, 218)",
      );
      await expect(
        page.locator(
          '//div[contains(@class, "modal-footer")]// button[@class="btn btn-primary"]',
        ),
      ).toBeDisabled();
    });
  });

  test.describe("Validation tests name", () => {
    test("Sign Up without name", async ({ page }) => {
      await page.locator('//input[@id="signupName"]').focus();
      await page.locator('//input[@id="signupName"]').blur();
      const locatorError = page.locator('//div[@class="invalid-feedback"]//p');
      await expect(locatorError).toHaveText("Name required");
      await expect(locatorError).toHaveCSS("color", "rgb(220, 53, 69)");
      const locatorInput = page.locator('//input[@id="signupName"]');
      await expect(locatorInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
    });

    test("Sign Up with invalid name 1 character", async ({ page }) => {
      await page.locator('//input[@id="signupName"]').fill("t");
      await page.locator('//input[@id="signupName"]').blur();
      const locatorError = page.locator('//div[@class="invalid-feedback"]//p');
      await expect(locatorError).toHaveText(
        "Name has to be from 2 to 20 characters long",
      );
      await expect(locatorError).toHaveCSS("color", "rgb(220, 53, 69)");
      const locatorInput = page.locator('//input[@id="signupName"]');
      await expect(locatorInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
      await expect(
        page.locator(
          '//div[contains(@class, "modal-footer")]// button[@class="btn btn-primary"]',
        ),
      ).toBeDisabled();
    });
    test("Sign Up with invalid name 21 characters", async ({ page }) => {
      await page
        .locator('//input[@id="signupName"]')
        .fill("tqwertyuiopasdfghjklq");
      await page.locator('//input[@id="signupName"]').blur();
      const locatorError = page.locator('//div[@class="invalid-feedback"]//p');
      await expect(locatorError).toHaveText(
        "Name has to be from 2 to 20 characters long",
      );
      await expect(locatorError).toHaveCSS("color", "rgb(220, 53, 69)");
      const locatorInput = page.locator('//input[@id="signupName"]');
      await expect(locatorInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
      await expect(
        page.locator(
          '//div[contains(@class, "modal-footer")]// button[@class="btn btn-primary"]',
        ),
      ).toBeDisabled();
    });
    test("Sign Up with invalid name (with spaces)", async ({ page }) => {
      await page.locator('//input[@id="signupName"]').fill(" tq ");
      await page.locator('//input[@id="signupName"]').blur();
      const locatorError = page.locator('//div[@class="invalid-feedback"]//p');
      await expect(locatorError).toHaveText("Name is invalid");
      await expect(locatorError).toHaveCSS("color", "rgb(220, 53, 69)");
      const locatorInput = page.locator('//input[@id="signupName"]');
      await expect(locatorInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
      await expect(
        page.locator(
          '//div[contains(@class, "modal-footer")]// button[@class="btn btn-primary"]',
        ),
      ).toBeDisabled();
    });
    test("Sign Up with invalid name (only symbols and numbers)", async ({
      page,
    }) => {
      await page.locator('//input[@id="signupName"]').fill("123!@#$%^&*()");
      await page.locator('//input[@id="signupName"]').blur();
      const locatorError = page.locator('//div[@class="invalid-feedback"]//p');
      await expect(locatorError).toHaveText("Name is invalid");
      await expect(locatorError).toHaveCSS("color", "rgb(220, 53, 69)");
      const locatorInput = page.locator('//input[@id="signupName"]');
      await expect(locatorInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
      await expect(
        page.locator(
          '//div[contains(@class, "modal-footer")]// button[@class="btn btn-primary"]',
        ),
      ).toBeDisabled();
    });
    test("Sign Up with valid name (other fields are not filled)", async ({
      page,
    }) => {
      await page.locator('//input[@id="signupName"]').fill("Yuliya");
      await page.locator('//input[@id="signupName"]').blur();
      const locatorInput = page.locator('//input[@id="signupName"]');
      await expect(locatorInput).toHaveCSS(
        "border-color",
        "rgb(206, 212, 218)",
      );
      await expect(
        page.locator(
          '//div[contains(@class, "modal-footer")]// button[@class="btn btn-primary"]',
        ),
      ).toBeDisabled();
    });
  });

  test.describe("Validation tests last name", () => {
    test("Sign Up without last name", async ({ page }) => {
      await page.locator('//input[@id="signupLastName"]').focus();
      await page.locator('//input[@id="signupLastName"]').blur();
      const locatorError = page.locator('//div[@class="invalid-feedback"]//p');
      await expect(locatorError).toHaveText("Last name required");
      await expect(locatorError).toHaveCSS("color", "rgb(220, 53, 69)");
      const locatorInput = page.locator('//input[@id="signupLastName"]');
      await expect(locatorInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
      await expect(
        page.locator(
          '//div[contains(@class, "modal-footer")]// button[@class="btn btn-primary"]',
        ),
      ).toBeDisabled();
    });

    test("Sign Up with invalid last name 1 character", async ({ page }) => {
      await page.locator('//input[@id="signupLastName"]').fill("t");
      await page.locator('//input[@id="signupLastName"]').blur();
      const locatorError = page.locator('//div[@class="invalid-feedback"]//p');
      await expect(locatorError).toHaveText(
        "Last name has to be from 2 to 20 characters long",
      );
      await expect(locatorError).toHaveCSS("color", "rgb(220, 53, 69)");
      const locatorInput = page.locator('//input[@id="signupLastName"]');
      await expect(locatorInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
      await expect(
        page.locator(
          '//div[contains(@class, "modal-footer")]// button[@class="btn btn-primary"]',
        ),
      ).toBeDisabled();
    });
    test("Sign Up with invalid last name 21 characters", async ({ page }) => {
      await page
        .locator('//input[@id="signupLastName"]')
        .fill("tqwertyuiopasdfghjklq");
      await page.locator('//input[@id="signupLastName"]').blur();
      const locatorError = page.locator('//div[@class="invalid-feedback"]//p');
      await expect(locatorError).toHaveText(
        "Last name has to be from 2 to 20 characters long",
      );
      await expect(locatorError).toHaveCSS("color", "rgb(220, 53, 69)");
      const locatorInput = page.locator('//input[@id="signupLastName"]');
      await expect(locatorInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
      await expect(
        page.locator(
          '//div[contains(@class, "modal-footer")]// button[@class="btn btn-primary"]',
        ),
      ).toBeDisabled();
    });
    test("Sign Up with invalid last name (with spaces)", async ({ page }) => {
      await page.locator('//input[@id="signupLastName"]').fill(" FF ");
      await page.locator('//input[@id="signupLastName"]').blur();
      const locatorError = page.locator('//div[@class="invalid-feedback"]//p');
      await expect(locatorError).toHaveText("Last name is invalid");
      await expect(locatorError).toHaveCSS("color", "rgb(220, 53, 69)");
      const locatorInput = page.locator('//input[@id="signupLastName"]');
      await expect(locatorInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
      await expect(
        page.locator(
          '//div[contains(@class, "modal-footer")]// button[@class="btn btn-primary"]',
        ),
      ).toBeDisabled();
    });
    test("Sign Up with invalid last name (only symbols and numbers)", async ({
      page,
    }) => {
      await page.locator('//input[@id="signupLastName"]').fill("123!@#$%^&*()");
      await page.locator('//input[@id="signupLastName"]').blur();
      const locatorError = page.locator('//div[@class="invalid-feedback"]//p');
      await expect(locatorError).toHaveText("Last name is invalid");
      await expect(locatorError).toHaveCSS("color", "rgb(220, 53, 69)");
      const locatorInput = page.locator('//input[@id="signupLastName"]');
      await expect(locatorInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
      await expect(
        page.locator(
          '//div[contains(@class, "modal-footer")]// button[@class="btn btn-primary"]',
        ),
      ).toBeDisabled();
    });
    test("Sign Up with valid last name (other fields are not filled)", async ({
      page,
    }) => {
      await page.locator('//input[@id="signupLastName"]').fill("Kom");
      await page.locator('//input[@id="signupLastName"]').blur();
      const locatorInput = page.locator('//input[@id="signupLastName"]');
      await expect(locatorInput).toHaveCSS(
        "border-color",
        "rgb(206, 212, 218)",
      );
      await expect(
        page.locator(
          '//div[contains(@class, "modal-footer")]// button[@class="btn btn-primary"]',
        ),
      ).toBeDisabled();
    });
  });

  test.describe("Validation tests password", () => {
    test("Sign Up without Password", async ({ page }) => {
      await page.locator('//input[@id="signupPassword"]').focus();
      await page.locator('//input[@id="signupPassword"]').blur();
      const locatorError = page.locator('//div[@class="invalid-feedback"]//p');
      await expect(locatorError).toHaveText("Password required");
      await expect(locatorError).toHaveCSS("color", "rgb(220, 53, 69)");
      const locatorInput = page.locator('//input[@id="signupPassword"]');
      await expect(locatorInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
      await expect(
        page.locator(
          '//div[contains(@class, "modal-footer")]// button[@class="btn btn-primary"]',
        ),
      ).toBeDisabled();
    });

    test("Sign Up with invalid Password 1 character", async ({ page }) => {
      await page.locator('//input[@id="signupPassword"]').fill("t");
      await page.locator('//input[@id="signupPassword"]').blur();
      const locatorError = page.locator('//div[@class="invalid-feedback"]//p');
      await expect(locatorError).toHaveText(
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
      );
      await expect(locatorError).toHaveCSS("color", "rgb(220, 53, 69)");
      const locatorInput = page.locator('//input[@id="signupPassword"]');
      await expect(locatorInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
      await expect(
        page.locator(
          '//div[contains(@class, "modal-footer")]// button[@class="btn btn-primary"]',
        ),
      ).toBeDisabled();
    });
    test("Sign Up with invalid Password 16 characters", async ({ page }) => {
      await page
        .locator('//input[@id="signupPassword"]')
        .fill("Test12345!qwerty");
      await page.locator('//input[@id="signupPassword"]').blur();
      const locatorError = page.locator('//div[@class="invalid-feedback"]//p');
      await expect(locatorError).toHaveText(
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
      );
      await expect(locatorError).toHaveCSS("color", "rgb(220, 53, 69)");
      const locatorInput = page.locator('//input[@id="signupPassword"]');
      await expect(locatorInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
      await expect(
        page.locator(
          '//div[contains(@class, "modal-footer")]// button[@class="btn btn-primary"]',
        ),
      ).toBeDisabled();
    });
    test("Sign Up with invalid Password only letters", async ({ page }) => {
      await page.locator('//input[@id="signupPassword"]').fill("Testtest");
      await page.locator('//input[@id="signupPassword"]').blur();
      const locatorError = page.locator('//div[@class="invalid-feedback"]//p');
      await expect(locatorError).toHaveText(
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
      );
      await expect(locatorError).toHaveCSS("color", "rgb(220, 53, 69)");
      const locatorInput = page.locator('//input[@id="signupPassword"]');
      await expect(locatorInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
      await expect(
        page.locator(
          '//div[contains(@class, "modal-footer")]// button[@class="btn btn-primary"]',
        ),
      ).toBeDisabled();
    });
    test("Sign Up with invalid Password only letters and symbols", async ({
      page,
    }) => {
      await page.locator('//input[@id="signupPassword"]').fill("Testtest!@#");
      await page.locator('//input[@id="signupPassword"]').blur();
      const locatorError = page.locator('//div[@class="invalid-feedback"]//p');
      await expect(locatorError).toHaveText(
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
      );
      await expect(locatorError).toHaveCSS("color", "rgb(220, 53, 69)");
      const locatorInput = page.locator('//input[@id="signupPassword"]');
      await expect(locatorInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
      await expect(
        page.locator(
          '//div[contains(@class, "modal-footer")]// button[@class="btn btn-primary"]',
        ),
      ).toBeDisabled();
    });
    test("Sign Up with valid Password (other fields are not filled)", async ({
      page,
    }) => {
      await page.locator('//input[@id="signupPassword"]').fill("Test12345");
      await page.locator('//input[@id="signupPassword"]').blur();
      const locatorInput = page.locator('//input[@id="signupPassword"]');
      await expect(locatorInput).toHaveCSS(
        "border-color",
        "rgb(206, 212, 218)",
      );
      await expect(
        page.locator(
          '//div[contains(@class, "modal-footer")]// button[@class="btn btn-primary"]',
        ),
      ).toBeDisabled();
    });
  });

  test.describe("Validation tests Re-enter password", () => {
    test("Sign Up without Re-enter password", async ({ page }) => {
      await page.locator('//input[@id="signupRepeatPassword"]').focus();
      await page.locator('//input[@id="signupRepeatPassword"]').blur();
      const locatorError = page.locator('//div[@class="invalid-feedback"]//p');
      await expect(locatorError).toHaveText("Re-enter password required");
      await expect(locatorError).toHaveCSS("color", "rgb(220, 53, 69)");
      const locatorInput = page.locator('//input[@id="signupRepeatPassword"]');
      await expect(locatorInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
      await expect(
        page.locator(
          '//div[contains(@class, "modal-footer")]// button[@class="btn btn-primary"]',
        ),
      ).toBeDisabled();
    });

    test("Sign Up with invalid Re-enter password 1 character", async ({
      page,
    }) => {
      await page.locator('//input[@id="signupRepeatPassword"]').fill("t");
      await page.locator('//input[@id="signupRepeatPassword"]').blur();
      const locatorError = page.locator('//div[@class="invalid-feedback"]//p');
      await expect(locatorError).toHaveText(
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
      );
      await expect(locatorError).toHaveCSS("color", "rgb(220, 53, 69)");
      const locatorInput = page.locator('//input[@id="signupRepeatPassword"]');
      await expect(locatorInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
      await expect(
        page.locator(
          '//div[contains(@class, "modal-footer")]// button[@class="btn btn-primary"]',
        ),
      ).toBeDisabled();
    });
    test("Sign Up with invalid Re-enter password 16 characters", async ({
      page,
    }) => {
      await page
        .locator('//input[@id="signupRepeatPassword"]')
        .fill("Test12345!qwerty");
      await page.locator('//input[@id="signupRepeatPassword"]').blur();
      const locatorError = page.locator('//div[@class="invalid-feedback"]//p');
      await expect(locatorError).toHaveText(
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
      );
      await expect(locatorError).toHaveCSS("color", "rgb(220, 53, 69)");
      const locatorInput = page.locator('//input[@id="signupRepeatPassword"]');
      await expect(locatorInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
      await expect(
        page.locator(
          '//div[contains(@class, "modal-footer")]// button[@class="btn btn-primary"]',
        ),
      ).toBeDisabled();
    });
    test("Sign Up with invalid Re-enter password only letters", async ({
      page,
    }) => {
      await page
        .locator('//input[@id="signupRepeatPassword"]')
        .fill("Testtest");
      await page.locator('//input[@id="signupRepeatPassword"]').blur();
      const locatorError = page.locator('//div[@class="invalid-feedback"]//p');
      await expect(locatorError).toHaveText(
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
      );
      await expect(locatorError).toHaveCSS("color", "rgb(220, 53, 69)");
      const locatorInput = page.locator('//input[@id="signupRepeatPassword"]');
      await expect(locatorInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
      await expect(
        page.locator(
          '//div[contains(@class, "modal-footer")]// button[@class="btn btn-primary"]',
        ),
      ).toBeDisabled();
    });

    test("Sign Up with invalid Re-enter password only letters and numbers", async ({
      page,
    }) => {
      await page
        .locator('//input[@id="signupRepeatPassword"]')
        .fill("Testtest!@#");
      await page.locator('//input[@id="signupRepeatPassword"]').blur();
      const locatorError = page.locator('//div[@class="invalid-feedback"]//p');
      await expect(locatorError).toHaveText(
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
      );
      await expect(locatorError).toHaveCSS("color", "rgb(220, 53, 69)");
      const locatorInput = page.locator('//input[@id="signupRepeatPassword"]');
      await expect(locatorInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
      await expect(
        page.locator(
          '//div[contains(@class, "modal-footer")]// button[@class="btn btn-primary"]',
        ),
      ).toBeDisabled();
    });

    test("Sign Up with valid Re-enter password (other fields are not filled)", async ({
      page,
    }) => {
      await page
        .locator('//input[@id="signupRepeatPassword"]')
        .fill("Test12345");
      await page.locator('//input[@id="signupRepeatPassword"]').blur();
      const locatorInput = page.locator('//input[@id="signupRepeatPassword"]');
      await expect(locatorInput).toHaveCSS(
        "border-color",
        "rgb(206, 212, 218)",
      );
      await expect(
        page.locator(
          '//div[contains(@class, "modal-footer")]// button[@class="btn btn-primary"]',
        ),
      ).toBeDisabled();
    });
    test("Sign Up - Passwords do not match", async ({ page }) => {
      await page.locator('//input[@id="signupPassword"]').fill("Test12345!");
      await page
        .locator('//input[@id="signupRepeatPassword"]')
        .fill("Test12345@");
      await page.locator('//input[@id="signupRepeatPassword"]').blur();
      const locatorError = page.locator('//div[@class="invalid-feedback"]//p');
      await expect(locatorError).toHaveText("Passwords do not match");
      await expect(locatorError).toHaveCSS("color", "rgb(220, 53, 69)");
      const locatorInput = page.locator('//input[@id="signupRepeatPassword"]');
      await expect(locatorInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
      await expect(page.locator('//input[@id="signupPassword"]')).toHaveCSS(
        "border-color",
        "rgb(206, 212, 218)",
      );
      await expect(
        page.locator(
          '//div[contains(@class, "modal-footer")]// button[@class="btn btn-primary"]',
        ),
      ).toBeDisabled();
    });
  });
});
