import { logStep } from "data/report/logStep.utils";
import { BaseModal } from "./base.modal";
import { RegistrationFormData } from "data/registration-form.data";
import { TIMEOUTS } from "config/timeouts";
import { expect } from "@playwright/test";

export class RegistrationFormModal extends BaseModal {
  readonly uniqueElement = this.page.locator("#registration-form-modal");

  readonly modalContent = this.page.locator(".modal-content");
  readonly firstNameInput = this.modalContent.locator("#firstName");
  readonly lastNameInput = this.modalContent.locator("#lastName");
  readonly userEmailInput = this.modalContent.locator("#userEmail");
  readonly ageInput = this.modalContent.locator("#age");
  readonly salaryInput = this.modalContent.locator("#salary");
  readonly departmentInput = this.modalContent.locator("#department");
  readonly submitButton = this.modalContent.locator("#submit");
  readonly closeButton = this.modalContent.locator(".close");

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
