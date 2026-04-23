import { test as base } from "@playwright/test";
import { TextBoxPage } from "../ui/pages/text-box.page";
import { TextBoxUIService } from "ui/services/text-box.ui-service";
import { CheckBoxPage } from "ui/pages/check-box.page";
import { CheckBoxUIService } from "ui/services/check-box.ui-service";
import { WebTablePage } from "../ui/pages/web-tables.page";
import { WebTableUIService } from "ui/services/web-table.ui-service";
import { RegistrationFormModal } from "ui/pages/registration-form-modal.page";
import { BrowserWindowsPage } from "ui/pages/browser-windows.page";
import { BrowserWindowsUIService } from "ui/services/browser-windows.ui-service";
import { ModalDialogsPage } from "ui/pages/modal-dialogs.page";
import { ModalDialogsUIService } from "ui/services/modal-dialogs.ui-service";
import { SortablePage } from "ui/pages/sortable.page";
import { SortableUIService } from "ui/services/sortable.ui-service";
import { DraggablePage } from "../ui/pages/draggable.page";
import { DraggableUIService } from "ui/services/draggable.ui-service";
import { LoginPage } from "../ui/pages/login.page";
import { BooksPage } from "../ui/pages/books.page";
import { ProfilePage } from "../ui/pages/profile.page";
import { BookStoreService } from "ui/services/book-store.service";

export interface UIPages {
  textBoxPage: TextBoxPage;
  checkBoxPage: CheckBoxPage;
  webTablePage: WebTablePage;
  registrationFormModal: RegistrationFormModal;
  browserWindowsPage: BrowserWindowsPage;
  modalDialogsPage: ModalDialogsPage;
  sortablePage: SortablePage;
  draggablePage: DraggablePage;
  loginPage: LoginPage;
  booksPage: BooksPage;
  profilePage: ProfilePage;

  textBoxUIService: TextBoxUIService;
  checkBoxUIService: CheckBoxUIService;
  webTableUIService: WebTableUIService;
  browserWindowsUIService: BrowserWindowsUIService;
  modalDialogsUIService: ModalDialogsUIService;
  sortableUIService: SortableUIService;
  draggableUIService: DraggableUIService;
  bookStoreService: BookStoreService;
}

export const test = base.extend<UIPages>({
  textBoxPage: async ({ page }, use) => {
    await use(new TextBoxPage(page));
  },
  checkBoxPage: async ({ page }, use) => {
    await use(new CheckBoxPage(page));
  },
  webTablePage: async ({ page }, use) => {
    await use(new WebTablePage(page));
  },
  registrationFormModal: async ({ page }, use) => {
    await use(new RegistrationFormModal(page));
  },
  browserWindowsPage: async ({ page }, use) => {
    await use(new BrowserWindowsPage(page));
  },
  modalDialogsPage: async ({ page }, use) => {
    await use(new ModalDialogsPage(page));
  },
  sortablePage: async ({ page }, use) => {
    await use(new SortablePage(page));
  },
  draggablePage: async ({ page }, use) => {
    await use(new DraggablePage(page));
  },

  textBoxUIService: async ({ page }, use) => {
    await use(new TextBoxUIService(page));
  },
  checkBoxUIService: async ({ page }, use) => {
    await use(new CheckBoxUIService(page));
  },
  webTableUIService: async ({ page }, use) => {
    await use(new WebTableUIService(page));
  },
  browserWindowsUIService: async ({ page }, use) => {
    await use(new BrowserWindowsUIService(page));
  },
  modalDialogsUIService: async ({ page }, use) => {
    await use(new ModalDialogsUIService(page));
  },
  sortableUIService: async ({ page }, use) => {
    await use(new SortableUIService(page));
  },
  draggableUIService: async ({ page }, use) => {
    await use(new DraggableUIService(page));
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  booksPage: async ({ page }, use) => {
    await use(new BooksPage(page));
  },
  profilePage: async ({ page }, use) => {
    await use(new ProfilePage(page));
  },

  bookStoreService: async ({ page, request }, use) => {
    await use(new BookStoreService(page, request));
  },
});

export { expect } from "@playwright/test";
