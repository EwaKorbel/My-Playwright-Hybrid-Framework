import { test, expect } from '@playwright/test';

const loginScenarios = [
    { name: 'wrong password', email: 'valid@user.com', password: 'wrongpassword' },
    { name: 'non-existent email', email: 'nobody-here-123@test.pl', password: 'password' },
    { name: 'empty email', email: '', password: 'password' },
];

for (const scenario of loginScenarios) {
    test(`Login should fail for ${scenario.name}`, async ({ request }) => {
        const response = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
            data: { 
                user: { email: scenario.email, password: scenario.password } 
            }
        });
        
        // Serwer Conduit zazwyczaj zwraca 401 (Unauthorized) lub 422 (Unprocessable Entity)
        // Sprawdzamy czy status jest jednym z błędnych
        const status = response.status();
        expect(status === 401 || status === 422 || status === 403).toBeTruthy();
    });
}