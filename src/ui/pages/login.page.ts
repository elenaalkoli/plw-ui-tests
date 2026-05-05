import { Locator, Page, expect } from "@playwright/test";
import { DemoqaPage } from "./demoqa.page";
import { SELECTORS, SectionSelector } from "config/selectors";
import { logStep } from "data/report/logStep.utils";
import { TIMEOUTS } from "config/timeouts";
import { DEMOQA_BASE_URL } from "config/env";
import { URLS } from "config/urls";

export class LoginPage extends DemoqaPage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly newUserButton: Locator;
  readonly errorMessage: Locator;
  readonly uniqueElement: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator(SELECTORS.USERNAME_INPUT);
    this.passwordInput = page.locator(SELECTORS.PASSWORD_INPUT);
    this.loginButton = page.locator(SELECTORS.LOGIN_BUTTON);
    this.newUserButton = page.locator(SELECTORS.NEW_USER_BUTTON);
    this.errorMessage = page.locator(SELECTORS.ERROR_MESSAGE);
    this.uniqueElement = this.loginButton;
  }

  protected getSectionSelector(): SectionSelector {
    return SELECTORS.LOGIN_ITEM || SELECTORS.BOOKS_MENU;
  }

  protected getMenuSelector(): string {
    return SELECTORS.BOOKS_MENU;
  }

  protected getMenuUrl(): string {
    return URLS.LOGIN;
  }

  @logStep("Open Login page")
  async open(): Promise<void> {
    await this.page.goto(`${DEMOQA_BASE_URL}${URLS.LOGIN}`);
    await this.dismissAd();
    await expect(this.uniqueElement).toBeVisible({ timeout: TIMEOUTS.UI.ELEMENT_VISIBLE });
  }

  @logStep("Fill login form")
  async fillLoginForm(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
  }

  @logStep("Click login button")
  async clickLogin(): Promise<void> {
    await this.loginButton.click();
  }

  @logStep("Login with credentials")
  async login(username: string, password: string): Promise<void> {
    await this.fillLoginForm(username, password);
    await this.clickLogin();
  }

  @logStep("Get error message")
  async getErrorMessage(): Promise<string> {
    await this.errorMessage.waitFor({ state: 'visible', timeout: TIMEOUTS.UI.ELEMENT_VISIBLE });
    return await this.errorMessage.textContent() || '';
  }

  @logStep("Check if login is successful")
  async isLoginSuccessful(): Promise<boolean> {
    try {
      await this.page.waitForURL('**/profile', { timeout: TIMEOUTS.UI.ELEMENT_VISIBLE });
      return true;
    } catch {
      return false;
    }
  }
}
