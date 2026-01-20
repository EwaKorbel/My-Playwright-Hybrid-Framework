import { Locator, Page, expect } from '@playwright/test';

export class ArticlePage {
    readonly page: Page;
    readonly deleteButton: Locator;
    readonly editButton: Locator; // DODANE

    constructor(page: Page) {
        this.page = page;
        this.deleteButton = page.getByRole('button', { name: 'Delete Article' }).first();
        this.editButton = page.getByRole('link', { name: 'Edit Article' }).first(); // DODANE
    }

    async clickEdit() {
        await this.editButton.click();
    }

    async deleteArticleViaUI() {
        this.page.on('dialog', dialog => dialog.accept());
        await this.deleteButton.click();
    }

    async verifyArticleIsVisible(title: string) {
        const articleTitle = this.page.locator('h1', { hasText: title });
        await expect(articleTitle).toBeVisible({ timeout: 15000 });
    }

    async verifyArticleContent(body: string) {
    // Używamy wyrażenia regularnego, aby szukać fragmentu tekstu, ignorując zbędne spacje
    const articleBody = this.page.locator('p').filter({ hasText: body });
    await expect(articleBody).toBeVisible({ timeout: 15000 }); // Zwiększamy nieco timeout
}

    async waitForArticlesToLoad() {
        await this.page.waitForResponse(response => 
            response.url().includes('/api/articles') && response.status() === 200
        );
    }
}