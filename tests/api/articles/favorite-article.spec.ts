import { test, expect } from '@playwright/test';
import userData from '../../../test-data/user-data.json';

test.describe('API Article Favorites', () => {
    let token: string;

    test.beforeAll(async ({ request }) => {
        const loginResponse = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
            data: { user: userData.validUser }
        });
        const body = await loginResponse.json();
        token = body.user.token;
    });

    test('Should favorite and unfavorite the first available article', async ({ request }) => {
        // 1. Pobierz pierwszy lepszy artykuł z global feed
        const listResponse = await request.get('https://conduit-api.bondaracademy.com/api/articles?limit=1');
        const listBody = await listResponse.json();
        const slug = listBody.articles[0].slug;

        // 2. Dodaj do ulubionych
        const favResponse = await request.post(`https://conduit-api.bondaracademy.com/api/articles/${slug}/favorite`, {
            headers: { 'Authorization': `Token ${token}` }
        });
        expect(favResponse.status()).toBe(200);
        expect((await favResponse.json()).article.favorited).toBe(true);

        // 3. Usuń z ulubionych
        const unfavResponse = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${slug}/favorite`, {
            headers: { 'Authorization': `Token ${token}` }
        });
        expect(unfavResponse.status()).toBe(200);
        expect((await unfavResponse.json()).article.favorited).toBe(false);
    });
});