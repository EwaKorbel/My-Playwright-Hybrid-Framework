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
    readonly commentInput: Locator;
    readonly postCommentButton: Locator;
    readonly firstCommentText: Locator;
    readonly commentDeleteButton: Locator;

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
        this.commentInput = page.locator('textarea.form-control');
        this.postCommentButton = page.getByRole('button', { name: 'Post Comment' });
        this.firstCommentText = page.locator('.card-text').first();
        this.commentDeleteButton = page.locator('.mod-options .ion-trash-a').first();
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
/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Adds a comment to an article by retrying to find the comment field up to 25 seconds.
 * If the comment field is not visible, it reloads the page.
 * @param {string} comment - The comment to add
 */
/*******  0f1df2f0-742d-4be9-9980-eaaed6905aca  *******/
   async addCommentWithRetry(comment: string) {
    await expect(async () => {
        // Dodajmy sprawdzenie, czy w ogóle jesteśmy na stronie artykułu
        await expect(this.page.locator('.article-content')).toBeVisible();
        
        if (!await this.commentInput.isVisible()) {
            console.log("DEBUG: Comment field not visible, reloading..."); // To zobaczysz w terminalu
            await this.page.reload();
        }
        await expect(this.commentInput).toBeVisible({ timeout: 5000 });
    }).toPass({ timeout: 25000 });
    
    await this.commentInput.fill(comment);
    await this.postCommentButton.click();
}

async deleteLastComment(commentText: string) {
    // 1. Znajdujemy kartę komentarza, która zawiera nasz konkretny tekst
    const commentCard = this.page.locator('.card', { hasText: commentText });
    
    // 2. Klikamy w kosz wewnątrz tej konkretnej karty
    await commentCard.locator('.mod-options .ion-trash-a').click();

    // 3. Czekamy, aż CAŁA KARTA z tym tekstem zniknie
    await expect(commentCard).not.toBeVisible({ timeout: 10000 });
}
}