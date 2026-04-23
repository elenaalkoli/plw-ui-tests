import { Page } from "@playwright/test";
import { SELECTORS } from "config/selectors";

export abstract class BasePage {
  readonly page: Page;
  readonly adCloseButton: ReturnType<Page["locator"]>;

  constructor(page: Page) {
    this.page = page;
    this.adCloseButton = page.locator(SELECTORS.AD_CLOSE_BUTTON);
  }

  protected async dismissAd(): Promise<void> {
    if (await this.adCloseButton.isVisible()) {
      await this.adCloseButton.click();
    }
  }
}
