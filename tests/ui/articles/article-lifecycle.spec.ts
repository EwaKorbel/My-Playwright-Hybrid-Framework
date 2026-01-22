import { test, expect } from '@playwright/test';
import { NavigationPage } from '../../../page-objects/NavigationPage';
import { ArticlePage } from '../../../page-objects/ArticlePage';

test.describe('Article Full Lifecycle (UI)', () => {
    let navigationPage: NavigationPage;
    let articlePage: ArticlePage;
    const title = `Lifecycle Test ${Date.now()}`;
    const editedTitle = `${title} - EDITED`;

    test.beforeEach(async ({ page }) => {
        navigationPage = new NavigationPage(page);
        articlePage = new ArticlePage(page);
        await page.goto('https://conduit.bondaracademy.com/');
    });

    test('Should create, edit and delete an article', async ({ page }) => {
        // 1. CREATE
        await navigationPage.createArticlePage();
        await articlePage.createArticle(title, "Testing full UI flow", "Initial body content", ["automation", "ui"]);
        
        // Weryfikacja po stworzeniu
        await expect(page.locator('h1')).toHaveText(title);

        // 2. EDIT
       await page.getByRole('link', { name: 'Edit Article' }).first().click();
await page.getByRole('textbox', { name: 'Article Title' }).fill(editedTitle);

// Opcjonalnie dodaj małe opóźnienie przed kliknięciem, 
// aby upewnić się, że formularz "przetrawił" wpisany tekst
await page.getByRole('button', { name: 'Publish Article' }).click();

// FIX: Czekamy, aż URL przestanie zawierać końcówkę "/editor", 
// co oznacza, że wróciliśmy do widoku artykułu
await expect(page).not.toHaveURL(/.*\/editor/);

// Weryfikacja po edycji - teraz asercja powinna być stabilna
await expect(page.locator('h1')).toHaveText(editedTitle, { timeout: 15000 });

        // Weryfikacja po edycji
        await expect(page.locator('h1')).toHaveText(editedTitle);

        // 3. DELETE
        // Ustawiamy listener dla dialogu potwierdzającego (jeśli aplikacja go używa)
        page.once('dialog', dialog => dialog.accept()); 
        await page.getByRole('button', { name: 'Delete Article' }).first().click();

        // Weryfikacja powrotu do strony głównej po usunięciu
        await expect(page).toHaveURL('https://conduit.bondaracademy.com/');
        await expect(page.getByText(editedTitle)).not.toBeVisible();
    });
});