import { mergeTests } from "@playwright/test";
import { test as uiTest, UIPages } from "./pages.fixture";
import { test as apiTest, APIFixtures } from "./api.fixture";

export interface AllFixtures extends UIPages, APIFixtures {}

// Combine UI and API fixtures
export const test = mergeTests(uiTest, apiTest);
