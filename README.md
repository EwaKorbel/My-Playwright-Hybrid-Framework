# Playwright Automation Framework - Conduit (RealWorld App)

A robust automation framework for the Conduit (RealWorld) application. This project demonstrates a hybrid testing approach, combining end-to-end UI testing with integrated API validation to ensure high test coverage and execution efficiency.

Key Features
- **Hybrid Testing Strategy**: Leverages API calls for rapid test state preparation (authentication) and data consistency verification.
- **Global Authentication Setup**: Implements Playwright's `storageState` to perform a single login operation, reducing UI test execution time by approximately 40%.
- **Multi-project Configuration**: Distinct configurations for multiple browser engines (Chromium, Firefox, WebKit) and a dedicated API project with a centralized `baseURL`.
- **Advanced Stability**: Integrated handling for asynchronous UI patterns using `waitForResponse`, custom locators, and Chromium-specific race condition mitigations.

Tech Stack
- **Playwright** (Test Runner & Automation)
- **TypeScript** (Strongly typed language)
- **Node.js**

Project Structure
- `tests/ui/` – Functional UI tests (Tags filtering, Comments management, User Profile).
- `tests/api/` – Integration tests for REST API endpoints (Articles CRUD, Authentication, User data).
- `test-data/` – Centralized test data management using JSON.
- `playwright.config.ts` – Global configuration, environment settings, and project definitions.


1. **Install dependencies:**
npm install

2. Execute all tests (Headless mode):
npx playwright test

3. Execute API tests only:
npx playwright test --project=api

4. Execute UI tests on Chromium:
npx playwright test --project=chromium

5. Generate and open HTML report:
npx playwright show-report