import { Locator } from "@playwright/test";
import { DemoqaPage } from "./demoqa.page";
import { logStep } from "data/report/logStep.utils";
import { SectionSelector, SELECTORS } from "config/selectors";
import { URLS } from "config/urls";
import { TIMEOUTS } from "config/timeouts";

export class ModalDialogsPage extends DemoqaPage {
  readonly title = this.page.getByRole("heading", { name: SELECTORS.PAGE_TITLES.MODAL_DIALOGS });
  readonly smallModalButton = this.page.locator(SELECTORS.SMALL_MODAL_BUTTON);
  readonly largeModalButton = this.page.locator(SELECTORS.LARGE_MODAL_BUTTON);

  readonly smallModal = this.page.locator(SELECTORS.SMALL_MODAL_TITLE).locator(SELECTORS.PARENT_SELECTOR).locator(SELECTORS.PARENT_SELECTOR);
  readonly smallModalTitle = this.page.locator(SELECTORS.SMALL_MODAL_TITLE);
  readonly smallModalBody = this.page.locator(SELECTORS.MODAL_BODY).first();
  readonly smallModalCloseButton = this.page.locator(SELECTORS.SMALL_MODAL_CLOSE);

  readonly largeModal = this.page.locator(SELECTORS.LARGE_MODAL_TITLE).locator(SELECTORS.PARENT_SELECTOR).locator(SELECTORS.PARENT_SELECTOR);
  readonly largeModalTitle = this.page.locator(SELECTORS.LARGE_MODAL_TITLE);
  readonly largeModalCloseButton = this.page.locator(SELECTORS.LARGE_MODAL_CLOSE);

  readonly uniqueElement: Locator = this.title;

  protected getSectionSelector(): SectionSelector {
    return SELECTORS.MODAL_DIALOGS_ITEM;
  }

  protected getMenuSelector(): string {
    return SELECTORS.ALERTS_MENU;
  }

  protected getMenuUrl(): string {
    return URLS.ALERTS;
  }

  @logStep("Open small modal")
  async openSmallModal(): Promise<void> {
    await this.smallModalButton.click();
    await this.smallModalTitle.waitFor({ state: "visible", timeout: TIMEOUTS.UI.ELEMENT_VISIBLE });
  }

  @logStep("Open large modal")
  async openLargeModal(): Promise<void> {
    await this.largeModalButton.click();
    await this.largeModalTitle.waitFor({ state: "visible", timeout: TIMEOUTS.UI.ELEMENT_VISIBLE });
  }

  @logStep("Get small modal title")
  async getSmallModalTitle(): Promise<string> {
    return (await this.smallModalTitle.textContent()) ?? "";
  }

  @logStep("Get small modal body text")
  async getSmallModalBody(): Promise<string> {
    return (await this.smallModalBody.textContent()) ?? "";
  }

  @logStep("Get large modal title")
  async getLargeModalTitle(): Promise<string> {
    return (await this.largeModalTitle.textContent()) ?? "";
  }

  @logStep("Close small modal")
  async closeSmallModal(): Promise<void> {
    await this.smallModalCloseButton.click();
    await this.smallModalTitle.waitFor({ state: "hidden", timeout: TIMEOUTS.UI.ELEMENT_HIDDEN });
  }

  @logStep("Close large modal")
  async closeLargeModal(): Promise<void> {
    await this.largeModalCloseButton.click();
    await this.largeModalTitle.waitFor({ state: "hidden", timeout: TIMEOUTS.UI.ELEMENT_HIDDEN });
  }
}
