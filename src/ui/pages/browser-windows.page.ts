import { Locator } from "@playwright/test";
import { DemoqaPage } from "./demoqa.page";
import { logStep } from "data/report/logStep.utils";
import { SectionSelector, SELECTORS } from "config/selectors";
import { URLS } from "config/urls";

export class BrowserWindowsPage extends DemoqaPage {
  readonly title = this.page.getByRole("heading", { name: SELECTORS.PAGE_TITLES.BROWSER_WINDOWS });
  readonly newTabButton = this.page.locator(SELECTORS.TAB_BUTTON);
  readonly newWindowButton = this.page.locator(SELECTORS.WINDOW_BUTTON);

  readonly uniqueElement: Locator = this.title;

  protected getSectionSelector(): SectionSelector {
    return SELECTORS.BROWSER_WINDOWS_ITEM;
  }

  protected getMenuSelector(): string {
    return SELECTORS.ALERTS_MENU;
  }

  protected getMenuUrl(): string {
    return URLS.ALERTS;
  }

  @logStep("Click New Tab button")
  async clickNewTab(): Promise<void> {
    await this.newTabButton.click();
  }

  @logStep("Click New Window button")
  async clickNewWindow(): Promise<void> {
    await this.newWindowButton.click();
  }
}
