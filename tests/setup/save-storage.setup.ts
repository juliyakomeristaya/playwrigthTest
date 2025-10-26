import test, { expect } from "@playwright/test";
import SignInForm from "../../pom/forms/SignInForm";
import HomePage from "../../pom/pages/HomePage";
import GaragePage from "../../pom/pages/GaragePage";
import AddCarForm from "../../pom/forms/AddCarForm";

test.describe("Login and save states", () => {
  let homePage: HomePage;
  let signInForm: SignInForm;
  let garagePage: GaragePage;
  let addCarForm: AddCarForm;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    garagePage = new GaragePage(page);
    addCarForm = new AddCarForm(page);

    await homePage.navigate();
    await homePage.openSignInForm();
  });

  test("Login as testUser and save state", async ({ page }) => {
    signInForm = new SignInForm(page);

    await signInForm.loginWithCredentials(
      "juliyakomeristaya@gmail.com",
      "Test12345!",
    );
    await expect(garagePage.pageTitle).toBeVisible();
    await page.context().storageState({ path: ".auth/testUser.json" });
  });

  test("Login as adminUser and save state", async ({ page }) => {
    signInForm = new SignInForm(page);

    await signInForm.loginWithCredentials(
      "juliyakomeristaya1@gmail.com",
      "Test12345!",
    );
    await expect(garagePage.pageTitle).toBeVisible();
    await page.context().storageState({ path: ".auth/adminUser.json" });
  });
});
