import { test as base } from "@playwright/test";
import { TextBoxPage } from "../ui/pages/text-box.page";
import { TextBoxUIService } from "ui/services/text-box.ui-service";
import { CheckBoxPage } from "ui/pages/check-box.page";
import { CheckBoxUIService } from "ui/services/check-box.ui-service";
import { WebTablePage } from "ui/pages/web-tables.page";
import { RegistrationFormModal } from "ui/pages/registration-form-modal.page";
import { WebTableUIService } from "ui/services/web-table.ui-service";

export interface UIPages {
  textBoxPage: TextBoxPage;
  checkBoxPage: CheckBoxPage;
  webTablePage: WebTablePage;
  registrationFormModal: RegistrationFormModal;

  textBoxUIService: TextBoxUIService;
  checkBoxUIService: CheckBoxUIService;
  webTableUIService: WebTableUIService;
}

export const test = base.extend<UIPages>({
  textBoxPage: async ({ page }, use) => {
    await use(new TextBoxPage(page));
  },
  checkBoxPage: async ({ page }, use) => {
    await use(new CheckBoxPage(page));
  },
  webTablePage: async ({ page }, use) => {
    await use(new WebTablePage(page));
  },
  registrationFormModal: async ({ page }, use) => {
    await use(new RegistrationFormModal(page));
  },

  textBoxUIService: async ({ page }, use) => {
    await use(new TextBoxUIService(page));
  },
  checkBoxUIService: async ({ page }, use) => {
    await use(new CheckBoxUIService(page));
  },
  webTableUIService: async ({ page }, use) => {
    await use(new WebTableUIService(page));
  },
});

export { expect } from "@playwright/test";
