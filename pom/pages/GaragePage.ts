import { Locator } from "@playwright/test";
import BasePage from "../BasePage";

export default class GaragePage extends BasePage {
  private readonly addCarButton: Locator = this.page.locator(
    '//div[@class="panel-page"]//button',
  );
  public readonly pageTitle: Locator = this.page.getByRole("heading", {
    name: "Garage",
  });
  public readonly lastCarName: Locator = this.page.locator(".car_name").first();

  async navigate(): Promise<void> {
    await this.page.goto("/panel/garage");
  }

  async openAddCarForm(): Promise<void> {
    await this.addCarButton.click();
  }
}
