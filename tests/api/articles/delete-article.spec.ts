import { test, expect } from '@playwright/test';
import { ApiUtils } from '../../../utils/api-utils';
import userData from '../../../test-data/user-data.json';

test('Create Article via API', async ({ request }) => {
    const apiUtils = new ApiUtils(request);
    const { token } = await apiUtils.loginAndGetToken(userData.validUser);

    const createResponse = await apiUtils.createArticle(token, {
        title: "Test " + Date.now(),
        description: "Opis",
        body: "Treść",
        tagList: []
    });

    const body = await createResponse.json(); 
    const slug = body.article.slug;

    const deleteResponse = await apiUtils.deleteArticle(token, slug);
    expect(deleteResponse.status()).toBe(204);
});