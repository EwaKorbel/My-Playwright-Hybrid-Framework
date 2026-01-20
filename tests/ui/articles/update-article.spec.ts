import { test } from '@playwright/test';
import { NavigationPage } from '../../../page-objects/NavigationPage';
import { ArticlePage } from '../../../page-objects/ArticlePage';
import { EditArticlePage } from '../../../page-objects/EditArticlePage'; // Nowy import
import { ApiUtils } from '../../../utils/api-utils';
import userData from '../../../test-data/user-data.json';
import { faker } from '@faker-js/faker';

test('User should be able to edit their article', async ({ page, request }) => {
    const navigationPage = new NavigationPage(page);
    const articlePage = new ArticlePage(page);
    const editPage = new EditArticlePage(page);
    const apiUtils = new ApiUtils(request);

    // 1. SETUP: Tworzymy artykuł przez API
    const initialTitle = "Edit Test " + faker.string.uuid();
    const { token } = await apiUtils.loginAndGetToken(userData.validUser);
    const response = await apiUtils.createArticle(token, {
        title: initialTitle,
        description: "Old description",
        body: "Old body",
        tagList: []
    });
    const responseBody = await response.json();
    const slug = responseBody.article.slug;

    // 2. AKCJA: Przechodzimy do edycji
    await page.goto(`/article/${slug}`);
    await articlePage.clickEdit();

    // 3. EDYCJA: Zmieniamy treść
    const updatedBody = "This content has been updated by Playwright! " + faker.lorem.sentence();
    await editPage.updateArticleContent("Updated Description", updatedBody);

    // 4. WERYFIKACJA: Czy nowa treść jest widoczna?
    await articlePage.verifyArticleContent(updatedBody);
    
    console.log("Sukces! Artykuł został zaktualizowany.");
});