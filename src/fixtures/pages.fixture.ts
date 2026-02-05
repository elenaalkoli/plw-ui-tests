import { test as base } from "@playwright/test";
import { TextBoxPage } from "../ui/pages/text-box.page";
import { TextBoxUIService } from "ui/services/text-box.ui-service";

export interface UIPages {
  //pages
  textBoxPage: TextBoxPage;
  //ui-services
  textBoxUIService: TextBoxUIService;
}

export const test = base.extend<UIPages>({
  //pages
  textBoxPage: async ({ page }, use) => {
    await use(new TextBoxPage(page));
  },
  //ui-services
  textBoxUIService: async ({ page }, use) => {  
    await use(new TextBoxUIService(page));
  },
});

export { expect } from "@playwright/test";
