import { test } from '@playwright/test';
import { EditArticlePage } from '../../../page-objects/EditArticlePage';
import { ValidationPage } from '../../../page-objects/ValidationPage';

test.describe('Article Validation Tests', () => {
    
    test('Should show title error when submitting empty form', async ({ page }) => {
        const editPage = new EditArticlePage(page);
        const validationPage = new ValidationPage(page);

        await page.goto('/editor');
        await editPage.updateButton.click();

        // Skupiamy się na pierwszym błędzie, który blokuje system
        await validationPage.verifyErrorMessage("title can't be blank");
    });

    const invalidData = [
        { field: 'title', error: "title can't be blank" },
        { field: 'description', error: "description can't be blank" },
        { field: 'body', error: "body can't be blank" }
    ];

    for (const data of invalidData) {
        test(`Validation error for missing ${data.field}`, async ({ page }) => {
            const editPage = new EditArticlePage(page);
            const validationPage = new ValidationPage(page);

            await page.goto('/editor');
            
            // Wypełniamy wszystkie pola OPRÓCZ tego jednego konkretnego
            if (data.field !== 'title') await editPage.titleInput.fill('Valid Title');
            if (data.field !== 'description') await editPage.descriptionInput.fill('Valid Description');
            if (data.field !== 'body') await editPage.bodyInput.fill('Valid Body content');

            await editPage.updateButton.click();
            
            // Teraz system MUSI pokazać błąd dla tego konkretnego pola
            await validationPage.verifyErrorMessage(data.error);
        });
    }
});