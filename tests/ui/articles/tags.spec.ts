import { test, expect } from '@playwright/test';

test('Filter by tag', async ({ page }) => {
    await page.goto('/');
    
    const sidebarTags = page.locator('.sidebar .tag-list');
    await sidebarTags.waitFor({ state: 'visible' });

    const tagToClick = sidebarTags.locator('.tag-pill').first();
    const tagName = await tagToClick.textContent();
    const cleanTagName = tagName?.trim() || "";

    const responsePromise = page.waitForResponse(response => 
        response.url().includes('/api/articles?tag=') && response.status() === 200
    );
    
    await tagToClick.click();
    await responsePromise;

    const activeTab = page.locator('.feed-toggle .nav-link.active').last();
    await expect(activeTab).toContainText(cleanTagName);
});