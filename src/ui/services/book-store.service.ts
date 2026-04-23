import { APIRequestContext } from "@playwright/test";
import { BookStoreApiClient } from "../../api/book-store.api";
import { BookData, UserCredentials, BookStoreResult } from "../../data/book-store.data";
import { SearchByTitle, SearchByAuthor, SearchByPublisher } from "./search-strategy";

export class BookStoreService {
  private apiClient: BookStoreApiClient;
  private searchStrategies = {
    title: new SearchByTitle(),
    author: new SearchByAuthor(),
    publisher: new SearchByPublisher(),
  };

  constructor(request: APIRequestContext) {
    this.apiClient = new BookStoreApiClient(request);
  }

  async searchBooks(books: BookData[], query: string, strategy: 'title' | 'author' | 'publisher'): Promise<BookData[]> {
    const searchStrategy = this.searchStrategies[strategy];
    return searchStrategy.search(books, query);
  }

  async getAllBooksFromAPI(): Promise<BookData[]> {
    return await this.apiClient.getBooks();
  }

  async getBookByIsbn(isbn: string): Promise<BookData> {
    return await this.apiClient.getBookByIsbn(isbn);
  }

  async setupUserAndBooks(credentials: UserCredentials, isbnCollection: string[]): Promise<string> {
    const token = await this.apiClient.authorizeUser(credentials);
    const userId = await this.getUserId(credentials.username);
    await this.apiClient.addBooksToUser(userId, isbnCollection, token);
    return token;
  }

  async getUserBooks(credentials: UserCredentials, token: string): Promise<BookData[]> {
    const userId = await this.getUserId(credentials.username);
    return await this.apiClient.getUserBooks(userId, token);
  }

  async removeBookFromUser(credentials: UserCredentials, isbn: string, token: string): Promise<void> {
    const userId = await this.getUserId(credentials.username);
    await this.apiClient.removeBookFromUser(userId, isbn, token);
  }

  async performBookSearchWorkflow(books: BookData[], searchQuery: string): Promise<BookStoreResult> {
    const titleResults = await this.searchBooks(books, searchQuery, 'title');
    const authorResults = await this.searchBooks(books, searchQuery, 'author');
    
    const allResults = Array.from(
      new Map([...titleResults, ...authorResults].map(book => [book.isbn, book])).values()
    );

    return {
      searchResults: allResults,
      selectedBooks: allResults.slice(0, 2),
      profileBooks: [],
    };
  }

  private async getUserId(username: string): Promise<string> {
    return `user_${Buffer.from(username).toString('base64').substring(0, 10)}`;
  }
}
