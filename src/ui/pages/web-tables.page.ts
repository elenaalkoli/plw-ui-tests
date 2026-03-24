import { Locator, expect } from "@playwright/test";
import { DemoqaPage } from "./demoqa.page";
import { logStep } from "data/report/logStep.utils";
import { SELECTORS } from "config/selectors";
import { TIMEOUTS } from "config/timeouts";

export interface WebTableUser {
  firstName: string;
  lastName: string;
  age: string;
  email: string;
  salary: string;
  department: string;
}
export class WebTablePage extends DemoqaPage {
  readonly title = this.page.getByRole("heading", { name: "Web Tables" });
  readonly addButton = this.page.locator("#addNewRecordButton");
  readonly searchBox = this.page.locator("#searchBox");
  readonly tableBody = this.page.locator("tbody");
  readonly tableRows = this.tableBody.locator("tr");

  readonly elementsMenu = this.page.locator(SELECTORS.ELEMENTS_MENU);
  readonly webTablesItem = this.page.locator(SELECTORS.WEBTABLE_ITEM);

  firstNameCell = (row: Locator) => row.locator("td").nth(0);
  lastNameCell = (row: Locator) => row.locator("td").nth(1);
  ageCell = (row: Locator) => row.locator("td").nth(2);
  emailCell = (row: Locator) => row.locator("td").nth(3);
  salaryCell = (row: Locator) => row.locator("td").nth(4);
  departmentCell = (row: Locator) => row.locator("td").nth(5);
  editButtonInRow = (row: Locator): Locator => row.locator('[title="Edit"]');
  deleteButtonInRow = (row: Locator): Locator => row.locator('[title="Delete"]');

  readonly uniqueElement = this.title;

  protected getSectionSelector(): string {
    return SELECTORS.WEBTABLE_ITEM;
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
