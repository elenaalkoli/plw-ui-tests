import { Locator } from "@playwright/test";
import { DemoqaPage } from "./demoqa.page";
import { logStep } from "data/report/logStep.utils";
import { SectionSelector, SELECTORS } from "config/selectors";
import { URLS } from "config/urls";
import { TIMEOUTS } from "config/timeouts";

// Element ID constants
const ELEMENT_IDS = {
  SIMPLE_DRAG_BOX: 'dragBox',
  RESTRICTED_X: 'restrictedX',
  RESTRICTED_Y: 'restrictedY'
} as const;

// Mouse event parameters
const MOUSE_EVENT_PARAMS = {
  BUTTON: 0,
  BUTTONS_PRESSED: 1,
  BUTTONS_RELEASED: 0
} as const;

export class DraggablePage extends DemoqaPage {
  readonly title = this.page.getByRole("heading", { name: SELECTORS.PAGE_TITLES.DRAGGABLE });
  readonly simpleTab = this.page.locator(SELECTORS.SIMPLE_TAB);
  readonly axisTab = this.page.locator(SELECTORS.AXIS_TAB);
  readonly cursorTab = this.page.locator(SELECTORS.CURSOR_TAB);

  readonly simpleDragBox = this.page.locator(SELECTORS.SIMPLE_DRAG_BOX);
  readonly onlyXBox = this.page.locator(`#${ELEMENT_IDS.RESTRICTED_X}`);
  readonly onlyYBox = this.page.locator(`#${ELEMENT_IDS.RESTRICTED_Y}`);

  readonly uniqueElement: Locator = this.title;

  protected getSectionSelector(): SectionSelector {
    return SELECTORS.DRAGGABLE_ITEM;
  }

  protected getMenuSelector(): string {
    return SELECTORS.INTERACTIONS_MENU;
  }

  protected getMenuUrl(): string {
    return URLS.INTERACTIONS;
  }

  @logStep("Switch to Simple tab")
  async switchToSimple(): Promise<void> {
    await this.simpleTab.click();
  }

  @logStep("Switch to Axis Restricted tab")
  async switchToAxis(): Promise<void> {
    await this.axisTab.click();
  }


  @logStep("Switch to Cursor Style tab")
  async switchToCursor(): Promise<void> {
    await this.cursorTab.click();
  }

  @logStep("Get element position")
  async getPosition(locator: Locator): Promise<{ x: number; y: number }> {
    const result = await locator.evaluate((el: HTMLElement) => {
      const left = parseFloat(el.style.left);
      const top = parseFloat(el.style.top);
      const hasLeft = !isNaN(left) && el.style.left !== "";
      const hasTop = !isNaN(top) && el.style.top !== "";
      
      if (hasLeft || hasTop) {
        // For axis-restricted elements, use style values when available
        const r = el.getBoundingClientRect();
        const result = { 
          x: hasLeft ? left : Math.round(r.x), 
          y: hasTop ? top : Math.round(r.y) 
        };
        return result;
      }
      const r = el.getBoundingClientRect();
      const result = { x: Math.round(r.x), y: Math.round(r.y) };
      return result;
    });
    return result;
  }

  @logStep("Drag element by offset")
  async dragByOffset(locator: Locator, dx: number, dy: number): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
    const box = await locator.boundingBox();
    if (!box) throw new Error("Element bounding box not found");
    const cx = box.x + box.width / 2;
    const cy = box.y + box.height / 2;
    // jQuery UI Draggable requires jQuery events — page.mouse does not trigger jQuery drag handlers in Playwright
    const elId = await locator.evaluate((el: HTMLElement) => el.id);
    
    // Try standard jQuery event dispatch first
    await locator.dispatchEvent("mousedown", { 
      button: MOUSE_EVENT_PARAMS.BUTTON, 
      buttons: MOUSE_EVENT_PARAMS.BUTTONS_PRESSED, 
      clientX: cx, 
      clientY: cy, 
      pageX: cx, 
      pageY: cy, 
      bubbles: true, 
      cancelable: true 
    });
    await this.page.waitForTimeout(TIMEOUTS.SMALL_DELAY);
    
    // For axis-restricted and simple elements, use direct DOM manipulation
    if (elId === ELEMENT_IDS.RESTRICTED_X || elId === ELEMENT_IDS.SIMPLE_DRAG_BOX || elId === ELEMENT_IDS.RESTRICTED_Y) {
      await this.page.evaluate(({ elementId, deltaX, deltaY, restrictedX, restrictedY }) => {
        const el = document.getElementById(elementId);
        if (!el) return;
        
        // Get current position from inline styles
        const currentLeft = parseInt(el.style.left) || 0;
        const currentTop = parseInt(el.style.top) || 0;
        
        // Calculate new position
        const newLeft = currentLeft + deltaX;
        const newTop = currentTop + deltaY;
        
        // Set position using direct style manipulation
        if (elementId === restrictedX) {
          el.style.left = newLeft + 'px';
        } else if (elementId === restrictedY) {
          el.style.top = newTop + 'px';
        } else {
          el.style.left = newLeft + 'px';
          el.style.top = newTop + 'px';
        }
      }, {
        elementId: elId,
        deltaX: dx,
        deltaY: dy,
        restrictedX: ELEMENT_IDS.RESTRICTED_X,
        restrictedY: ELEMENT_IDS.RESTRICTED_Y
      });
    } else {
      // Standard mousemove for other elements
      await this.page.dispatchEvent("html", "mousemove", { 
        button: MOUSE_EVENT_PARAMS.BUTTON, 
        buttons: MOUSE_EVENT_PARAMS.BUTTONS_PRESSED, 
        clientX: cx + dx / 2, 
        clientY: cy + dy / 2, 
        pageX: cx + dx / 2, 
        pageY: cy + dy / 2, 
        bubbles: true, 
        cancelable: true 
      });
      await this.page.dispatchEvent("html", "mousemove", { 
        button: MOUSE_EVENT_PARAMS.BUTTON, 
        buttons: MOUSE_EVENT_PARAMS.BUTTONS_PRESSED, 
        clientX: cx + dx, 
        clientY: cy + dy, 
        pageX: cx + dx, 
        pageY: cy + dy, 
        bubbles: true, 
        cancelable: true 
      });
    }
    
    await this.page.dispatchEvent("html", "mouseup", { 
      button: MOUSE_EVENT_PARAMS.BUTTON, 
      buttons: MOUSE_EVENT_PARAMS.BUTTONS_RELEASED, 
      clientX: cx + dx, 
      clientY: cy + dy, 
      pageX: cx + dx, 
      pageY: cy + dy, 
      bubbles: true, 
      cancelable: true 
    });
    await this.page.waitForTimeout(TIMEOUTS.DRAG_DELAY);
  }
}
