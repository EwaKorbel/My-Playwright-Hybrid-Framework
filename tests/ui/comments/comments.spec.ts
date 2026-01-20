import { test, expect } from '@playwright/test';

test.use({ storageState: '.auth/user.json' });

test('Add comment to article', async ({ page }) => {
   
    await page.goto('/');
    await expect(page.locator('.navbar')).toContainText('testuser', { timeout: 15000 });

    await page.getByText('Global Feed').click();
    
    const firstArticleTitle = page.locator('.article-preview h1').first();
    await firstArticleTitle.waitFor({ state: 'visible', timeout: 15000 });
    await firstArticleTitle.click();
  
    await page.locator('.article-content').waitFor({ state: 'visible', timeout: 15000 });
   
    const commentInput = page.getByPlaceholder('Write a comment...');
    
    await expect(async () => {
        
        if (!await commentInput.isVisible()) {
            await page.reload();
            await page.locator('.article-content').waitFor({ state: 'visible' });
        }
        await expect(commentInput).toBeVisible();
    }).toPass({ timeout: 20000 });

    const uniqueComment = `Automatyczny test: ${Math.random().toString(36).substring(7)}`;
    await commentInput.fill(uniqueComment);
    await page.getByRole('button', { name: 'Post Comment' }).click();

    await expect(page.locator('.card-text').first()).toContainText(uniqueComment);
});