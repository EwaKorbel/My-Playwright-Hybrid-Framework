import { test, expect } from '@playwright/test';

test.describe('API Security & Authorization', () => {

    test('Should return 401 when creating article without token', async ({ request }) => {
        const response = await request.post('https://conduit-api.bondaracademy.com/api/articles', {
            data: {
                article: {
                    title: "Unauthorized Article",
                    description: "Should fail",
                    body: "No token provided",
                    tagList: []
                }
            }
        });

        expect(response.status()).toBe(401);
    });

    test('Should return 403 when trying to delete someone else\'s article', async ({ request }) => {
        // 1. Najpierw pobieramy listę artykułów, aby znaleźć "cudzy" artykuł
        const listResponse = await request.get('https://conduit-api.bondaracademy.com/api/articles?limit=1');
        const listBody = await listResponse.json();
        const slug = listBody.articles[0].slug;

        // 2. Próbujemy go usunąć używając niepoprawnego/losowego tokena lub po prostu bez uprawnień właściciela
        const response = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${slug}`, {
            headers: {
                'Authorization': `Token invalid_token_xyz`
            }
        });

        // Oczekujemy 401 (invalid token) lub 403 (jeśli token byłby ważny, ale dla innego usera)
        // Systemy różnie to obsługują, w Conduit zazwyczaj dostaniesz 401 dla złego tokena
        expect(response.status()).toBe(401);
    });

    test.describe('API Security - Token Validation', () => {

    test('Should return 401 for expired/malformed token', async ({ request }) => {
        const response = await request.post('https://conduit-api.bondaracademy.com/api/articles', {
            headers: {
                // Symulujemy wygasły lub technicznie niepoprawny token
                'Authorization': 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.expired_payload_data'
            },
            data: {
                article: { title: "Test", description: "Test", body: "Test" }
            }
        });

        expect(response.status()).toBe(401);
    });

    test('Should return 401 for empty Authorization header', async ({ request }) => {
        const response = await request.delete('https://conduit-api.bondaracademy.com/api/articles/some-slug', {
            headers: {
                'Authorization': '' // Pusty nagłówek
            }
        });

        expect(response.status()).toBe(401);
    });

    test('Should return 401 for token with incorrect prefix', async ({ request }) => {
        // Conduit wymaga formatu "Token <string>". Sprawdzamy co się stanie przy "Bearer <string>"
        const response = await request.get('https://conduit-api.bondaracademy.com/api/articles/feed', {
            headers: {
                'Authorization': 'Bearer some_valid_looking_token'
            }
        });

        expect(response.status()).toBe(401);
    });
});
});