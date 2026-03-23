import { expect, Page } from "@playwright/test";
import { BaseUIService } from "./base.ui-service";
import { WebTablePage } from "ui/pages/web-tables.page";
import { RegistrationFormModal } from "ui/pages/registration-form-modal.page";
import {
  RegistrationFormData,
  generateRegistrationFormData,
} from "../../data/registration-form.data";
import { TIMEOUTS } from "config/timeouts";

export class WebTableUIService extends BaseUIService {
  private readonly webTablePage: WebTablePage;
  private readonly registrationFormModal: RegistrationFormModal;

  constructor(page: Page) {
    super(page);
    this.webTablePage = new WebTablePage(page);
    this.registrationFormModal = new RegistrationFormModal(page);
  }

  async fillAndSubmitForm(data?: RegistrationFormData): Promise<RegistrationFormData> {
    const formData = data || generateRegistrationFormData();

    await this.webTablePage.clickAdd();
    await this.registrationFormModal.fillForm(formData);
    await this.registrationFormModal.clickSubmit();

    return formData;
  }

  async verifyUserCreated(firstName: string): Promise<void> {
    const row = await this.webTablePage.rowByFirstName(firstName);
    await expect(row).toBeVisible({ timeout: TIMEOUTS.UI.ELEMENT_VISIBLE });
  }

  async verifyUserNotExists(firstName: string): Promise<void> {
    await this.webTablePage.clearSearchBox();
    await expect(this.webTablePage.tableRows.first()).toBeVisible();

    const rowCount = await this.webTablePage.tableRows.count();
    for (let i = 0; i < rowCount; i++) {
      const row = this.webTablePage.tableRows.nth(i);
      const cellText = await this.webTablePage.firstNameCell(row).textContent();
      if (cellText?.trim() === firstName) {
        throw new Error(`User "${firstName}" still exists after delete in row ${i + 1}`);
      }
    }
  }

  async verifyUserUpdated(
    firstName: string,
    expectedSalary: string,
    expectedDepartment: string
  ): Promise<void> {
    await this.webTablePage.clearSearchBox();
    const row = await this.webTablePage.rowByFirstName(firstName);
    const { salary, department } = await this.webTablePage.getUserData(row);

    expect(salary).toBe(expectedSalary);
    expect(department).toBe(expectedDepartment);
  }

  async searchAndVerifyUser(name: string): Promise<void> {
    await this.webTablePage.searchUser(name);
    const row = await this.webTablePage.rowByFirstName(name);
    await expect(row).toBeVisible({ timeout: TIMEOUTS.UI.ELEMENT_VISIBLE });
  }

  async deleteRowByFirstName(firstName: string): Promise<void> {
    await this.webTablePage.clearSearchBox();
    await this.webTablePage.deleteRowByFirstName(firstName);
  }

  async editUserByFirstName(firstName: string): Promise<void> {
    await this.webTablePage.clearSearchBox();
    await this.webTablePage.clickEditByFirstName(firstName);
  }
}
