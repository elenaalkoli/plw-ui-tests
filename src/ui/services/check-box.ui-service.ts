import { expect, Page } from "@playwright/test";
import { CheckBoxPage } from "../pages/check-box.page";
import { BaseUIService } from "./base.ui-service";
import { UI_ROUTES } from "config/ui-routes";

export class CheckBoxUIService extends BaseUIService {
  private readonly checkBoxPage: CheckBoxPage;

  constructor(page: Page) {
    super(page);
    this.checkBoxPage = new CheckBoxPage(page);
  }

  async verifyCheckResult(expected: string): Promise<void> {
    const actual = await this.checkBoxPage.getResultText();
    expect(actual).toContain(expected);
  }
}
