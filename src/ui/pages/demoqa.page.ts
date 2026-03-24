import { Locator, expect } from "@playwright/test";
import { BasePage } from "./base.page";
import { TIMEOUTS } from "config/timeouts";
import { SELECTORS } from "config/selectors";
import { logStep } from "data/report/logStep.utils";
import { URLS } from "config/urls";

export abstract class DemoqaPage extends BasePage {
  abstract readonly uniqueElement: Locator;
  protected readonly elementsMenu = this.page.locator(SELECTORS.ELEMENTS_MENU);
  protected abstract getSectionSelector(): string;

  @logStep("Open demoqa.com page")
  async open(): Promise<void> {
    await this.page.goto(URLS.HOME);
    await this.navigateToSection();
    await expect(this.uniqueElement).toBeVisible({ timeout: TIMEOUTS.UI.ELEMENT_VISIBLE });
  }

  // SPA-app -> each page implements navigation to its specific section
  @logStep("Navigate to section")
  async navigateToSection(): Promise<void> {
    await this.elementsMenu.click();
    await this.page.waitForURL(`${URLS.ELEMENTS}**`, { timeout: TIMEOUTS.PAGE.NAVIGATION });

    const section = this.page.locator(this.getSectionSelector());
    await section.click();
  }
}
