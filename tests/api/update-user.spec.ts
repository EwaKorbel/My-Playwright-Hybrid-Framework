import { test, expect } from '@playwright/test';
import userData from '../../test-data/user-data.json';

test('Powinien zaktualizować bio użytkownika przez API', async ({ request }) => {
    // Logowanie po token
    const loginResponse = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
        data: { user: userData.validUser }
    });
    const loginBody = await loginResponse.json();
    const token = loginBody.user.token;

    const newBio = "Nowe bio stworzone przez automat " + Date.now();

    // Żądanie PUT do aktualizacji danych
    const response = await request.put('https://conduit-api.bondaracademy.com/api/user', {
        data: {
            user: { bio: newBio }
        },
        headers: {
            'Authorization': `Token ${token}`
        }
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.user.bio).toBe(newBio);
});