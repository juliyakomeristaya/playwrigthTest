import { test, expect } from "../../utils/fixtures/fixtures";
import GaragePage from "../../pom/pages/GaragePage";
import AddCarForm from "../../pom/forms/AddCarForm";

//test.use({ storageState: '.auth/testUser.json' });

test.describe("POM Garage Page tests User", () => {
  let garagePage: GaragePage;
  let addCarForm: AddCarForm;

  test.beforeEach(async ({ testUserPage }) => {
    garagePage = new GaragePage(testUserPage);
    addCarForm = new AddCarForm(testUserPage);

    await garagePage.navigate();
    await garagePage.openAddCarForm();
  });

  test.describe("Successful car adding", () => {
    test.afterEach(async ({ testUserPage }) => {
      await testUserPage
        .locator('//span[contains(@class, "icon-edit")]')
        .first()
        .click();
      await testUserPage.getByText("Remove car").click();
      await testUserPage
        .locator('//button[contains(@class, "btn-danger")]')
        .click();
    });

    test("Add BMW 3", async () => {
      await addCarForm.addCar("BMW", "3", "555");
      await expect(garagePage.lastCarName).toHaveText("BMW 3");
    });

    test("Add Ford Focus", async () => {
      await addCarForm.addCar("Ford", "Focus", "555");
      await expect(garagePage.lastCarName).toHaveText("Ford Focus");
    });

    test("Add Porsche Panamera", async () => {
      await addCarForm.addCar("Porsche", "Panamera", "555");
      await expect(garagePage.lastCarName).toHaveText("Porsche Panamera");
    });
  });
});

test.describe("POM Garage Page tests Admin", () => {
  let garagePage: GaragePage;
  let addCarForm: AddCarForm;

  test.beforeEach(async ({ adminUserPage }) => {
    garagePage = new GaragePage(adminUserPage);
    addCarForm = new AddCarForm(adminUserPage);

    await garagePage.navigate();
    await garagePage.openAddCarForm();
  });

  test.describe("Successful car adding", () => {
    test.afterEach(async ({ adminUserPage }) => {
      await adminUserPage
        .locator('//span[contains(@class, "icon-edit")]')
        .first()
        .click();
      await adminUserPage.getByText("Remove car").click();
      await adminUserPage
        .locator('//button[contains(@class, "btn-danger")]')
        .click();
    });

    test("Add BMW 3", async () => {
      await addCarForm.addCar("BMW", "3", "555");
      await expect(garagePage.lastCarName).toHaveText("BMW 3");
    });

    test("Add Ford Focus", async () => {
      await addCarForm.addCar("Ford", "Focus", "555");
      await expect(garagePage.lastCarName).toHaveText("Ford Focus");
    });

    test("Add Porsche Panamera", async () => {
      await addCarForm.addCar("Porsche", "Panamera", "555");
      await expect(garagePage.lastCarName).toHaveText("Porsche Panamera");
    });
  });
});
