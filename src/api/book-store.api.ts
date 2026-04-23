import { APIRequestContext } from "@playwright/test";
import { BookData, UserCredentials } from "../data/book-store.data";
import { API_ENDPOINTS } from "../config/api-endpoints";

export class BookStoreApiClient {
  constructor(private readonly request: APIRequestContext) {}

  async generateToken(credentials: UserCredentials): Promise<string> {
    const response = await this.request.post(API_ENDPOINTS.GENERATE_TOKEN, {
      data: {
        userName: credentials.username,
        password: credentials.password,
      },
    });

    if (!response.ok()) {
      throw new Error(`Failed to generate token: ${response.status()}`);
    }

    const body = await response.json();
    return body.token;
  }

  async addUser(credentials: UserCredentials): Promise<void> {
    const response = await this.request.post(API_ENDPOINTS.ADD_USER, {
      data: {
        userName: credentials.username,
        password: credentials.password,
      },
    });

    if (!response.ok()) {
      throw new Error(`Failed to add user: ${response.status()}`);
    }
  }

  async authorizeUser(credentials: UserCredentials): Promise<string> {
    const token = await this.generateToken(credentials);
    
    const response = await this.request.post(API_ENDPOINTS.AUTHORIZE_USER, {
      data: {
        userName: credentials.username,
        password: credentials.password,
      },
    });

    if (!response.ok()) {
      throw new Error(`Failed to authorize user: ${response.status()}`);
    }

    return token;
  }

  async getBooks(): Promise<BookData[]> {
    const response = await this.request.get(API_ENDPOINTS.GET_BOOKS);

    if (!response.ok()) {
      throw new Error(`Failed to get books: ${response.status()}`);
    }

    const body = await response.json();
    return body.books.map((book: any) => ({
      isbn: book.isbn,
      title: book.title,
      author: book.author,
      publisher: book.publisher,
      pages: book.pages,
      website: book.website,
    }));
  }

  async getBookByIsbn(isbn: string): Promise<BookData> {
    const response = await this.request.get(API_ENDPOINTS.GET_BOOK(isbn));

    if (!response.ok()) {
      throw new Error(`Failed to get book: ${response.status()}`);
    }

    const body = await response.json();
    return {
      isbn: body.isbn,
      title: body.title,
      author: body.author,
      publisher: body.publisher,
      pages: body.pages,
      website: body.website,
    };
  }

  async addBooksToUser(userId: string, isbnCollection: string[], token: string): Promise<void> {
    const response = await this.request.post(API_ENDPOINTS.ADD_BOOKS_TO_USER(userId), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        userId,
        collectionOfIsbns: isbnCollection.map(isbn => ({ isbn })),
      },
    });

    if (!response.ok()) {
      throw new Error(`Failed to add books to user: ${response.status()}`);
    }
  }

  async getUserBooks(userId: string, token: string): Promise<BookData[]> {
    const response = await this.request.get(API_ENDPOINTS.GET_USER(userId), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok()) {
      throw new Error(`Failed to get user books: ${response.status()}`);
    }

    const body = await response.json();
    return body.books.map((book: any) => ({
      isbn: book.isbn,
      title: book.title,
      author: book.author,
      publisher: book.publisher,
      pages: book.pages,
      website: book.website,
    }));
  }

  async removeBookFromUser(userId: string, isbn: string, token: string): Promise<void> {
    const response = await this.request.delete(API_ENDPOINTS.REMOVE_BOOK_FROM_USER(userId, isbn), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok()) {
      throw new Error(`Failed to remove book from user: ${response.status()}`);
    }
  }
}
