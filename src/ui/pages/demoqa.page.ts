import { Locator, expect } from "@playwright/test";
import { BasePage } from "./base.page";
import { TIMEOUTS } from "config/timeouts";

export abstract class DemoqaPage extends BasePage {
  abstract readonly uniqueElement: Locator;

  async open(): Promise<void> {
    await this.page.goto("/");
    await this.navigateToSection();
    await expect(this.uniqueElement).toBeVisible({ timeout: TIMEOUTS.UI.ELEMENT_VISIBLE });
  }

  // SPA-app -> each page implements navigation to its specific section
  abstract navigateToSection(): Promise<void>;
}
