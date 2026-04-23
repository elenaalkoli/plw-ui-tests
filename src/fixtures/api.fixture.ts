import { test as base } from "@playwright/test";
import { BookStoreApiClient } from "../api/book-store.api";

export interface APIFixtures {
  bookStoreApi: BookStoreApiClient;
}

export const testWithAPI = base.extend<APIFixtures>({
  bookStoreApi: async ({ request }, use) => {
    await use(new BookStoreApiClient(request));
  },
});

export const test = testWithAPI;
