# DemoQA UI Tests

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

### 4. Reports

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
│   ├── pages/              # Page Objects
│   │   ├── demoqa.page.ts
│   │   └── checkbox.page.ts
│   ├── services/           # UI Services
│   │   └── checkbox-ui.service.ts
│   ├── tests/              # Test files (*.spec.ts)
│   │   └── checkbox.spec.ts
│   └── config/
│       └── ui-routes.ts
├── playwright.config.ts
├── package.json
└── .env 


### 7. CI/CD Pipeline

**Auto-trigger:** push/merge request to `main`

**Scheduled runs:** ежедневно 10:00 MSK (`0 10 * * *`)

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
- `playwright-report/` — Playwright HTML

**Pipeline config:** `.gitlab-ci.yml`