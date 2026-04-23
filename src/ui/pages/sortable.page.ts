import { Locator } from "@playwright/test";
import { DemoqaPage } from "./demoqa.page";
import { logStep } from "data/report/logStep.utils";
import { SectionSelector, SELECTORS } from "config/selectors";
import { URLS } from "config/urls";
import { TIMEOUTS } from "config/timeouts";

export class SortablePage extends DemoqaPage {
  readonly title = this.page.getByRole("heading", { name: SELECTORS.PAGE_TITLES.SORTABLE });
  readonly listTab = this.page.locator(SELECTORS.LIST_TAB);
  readonly gridTab = this.page.locator(SELECTORS.GRID_TAB);
  readonly listItems = this.page.locator(SELECTORS.LIST_ITEMS);
  readonly gridItems = this.page.locator(SELECTORS.GRID_ITEMS);

  readonly uniqueElement: Locator = this.title;

  protected getSectionSelector(): SectionSelector {
    return SELECTORS.SORTABLE_ITEM;
  }

  protected getMenuSelector(): string {
    return SELECTORS.INTERACTIONS_MENU;
  }

  protected getMenuUrl(): string {
    return URLS.INTERACTIONS;
  }

  @logStep("Switch to List tab")
  async switchToList(): Promise<void> {
    await this.listTab.click();
  }

  @logStep("Switch to Grid tab")
  async switchToGrid(): Promise<void> {
    await this.gridTab.click();
  }

  @logStep("Get list item texts")
  async getListItemTexts(): Promise<string[]> {
    return this.listItems.allTextContents();
  }

  @logStep("Get grid item texts")
  async getGridItemTexts(): Promise<string[]> {
    return this.gridItems.allTextContents();
  }

  @logStep("Drag list item from index {from} to index {to}")
  async dragListItem(from: number, to: number): Promise<void> {
    const source = this.listItems.nth(from);
    const target = this.listItems.nth(to);
    await source.dragTo(target);
  }

  @logStep("Drag last list item to first position")
  async dragLastListItemToFirst(): Promise<void> {
    const count = await this.listItems.count();
    const source = this.listItems.nth(count - 1);
    const target = this.listItems.nth(0);
    await source.dragTo(target, { force: true });
    await this.page.waitForTimeout(TIMEOUTS.DRAG_DELAY);
  }

  @logStep("Drag grid item from index {from} to index {to}")
  async dragGridItem(from: number, to: number): Promise<void> {
    const source = this.gridItems.nth(from);
    const target = this.gridItems.nth(to);
    await source.dragTo(target);
  }

  @logStep("Drag last grid item to first position")
  async dragLastGridItemToFirst(): Promise<void> {
    const count = await this.gridItems.count();
    const source = this.gridItems.nth(count - 1);
    const target = this.gridItems.nth(0);
    await source.dragTo(target, { force: true });
    await this.page.waitForTimeout(TIMEOUTS.DRAG_DELAY);
  }
}
