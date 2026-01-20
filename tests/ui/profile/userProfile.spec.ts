import { test, expect } from '@playwright/test';

test.use({ storageState: '.auth/user.json' });

test('Display articles for logged in user', async ({ page }) => {
    await page.goto('/');

    const userMenu = page.locator('.nav-link[href*="profile"]');
    const userName = (await userMenu.textContent())?.trim();
    await userMenu.click();

    const profileHeader = page.locator('.user-info h4');
    await expect(profileHeader).toHaveText(userName || "");

    const myArticlesTab = page.locator('.articles-toggle .nav-link.active');
    await expect(myArticlesTab).toContainText('My Posts');

    const firstArticleAuthor = page.locator('.article-meta .author').first();
const noArticlesText = page.getByText('No articles are here... yet.');

await expect(async () => {
    const isVisible = await firstArticleAuthor.isVisible() || await noArticlesText.isVisible();
    expect(isVisible).toBeTruthy();
}).toPass({ timeout: 5000 });

if (await firstArticleAuthor.isVisible()) {
    await expect(firstArticleAuthor).toHaveText(userName || "");
} else {
    await expect(noArticlesText).toBeVisible();
}
});