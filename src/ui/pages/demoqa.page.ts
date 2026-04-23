import { Locator, expect } from "@playwright/test";
import { BasePage } from "./base.page";
import { TIMEOUTS } from "config/timeouts";
import { SectionSelector, SELECTORS } from "config/selectors";
import { logStep } from "data/report/logStep.utils";
import { URLS } from "config/urls";

export abstract class DemoqaPage extends BasePage {
  abstract readonly uniqueElement: Locator;
  protected abstract getSectionSelector(): SectionSelector;
  protected abstract getMenuSelector(): string;
  protected abstract getMenuUrl(): string;

  @logStep("Open demoqa.com page")
  async open(): Promise<void> {
    await this.page.goto(URLS.HOME);
    await this.navigateToSection();
    await this.dismissAd();
    await expect(this.uniqueElement).toBeVisible({ timeout: TIMEOUTS.UI.ELEMENT_VISIBLE });
  }

  @logStep("Navigate to section")
  async navigateToSection(): Promise<void> {
    await this.page.locator(this.getMenuSelector()).click();
    await this.page.waitForURL(`${this.getMenuUrl()}**`, { timeout: TIMEOUTS.PAGE.NAVIGATION });

    await this.dismissAd();
    const section = this.page.locator(this.getSectionSelector());
    await section.click();
  }
}
