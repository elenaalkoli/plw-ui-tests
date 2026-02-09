import { Locator, expect } from "@playwright/test";
import { BasePage } from "./base.page";
import { DEMOQA_BASE_URL } from "../../config/env";
import { UI_ROUTES } from "config/ui-routes";

export abstract class DemoqaPage extends BasePage {
  abstract readonly uniqueElement: Locator;

  async open(route: string): Promise<void> {
    await this.page.goto(DEMOQA_BASE_URL + route);
    await expect(this.uniqueElement).toBeVisible({ timeout: 5000 });
  }
}
