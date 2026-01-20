import { test } from '@playwright/test';
import { NavigationPage } from '../../../page-objects/NavigationPage';
import { ArticlePage } from '../../../page-objects/ArticlePage';
import { ApiUtils } from '../../../utils/api-utils';
import userData from '../../../test-data/user-data.json';
import { faker } from '@faker-js/faker';

test('User should be able to see created article', async ({ page, request }) => {
    const navigationPage = new NavigationPage(page);
    const articlePage = new ArticlePage(page);
    const apiUtils = new ApiUtils(request);

    // 1. Przygotowanie unikalnych danych
    const randomTitle = faker.lorem.sentence(3); 
    const randomDescription = faker.lorem.paragraph(1);
    const randomBody = faker.lorem.paragraphs(2);

    // 2. Akcja API: Tworzymy artykuł w tle (Hybrid Testing)
    const { token } = await apiUtils.loginAndGetToken(userData.validUser);
    await apiUtils.createArticle(token, {
        title: randomTitle,
        description: randomDescription,
        body: randomBody,
        tagList: ["faker", "automation"]
    });

    // 3. Akcja UI: Przechodzimy do aplikacji i sprawdzamy wynik
    await page.goto('/');
    
    // Uruchamiamy oczekiwanie na dane zanim klikniemy w tab
    const loadPromise = articlePage.waitForArticlesToLoad();
    await navigationPage.goToGlobalFeed();
    await loadPromise;

    // 4. Asercja: Sprawdzamy widoczność przez Page Object
    await articlePage.verifyArticleIsVisible(randomTitle);
    
    console.log(`Sukces! Artykuł "${randomTitle}" jest widoczny w UI.`);
});