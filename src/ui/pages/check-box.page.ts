import { expect } from "@playwright/test";
import { DemoqaPage } from "./demoqa.page";
import { logStep } from "utils/report/logStep.utils";

export class CheckBoxPage extends DemoqaPage {
  readonly title = this.page.locator("h1.text-center");
  readonly expandAllButton = this.page.locator(".rct-option-expand-all");
  readonly treeTitle = this.page.locator(".rct-title");
  readonly result = this.page.locator("#result");

  readonly uniqueElement = this.title;

  @logStep("Expand all checkboxes")
  async expandAll() {
    await this.expandAllButton.click();
  }

  @logStep("Select checkbox")
  async selectCheckbox(name: string) {
    await this.expandAll();
    const checkboxLabel = this.treeTitle.filter({ hasText: name });
    await checkboxLabel.scrollIntoViewIfNeeded();
    await checkboxLabel.click();
  }

  @logStep("Мerify сheck result")
  async verifyCheckResult(expected: string) {
    await this.result.waitFor({ state: "visible", timeout: 5000 });
    await expect(this.result).toContainText(expected);
  }
}
