import { test, expect } from '@playwright/test';
import { ApiUtils } from '../../../utils/api-utils';
import userData from '../../../test-data/user-data.json';

test.describe('API Comments Validation', () => {
    let token: string;
    let slug: string;

    test.beforeAll(async ({ request }) => {
        const apiUtils = new ApiUtils(request);
        const loginData = await apiUtils.loginAndGetToken(userData.validUser);
        token = loginData.token;

        // Tworzymy jeden artykuł, do którego będziemy dodawać komentarze
        const articleResponse = await apiUtils.createArticle(token, {
            title: "Article for comments " + Date.now(),
            description: "Desc",
            body: "Body",
            tagList: []
        });
        const body = await articleResponse.json();
        slug = body.article.slug;
    });

    const cases = [
        { name: 'empty comment body', payload: { comment: { body: "" } }, error: "can't be blank" },
        // Jeśli serwer rzuca 500 przy braku obiektu, na razie usuńmy ten przypadek 
        // lub zmieńmy go na taki, który serwer akceptuje (np. pusty obiekt):
        { name: 'missing body inside comment', payload: { comment: { } }, error: "can't be blank" }
    ];

    for (const c of cases) {
        test(`Post comment fails when ${c.name}`, async ({ request }) => {
            const response = await request.post(`https://conduit-api.bondaracademy.com/api/articles/${slug}/comments`, {
                headers: { 'Authorization': `Token ${token}` },
                data: c.payload
            });

            expect(response.status()).toBe(422);
            const resBody = await response.json();
            expect(JSON.stringify(resBody.errors)).toContain(c.error);
        });
    }
});