import { Locator, expect } from "@playwright/test";
import { BasePage } from "./base.page";

export abstract class DemoqaPage extends BasePage {
  abstract readonly uniqueElement: Locator;

  async open(): Promise<void> {
    await this.page.goto("/");
    await this.navigateToSection();
    await expect(this.uniqueElement).toBeVisible({ timeout: 15000 });
  }

  abstract navigateToSection(): Promise<void>; // SPA-app
}
