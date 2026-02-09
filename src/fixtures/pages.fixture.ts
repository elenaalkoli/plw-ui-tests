import { test as base } from "@playwright/test";
import { TextBoxPage } from "../ui/pages/text-box.page";
import { TextBoxUIService } from "ui/services/text-box.ui-service";
import { CheckBoxPage } from "ui/pages/check-box.page";
import { CheckBoxUIService } from "ui/services/check-box.ui-service";

export interface UIPages {
  //pages
  textBoxPage: TextBoxPage;
  checkBoxPage: CheckBoxPage;
  //ui-services
  textBoxUIService: TextBoxUIService;
  checkBoxUIService: CheckBoxUIService;
}

export const test = base.extend<UIPages>({
  //pages
  textBoxPage: async ({ page }, use) => {
    await use(new TextBoxPage(page));
  },
  checkBoxPage: async ({ page }, use) => {
    await use(new CheckBoxPage(page));
  },
  //ui-services
  textBoxUIService: async ({ page }, use) => {
    await use(new TextBoxUIService(page));
  },
  checkBoxUIService: async ({ page }, use) => {
    await use(new CheckBoxUIService(page));
  },
});

export { expect } from "@playwright/test";
