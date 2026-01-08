import { Locator, Page, expect } from '@playwright/test';

export class NavigationPage {
    readonly page: Page;
    readonly userProfileLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.userProfileLink = page.locator('.navbar a[href*="profile"]');
    }

    async verifyUserIsLoggedIn(username: string) {
  
        await expect(this.userProfileLink).toHaveText(new RegExp(username, 'i'), { timeout: 10000 });
    }

    async goToSettings() {
        await this.page.getByRole('link', { name: 'Settings' }).click();
    }
}