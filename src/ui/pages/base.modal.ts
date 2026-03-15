import { expect, Locator } from "@playwright/test";
import { BasePage } from "./base.page";
import { TIMEOUTS } from "config/timeouts";

export abstract class BaseModal extends BasePage {
  abstract readonly uniqueElement: Locator;

  async waitForOpened() {
    await expect(this.uniqueElement).toBeVisible({ timeout: TIMEOUTS.UI.ELEMENT_VISIBLE });
  }

  async waitForClosed() {
    await expect(this.uniqueElement).not.toBeVisible({ timeout: TIMEOUTS.UI.ELEMENT_VISIBLE });
  }
}
