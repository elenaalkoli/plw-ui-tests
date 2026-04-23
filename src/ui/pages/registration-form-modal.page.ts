import { logStep } from "data/report/logStep.utils";
import { BaseModal } from "./base.modal";
import { RegistrationFormData } from "data/registration-form.data";
import { TIMEOUTS } from "config/timeouts";
import { expect } from "@playwright/test";
import { SELECTORS } from "config/selectors";

export class RegistrationFormModal extends BaseModal {
  readonly uniqueElement = this.page.locator(SELECTORS.REGISTRATION_MODAL);

  readonly modalContent = this.page.locator(SELECTORS.MODAL_CONTENT);
  readonly firstNameInput = this.modalContent.locator(SELECTORS.FIRST_NAME);
  readonly lastNameInput = this.modalContent.locator(SELECTORS.LAST_NAME);
  readonly userEmailInput = this.modalContent.locator(SELECTORS.USER_EMAIL);
  readonly ageInput = this.modalContent.locator(SELECTORS.AGE);
  readonly salaryInput = this.modalContent.locator(SELECTORS.SALARY);
  readonly departmentInput = this.modalContent.locator(SELECTORS.DEPARTMENT);
  readonly submitButton = this.modalContent.locator(SELECTORS.SUBMIT_BUTTON);
  readonly closeButton = this.modalContent.locator(SELECTORS.CLOSE_BUTTON);

  @logStep("Fill registration form")
  async fillForm(data: RegistrationFormData) {
    await this.waitForOpened();
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.userEmailInput.fill(data.email);
    await this.ageInput.fill(data.age);
    await this.salaryInput.fill(data.salary);
    await this.departmentInput.fill(data.department);
  }

  @logStep("Update salary and department")
  async updateSalaryAndDepartment(salary: string, department: string) {
    await this.waitForOpened();

    await expect(this.salaryInput).toBeVisible({ timeout: TIMEOUTS.UI.ELEMENT_VISIBLE });
    await this.salaryInput.fill(salary);

    await expect(this.departmentInput).toBeVisible({ timeout: TIMEOUTS.UI.ELEMENT_VISIBLE });
    await this.departmentInput.fill(department);
  }

  @logStep("Click Submit button")
  async clickSubmit() {
    await expect(this.submitButton).toBeVisible();
    await this.submitButton.click();
  }
}
