import { test as base } from "@playwright/test";
import { TextBoxPage } from "../ui/pages/text-box.page";

export interface UIPages {
  textBoxPage: TextBoxPage;
}

export const test = base.extend<UIPages>({
  textBoxPage: async ({ page }, use) => {
    await use(new TextBoxPage(page));
  },
});

export { expect } from "@playwright/test";