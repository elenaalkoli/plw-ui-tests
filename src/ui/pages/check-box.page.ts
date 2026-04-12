import { DemoqaPage } from "./demoqa.page";
import { logStep } from "data/report/logStep.utils";
import { TIMEOUTS } from "config/timeouts";
import { SectionSelector, SELECTORS } from "config/selectors";
import { expect } from "@playwright/test";

export class CheckBoxPage extends DemoqaPage {
  readonly title = this.page.getByRole("heading", { name: "Check Box" });
  readonly result = this.page.locator("#result");
  readonly closedTreeNodes = this.page.locator("span.rc-tree-switcher_close");

  readonly elementsMenu = this.page.locator(SELECTORS.ELEMENTS_MENU);
  readonly checkboxItem = this.page.locator(SELECTORS.CHECKBOX_ITEM);

  readonly checkboxByName = (name: string) =>
    this.page.locator(`span[aria-label="Select ${name}"]`);

  readonly uniqueElement = this.title;

  protected getSectionSelector(): SectionSelector {
    return SELECTORS.CHECKBOX_ITEM;
  }

  @logStep("Expand all tree nodes")
  private async expandAllTree() {
    let hasClosedNodes = true;

    while (hasClosedNodes) {
      hasClosedNodes = (await this.closedTreeNodes.count()) > 0;

      if (hasClosedNodes) {
        await this.closedTreeNodes.first().click();
        // small delay to allow tree node to expand before next iteration
        await this.page.waitForTimeout(TIMEOUTS.SMALL_DELAY);
      }
    }
  }

  @logStep("Select checkbox {name}")
  async selectCheckbox(name: string) {
    await this.expandAllTree();

    const checkbox = this.checkboxByName(name);
    await expect(checkbox).toBeVisible();
    await checkbox.click();

    await expect(this.result).toBeVisible({ timeout: TIMEOUTS.UI.ELEMENT_VISIBLE });
  }

  @logStep("Get check result")
  async getResultText(): Promise<string> {
    await expect(this.result).toBeVisible({ timeout: TIMEOUTS.UI.ELEMENT_VISIBLE });
    const text = await this.result.textContent();
    if (!text?.trim()) {
      throw new Error("CheckBox result text is empty or contains only whitespace");
    }
    return text.trim();
  }
}
