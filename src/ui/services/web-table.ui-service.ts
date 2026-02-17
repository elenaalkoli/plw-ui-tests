import { expect, Page } from "@playwright/test";
import { BaseUIService } from "./base.ui-service";
import { WebTablePage } from "ui/pages/web-tables.page";
import { RegistrationFormModal } from "ui/pages/registration-form-modal.page";
import {
  RegistrationFormData,
  generateRegistrationFormData,
} from "../../data/registration-form.data";

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
    await expect(this.webTablePage.rowByFirstName(firstName)).toBeVisible();
  }

  async verifyUserNotExists(rowIndex: number): Promise<void> {
    await this.webTablePage.clearSearchBox();
    await this.page.waitForTimeout(1500);
    await expect(this.webTablePage.tableRows.nth(rowIndex - 1)).not.toBeVisible();
  }

  async verifyUserUpdated(
    rowIndex: number,
    expectedSalary: string,
    expectedDepartment: string
  ): Promise<void> {
    await this.webTablePage.clearSearchBox();
    await this.page.waitForTimeout(1500);

    const data = await this.webTablePage.getUserData(rowIndex);

    expect(data.salary).toBe(expectedSalary);
    expect(data.department).toBe(expectedDepartment);
  }

  async searchAndVerifyUser(name: string): Promise<void> {
    await this.webTablePage.searchUser(name);
    await expect(this.webTablePage.rowByFirstName(name)).toBeVisible();
  }
}
