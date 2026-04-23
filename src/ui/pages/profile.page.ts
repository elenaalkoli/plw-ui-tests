import { Locator, Page, expect } from "@playwright/test";
import { DemoqaPage } from "./demoqa.page";
import { SELECTORS, SectionSelector } from "config/selectors";
import { logStep } from "data/report/logStep.utils";
import { TIMEOUTS } from "config/timeouts";
import { BookData } from "data/book-store.data";
import { DEMOQA_BASE_URL } from "config/env";
import { URLS } from "config/urls";

export class ProfilePage extends DemoqaPage {
  readonly usernameLabel: Locator;
  readonly logoutButton: Locator;
  readonly deleteAccountButton: Locator;
  readonly goToBookStoreButton: Locator;
  readonly bookRows: Locator;
  readonly deleteBookButton: Locator;
  readonly noBooksMessage: Locator;
  readonly uniqueElement: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameLabel = page.locator(SELECTORS.USERNAME_LABEL);
    this.logoutButton = page.locator(SELECTORS.BOOK_STORE_SUBMIT_BUTTON);
    this.deleteAccountButton = page.locator(SELECTORS.BOOK_STORE_SUBMIT_BUTTON);
    this.goToBookStoreButton = page.locator(SELECTORS.GO_TO_STORE_BUTTON);
    this.bookRows = page.locator(SELECTORS.BOOK_ROWS);
    this.deleteBookButton = page.locator(SELECTORS.DELETE_BOOK_BUTTON);
    this.noBooksMessage = page.locator(SELECTORS.NO_BOOKS_MESSAGE);
    this.uniqueElement = this.usernameLabel;
  }

  protected getSectionSelector(): SectionSelector {
    return SELECTORS.PROFILE_ITEM || SELECTORS.BOOKS_MENU;
  }

  protected getMenuSelector(): string {
    return SELECTORS.BOOKS_MENU;
  }

  protected getMenuUrl(): string {
    return URLS.PROFILE;
  }

  @logStep("Open Profile page")
  async open(): Promise<void> {
    await this.page.goto(`${DEMOQA_BASE_URL}${URLS.PROFILE}`);
    await this.dismissAd();
    await expect(this.uniqueElement).toBeVisible({ timeout: TIMEOUTS.UI.ELEMENT_VISIBLE });
  }

  @logStep("Get username from profile")
  async getUsername(): Promise<string> {
    await this.usernameLabel.waitFor({ state: 'visible', timeout: TIMEOUTS.UI.ELEMENT_VISIBLE });
    return await this.usernameLabel.textContent() || '';
  }

  @logStep("Get all books from profile")
  async getProfileBooks(): Promise<BookData[]> {
    const books: BookData[] = [];
    const rowCount = await this.bookRows.count();
    
    for (let i = 0; i < rowCount; i++) {
      const title = await this.bookRows.nth(i).locator(SELECTORS.BOOK_TITLE_CELL).textContent() || '';
      const author = await this.bookRows.nth(i).locator(SELECTORS.BOOK_AUTHOR_CELL).textContent() || '';
      const publisher = await this.bookRows.nth(i).locator(SELECTORS.BOOK_PUBLISHER_CELL).textContent() || '';
      
      if (title && author && publisher) {
        books.push({
          isbn: '', // ISBN is not displayed in profile table
          title: title.trim(),
          author: author.trim(),
          publisher: publisher.trim(),
          pages: 0,
          website: '',
        });
      }
    }
    
    return books;
  }

  @logStep("Delete book by title")
  async deleteBookByTitle(title: string): Promise<void> {
    const bookRow = this.bookRows.filter({ hasText: title }).first();
    const deleteButton = bookRow.locator(SELECTORS.DELETE_BOOK_BUTTON);
    
    // Handle confirmation dialog
    this.page.on('dialog', async dialog => {
      await dialog.accept();
    });
    
    await deleteButton.click();
    await this.bookRows.first().waitFor({ state: 'hidden', timeout: TIMEOUTS.UI.ELEMENT_HIDDEN }).catch(() => {});
  }

  @logStep("Delete all books")
  async deleteAllBooks(): Promise<void> {
    const rowCount = await this.bookRows.count();
    
    for (let i = 0; i < rowCount; i++) {
      const deleteButton = this.bookRows.first().locator(SELECTORS.DELETE_BOOK_BUTTON);
      
      // Handle confirmation dialog
      this.page.on('dialog', async dialog => {
        await dialog.accept();
      });
      
      await deleteButton.click();
      await this.page.waitForTimeout(TIMEOUTS.SHORT_DELAY);
    }
  }

  @logStep("Check if user has books")
  async hasBooks(): Promise<boolean> {
    const noBooksVisible = await this.noBooksMessage.isVisible();
    return !noBooksVisible;
  }

  @logStep("Go to book store")
  async goToBookStore(): Promise<void> {
    await this.goToBookStoreButton.click();
  }

  @logStep("Logout")
  async logout(): Promise<void> {
    await this.logoutButton.click();
  }

  @logStep("Delete account")
  async deleteAccount(): Promise<void> {
    // Handle confirmation dialog
    this.page.on('dialog', async dialog => {
      await dialog.accept();
    });
    
    await this.deleteAccountButton.click();
  }
}
