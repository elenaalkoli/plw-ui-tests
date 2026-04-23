import { APIRequestContext } from "@playwright/test";
import { BookStoreApiClient } from "../../api/book-store.api";
import { SetupContext, UserCredentials, BookData } from "../../data/book-store.data";

export class BookStoreSetup {
  private context: Partial<SetupContext> = {};
  private apiClient: BookStoreApiClient;

  constructor(request: APIRequestContext) {
    this.apiClient = new BookStoreApiClient(request);
  }

  withUser(credentials: UserCredentials): this {
    this.context.user = credentials;
    return this;
  }

  withRandomUser(): this {
    this.context.user = {
      username: `testuser_${Date.now()}`,
      password: `Test@123${Date.now()}`,
    };
    return this;
  }

  withBooks(books: BookData[]): this {
    this.context.books = books;
    return this;
  }

  withRandomBooks(count: number = 3): this {
    this.context.books = Array.from({ length: count }, (_, index) => ({
      isbn: `978012345678${index}`,
      title: `Test Book ${index + 1}`,
      author: `Test Author ${index + 1}`,
      publisher: `Test Publisher ${index + 1}`,
      pages: 200 + index * 50,
      website: `https://testbook${index + 1}.com`,
    }));
    return this;
  }

  async build(): Promise<SetupContext> {
    if (!this.context.user) {
      throw new Error("User credentials are required");
    }

    if (!this.context.books) {
      throw new Error("Books are required");
    }

    // Create user via API
    await this.apiClient.addUser(this.context.user);

    return {
      user: this.context.user,
      books: this.context.books,
    };
  }

  async cleanup(): Promise<void> {
    // Cleanup logic if needed
    // For now, users will be cleaned up by test teardown
  }
}
