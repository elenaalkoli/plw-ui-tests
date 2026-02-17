import { DemoqaPage } from "./demoqa.page";
import { logStep } from "utils/report/logStep.utils";

export class CheckBoxPage extends DemoqaPage {
  readonly title = this.page.locator("h1.text-center:has-text('Check Box')");
  readonly tree = this.page.locator(".rc-tree-list");
  readonly result = this.page.locator("#result");

  readonly uniqueElement = this.title;

  @logStep("Navigate to Text Box section")
  async navigateToSection(): Promise<void> {
    await this.page.locator('a[href="/elements"]').click();
    await this.page.waitForURL("**/elements");
    await this.page.locator('#item-1 span:has-text("Check Box")').click(); // Text Box
  }

  @logStep("Expand all tree nodes")
  private async expandAllTree() {
    let hasClosedNodes = true;

    while (hasClosedNodes) {
      const closedNodes = this.page.locator("span.rc-tree-switcher_close");
      hasClosedNodes = (await closedNodes.count()) > 0;

      if (hasClosedNodes) {
        await closedNodes.first().click();
        await this.page.waitForTimeout(300);
      }
    }
  }

  @logStep("Select checkbox {name}")
  async selectCheckbox(name: string) {
    await this.expandAllTree();

    const checkbox = this.page.locator(`span[aria-label="Select ${name}"]`);
    await checkbox.scrollIntoViewIfNeeded();
    await checkbox.click();

    await this.result.waitFor({ state: "visible", timeout: 5000 });
  }

  @logStep("Get check result")
  async getResultText(): Promise<string> {
    await this.result.waitFor({ state: "visible", timeout: 5000 });
    return (await this.result.textContent()) ?? "";
  }
}
