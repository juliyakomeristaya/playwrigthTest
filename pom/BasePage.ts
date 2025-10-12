import { Locator, Page } from "@playwright/test";

export default class BasePage {
  protected readonly page: Page;
  public readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.errorMessage = this.page.locator(
      '//div[@class="invalid-feedback"]//p',
    );
  }
}
