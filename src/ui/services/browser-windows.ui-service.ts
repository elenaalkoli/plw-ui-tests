import { expect, Page } from "@playwright/test";
import { BaseUIService } from "./base.ui-service";
import { BrowserWindowsPage } from "ui/pages/browser-windows.page";
import { SELECTORS } from "config/selectors";

export class BrowserWindowsUIService extends BaseUIService {
  private readonly browserWindowsPage: BrowserWindowsPage;

  constructor(page: Page) {
    super(page);
    this.browserWindowsPage = new BrowserWindowsPage(page);
  }

  async openNewTabAndGetText(): Promise<string> {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent("page"),
      this.browserWindowsPage.clickNewTab(),
    ]);
    await newPage.waitForLoadState();
    const text = await newPage.locator(SELECTORS.SAMPLE_HEADING).textContent();
    await newPage.close();
    return text?.trim() ?? "";
  }

  async openNewWindowAndGetText(): Promise<string> {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent("page"),
      this.browserWindowsPage.clickNewWindow(),
    ]);
    await newPage.waitForLoadState();
    const text = await newPage.locator(SELECTORS.SAMPLE_HEADING).textContent();
    await newPage.close();
    return text?.trim() ?? "";
  }

  async verifyNewTabText(expected: string): Promise<void> {
    const text = await this.openNewTabAndGetText();
    expect(text).toBe(expected);
  }

  async verifyNewWindowText(expected: string): Promise<void> {
    const text = await this.openNewWindowAndGetText();
    expect(text).toBe(expected);
  }
}
