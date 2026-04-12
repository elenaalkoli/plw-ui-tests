# DemoQA UI Tests
UI automation framework for DemoQA built with Playwright and TypeScript.

The project demonstrates:
- Page Object Model (POM)
- Service layer approach
- Test data separation
- Playwright fixtures
- CI pipeline integration

## Project Setup

### 1. Installation

Clone the repository and install dependencies:

```bash
git clone https://gitlab.mercdev.com/qa-test/elena_al_koli.git
cd elena_al_koli
npm install
```

### 2. Environment Variables

Create a `.env` file in the project root:

```text
DEMOQA_BASE_URL=https://demoqa.com
```

### 3. Running Tests

All tests (Chromium + Firefox + Webkit):

```bash
npm test
```

UI Tests only:

```bash
npm run test:ui
```

Headed mode (visible browser):

```bash
npm run test:headed
```

Debug mode (step-by-step):

```bash
npm run test:debug
```

Playwright UI Mode:

```bash
npm run ui-mode
```

Specific project:

```bash
npm run test --project=chromium
```

Running Tests by Tags
Tests use tags to define scope (Smoke, Regression, Critical Path) and level (UI, E2E, API):

Run Smoke tests:

```bash
npx playwright test --grep @ui
```

Run UI tests:

```bash
npx playwright test --grep @ui
```

### 5. Reports

Playwright HTML Report:

```bash
npx playwright show-report
```

Allure Report - Generate:

```bash
npm run allure:generate
```

Allure Report - Open:

```bash
npm run allure:open
```

Full Allure flow:

```bash
npm test && npm run allure:generate && npm run allure:open
```

### 5. Code Quality

Lint:

```bash
npm run lint
npm run lint:fix
```

Prettier:

```bash
npm run prettier
npm run prettier:write
```

### 6. Project Structure

```
.
├── src/
│   ├── ui/
│   │   ├── pages/          # Page Objects
│   │   │   ├── demoqa.page.ts
│   │   │   └── text-box.page.ts
│   │   ├── services/       # UI Services
│   │   │   └── text-box.ui-service.ts
│   ├── data/               # Test data generators and interfaces
│   │   └── text-box.data.ts
│   ├── fixtures/           # Playwright fixtures (create pages & services for tests)
│   │   └── ui.fixtures.ts
│   ├── tests/              # Test files (*.spec.ts)
│   │   ├── ui/             # UI-level tests
│   │   │   ├── check-box.spec.ts
│   └── config/             # Environment variables
│       └── env.ts
├── playwright.config.ts
├── package.json
└── .env
```

Notes:
The project architecture allows easy expansion for other types of automation (API, UI, e2e, etc.).

### 7. CI/CD Pipeline

**Auto-trigger:** push/merge request to `main`

**Scheduled runs:** 10:00 MSK (`0 10 * * *`)

**Pipeline jobs:**

- `typescript-check` — TypeScript compilation check
- `ui-tests` — UI tests (parallel: Chromium, Firefox, Webkit)
- `allure-report` — Allure report generation

**Check results:**

- **CI/CD → Pipelines** — latest runs + artifacts
- **CI/CD → Schedules** — schedule setup/manual trigger

**Artifacts:**

- `allure-results/` — raw Allure data
- `allure-report/` — HTML report
- `playwright-report/` — Playwright
