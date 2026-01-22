import { Locator, Page, expect } from '@playwright/test';

export class NavigationPage {
    readonly page: Page;
    readonly userProfileLink: Locator;
    readonly globalFeedTab: Locator;
    // 1. Definiujemy lokator dla przycisku New Article
    readonly newArticleLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.userProfileLink = page.locator('.navbar a[href*="profile"]');
        this.globalFeedTab = page.getByText('Global Feed');
        // 2. Inicjalizujemy lokator
        this.newArticleLink = page.getByRole('link', { name: 'New Article' });
    }

    // 3. Dodajemy brakującą metodę, której szukał Twój test
    async createArticlePage() {
        await this.newArticleLink.click();
    }

    async verifyUserIsLoggedIn(username: string) {
        await expect(this.userProfileLink).toHaveText(new RegExp(username, 'i'), { timeout: 10000 });
    }

    async goToGlobalFeed() {
        await this.globalFeedTab.click();
    }

    async goToSettings() {
        await this.page.getByRole('link', { name: 'Settings' }).click();
    }
}