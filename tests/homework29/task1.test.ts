import { test, expect } from "../../utils/fixtures/fixtures";
import SignInForm from "../../pom/forms/SignInForm";
import GaragePage from "../../pom/pages/GaragePage";
import HomePage from "../../pom/pages/HomePage";
test.describe("Mock test", () => {
  let homePage: HomePage;
  let signInForm: SignInForm;
  let garagePage: GaragePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    signInForm = new SignInForm(page);
    garagePage = new GaragePage(page);
  });

  test("interception with mocking - fake profile response", async ({
    page,
  }) => {
    const fakeProfile = {
      status: "ok",
      data: {
        userId: 265535,
        photoFilename: "default-user.png",
        name: "Test",
        lastName: "Testovich",
      },
    };

    await page.route("**/api/users/profile", (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(fakeProfile),
      });
    });
    await homePage.navigate();
    await homePage.openSignInForm();
    const email = "juliyakomeristaya@gmail.com";
    const password = "Test12345!";
    await signInForm.loginWithCredentials(email, password);
    await page.locator('//a[@routerlink="profile"]').click();
    await expect(
      page.locator('//p[@class="profile_name display-4"]'),
    ).toHaveText("Test Testovich");
    await page.waitForTimeout(5000);
  });
});
