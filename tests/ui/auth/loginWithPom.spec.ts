import { test } from '@playwright/test';
import { NavigationPage } from '../../../page-objects/NavigationPage';
import { ApiUtils } from '../../../utils/api-utils';
import userData from '../../../test-data/user-data.json';

test('Login via Api and user profile validation', async ({ page, request }) => {
  const navigationPage = new NavigationPage(page);
  const apiUtils = new ApiUtils(request);

  const { token, username } = await apiUtils.loginAndGetToken({
      email: userData.validUser.email,
      password: userData.validUser.password
  });

  await page.goto('/'); 
  await page.evaluate((jwt) => {
    window.localStorage.setItem('jwtToken', jwt);
    window.localStorage.setItem('jwt', jwt);
  }, token);

  await page.reload();

  await navigationPage.verifyUserIsLoggedIn(username);
});