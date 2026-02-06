import { expect } from "@playwright/test";
import { CheckBoxPage } from "../pages/check-box.page";

export class CheckBoxUIService {
  constructor(private readonly checkBoxPage: CheckBoxPage) {}

  async verifyCheckResult(expected: string) {
    const actual = await this.checkBoxPage.getResultText();
    expect(actual).toContain(expected);
  }
}