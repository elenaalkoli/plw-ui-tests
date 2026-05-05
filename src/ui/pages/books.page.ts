import { Locator, Page, expect } from "@playwright/test";
import { DemoqaPage } from "./demoqa.page";
import { SELECTORS, SectionSelector } from "config/selectors";
import { logStep } from "data/report/logStep.utils";
import { TIMEOUTS } from "config/timeouts";
import { BookData } from "data/book-store.data";
import { DEMOQA_BASE_URL } from "config/env";
import { URLS } from "config/urls";

export class BooksPage extends DemoqaPage {
  readonly searchBox: Locator;
  readonly loginButton: Locator;
  readonly bookRows: Locator;
  readonly bookTitle: Locator;
  readonly bookAuthor: Locator;
  readonly bookPublisher: Locator;
  readonly uniqueElement: Locator;

  constructor(page: Page) {
    super(page);
    this.searchBox = page.locator(SELECTORS.SEARCH_BOX);
    this.loginButton = page.locator(SELECTORS.LOGIN_BUTTON);
    this.bookRows = page.locator(SELECTORS.BOOK_ROWS);
    this.bookTitle = page.locator(SELECTORS.BOOK_TITLE_CELL);
    this.bookAuthor = page.locator(SELECTORS.BOOK_AUTHOR_CELL);
    this.bookPublisher = page.locator(SELECTORS.BOOK_PUBLISHER_CELL);
    this.uniqueElement = this.searchBox;
  }

  protected getSectionSelector(): SectionSelector {
    return SELECTORS.BOOK_STORE_ITEM || SELECTORS.BOOKS_MENU;
  }

  protected getMenuSelector(): string {
    return SELECTORS.BOOKS_MENU;
  }

  protected getMenuUrl(): string {
    return URLS.BOOKS;
  }

  @logStep("Open Book Store page")
  async open(): Promise<void> {
    await this.page.goto(`${DEMOQA_BASE_URL}${URLS.BOOKS}`);
    await this.dismissAd();
    await expect(this.uniqueElement).toBeVisible({ timeout: TIMEOUTS.UI.ELEMENT_VISIBLE });
  }

  @logStep("Search books by query")
  async searchBooks(query: string): Promise<void> {
    await this.searchBox.fill(query);
    await expect(this.bookRows.first()).toBeVisible({ timeout: TIMEOUTS.UI.ELEMENT_VISIBLE });
  }

  @logStep("Get all visible books")
  async getAllVisibleBooks(): Promise<BookData[]> {
    const books: BookData[] = [];
    const rowCount = await this.bookRows.count();
    
    for (let i = 0; i < rowCount; i++) {
      const title = await this.bookRows.nth(i).locator(SELECTORS.BOOK_TITLE_CELL).textContent() || '';
      const author = await this.bookRows.nth(i).locator(SELECTORS.BOOK_AUTHOR_CELL).textContent() || '';
      const publisher = await this.bookRows.nth(i).locator(SELECTORS.BOOK_PUBLISHER_CELL).textContent() || '';
      
      if (title && author && publisher) {
        books.push({
          isbn: '', // Will be filled when clicking on book
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

  @logStep("Click on book by title")
  async clickBookByTitle(title: string): Promise<void> {
    const bookRow = this.bookRows.filter({ hasText: title }).first();
    await bookRow.click();
  }

  @logStep("Get book details from current page")
  async getBookDetails(): Promise<BookData> {
    const isbn = await this.page.locator(SELECTORS.ISBN_WRAPPER).textContent() || '';
    const title = await this.page.locator(SELECTORS.TITLE_WRAPPER).textContent() || '';
    const author = await this.page.locator(SELECTORS.AUTHOR_WRAPPER).textContent() || '';
    const publisher = await this.page.locator(SELECTORS.PUBLISHER_WRAPPER).textContent() || '';
    const pagesText = await this.page.locator(SELECTORS.PAGES_WRAPPER).textContent() || '';
    const website = await this.page.locator(SELECTORS.WEBSITE_WRAPPER).textContent() || '';
    
    return {
      isbn: isbn.trim(),
      title: title.trim(),
      author: author.trim(),
      publisher: publisher.trim(),
      pages: parseInt(pagesText.trim()) || 0,
      website: website.trim(),
    };
  }

  @logStep("Add book to collection")
  async addBookToCollection(): Promise<void> {
    const addButton = this.page.locator(SELECTORS.ADD_NEW_RECORD_BUTTON);
    this.page.once('dialog', async dialog => {
      await dialog.accept();
    });
    await addButton.click();
  }

  @logStep("Go back to book store")
  async backToBookStore(): Promise<void> {
    const backButton = this.page.locator(SELECTORS.ADD_NEW_RECORD_BUTTON);
    await backButton.click();
  }

  @logStep("Check if login button is visible")
  async isLoginButtonVisible(): Promise<boolean> {
    return await this.loginButton.isVisible();
  }

  @logStep("Click login button")
  async clickLoginButton(): Promise<void> {
    await this.loginButton.click();
  }
}
