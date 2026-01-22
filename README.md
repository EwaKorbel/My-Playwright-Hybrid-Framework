# 🎭 Playwright Automation Framework - Conduit (RealWorld App)

![Playwright Tests](https://github.com/TwojaNazwaUzytkownika/My-Playwright-Hybrid-Framework/actions/workflows/playwright.yml/badge.svg)

A professional-grade automation framework for the **Conduit** (RealWorld) application, integrating E2E UI testing with advanced REST API validation. This project focuses on high execution speed, stability, and modern design patterns.

---

## 🚀 Key Features

* **Hybrid Testing Strategy**: Utilizes API calls for instantaneous data seeding and post-UI state verification.
* **Global Authentication Setup**: Implements a dedicated `auth.setup.ts` project that performs login once and shares the `storageState` across all UI tests, reducing total execution time by ~40%.
* **Page Object Model (POM)**: Strict separation of concerns between test logic and UI selectors.
* **CI/CD Integration**: Fully automated test execution on every *push* via GitHub Actions.
* **Cross-Browser Support**: Pre-configured projects for Chromium, Firefox, and WebKit engines.

---

## 🧪 Test Coverage

### 🔹 API Testing
| Module | Test Type | Description |
| :--- | :--- | :--- |
| **Articles** | Boundary Values | Testing system limits (e.g., 2000 characters in article body). |
| **Articles** | Security | Authorization validation (401 Unauthorized) for invalid/expired tokens. |
| **Articles** | CRUD | Full cycle of creating, fetching, and deleting articles via REST. |
| **Tags** | Integration | Verifying the integrity of tag retrieval from the backend. |

### 🔹 UI Testing
| Module | Test Type | Description |
| :--- | :--- | :--- |
| **Full Lifecycle** | E2E Flow | Complete user journey: Create -> Edit -> Verify -> Delete article. |
| **Auth** | Session Management | Verifying user persistence across different application routes. |

---

## 🏗️ Project Structure

```text
├── .auth/               # Stores encrypted session storageState
├── page-objects/        # Page Object Model classes (UI)
├── test-data/           # Centralized test data management (JSON)
├── tests/
│   ├── api/             # Integration & DDT API tests
│   │   ├── articles/    # Security, Boundary Values, CRUD
│   │   └── auth/        # Login & Registration validation
│   └── ui/              # Functional E2E UI tests
├── playwright.config.ts # Global configuration & Project definitions

Tech Stack
Playwright (Test Runner & Browser Automation)

TypeScript (Static Typing & Scalability)

Node.js (Runtime Environment)

GitHub Actions (Continuous Integration)