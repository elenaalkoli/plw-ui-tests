import { logStep } from "data/report/logStep.utils";
import { DemoqaPage } from "./demoqa.page";
import { SectionSelector, SELECTORS } from "config/selectors";
import { URLS } from "config/urls";

export class TextBoxPage extends DemoqaPage {
  readonly title = this.page.getByRole("heading", { name: SELECTORS.PAGE_TITLES.TEXT_BOX });
  readonly form = this.page.locator(SELECTORS.USER_FORM);
  readonly fullNameInput = this.form.locator(SELECTORS.USER_NAME);
  readonly emailInput = this.form.locator(SELECTORS.USER_EMAIL);
  readonly currentAddressInput = this.form.locator(SELECTORS.CURRENT_ADDRESS);
  readonly permanentAddressInput = this.form.locator(SELECTORS.PERMANENT_ADDRESS);
  readonly submitButton = this.page.locator(SELECTORS.USER_FORM + " " + SELECTORS.SUBMIT_BUTTON);
  readonly output = this.form.locator(SELECTORS.OUTPUT);

  readonly nameOutput = this.output.locator(SELECTORS.NAME_OUTPUT);
  readonly emailOutput = this.output.locator(SELECTORS.EMAIL_OUTPUT);
  readonly currentAddressOutput = this.output.locator(SELECTORS.CURRENT_ADDRESS_OUTPUT);
  readonly permanentAddressOutput = this.output.locator(SELECTORS.PERMANENT_ADDRESS_OUTPUT);

  readonly elementsMenu = this.page.locator(SELECTORS.ELEMENTS_MENU);
  readonly textBoxItem = this.page.locator(SELECTORS.TEXTBOX_ITEM);

  readonly uniqueElement = this.title;

  protected getSectionSelector(): SectionSelector {
    return SELECTORS.TEXTBOX_ITEM;
  }

  protected getMenuSelector(): string {
    return SELECTORS.ELEMENTS_MENU;
  }

  protected getMenuUrl(): string {
    return URLS.ELEMENTS;
  }

  @logStep("Click Submit button")
  async clickSubmit() {
    await this.submitButton.click();
  }
}
