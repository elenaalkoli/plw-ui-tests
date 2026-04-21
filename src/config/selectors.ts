export const SELECTORS = {
  ELEMENTS_MENU: 'a[href="/elements"]',
  TEXTBOX_ITEM: 'a[href="/text-box"]',
  CHECKBOX_ITEM: 'a[href="/checkbox"]',
  WEBTABLE_ITEM: 'a[href="/webtables"]',

  ALERTS_MENU: 'a[href="/alertsWindows"]',
  BROWSER_WINDOWS_ITEM: 'a[href="/browser-windows"]',
  MODAL_DIALOGS_ITEM: 'a[href="/modal-dialogs"]',

  INTERACTIONS_MENU: 'a[href="/interaction"]',
  SORTABLE_ITEM: 'a[href="/sortable"]',
  DRAGGABLE_ITEM: 'a[href="/dragabble"]',
} as const;

export type SectionSelector = (typeof SELECTORS)[keyof Omit<
  typeof SELECTORS,
  "ELEMENTS_MENU" | "ALERTS_MENU" | "INTERACTIONS_MENU"
>];
