import { Locator, Page, expect } from '@playwright/test';

export class SettingsPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly bioInput: Locator;
    readonly updateButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.getByPlaceholder('Your Name');
        this.bioInput = page.getByPlaceholder('Short bio about you');
        this.updateButton = page.getByRole('button', { name: 'Update Settings' });
    }

    async updateBio(bio: string) {
        await this.bioInput.fill(bio);
        await this.updateButton.click();
    }
}