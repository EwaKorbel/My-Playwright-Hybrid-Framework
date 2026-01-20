import { Locator, Page, expect } from '@playwright/test';

export class ValidationPage {
    readonly page: Page;
    readonly errorMessages: Locator;

    constructor(page: Page) {
        this.page = page;
        this.errorMessages = page.locator('.error-messages li');
    }

    async verifyErrorMessage(expectedText: string) {
        // Sprawdzamy, czy lista błędów zawiera konkretny tekst (np. "title can't be blank")
        await expect(this.errorMessages).toContainText(expectedText);
    }
}