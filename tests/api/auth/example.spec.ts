import { test, expect } from '@playwright/test';

test('Show user profile after login via API', async ({ request }) => {
 
    const loginResponse = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
        data: { "user": { "email": "testuser@test", "password": "TestTest123" } }
    });

    expect(loginResponse.ok(), `Błąd API: ${loginResponse.status()}`).toBeTruthy();

    const loginData = await loginResponse.json();
    const token = loginData.user.token;
    
    const userResponse = await request.get('https://conduit-api.bondaracademy.com/api/user', {
        headers: {
            'Authorization': `Token ${token}`
        }
    });

    expect(userResponse.ok()).toBeTruthy();
    const userData = await userResponse.json();
    expect(userData.user.email).toBe("testuser@test");
});