import { test, expect } from '@playwright/test';
import userData from '../../../test-data/user-data.json';

test.describe('API User Profile Actions', () => {
    let token: string;
    const targetUser = 'testuser'; // Użytkownik, którego będziemy obserwować

    test.beforeAll(async ({ request }) => {
        const loginResponse = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
            data: { user: userData.validUser }
        });
        const body = await loginResponse.json();
        token = body.user.token;
    });

    test('Should follow a user', async ({ request }) => {
        const response = await request.post(`https://conduit-api.bondaracademy.com/api/profiles/${targetUser}/follow`, {
            headers: { 'Authorization': `Token ${token}` }
        });
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.profile.following).toBe(true);
    });

    test('Should unfollow a user', async ({ request }) => {
        const response = await request.delete(`https://conduit-api.bondaracademy.com/api/profiles/${targetUser}/follow`, {
            headers: { 'Authorization': `Token ${token}` }
        });
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.profile.following).toBe(false);
    });
});