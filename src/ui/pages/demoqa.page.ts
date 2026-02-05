import { Locator, expect } from "@playwright/test";
import { BasePage } from "./base.page";
import { DEMOQA_BASE_URL } from "../../config/env";

export abstract class DemoqaPage extends BasePage {
  abstract readonly uniqueElement: Locator;

  async open(route = "") {
    await this.page.goto(DEMOQA_BASE_URL + route);
  }

  async waitForOpened() {
    await expect(this.uniqueElement).toBeVisible();
  }
}
