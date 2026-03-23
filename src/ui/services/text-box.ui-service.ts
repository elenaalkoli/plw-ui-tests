import { expect, Page } from "@playwright/test";
import { BaseUIService } from "./base.ui-service";
import { TextBoxPage } from "../pages/text-box.page";
import { TextBoxData, generateTextBoxData } from "../../data/text-box.data";
import { TIMEOUTS } from "config/timeouts";

export class TextBoxUIService extends BaseUIService {
  private readonly textBoxPage: TextBoxPage;

  constructor(page: Page) {
    super(page);
    this.textBoxPage = new TextBoxPage(page);
  }

  async fillAndSubmitForm(data?: TextBoxData): Promise<TextBoxData> {
    const formData = data || generateTextBoxData();
    await expect(this.textBoxPage.form).toBeVisible();

    await this.textBoxPage.fullNameInput.fill(formData.fullName);
    await this.textBoxPage.emailInput.fill(formData.email);
    await this.textBoxPage.currentAddressInput.fill(formData.currentAddress);
    await this.textBoxPage.permanentAddressInput.fill(formData.permanentAddress);
    await this.textBoxPage.clickSubmit();

    return formData;
  }

  async verifyFormResult(expectedData: TextBoxData): Promise<void> {
    await expect(this.textBoxPage.output).toBeVisible({ timeout: TIMEOUTS.UI.ELEMENT_VISIBLE });

    await Promise.all([
      expect(this.textBoxPage.nameOutput).toContainText(expectedData.fullName),
      expect(this.textBoxPage.emailOutput).toContainText(expectedData.email),
      expect(this.textBoxPage.currentAddressOutput).toContainText(expectedData.currentAddress),
      expect(this.textBoxPage.permanentAddressOutput).toContainText(expectedData.permanentAddress),
    ]);
  }
}
