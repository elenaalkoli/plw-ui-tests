import { Locator, expect } from "@playwright/test";
import { DemoqaPage } from "./demoqa.page";
import { logStep } from "data/report/logStep.utils";
import { SectionSelector, SELECTORS } from "config/selectors";
import { TIMEOUTS } from "config/timeouts";
import { URLS } from "config/urls";

export interface WebTableUser {
  firstName: string;
  lastName: string;
  age: string;
  email: string;
  salary: string;
  department: string;
}
export class WebTablePage extends DemoqaPage {
  readonly title = this.page.getByRole("heading", { name: SELECTORS.PAGE_TITLES.WEB_TABLES });
  readonly addButton = this.page.locator(SELECTORS.WEB_TABLES_ADD_BUTTON);
  readonly searchBox = this.page.locator(SELECTORS.SEARCH_BOX);
  readonly tableBody = this.page.locator(SELECTORS.TABLE_BODY);
  readonly tableRows = this.tableBody.locator(SELECTORS.TABLE_ROW);

  readonly elementsMenu = this.page.locator(SELECTORS.ELEMENTS_MENU);
  readonly webTablesItem = this.page.locator(SELECTORS.WEBTABLE_ITEM);

  firstNameCell = (row: Locator) => row.locator(SELECTORS.TABLE_CELL).nth(0);
  lastNameCell = (row: Locator) => row.locator(SELECTORS.TABLE_CELL).nth(1);
  ageCell = (row: Locator) => row.locator(SELECTORS.TABLE_CELL).nth(2);
  emailCell = (row: Locator) => row.locator(SELECTORS.TABLE_CELL).nth(3);
  salaryCell = (row: Locator) => row.locator(SELECTORS.TABLE_CELL).nth(4);
  departmentCell = (row: Locator) => row.locator(SELECTORS.TABLE_CELL).nth(5);
  editButtonInRow = (row: Locator): Locator => row.locator(SELECTORS.EDIT_BUTTON);
  deleteButtonInRow = (row: Locator): Locator => row.locator(SELECTORS.DELETE_BUTTON);

  readonly uniqueElement = this.title;

  protected getSectionSelector(): SectionSelector {
    return SELECTORS.WEBTABLE_ITEM;
  }

  protected getMenuSelector(): string {
    return SELECTORS.ELEMENTS_MENU;
  }

  protected getMenuUrl(): string {
    return URLS.ELEMENTS;
  }

  @logStep("Click Add button")
  async clickAdd() {
    await this.addButton.click();
  }

  @logStep("Search user: {name}")
  async searchUser(name: string) {
    await this.searchBox.fill(name);
  }

  @logStep("Clear search input")
  async clearSearchBox(): Promise<void> {
    await this.searchBox.fill("");
  }

  @logStep("Get user data from row {row}")
  async getUserData(row: Locator): Promise<WebTableUser> {
    return {
      firstName: (await this.firstNameCell(row).textContent())?.trim() ?? "",
      lastName: (await this.lastNameCell(row).textContent())?.trim() ?? "",
      age: (await this.ageCell(row).textContent())?.trim() ?? "",
      email: (await this.emailCell(row).textContent())?.trim() ?? "",
      salary: (await this.salaryCell(row).textContent())?.trim() ?? "",
      department: (await this.departmentCell(row).textContent())?.trim() ?? "",
    };
  }

  @logStep("Click Edit for user with first name {firstName}")
  async clickEditByFirstName(firstName: string): Promise<void> {
    const row = await this.rowByFirstName(firstName);
    const button = this.editButtonInRow(row);

    await expect(button).toBeVisible();
    await button.click();
  }

  @logStep("Click Delete for user with first name {firstName}")
  async deleteRowByFirstName(firstName: string): Promise<void> {
    const row = await this.rowByFirstName(firstName);
    const button = this.deleteButtonInRow(row);

    await expect(button).toBeVisible();
    await button.click();
  }

  @logStep("Find row by first name: {firstName}")
  async rowByFirstName(firstName: string): Promise<Locator> {
    await expect(this.tableRows.first()).toBeVisible({ timeout: TIMEOUTS.UI.ELEMENT_VISIBLE });
    const rowCount = await this.tableRows.count();

    for (let i = 0; i < rowCount; i++) {
      const row = this.tableRows.nth(i);
      const cellText = (await this.firstNameCell(row).textContent())?.trim();

      if (cellText === firstName) {
        return row;
      }
    }
    throw new Error(`User with first name "${firstName}" not found`);
  }
}
