import { Locator, Page, expect } from '@playwright/test';

export class ArticlePage {
    readonly page: Page;
    readonly deleteButton: Locator;
    readonly editButton: Locator;
    // Lokatory dla formularza
    readonly titleInput: Locator;
    readonly descriptionInput: Locator;
    readonly bodyInput: Locator;
    readonly tagsInput: Locator;
    readonly publishButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.deleteButton = page.getByRole('button', { name: 'Delete Article' }).first();
        this.editButton = page.getByRole('link', { name: 'Edit Article' }).first();
        
        // Inicjalizacja lokatorów formularza
        this.titleInput = page.getByRole('textbox', { name: 'Article Title' });
        this.descriptionInput = page.getByRole('textbox', { name: "What's this article about?" });
        this.bodyInput = page.getByRole('textbox', { name: 'Write your article (in markdown)' });
        this.tagsInput = page.getByRole('textbox', { name: 'Enter tags' });
        this.publishButton = page.getByRole('button', { name: 'Publish Article' });
    }

    // TA METODA JEST NIEZBĘDNA DLA TWOJEGO TESTU
    async createArticle(title: string, description: string, body: string, tags: string[]) {
        await this.titleInput.fill(title);
        await this.descriptionInput.fill(description);
        await this.bodyInput.fill(body);
        
        for (const tag of tags) {
            await this.tagsInput.fill(tag);
            await this.tagsInput.press('Enter');
        }
        
        await this.publishButton.click();
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
        const articleBody = this.page.locator('p').filter({ hasText: body });
        await expect(articleBody).toBeVisible({ timeout: 15000 });
    }

    async waitForArticlesToLoad() {
        await this.page.waitForResponse(response => 
            response.url().includes('/api/articles') && response.status() === 200
        );
    }
}