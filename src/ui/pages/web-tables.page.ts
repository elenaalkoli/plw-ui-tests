import { Locator, expect } from "@playwright/test";
import { DemoqaPage } from "./demoqa.page";
import { logStep } from "utils/report/logStep.utils";

export class WebTablePage extends DemoqaPage {
  readonly title = this.page.locator("h1.text-center");
  readonly addButton = this.page.locator("#addNewRecordButton");
  readonly searchBox = this.page.locator("#searchBox");
  readonly tableBody = this.page.locator(".rt-tbody");
  readonly tableRows = this.tableBody.locator("div.rt-tr");

  readonly uniqueElement = this.title;
  
  rowByFirstName = (firstName: string): Locator =>
    this.tableRows.filter({ has: this.page.locator("div.rt-td", { hasText: firstName }) });

  firstNameCell(rowIndex: number): Locator {
    return this.tableRows.nth(rowIndex - 1).locator("div.rt-td:nth-child(1)");
  }

  lastNameCell(rowIndex: number): Locator {
    return this.tableRows.nth(rowIndex - 1).locator("div.rt-td:nth-child(2)");
  }

  salaryCell(rowIndex: number): Locator {
    return this.tableRows.nth(rowIndex - 1).locator("div.rt-td:nth-child(5)");
  }

  departmentCell(rowIndex: number): Locator {
    return this.tableRows.nth(rowIndex - 1).locator("div.rt-td:nth-child(6)");
  }

  editButton(rowIndex: number): Locator {
    return this.tableRows.nth(rowIndex - 1).locator(`#edit-record-${rowIndex}`);
  }

  deleteButton(rowIndex: number): Locator {
    return this.tableRows.nth(rowIndex - 1).locator(`#delete-record-${rowIndex}`);
  }

  @logStep("Get user data by row index: {rowIndex}")
  async getUserData(rowIndex: number) {
    const row = this.tableRows.nth(rowIndex - 1);
    const cells = row.locator("div.rt-td");

    return {
      firstName: (await cells.nth(0).textContent())?.trim() || "",
      lastName: (await cells.nth(1).textContent())?.trim() || "",
      age: (await cells.nth(2).textContent())?.trim() || "",
      email: (await cells.nth(3).textContent())?.trim() || "",
      salary: (await cells.nth(4).textContent())?.trim() || "",
      department: (await cells.nth(5).textContent())?.trim() || "",
    };
  }

  @logStep("Click Add button")
  async clickAdd() {
    await this.addButton.click();
  }

  @logStep("Search user: {name}")
  async searchUser(name: string) {
    await this.searchBox.fill(name);
  }

  @logStep("Click Edit row {rowIndex}")
  async clickEdit(rowIndex: number) {
    await this.editButton(rowIndex).click();
  }

  @logStep("Click Delete row {rowIndex}")
  async clickDelete(rowIndex: number) {
    await this.deleteButton(rowIndex).click();
  }
}
