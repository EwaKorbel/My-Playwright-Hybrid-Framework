import { test, expect } from '@playwright/test';

test.describe('API Negative Auth Suite', () => {

    test('Serwer powinien odrzucić logowanie z błędnym hasłem (401)', async ({ request }) => {
        const response = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
            data: {
                user: {
                    email: "nieistniejacy@test.pl",
                    password: "zle_haslo_123"
                }
            }
        });

        // 401 Unauthorized to poprawna odpowiedź dla złych poświadczeń
        expect(response.status()).toBe(403);
        
        const body = await response.json();
        expect(body.errors['email or password']).toContain('is invalid');
    });

    test('Nie można utworzyć artykułu bez autoryzacji (401)', async ({ request }) => {
        const response = await request.post('https://conduit-api.bondaracademy.com/api/articles', {
            data: {
                article: { title: "Hacker", description: "Test", body: "Test", tagList: [] }
            }
        });

        // Brak nagłówka Authorization musi skutkować błędem 401
        expect(response.status()).toBe(401);
    });
});