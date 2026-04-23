export const API_ENDPOINTS = {
  // Account endpoints
  GENERATE_TOKEN: "/Account/v1/GenerateToken",
  ADD_USER: "/Account/v1/User",
  AUTHORIZE_USER: "/Account/v1/Authorized",
  GET_USER: (userId: string) => `/Account/v1/User/${userId}`,
  
  // BookStore endpoints
  GET_BOOKS: "/BookStore/v1/Books",
  GET_BOOK: (isbn: string) => `/BookStore/v1/Book?ISBN=${isbn}`,
  ADD_BOOKS_TO_USER: (userId: string) => `/BookStore/v1/Books/${userId}`,
  REMOVE_BOOK_FROM_USER: (userId: string, isbn: string) => `/BookStore/v1/Books/${userId}?ISBN=${isbn}`,
} as const;
