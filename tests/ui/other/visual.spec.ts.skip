import { test, expect } from '@playwright/test';

test.describe('Visual Regression Suite', () => {
    test('Strona główna powinna wyglądać poprawnie', async ({ page }) => {
        await page.goto('/');
        await expect(page).toHaveScreenshot({ maxDiffPixels: 100 });
    });

    test('Podgląd artykułu powinien być spójny wizualnie', async ({ page }) => {
        await page.goto('/');
        await page.getByText('Global Feed').click();
        const firstArticle = page.locator('.article-preview').first();
        await expect(firstArticle).toHaveScreenshot();
    });
});