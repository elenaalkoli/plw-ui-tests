import { logStep } from "data/report/logStep.utils";
import { DemoqaPage } from "./demoqa.page";

export class TextBoxPage extends DemoqaPage {
  readonly title = this.page.locator("h1.text-center:has-text('Text Box')");
  readonly form = this.page.locator("#userForm");
  readonly fullNameInput = this.form.locator("#userName");
  readonly emailInput = this.form.locator("#userEmail");
  readonly currentAddressInput = this.form.locator("#currentAddress");
  readonly permanentAddressInput = this.form.locator("#permanentAddress");
  readonly submitButton = this.page.locator("#submit");
  readonly output = this.form.locator("#output");

  readonly nameOutput = this.output.locator("#name");
  readonly emailOutput = this.output.locator("#email");
  readonly currentAddressOutput = this.output.locator("#currentAddress");
  readonly permanentAddressOutput = this.output.locator("#permanentAddress");

  readonly uniqueElement = this.title;

  @logStep("Navigate to Text Box section")
  async navigateToSection(): Promise<void> {
    await this.page.locator('a[href="/elements"]').click();
    await this.page.waitForURL("**/elements");
    await this.page.locator('#item-0 span.text:has-text("Text Box")').click();
  }

  @logStep("Click Submit button")
  async clickSubmit() {
    await this.submitButton.click();
  }
}
