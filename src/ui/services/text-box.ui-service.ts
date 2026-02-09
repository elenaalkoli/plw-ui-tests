// src/ui/services/text-box.ui-service.ts
import { expect, Page } from "@playwright/test";
import { BaseUIService } from "./base.ui-service";
import { TextBoxPage } from "../pages/text-box.page";
import { TextBoxData, generateTextBoxData } from "../../data/text-box.data";
import { UI_ROUTES } from "config/ui-routes";

export class TextBoxUIService extends BaseUIService {
  private readonly textBoxPage: TextBoxPage;

  constructor(page: Page) {
    super(page);
    this.textBoxPage = new TextBoxPage(page);
  }

  async fillAndSubmitForm(data?: TextBoxData): Promise<TextBoxData> {
    const formData = data || generateTextBoxData();
    await this.textBoxPage.fullNameInput.fill(formData.fullName);
    await this.textBoxPage.emailInput.fill(formData.email);
    await this.textBoxPage.currentAddressInput.fill(formData.currentAddress);
    await this.textBoxPage.permanentAddressInput.fill(formData.permanentAddress);

    await this.textBoxPage.clickSubmit();

    return formData;
  }

  async verifyFormResult(expectedData: TextBoxData): Promise<void> {
    await this.textBoxPage.output.scrollIntoViewIfNeeded();
    await this.textBoxPage.output.waitFor({ state: "visible", timeout: 20000 });

    await expect(this.textBoxPage.nameOutput).toContainText(expectedData.fullName);
    await expect(this.textBoxPage.emailOutput).toContainText(expectedData.email);
    await expect(this.textBoxPage.currentAddressOutput).toContainText(expectedData.currentAddress);
    await expect(this.textBoxPage.permanentAddressOutput).toContainText(
      expectedData.permanentAddress
    );
  }
}
