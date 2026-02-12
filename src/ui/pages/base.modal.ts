import { expect } from "@playwright/test";
import { DemoqaPage } from "./demoqa.page";

export abstract class BaseModal extends DemoqaPage{
  async waitForOpened() {
    await expect(this.uniqueElement).toBeVisible({ timeout: 10000 });
  }

  async waitForClosed() {
    await expect(this.uniqueElement).not.toBeVisible({ timeout: 10000 });
  }
}
