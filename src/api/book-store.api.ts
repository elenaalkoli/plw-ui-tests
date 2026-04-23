import { APIRequestContext, APIResponse } from "@playwright/test";
import { BookData, UserCredentials } from "../data/book-store.data";

export class BookStoreApiClient {
  constructor(private readonly request: APIRequestContext) {}

  async generateToken(credentials: UserCredentials): Promise<string> {
    const response = await this.request.post("/Account/v1/GenerateToken", {
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
    const response = await this.request.post("/Account/v1/User", {
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
    
    const response = await this.request.post("/Account/v1/Authorized", {
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
    const response = await this.request.get("/BookStore/v1/Books");

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
    const response = await this.request.get(`/BookStore/v1/Book?ISBN=${isbn}`);

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
    const response = await this.request.post(`/BookStore/v1/Books/${userId}`, {
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
    const response = await this.request.get(`/Account/v1/User/${userId}`, {
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
    const response = await this.request.delete(`/BookStore/v1/Book?ISBN=${isbn}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok()) {
      throw new Error(`Failed to remove book from user: ${response.status()}`);
    }
  }
}
