import { test as setup } from '@playwright/test';
import { ApiUtils } from '../utils/api-utils';
import userData from '../test-data/user-data.json';

const authFile = '.auth/user.json';

setup('authenticate', async ({ request, page }) => {
  const apiUtils = new ApiUtils(request);
  
  // 1. Logujemy się raz przez API
  const { token } = await apiUtils.loginAndGetToken(userData.validUser);

  // 2. Wstrzykujemy token do kontekstu przeglądarki (żeby sesja była "żywa")
  await page.goto('/');
  await page.evaluate((jwt) => {
    window.localStorage.setItem('jwtToken', jwt);
    window.localStorage.setItem('jwt', jwt);
  }, token);

  // 3. Zapisujemy ten stan do pliku
  await page.context().storageState({ path: authFile });
});