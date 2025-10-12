import { test, expect } from "@playwright/test";
import { validData } from "./data-pom/data.json";
import HomePage from "../../pom/pages/HomePage";
import GaragePage from "../../pom/pages/GaragePage";
import SignUpForm from "../../pom/forms/SignUpForm";

test.describe("POM Sign Up tests", () => {
  let email = `${validData.emailPrefix}+${Date.now()}${validData.emailDomain}`;
  let homePage: HomePage;
  let signUpForm: SignUpForm;
  let garagePage: GaragePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    signUpForm = new SignUpForm(page);
    garagePage = new GaragePage(page);

    await homePage.navigate();
    await homePage.openSignUPForm();
  });

  test("Successful sign up", async () => {
    await signUpForm.enterName(validData.name);
    await signUpForm.enterLastName(validData.lastName);
    await signUpForm.enterEmail(email);
    await signUpForm.enterPassword(validData.password);
    await signUpForm.enterRepeatPassword(validData.repeatPassword);
    await signUpForm.clickSignUpButton();
    await expect(garagePage.pageTitle).toBeVisible();
  });

  test("User already exists", async () => {
    email = `${validData.emailPrefix}+1${Date.now()}${validData.emailDomain}`;
    await signUpForm.signUpUser(
      validData.name,
      validData.lastName,
      email,
      validData.password,
      validData.repeatPassword,
    );
    await homePage.navigate();
    await homePage.openSignUPForm();
    await signUpForm.enterName(validData.name);
    await signUpForm.enterLastName(validData.lastName);
    await signUpForm.enterEmail(email);
    await signUpForm.enterPassword(validData.password);
    await signUpForm.enterRepeatPassword(validData.repeatPassword);
    await signUpForm.clickSignUpButton();
    await expect(signUpForm.errorMessageForm).toHaveText("User already exists");
    await expect(signUpForm.signUpButton).toBeEnabled();
  });

  test("Sign up modal titles", async () => {
    await expect(signUpForm.labelTitle).toHaveText("Registration");
    await expect(signUpForm.closeButton).toBeEnabled();
    await expect(signUpForm.labelNameField).toHaveText("Name");
    await expect(signUpForm.labelLastNameField).toHaveText("Last name");
    await expect(signUpForm.labelEmailField).toHaveText("Email");
    await expect(signUpForm.labelPasswordField).toHaveText("Password");
    await expect(signUpForm.labelRepeatPasswordField).toHaveText(
      "Re-enter password",
    );
    await expect(signUpForm.signUpButton).toBeDisabled();
  });

  test.describe("Validation tests email", () => {
    test("Sign Up without email", async () => {
      await signUpForm.triggerErrorOnField(signUpForm.emailField);
      await expect(signUpForm.errorMessage).toHaveText("Email required");
      await expect(signUpForm.errorMessage).toHaveCSS(
        "color",
        "rgb(220, 53, 69)",
      );
      await expect(signUpForm.emailField).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
      await expect(signUpForm.signUpButton).toBeDisabled();
    });

    test("Sign Up with invalid email (only one character)", async () => {
      await signUpForm.emailField.fill("r");
      await signUpForm.triggerErrorOnField(signUpForm.emailField);
      await expect(signUpForm.errorMessage).toHaveText("Email is incorrect");
      await expect(signUpForm.errorMessage).toHaveCSS(
        "color",
        "rgb(220, 53, 69)",
      );
      await expect(signUpForm.emailField).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
      await expect(signUpForm.signUpButton).toBeDisabled();
    });

    test("Sign Up with invalid email (more than 257 character)", async () => {
      await signUpForm.emailField.fill(
        "symbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbol@gmailcomolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbolsymbol",
      );
      await signUpForm.triggerErrorOnField(signUpForm.emailField);
      await expect(signUpForm.errorMessage).toHaveText("Email is incorrect");
      await expect(signUpForm.errorMessage).toHaveCSS(
        "color",
        "rgb(220, 53, 69)",
      );
      await expect(signUpForm.emailField).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
      await expect(signUpForm.signUpButton).toBeDisabled();
    });

    test("Sign Up with invalid email (only text)", async () => {
      await signUpForm.emailField.fill("test");
      await signUpForm.triggerErrorOnField(signUpForm.emailField);
      await expect(signUpForm.errorMessage).toHaveText("Email is incorrect");
      await expect(signUpForm.errorMessage).toHaveCSS(
        "color",
        "rgb(220, 53, 69)",
      );
      await expect(signUpForm.emailField).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
      await expect(signUpForm.signUpButton).toBeDisabled();
    });

    test("Sign Up with invalid email (only text without domain)", async () => {
      await signUpForm.emailField.fill("test@test");
      await signUpForm.triggerErrorOnField(signUpForm.emailField);
      await expect(signUpForm.errorMessage).toHaveText("Email is incorrect");
      await expect(signUpForm.errorMessage).toHaveCSS(
        "color",
        "rgb(220, 53, 69)",
      );
      await expect(signUpForm.emailField).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
      await expect(signUpForm.signUpButton).toBeDisabled();
    });

    test("Sign Up with valid email (other fields are not filled)", async () => {
      await signUpForm.emailField.fill("test@gmail.com");
      await signUpForm.triggerErrorOnField(signUpForm.emailField);
      await expect(signUpForm.emailField).toHaveCSS(
        "border-color",
        "rgb(206, 212, 218)",
      );
      await expect(signUpForm.signUpButton).toBeDisabled();
    });
  });

  test.describe("Validation tests name", () => {
    test("Sign Up without name", async () => {
      await signUpForm.triggerErrorOnField(signUpForm.nameField);
      await expect(signUpForm.errorMessage).toHaveText("Name required");
      await expect(signUpForm.errorMessage).toHaveCSS(
        "color",
        "rgb(220, 53, 69)",
      );
      await expect(signUpForm.nameField).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
      await expect(signUpForm.signUpButton).toBeDisabled();
    });

    test("Sign Up with invalid name 1 character", async () => {
      await signUpForm.nameField.fill("t");
      await signUpForm.triggerErrorOnField(signUpForm.nameField);
      await expect(signUpForm.errorMessage).toHaveText(
        "Name has to be from 2 to 20 characters long",
      );
      await expect(signUpForm.errorMessage).toHaveCSS(
        "color",
        "rgb(220, 53, 69)",
      );
      await expect(signUpForm.nameField).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
      await expect(signUpForm.signUpButton).toBeDisabled();
    });

    test("Sign Up with invalid name 21 characters", async () => {
      await signUpForm.nameField.fill("tqwertyuiopasdfghjklq");
      await signUpForm.triggerErrorOnField(signUpForm.nameField);
      await expect(signUpForm.errorMessage).toHaveText(
        "Name has to be from 2 to 20 characters long",
      );
      await expect(signUpForm.errorMessage).toHaveCSS(
        "color",
        "rgb(220, 53, 69)",
      );
      await expect(signUpForm.nameField).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
      await expect(signUpForm.signUpButton).toBeDisabled();
    });

    test("Sign Up with invalid name (with spaces)", async () => {
      await signUpForm.nameField.fill(" tq ");
      await signUpForm.triggerErrorOnField(signUpForm.nameField);
      await expect(signUpForm.errorMessage).toHaveText("Name is invalid");
      await expect(signUpForm.errorMessage).toHaveCSS(
        "color",
        "rgb(220, 53, 69)",
      );
      await expect(signUpForm.nameField).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
      await expect(signUpForm.signUpButton).toBeDisabled();
    });

    test("Sign Up with invalid name (only symbols and numbers)", async () => {
      await signUpForm.nameField.fill("123!@#$%^&*()");
      await signUpForm.triggerErrorOnField(signUpForm.nameField);
      await expect(signUpForm.errorMessage).toHaveText("Name is invalid");
      await expect(signUpForm.errorMessage).toHaveCSS(
        "color",
        "rgb(220, 53, 69)",
      );
      await expect(signUpForm.nameField).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
      await expect(signUpForm.signUpButton).toBeDisabled();
    });

    test("Sign Up with valid name (other fields are not filled)", async () => {
      await signUpForm.nameField.fill("Yuliya");
      await signUpForm.triggerErrorOnField(signUpForm.nameField);
      await expect(signUpForm.nameField).toHaveCSS(
        "border-color",
        "rgb(206, 212, 218)",
      );
      await expect(signUpForm.signUpButton).toBeDisabled();
    });
  });

  test.describe("Validation tests last name", () => {
    test("Sign Up without last name", async () => {
      await signUpForm.triggerErrorOnField(signUpForm.lastNameField);
      await expect(signUpForm.errorMessage).toHaveText("Last name required");
      await expect(signUpForm.errorMessage).toHaveCSS(
        "color",
        "rgb(220, 53, 69)",
      );
      await expect(signUpForm.lastNameField).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
      await expect(signUpForm.signUpButton).toBeDisabled();
    });

    test("Sign Up with invalid last name 1 character", async () => {
      await signUpForm.lastNameField.fill("t");
      await signUpForm.triggerErrorOnField(signUpForm.lastNameField);
      await expect(signUpForm.errorMessage).toHaveText(
        "Last name has to be from 2 to 20 characters long",
      );
      await expect(signUpForm.errorMessage).toHaveCSS(
        "color",
        "rgb(220, 53, 69)",
      );
      await expect(signUpForm.lastNameField).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
      await expect(signUpForm.signUpButton).toBeDisabled();
    });

    test("Sign Up with invalid last name 21 characters", async () => {
      await signUpForm.lastNameField.fill("tqwertyuiopasdfghjklq");
      await signUpForm.triggerErrorOnField(signUpForm.lastNameField);
      await expect(signUpForm.errorMessage).toHaveText(
        "Last name has to be from 2 to 20 characters long",
      );
      await expect(signUpForm.errorMessage).toHaveCSS(
        "color",
        "rgb(220, 53, 69)",
      );
      await expect(signUpForm.lastNameField).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
      await expect(signUpForm.signUpButton).toBeDisabled();
    });

    test("Sign Up with invalid last name (with spaces)", async () => {
      await signUpForm.lastNameField.fill(" FF ");
      await signUpForm.triggerErrorOnField(signUpForm.lastNameField);
      await expect(signUpForm.errorMessage).toHaveText("Last name is invalid");
      await expect(signUpForm.errorMessage).toHaveCSS(
        "color",
        "rgb(220, 53, 69)",
      );
      await expect(signUpForm.lastNameField).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
      await expect(signUpForm.signUpButton).toBeDisabled();
    });

    test("Sign Up with invalid last name (only symbols and numbers)", async () => {
      await signUpForm.lastNameField.fill("123!@#$%^&*()");
      await signUpForm.triggerErrorOnField(signUpForm.lastNameField);
      await expect(signUpForm.errorMessage).toHaveText("Last name is invalid");
      await expect(signUpForm.errorMessage).toHaveCSS(
        "color",
        "rgb(220, 53, 69)",
      );
      await expect(signUpForm.lastNameField).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
      await expect(signUpForm.signUpButton).toBeDisabled();
    });

    test("Sign Up with valid last name (other fields are not filled)", async () => {
      await signUpForm.lastNameField.fill("Kom");
      await signUpForm.triggerErrorOnField(signUpForm.lastNameField);
      await expect(signUpForm.lastNameField).toHaveCSS(
        "border-color",
        "rgb(206, 212, 218)",
      );
      await expect(signUpForm.signUpButton).toBeDisabled();
    });
  });

  test.describe("Validation tests password", () => {
    test("Sign Up without Password", async () => {
      await signUpForm.triggerErrorOnField(signUpForm.passwordField);
      await expect(signUpForm.errorMessage).toHaveText("Password required");
      await expect(signUpForm.errorMessage).toHaveCSS(
        "color",
        "rgb(220, 53, 69)",
      );
      await expect(signUpForm.passwordField).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
      await expect(signUpForm.signUpButton).toBeDisabled();
    });

    test("Sign Up with invalid Password 1 character", async () => {
      await signUpForm.passwordField.fill("t");
      await signUpForm.triggerErrorOnField(signUpForm.passwordField);
      await expect(signUpForm.errorMessage).toHaveText(
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
      );
      await expect(signUpForm.errorMessage).toHaveCSS(
        "color",
        "rgb(220, 53, 69)",
      );
      await expect(signUpForm.passwordField).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
      await expect(signUpForm.signUpButton).toBeDisabled();
    });
    test("Sign Up with invalid Password 16 characters", async () => {
      await signUpForm.passwordField.fill("Test12345!qwerty");
      await signUpForm.triggerErrorOnField(signUpForm.passwordField);
      await expect(signUpForm.errorMessage).toHaveText(
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
      );
      await expect(signUpForm.passwordField).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
      await expect(signUpForm.signUpButton).toBeDisabled();
    });
    test("Sign Up with invalid Password only letters", async () => {
      await signUpForm.passwordField.fill("Testtest");
      await signUpForm.triggerErrorOnField(signUpForm.passwordField);
      await expect(signUpForm.errorMessage).toHaveText(
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
      );
      await expect(signUpForm.errorMessage).toHaveCSS(
        "color",
        "rgb(220, 53, 69)",
      );
      await expect(signUpForm.passwordField).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
      await expect(signUpForm.signUpButton).toBeDisabled();
    });
    test("Sign Up with invalid Password only letters and symbols", async () => {
      await signUpForm.passwordField.fill("Testtest!@#");
      await signUpForm.triggerErrorOnField(signUpForm.passwordField);
      await expect(signUpForm.errorMessage).toHaveText(
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
      );
      await expect(signUpForm.errorMessage).toHaveCSS(
        "color",
        "rgb(220, 53, 69)",
      );
      await expect(signUpForm.passwordField).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
      await expect(signUpForm.signUpButton).toBeDisabled();
    });
    test("Sign Up with valid Password (other fields are not filled)", async () => {
      await signUpForm.passwordField.fill("Test12345");
      await signUpForm.triggerErrorOnField(signUpForm.passwordField);
      await expect(signUpForm.passwordField).toHaveCSS(
        "border-color",
        "rgb(206, 212, 218)",
      );
      await expect(signUpForm.signUpButton).toBeDisabled();
    });
  });

  test.describe("Validation tests Re-enter password", () => {
    test("Sign Up without Re-enter password", async () => {
      await signUpForm.triggerErrorOnField(signUpForm.repeatPasswordField);
      await expect(signUpForm.errorMessage).toHaveText(
        "Re-enter password required",
      );
      await expect(signUpForm.errorMessage).toHaveCSS(
        "color",
        "rgb(220, 53, 69)",
      );
      await expect(signUpForm.repeatPasswordField).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
      await expect(signUpForm.signUpButton).toBeDisabled();
    });

    test("Sign Up with invalid Re-enter password 1 character", async () => {
      await signUpForm.repeatPasswordField.fill("t");
      await signUpForm.triggerErrorOnField(signUpForm.repeatPasswordField);
      await expect(signUpForm.errorMessage).toHaveText(
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
      );
      await expect(signUpForm.errorMessage).toHaveCSS(
        "color",
        "rgb(220, 53, 69)",
      );
      await expect(signUpForm.repeatPasswordField).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
      await expect(signUpForm.signUpButton).toBeDisabled();
    });

    test("Sign Up with invalid Re-enter password 16 characters", async () => {
      await signUpForm.repeatPasswordField.fill("Test12345!qwerty");
      await signUpForm.triggerErrorOnField(signUpForm.repeatPasswordField);
      await expect(signUpForm.errorMessage).toHaveText(
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
      );
      await expect(signUpForm.errorMessage).toHaveCSS(
        "color",
        "rgb(220, 53, 69)",
      );
      await expect(signUpForm.repeatPasswordField).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
      await expect(signUpForm.signUpButton).toBeDisabled();
    });
    test("Sign Up with invalid Re-enter password only letters", async () => {
      await signUpForm.repeatPasswordField.fill("Testtest");
      await signUpForm.triggerErrorOnField(signUpForm.repeatPasswordField);
      await expect(signUpForm.errorMessage).toHaveText(
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
      );
      await expect(signUpForm.errorMessage).toHaveCSS(
        "color",
        "rgb(220, 53, 69)",
      );
      await expect(signUpForm.repeatPasswordField).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
      await expect(signUpForm.signUpButton).toBeDisabled();
    });

    test("Sign Up with invalid Re-enter password only letters and numbers", async () => {
      await signUpForm.repeatPasswordField.fill("Testtest!@#");
      await signUpForm.triggerErrorOnField(signUpForm.repeatPasswordField);
      await expect(signUpForm.errorMessage).toHaveText(
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
      );
      await expect(signUpForm.errorMessage).toHaveCSS(
        "color",
        "rgb(220, 53, 69)",
      );
      await expect(signUpForm.repeatPasswordField).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
      await expect(signUpForm.signUpButton).toBeDisabled();
    });

    test("Sign Up with valid Re-enter password (other fields are not filled)", async () => {
      await signUpForm.repeatPasswordField.fill("Test12345");
      await signUpForm.triggerErrorOnField(signUpForm.repeatPasswordField);
      await expect(signUpForm.passwordField).toHaveCSS(
        "border-color",
        "rgb(206, 212, 218)",
      );
      await expect(signUpForm.signUpButton).toBeDisabled();
    });

    test("Sign Up - Passwords do not match", async () => {
      await signUpForm.passwordField.fill("Test12345!");
      await signUpForm.repeatPasswordField.fill("Test12345@");
      await signUpForm.triggerErrorOnField(signUpForm.repeatPasswordField);
      await expect(signUpForm.errorMessage).toHaveText(
        "Passwords do not match",
      );
      await expect(signUpForm.errorMessage).toHaveCSS(
        "color",
        "rgb(220, 53, 69)",
      );
      await expect(signUpForm.repeatPasswordField).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
      await expect(signUpForm.passwordField).toHaveCSS(
        "border-color",
        "rgb(206, 212, 218)",
      );
      await expect(signUpForm.signUpButton).toBeDisabled();
    });
  });
});
