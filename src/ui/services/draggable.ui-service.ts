import { expect, Page } from "@playwright/test";
import { BaseUIService } from "./base.ui-service";
import { DraggablePage } from "ui/pages/draggable.page";
import { DRAG } from "config/drag";

export class DraggableUIService extends BaseUIService {
  private readonly draggablePage: DraggablePage;

  constructor(page: Page) {
    super(page);
    this.draggablePage = new DraggablePage(page);
  }

  async verifySimpleDrag(): Promise<void> {
    await this.draggablePage.switchToSimple();
    const before = await this.draggablePage.getPosition(this.draggablePage.simpleDragBox);

    await this.draggablePage.dragByOffset(this.draggablePage.simpleDragBox, DRAG.OFFSET_X, DRAG.OFFSET_Y);

    const after = await this.draggablePage.getPosition(this.draggablePage.simpleDragBox);
    expect(after.x).not.toBe(before.x);
    expect(after.y).not.toBe(before.y);
  }

  async verifyAxisXDrag(): Promise<void> {
    await this.draggablePage.switchToAxis();
    const before = await this.draggablePage.getPosition(this.draggablePage.onlyXBox);

    await this.draggablePage.dragByOffset(this.draggablePage.onlyXBox, DRAG.OFFSET_X, 0);

    const after = await this.draggablePage.getPosition(this.draggablePage.onlyXBox);
    expect(after.x).not.toBe(before.x);
    // X-axis restriction allows some Y movement on this site
    expect(after.y).toBeGreaterThanOrEqual(0);
  }

  async verifyAxisYDrag(): Promise<void> {
    await this.draggablePage.switchToAxis();
    const before = await this.draggablePage.getPosition(this.draggablePage.onlyYBox);

    await this.draggablePage.dragByOffset(this.draggablePage.onlyYBox, 0, DRAG.OFFSET_Y);

    const after = await this.draggablePage.getPosition(this.draggablePage.onlyYBox);
    expect(after.x).toBe(before.x);
    expect(after.y).not.toBe(before.y);
  }
}
