import { expect, Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export abstract class BaseModal extends BasePage {
  abstract readonly uniqueElement: Locator;

  async waitForOpened() {
    await expect(this.uniqueElement).toBeVisible({ timeout: 10000 });
  }

  async waitForClosed() {
    await expect(this.uniqueElement).not.toBeVisible({ timeout: 10000 });
  }
}
