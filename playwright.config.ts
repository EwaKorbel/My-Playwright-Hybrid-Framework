import { defineConfig, devices } from '@playwright/test';

/**
 * Zobacz: https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Maksymalny czas na cały test (60 sekund) */
  timeout: 60000,
  /* Uruchamianie testów w równolegle */
  fullyParallel: true,
  /* Fail na CI, jeśli zostawisz .only w kodzie */
  forbidOnly: !!process.env.CI,
  /* Ponowienia przy błędach (tylko na CI) */
  retries: process.env.CI ? 2 : 1,
  /* Liczba workerów */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter HTML */
  reporter: 'html',

  /* Ustawienia globalne dla asercji */
  expect: {
    timeout: 10000,
  },

  use: {
    /* Adres URL Twojej aplikacji (UI) */
    baseURL: 'https://conduit.bondaracademy.com/',

    /* Czas na akcje typu click/type */
    actionTimeout: 15000,

    /* Nagrywanie śladów przy błędach */
    trace: 'on-first-retry',
    /* Screenshoty tylko przy błędach */
    screenshot: 'only-on-failure',
  },

  /* Konfiguracja projektów */
  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        // Pobieranie stanu sesji z pliku stworzonego przez projekt 'setup'
        storageState: '.auth/user.json',
      },
      dependencies: ['setup'],
    },

    {
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox'],
        storageState: '.auth/user.json',
      },
      dependencies: ['setup'],
    },

    {
      name: 'webkit',
      use: { 
        ...devices['Desktop Safari'],
        storageState: '.auth/user.json',
      },
      dependencies: ['setup'],
    },
    // ... poprzednie projekty (chromium, firefox, webkit)

    {
      name: 'api',
      testMatch: /.*api\/.*\.spec\.ts/, // Celuje we wszystkie testy w folderze api
      use: {
        baseURL: 'https://conduit-api.bondaracademy.com/api',
        storageState: undefined, // Testy API zazwyczaj same zarządzają tokenem, nie potrzebują sesji z UI
      },
    },
  ],
  
});