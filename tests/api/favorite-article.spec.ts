import { test, expect } from '@playwright/test';
import userData from '../../test-data/user-data.json';

test('Validate Favorite/ Unfavorite article via API', async ({ request }) => {
    
    const loginResponse = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
        data: { user: userData.validUser }
    });
    const loginBody = await loginResponse.json();
    const token = loginBody.user.token;
    
    const articlesResponse = await request.get('https://conduit-api.bondaracademy.com/api/articles?limit=1');
    const articlesBody = await articlesResponse.json();
    const slug = articlesBody.articles[0].slug;
 
    const favResponse = await request.post(`https://conduit-api.bondaracademy.com/api/articles/${slug}/favorite`, {
        headers: { 'Authorization': `Token ${token}` }
    });
    expect(favResponse.status()).toBe(200);
    const favBody = await favResponse.json();
    expect(favBody.article.favorited).toBe(true);
    const unfavResponse = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${slug}/favorite`, {
        headers: { 'Authorization': `Token ${token}` }
    });
    expect(unfavResponse.status()).toBe(200);
    const unfavBody = await unfavResponse.json();
    expect(unfavBody.article.favorited).toBe(false);
});