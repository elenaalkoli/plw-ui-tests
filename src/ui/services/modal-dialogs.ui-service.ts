import { expect, Page } from "@playwright/test";
import { BaseUIService } from "./base.ui-service";
import { ModalDialogsPage } from "ui/pages/modal-dialogs.page";

export class ModalDialogsUIService extends BaseUIService {
  private readonly modalDialogsPage: ModalDialogsPage;

  constructor(page: Page) {
    super(page);
    this.modalDialogsPage = new ModalDialogsPage(page);
  }

  async verifySmallModal(expectedTitle: string, expectedBodyFragment: string): Promise<void> {
    await this.modalDialogsPage.openSmallModal();
    const title = await this.modalDialogsPage.getSmallModalTitle();
    const body = await this.modalDialogsPage.getSmallModalBody();

    expect(title).toBe(expectedTitle);
    expect(body).toContain(expectedBodyFragment);

    await this.modalDialogsPage.closeSmallModal();
    await expect(this.modalDialogsPage.smallModalTitle).not.toBeVisible();
  }

  async verifyLargeModal(expectedTitle: string): Promise<void> {
    await this.modalDialogsPage.openLargeModal();
    const title = await this.modalDialogsPage.getLargeModalTitle();

    expect(title).toBe(expectedTitle);

    await this.modalDialogsPage.closeLargeModal();
    await expect(this.modalDialogsPage.largeModalTitle).not.toBeVisible();
  }
}
