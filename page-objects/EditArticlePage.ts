import { Locator, Page, expect } from '@playwright/test';

export class EditArticlePage {
    readonly page: Page;
    readonly titleInput: Locator;
    readonly descriptionInput: Locator;
    readonly bodyInput: Locator;
    readonly updateButton: Locator;

    constructor(page: Page) {
        this.page = page;
        // Używamy placeholderów, bo są stabilne w tej aplikacji
        this.titleInput = page.getByPlaceholder('Article Title');
        this.descriptionInput = page.getByPlaceholder("What's this article about?");
        this.bodyInput = page.getByPlaceholder('Write your article (in markdown)');
        this.updateButton = page.getByRole('button', { name: 'Publish Article' });
    }

    async updateArticleContent(newDescription: string, newBody: string) {
        await this.descriptionInput.fill(newDescription);
        await this.bodyInput.fill(newBody);
        await this.updateButton.click();
    }
}