🎭 Playwright Automation Framework - Conduit (RealWorld App)

A professional-grade automation framework for the Conduit (RealWorld) application, integrating E2E UI testing with REST API validation. 
This project focuses on high execution speed, stability, and modern Data-Driven Testing (DDT) patterns.
 Key Features
 Hybrid Testing Strategy: Utilizes API calls for instantaneous data seeding and post-UI state verification.
 Global Authentication Setup: Implements a dedicated auth.setup.ts project that performs login once and shares the storageState across all UI tests, reducing total execution time by ~40%.
 Advanced API Testing: Leverages Data-Driven Testing (DDT) to perform bulk validation of API error states (e.g., 422 Unprocessable Entity) using parameterized test cases.
 Cross-Browser Support: Pre-configured projects for Chromium, Firefox,and WebKit engines.
 Clean Architecture: Strict separation of concerns between Page Object Models (POM), centralized test data (JSON) and test logic.
 
 Tech Stack:
 Playwright (Test Runner & Browser Automation)
 TypeScript (Static Typing & Scalability
 )Node.js (Runtime Environment)
 Faker.js (Dynamic Data Generation)
 
 Project Structure
 ── .auth/                  # Stores encrypted session storageState
├── page-objects/           # Page Object Model classes (UI)
├── test-data/              # Centralized test data management (JSON)
├── tests/
│   ├── api/                # Integration & DDT API tests (CRUD, Auth)
│   │   ├── auth/           # Login & Registration validation
│   │   └── articles/       # Articles, Tags, and Comments management
│   ├── ui/                 # Functional E2E UI tests
│   └── auth.setup.ts       # Global authentication script
└── playwright.config.ts    # Global configuration & Project definitions

