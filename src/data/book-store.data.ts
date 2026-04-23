import { faker } from "@faker-js/faker";

export interface UserCredentials {
  username: string;
  password: string;
}

export interface BookData {
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  pages: number;
  website: string;
}

export interface SetupContext {
  user: UserCredentials;
  books: BookData[];
}

export interface BookStoreResult {
  searchResults: BookData[];
  selectedBooks: BookData[];
  profileBooks: BookData[];
}

export function generateUserCredentials(): UserCredentials {
  return {
    username: faker.internet.userName(),
    password: faker.internet.password({ length: 10 }),
  };
}

export function generateBookData(): BookData {
  return {
    isbn: faker.string.alphanumeric({ length: 13 }),
    title: faker.lorem.words({ min: 2, max: 5 }),
    author: faker.person.fullName(),
    publisher: faker.company.name(),
    pages: faker.number.int({ min: 100, max: 1000 }),
    website: faker.internet.url(),
  };
}

export function generateBookStoreSetup(): SetupContext {
  return {
    user: generateUserCredentials(),
    books: Array.from({ length: 3 }, () => generateBookData()),
  };
}
