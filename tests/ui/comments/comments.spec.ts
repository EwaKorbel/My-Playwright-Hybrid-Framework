import { test, expect } from '@playwright/test';
import { NavigationPage } from '../../../page-objects/NavigationPage';
import { ArticlePage } from '../../../page-objects/ArticlePage';
import { faker } from '@faker-js/faker'; // Importujemy Fakera

test.use({ storageState: '.auth/user.json' });

test.describe('Article Comments with Faker & Cleanup', () => {
    let navigateTo: NavigationPage;
    let articlePage: ArticlePage;

    test.beforeEach(async ({ page }) => {
        navigateTo = new NavigationPage(page);
        articlePage = new ArticlePage(page);
        await page.goto('/');
    });

    test('Should post a random comment and then delete it', async ({ page }) => {
        await navigateTo.goToGlobalFeed();
        
        // Klikamy w pierwszy artykuł
        await page.locator('.article-preview h1').first().click();

        // GENEROWANIE DANYCH: Tworzymy losowe zdanie przy użyciu Fakera
        const randomComment = faker.lorem.sentence(); 
        console.log(`Testing with comment: ${randomComment}`);
        
        // AKCJA: Dodajemy losowy komentarz
        await articlePage.addCommentWithRetry(randomComment);

        // WERYFIKACJA: Czy komentarz się pojawił?
       await expect(articlePage.firstCommentText).toContainText(randomComment);

        // SPRZĄTANIE (CLEANUP): Usuwamy go po sobie
        await articlePage.deleteLastComment(randomComment);
        
        // Ostateczne sprawdzenie, czy na pewno zniknął
        await expect(page.getByText(randomComment)).not.toBeVisible();
    });
});