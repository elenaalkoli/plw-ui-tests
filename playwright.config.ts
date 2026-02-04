// playwright.config.ts
import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";

const envFile = ".env"; // 1 env
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

export default defineConfig({
  testDir: "./src/tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 5,
  timeout: 30_000,

  reporter: [
    ["list"],
    ["html"],
    [
      "allure-playwright",
      {
        resultsDir: "allure-results",
        suiteTitle: false,
        environmentInfo: {
          DEMOQA_BASE_URL: process.env.DEMOQA_BASE_URL,
        },
      },
    ],
  ], 

  use: { //url from .env
    baseURL: process.env.DEMOQA_BASE_URL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "on-first-retry",
    headless: true,
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
});
