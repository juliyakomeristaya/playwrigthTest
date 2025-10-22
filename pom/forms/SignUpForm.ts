import { Locator } from "@playwright/test";
import BasePage from "../BasePage";
import { step } from "../../utils/stepDecoretor";

export default class SignUpForm extends BasePage {
  public readonly labelTitle: Locator = this.page.locator(
    '//h4[contains(@class, "modal-title")]',
  );
  public readonly labelNameField: Locator = this.page.locator(
    '(//label[contains(@for, "signupEmail")])[position() = 1]',
  );
  public readonly labelLastNameField: Locator = this.page.locator(
    '(//label[contains(@for, "signupEmail")])[position() = 2]',
  );
  public readonly labelEmailField: Locator = this.page.locator(
    '(//label[contains(@for, "signupEmail")])[position() = 3]',
  );
  public readonly labelPasswordField: Locator = this.page.locator(
    '//label[@for="signupPassword"]',
  );
  public readonly labelRepeatPasswordField: Locator = this.page.locator(
    '//label[@for="signupRepeatPassword"]',
  );

  public readonly nameField: Locator = this.page.locator(
    '//input[@id="signupName"]',
  );
  public readonly lastNameField: Locator = this.page.locator(
    '//input[@id="signupLastName"]',
  );
  public readonly emailField: Locator = this.page.locator(
    '//input[@id="signupEmail"]',
  );
  public readonly passwordField: Locator = this.page.locator(
    '//input[@id="signupPassword"]',
  );
  public readonly repeatPasswordField: Locator = this.page.locator(
    '//input[@id="signupRepeatPassword"]',
  );
  public readonly signUpButton: Locator = this.page.locator(
    '//div[contains(@class, "modal-footer")]// button[@class="btn btn-primary"]',
  );
  public readonly closeButton: Locator = this.page.locator(
    '//button[contains(@aria-label, "Close")]',
  );
  public readonly errorMessageForm: Locator = this.page.locator(
    '//p[@class="alert alert-danger"]',
  );

  @step("Enter name: {name}")
  async enterName(name: string): Promise<void> {
    await this.nameField.fill(name);
  }

  @step("Enter last name: {lastName}")
  async enterLastName(lastName: string): Promise<void> {
    await this.lastNameField.fill(lastName);
  }

  @step("Enter email: {email}")
  async enterEmail(email: string): Promise<void> {
    await this.emailField.fill(email);
  }

  @step("Enter password")
  async enterPassword(password: string): Promise<void> {
    await this.passwordField.fill(password);
  }

  @step("Enter repeat password")
  async enterRepeatPassword(repeatPassword: string): Promise<void> {
    await this.repeatPasswordField.fill(repeatPassword);
  }

  @step("Click Sign Up button")
  async clickSignUpButton(): Promise<void> {
    await this.signUpButton.click();
  }
  @step("Trigger validation error on field")
  async triggerErrorOnField(field: Locator): Promise<void> {
    await field.focus();
    await field.blur();
  }

  @step("Sign up user with name: {name}, lastName: {lastName}, email: {email}")
  async signUpUser(
    name: string,
    lastName: string,
    email: string,
    password: string,
    repeatPassword: string,
  ): Promise<void> {
    await this.nameField.fill(name);
    await this.lastNameField.fill(lastName);
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    await this.repeatPasswordField.fill(repeatPassword);
    await this.signUpButton.click();
  }
}
