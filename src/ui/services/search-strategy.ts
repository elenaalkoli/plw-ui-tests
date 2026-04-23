import { BookData } from "../../data/book-store.data";

export abstract class SearchStrategy {
  abstract search(books: BookData[], query: string): BookData[];
}

export class SearchByTitle extends SearchStrategy {
  search(books: BookData[], query: string): BookData[] {
    return books.filter(book => 
      book.title.toLowerCase().includes(query.toLowerCase())
    );
  }
}

export class SearchByAuthor extends SearchStrategy {
  search(books: BookData[], query: string): BookData[] {
    return books.filter(book => 
      book.author.toLowerCase().includes(query.toLowerCase())
    );
  }
}

export class SearchByPublisher extends SearchStrategy {
  search(books: BookData[], query: string): BookData[] {
    return books.filter(book => 
      book.publisher.toLowerCase().includes(query.toLowerCase())
    );
  }
}
