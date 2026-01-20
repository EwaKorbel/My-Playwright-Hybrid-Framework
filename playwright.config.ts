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
      name: 'setup', // To jest unikalna nazwa projektu logowania
      testMatch: /auth\.setup\.ts/, // Playwright szuka tego pliku, by zrobić login
    },
    {
      name: 'chromium',
      testDir: './tests/ui', // Szuka testów tylko w folderze UI
      use: { 
        ...devices['Desktop Chrome'],
        storageState: '.auth/user.json', // Korzysta z wyniku projektu 'setup'
      },
      dependencies: ['setup'], // Mówi: "najpierw uruchom projekt o nazwie setup"
    },
    {
      name: 'api',
      testDir: './tests/api', // Szuka testów tylko w folderze API
      use: {
        baseURL: 'https://conduit-api.bondaracademy.com/api',
      },
    },

   // {
    //  name: 'firefox',
    //  use: { 
    //    ...devices['Desktop Firefox'],
    //    storageState: '.auth/user.json',
    //  },
   //  dependencies: ['setup'],
   // },

  //  {
    //  name: 'webkit',
    //  use: { 
    //    ...devices['Desktop Safari'],
    //    storageState: '.auth/user.json',
    //  },
    //  dependencies: ['setup'],
   // },
    // ... poprzednie projekty (chromium, firefox, webkit)

   
],
});