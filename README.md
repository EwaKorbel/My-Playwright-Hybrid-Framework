# 🎭 Playwright Automation Framework - Conduit (RealWorld App)

![Playwright Tests](https://github.com/TwojaNazwaUzytkownika/My-Playwright-Hybrid-Framework/actions/workflows/playwright.yml/badge.svg)

Profesjonalny framework do testowania aplikacji **Conduit**, integrujący testy E2E (UI) z zaawansowaną walidacją REST API. Projekt skupia się na stabilności, szybkości wykonania oraz nowoczesnych wzorcach projektowych.

---

## 🚀 Kluczowe Cechy (Key Features)

* **Hybrid Testing Strategy**: Wykorzystanie API do szybkiego przygotowania danych (seeding) i weryfikacji stanu po akcjach w UI.
* **Global Authentication**: Skrypt `auth.setup.ts` loguje się raz i współdzieli stan sesji (`storageState`), skracając czas testów o ~40%.
* **Page Object Model (POM)**: Czysta separacja logiki testów od selektorów UI.
* **CI/CD Integration**: Pełna automatyzacja testów przy każdym *pushu* dzięki GitHub Actions.
* **Cross-Browser Support**: Gotowa konfiguracja dla Chromium, Firefox i WebKit.

---

## 🧪 Zakres Testów (Test Coverage)

### 🔹 API Testing
| Moduł | Typ Testu | Opis |
| :--- | :--- | :--- |
| **Articles** | Boundary Values | Testowanie limitów znaków (np. 2000 znaków w body). |
| **Articles** | Security | Walidacja uprawnień (401 Unauthorized) dla błędnych/wygasłych tokenów. |
| **Articles** | CRUD | Pełny cykl tworzenia, pobierania i usuwania artykułów. |
| **Tags** | Integration | Weryfikacja poprawności pobierania tagów z backendu. |

### 🔹 UI Testing
| Moduł | Typ Testu | Opis |
| :--- | :--- | :--- |
| **Full Lifecycle** | E2E Flow | Kompletna ścieżka: Utwórz -> Edytuj -> Zweryfikuj -> Usuń artykuł. |
| **Auth** | Session | Weryfikacja utrzymania sesji użytkownika na różnych podstronach. |

---

## 🏗️ Architektura Projektu

```text
├── .auth/               # Przechowywanie zaszyfrowanego stanu sesji
├── page-objects/        # Klasy Page Object Model (UI)
├── test-data/           # Scentralizowane dane testowe (JSON)
├── tests/
│   ├── api/             # Testy integracyjne i funkcjonalne API
│   │   ├── articles/    # Security, Boundary Values, CRUD
│   │   └── auth/        # Walidacja logowania i rejestracji
│   └── ui/              # Funkcjonalne testy E2E UI
├── playwright.config.ts # Globalna konfiguracja i definicje projektów

Technologia (Tech Stack)
Playwright (Test Runner & Browser Automation)

TypeScript (Statyczne typowanie & Skalowalność)

Node.js (Runtime Environment)

GitHub Actions (Continuous Integration)

