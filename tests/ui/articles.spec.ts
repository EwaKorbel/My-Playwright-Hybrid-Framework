import { test, expect } from '@playwright/test';
import { NavigationPage } from '../../page-objects/NavigationPage';
import { ApiUtils } from '../../utils/api-utils';
import userData from '../../test-data/user-data.json';
import { faker } from '@faker-js/faker';

test('User should be able to see created article', async ({ page, request }) => {
    const navigationPage = new NavigationPage(page);
    const apiUtils = new ApiUtils(request);

    const randomTitle = faker.lorem.sentence(3); 
    const randomDescription = faker.lorem.paragraph(1);
    const randomBody = faker.lorem.paragraphs(2);

    const { token } = await apiUtils.loginAndGetToken(userData.validUser);
    await apiUtils.createArticle(token, {
        title: randomTitle,
        description: randomDescription,
        body: randomBody,
        tagList: ["faker", "automation"]
    });

    await page.goto('/');
    
    const responsePromise = page.waitForResponse(response => 
        response.url().includes('/api/articles') && response.status() === 200
    );

    await page.getByText('Global Feed').click();

    await responsePromise;

    const articleTitleInUI = page.locator('h1', { hasText: randomTitle });
    
    await expect(articleTitleInUI).toBeVisible({ timeout: 15000 });
    
    console.log(`Sukces! Znaleziono artykuł: ${randomTitle}`);
});