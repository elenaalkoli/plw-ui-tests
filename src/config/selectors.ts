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
  
  // Page content selectors
  SAMPLE_HEADING: '#sampleHeading',
  
  // Browser Windows
  TAB_BUTTON: '#tabButton',
  WINDOW_BUTTON: '#windowButton',
  
  // Modal Dialogs
  SMALL_MODAL_BUTTON: '#showSmallModal',
  LARGE_MODAL_BUTTON: '#showLargeModal',
  SMALL_MODAL_TITLE: '#example-modal-sizes-title-sm',
  LARGE_MODAL_TITLE: '#example-modal-sizes-title-lg',
  SMALL_MODAL_CLOSE: '#closeSmallModal',
  LARGE_MODAL_CLOSE: '#closeLargeModal',
  MODAL_BODY: '.modal-body',
  
  // Text Box
  USER_FORM: '#userForm',
  USER_NAME: '#userName',
  USER_EMAIL: '#userEmail',
  CURRENT_ADDRESS: '#currentAddress',
  PERMANENT_ADDRESS: '#permanentAddress',
  SUBMIT_BUTTON: '#submit',
  OUTPUT: '#output',
  NAME_OUTPUT: '#name',
  EMAIL_OUTPUT: '#email',
  CURRENT_ADDRESS_OUTPUT: '#currentAddress',
  PERMANENT_ADDRESS_OUTPUT: '#permanentAddress',
  
  // Check Box
  RESULT: '#result',
  CLOSED_TREE_NODES: 'span.rc-tree-switcher_close',
  CHECKBOX_TEMPLATE: 'span[aria-label="Select {name}"]',
  
  // Draggable
  SIMPLE_TAB: '#draggableExample-tab-simple',
  AXIS_TAB: '#draggableExample-tab-axisRestriction',
  CURSOR_TAB: '#draggableExample-tab-cursorStyle',
  SIMPLE_DRAG_BOX: '#draggableExample-tabpane-simple #dragBox',
  
  // Sortable
  LIST_TAB: '#demo-tab-list',
  GRID_TAB: '#demo-tab-grid',
  LIST_ITEMS: '#demo-tabpane-list .list-group-item',
  GRID_ITEMS: '#demo-tabpane-grid .list-group-item',
  
  // Web Tables
  ADD_BUTTON: '#addNewRecordButton',
  SEARCH_BOX: '#searchBox',
  TABLE_BODY: 'tbody',
  TABLE_ROW: 'tr',
  TABLE_CELL: 'td',
  EDIT_BUTTON: '[title="Edit"]',
  DELETE_BUTTON: '[title="Delete"]',
  
  // Registration Form Modal
  REGISTRATION_MODAL: '#registration-form-modal',
  MODAL_CONTENT: '.modal-content',
  FIRST_NAME: '#firstName',
  LAST_NAME: '#lastName',
  AGE: '#age',
  SALARY: '#salary',
  DEPARTMENT: '#department',
  CLOSE_BUTTON: '.close',
  
  // Base
  AD_CLOSE_BUTTON: '#close-fixedban',
  PARENT_SELECTOR: '..',
  
  // Page titles for getByRole
  PAGE_TITLES: {
    BROWSER_WINDOWS: 'Browser Windows',
    CHECK_BOX: 'Check Box',
    DRAGGABLE: 'Dragabble',
    MODAL_DIALOGS: 'Modal Dialogs',
    SORTABLE: 'Sortable',
    TEXT_BOX: 'Text Box',
    WEB_TABLES: 'Web Tables',
  },
} as const;

export type SectionSelector = (typeof SELECTORS)[keyof Omit<
  typeof SELECTORS,
  "ELEMENTS_MENU" | "ALERTS_MENU" | "INTERACTIONS_MENU"
>];
