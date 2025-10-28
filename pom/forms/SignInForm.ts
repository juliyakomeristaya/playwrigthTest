import { Locator } from "@playwright/test";
import BasePage from "../BasePage";
import { step } from "../../utils/stepDecorator";

export default class SignInForm extends BasePage {
  public readonly emailField: Locator = this.page.locator(
    '//input[@id="signinEmail"]',
  );
  public readonly passwordField: Locator = this.page.locator(
    '//input[@id="signinPassword"]',
  );
  private readonly loginButton: Locator = this.page.locator(
    '//div[contains(@class, "modal-footer")]// button[@class="btn btn-primary"]',
  );

  @step("Login with email: {email}")
  async loginWithCredentials(email: string, password: string): Promise<void> {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  @step("Enter email: {email}")
  async enterEmail(email: string): Promise<void> {
    await this.emailField.fill(email);
  }

  @step("Enter password")
  async enterPassword(password: string): Promise<void> {
    await this.passwordField.fill(password);
  }

  @step("Click login button")
  async clickLoginButton(): Promise<void> {
    await this.loginButton.click();
  }

  @step("Trigger error on field")
  async triggerErrorOnField(field: Locator): Promise<void> {
    await field.focus();
    await field.blur();
  }
}
