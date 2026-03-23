import { logStep } from "data/report/logStep.utils";
import { DemoqaPage } from "./demoqa.page";
import { SELECTORS } from "config/selectors";
import { TIMEOUTS } from "config/timeouts";
import { URLS } from "config/urls";

export class TextBoxPage extends DemoqaPage {
  readonly title = this.page.getByRole("heading", { name: "Text Box" });
  readonly form = this.page.locator("#userForm");
  readonly fullNameInput = this.form.locator("#userName");
  readonly emailInput = this.form.locator("#userEmail");
  readonly currentAddressInput = this.form.locator("#currentAddress");
  readonly permanentAddressInput = this.form.locator("#permanentAddress");
  readonly submitButton = this.page.locator("#userForm #submit");
  readonly output = this.form.locator("#output");

  readonly nameOutput = this.output.locator("#name");
  readonly emailOutput = this.output.locator("#email");
  readonly currentAddressOutput = this.output.locator("#currentAddress");
  readonly permanentAddressOutput = this.output.locator("#permanentAddress");

  readonly elementsMenu = this.page.locator(SELECTORS.ELEMENTS_MENU);
  readonly textBoxItem = this.page.locator(SELECTORS.TEXTBOX_ITEM);

  readonly uniqueElement = this.title;

  @logStep("Navigate to Text Box section")
  async navigateToSection(): Promise<void> {
    await this.elementsMenu.click();
    await this.page.waitForURL(`${URLS.ELEMENTS}**`, { timeout: TIMEOUTS.PAGE.NAVIGATION });
    await this.textBoxItem.click();
  }

  @logStep("Click Submit button")
  async clickSubmit() {
    await this.submitButton.click();
  }
}
