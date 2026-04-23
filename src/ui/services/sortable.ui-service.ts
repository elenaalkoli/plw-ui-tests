import { expect, Page } from "@playwright/test";
import { BaseUIService } from "./base.ui-service";
import { SortablePage } from "ui/pages/sortable.page";

export class SortableUIService extends BaseUIService {
  private readonly sortablePage: SortablePage;

  constructor(page: Page) {
    super(page);
    this.sortablePage = new SortablePage(page);
  }

  async verifyListDrag(): Promise<void> {
    await this.sortablePage.switchToList();
    const before = await this.sortablePage.getListItemTexts();
    const lastItem = before[before.length - 1];

    await this.sortablePage.dragLastListItemToFirst();

    const after = await this.sortablePage.getListItemTexts();
    expect(after[0]).toBe(lastItem);
    expect(after.length).toBe(before.length);
  }

  async verifyGridDrag(): Promise<void> {
    await this.sortablePage.switchToGrid();
    const before = await this.sortablePage.getGridItemTexts();
    const lastItem = before[before.length - 1];

    await this.sortablePage.dragLastGridItemToFirst();

    const after = await this.sortablePage.getGridItemTexts();
    expect(after[0]).toBe(lastItem);
    expect(after.length).toBe(before.length);
  }
}
