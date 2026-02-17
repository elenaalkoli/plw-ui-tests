import { Locator, expect } from "@playwright/test";
import { DemoqaPage } from "./demoqa.page";
import { logStep } from "utils/report/logStep.utils";

export class WebTablePage extends DemoqaPage {
  readonly title = this.page.locator("h1.text-center:has-text('Web Tables')");
  readonly addButton = this.page.locator("#addNewRecordButton");
  readonly searchBox = this.page.locator("#searchBox");
  readonly tableBody = this.page.locator("tbody");
  readonly tableRows = this.tableBody.locator("tr");

  readonly uniqueElement = this.title;

  @logStep("Navigate to Web Tables section")
  async navigateToSection(): Promise<void> {
    await this.page.locator('a[href="/elements"]').click();
    await this.page.waitForURL("**/elements");
    await this.page.locator('#item-3 span.text:has-text("Web Tables")').click(); // Web Tables

    await this.removeOverlays();
  }

  async removeOverlays() {
    await this.page.evaluate(() => {
      document
        .querySelectorAll("#fixedban, footer, .col-12.mt-4.col-md-3")
        .forEach(el => el.remove());
    });
  }

  rowByFirstName = (firstName: string): Locator =>
    this.tableRows.filter({ has: this.page.locator("td", { hasText: firstName }) });

  firstNameCell(rowIndex: number): Locator {
    return this.tableRows.nth(rowIndex - 1).locator("td:nth-child(1)");
  }

  lastNameCell(rowIndex: number): Locator {
    return this.tableRows.nth(rowIndex - 1).locator("td:nth-child(2)");
  }

  salaryCell(rowIndex: number): Locator {
    return this.tableRows.nth(rowIndex - 1).locator("td:nth-child(5)");
  }

  departmentCell(rowIndex: number): Locator {
    return this.tableRows.nth(rowIndex - 1).locator("td:nth-child(6)");
  }

  editButton = (rowIndex: number): Locator =>
    this.tableRows.nth(rowIndex - 1).locator('[title="Edit"]');

  deleteButton = (rowIndex: number): Locator =>
    this.tableRows.nth(rowIndex - 1).locator('[title="Delete"]');

  @logStep("Click Add button")
  async clickAdd() {
    await this.addButton.click();
  }

  @logStep("Search user: {name}")
  async searchUser(name: string) {
    await this.searchBox.clear();
    await this.searchBox.fill(name);
  }

  @logStep("Click Edit row {rowIndex}")
  async clickEdit(rowIndex: number) {
    const button = this.editButton(rowIndex);
    await button.waitFor({ state: "visible", timeout: 5000 });
    await button.click();
  }

  @logStep("Click Delete row by index {rowIndex}")
  async deleteRowByIndex(rowIndex: number) {
    await this.deleteButton(rowIndex).click({ force: true });
    await this.tableRows.nth(rowIndex - 1).waitFor({ state: "detached", timeout: 5000 });
  }

  @logStep("Get user data row {rowIndex}")
  async getUserData(rowIndex: number) {
    const row = this.tableRows.nth(rowIndex - 1);
    const cells = row.locator("td");

    return {
      firstName: (await cells.nth(0).textContent())?.trim() || "",
      lastName: (await cells.nth(1).textContent())?.trim() || "",
      age: (await cells.nth(2).textContent())?.trim() || "",
      email: (await cells.nth(3).textContent())?.trim() || "",
      salary: (await cells.nth(4).textContent())?.trim() || "",
      department: (await cells.nth(5).textContent())?.trim() || "",
    };
  }

  @logStep("Clear search input")
  clearSearchBox(): Promise<void> {
    return this.searchBox.clear();
  }

  @logStep("Find row index by name")
  async getRowIndexByFirstName(firstName: string): Promise<number> {
    const rowCount = await this.tableRows.count();
    for (let i = 1; i <= rowCount; i++) {
      if ((await this.firstNameCell(i).textContent())?.trim() === firstName) {
        return i;
      }
    }
    throw new Error(`User ${firstName} not found`);
  }
}
