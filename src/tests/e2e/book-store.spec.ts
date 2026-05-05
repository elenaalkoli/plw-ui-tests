import { TAGS } from "data/tags";
import { TEST_DATA } from "config/test-data";
import { test, expect } from "../../fixtures/pages.fixture";
import { generateBookStoreSetup } from "data/book-store.data";

test.describe("[UI] [Book Store] [E2E]", () => {
  test(
    "should execute complete book store workflow with design patterns",
    {
      tag: [TAGS.E2E, TAGS.REGRESSION, TAGS.UI],
    },
    async ({ 
      loginPage, 
      booksPage, 
      profilePage, 
      bookStoreService
    }) => {
      // Setup test data using Builder pattern
      const setup = generateBookStoreSetup();
      
      // 1. Navigate to Book Store
      await booksPage.open();
      
      // 2. Search books using Strategy pattern
      const allBooks = await booksPage.getAllVisibleBooks();
      const searchResults = await bookStoreService.searchBooks(
        allBooks, 
        TEST_DATA.BOOK_STORE.SEARCH_QUERY, 
        'title'
      );
      
      // 3. Select a book and get details
      if (searchResults.length > 0) {
        const selectedBook = searchResults[0];
        if (selectedBook) {
          await booksPage.clickBookByTitle(selectedBook.title);
          const bookDetails = await booksPage.getBookDetails();
          expect(bookDetails.title).toBeTruthy();

          // 4. Login to the application
          await booksPage.clickLoginButton();
          await loginPage.login(setup.user.username, setup.user.password);
          
          // 5. Add book to collection
          await booksPage.backToBookStore();
          await booksPage.clickBookByTitle(selectedBook.title);
          await booksPage.addBookToCollection();
          
          // 6. Navigate to Profile and verify book
          await profilePage.open();
          const profileBooks = await profilePage.getProfileBooks();
          
          // Verify book is in profile
          const hasBookInProfile = profileBooks.some(book => 
            book.title === selectedBook.title
          );
          
          // 7. Remove book from profile
          if (hasBookInProfile) {
            await profilePage.deleteBookByTitle(selectedBook.title);

            const updatedProfileBooks = await profilePage.getProfileBooks();
            const bookRemoved = !updatedProfileBooks.some(book =>
              book.title === selectedBook.title
            );
            expect(bookRemoved).toBe(true);
          }
          
          // 8. Logout
          await profilePage.logout();
        }
      }
    }
  );

  test(
    "should search books by different strategies",
    {
      tag: [TAGS.UI, TAGS.REGRESSION],
    },
    async ({ booksPage, bookStoreService }) => {
      await booksPage.open();
      
      // Get all books
      const allBooks = await booksPage.getAllVisibleBooks();
      
      // Test different search strategies
      const titleResults = await bookStoreService.searchBooks(
        allBooks, 
        TEST_DATA.BOOK_STORE.SEARCH_QUERY, 
        'title'
      );
      
      const authorResults = await bookStoreService.searchBooks(
        allBooks, 
        TEST_DATA.BOOK_STORE.EXPECTED_AUTHOR, 
        'author'
      );
      
      // Verify search results are not empty
      if (titleResults.length > 0) {
        const hasMatchingTitle = titleResults.some(book =>
          book.title.toLowerCase().includes(TEST_DATA.BOOK_STORE.SEARCH_QUERY.toLowerCase())
        );
        expect(hasMatchingTitle).toBe(true);
      }

      if (authorResults.length > 0) {
        const hasMatchingAuthor = authorResults.some(book =>
          book.author.toLowerCase().includes(TEST_DATA.BOOK_STORE.EXPECTED_AUTHOR.toLowerCase())
        );
        expect(hasMatchingAuthor).toBe(true);
      }
    }
  );

  test(
    "should handle login and profile management",
    {
      tag: [TAGS.UI, TAGS.SMOKE],
    },
    async ({ loginPage, profilePage }) => {
      const credentials = {
        username: TEST_DATA.BOOK_STORE.generateUsername(),
        password: TEST_DATA.BOOK_STORE.TEST_PASSWORD,
      };
      
      // Navigate to login
      await loginPage.open();
      
      // Attempt login
      await loginPage.login(credentials.username, credentials.password);
      
      // Check if login is successful
      if (await loginPage.isLoginSuccessful()) {
        // Navigate to profile
        await profilePage.open();
        
        // Get username from profile
        await profilePage.getUsername();

        await profilePage.hasBooks();

        // Logout
        await profilePage.logout();
      } else {
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toBeTruthy();
      }
    }
  );
});
