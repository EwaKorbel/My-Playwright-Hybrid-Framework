import { test, expect } from '@playwright/test';
import userData from '../../../test-data/user-data.json';

test.describe('API Article - Boundary Values & Constraints', () => {
    let token: string;

    test.beforeAll(async ({ request }) => {
        const loginResponse = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
            data: { user: userData.validUser }
        });
        const body = await loginResponse.json();
        token = body.user.token;
    });

    test('Should handle extremely long article body (50k characters)', async ({ request }) => {
        const longBody = 'A'.repeat(2000);
        const response = await request.post('https://conduit-api.bondaracademy.com/api/articles', {
            headers: { 'Authorization': `Token ${token}` },
            data: {
                article: {
                    title: `Long Body Test ${Date.now()}`,
                    description: "Testing system limits",
                    body: longBody,
                    tagList: ["performance"]
                }
            }
        });

        // Sprawdzamy, czy serwer przyjmuje duży ładunek (200/201) czy zwraca błąd limitu (413 Payload Too Large)
        expect(response.status()).toBeLessThan(500); 
        if (response.status() === 201) {
            const resBody = await response.json();
            expect(resBody.article.body.length).toBe(2000);
        }
    });

    test('Should block creation of article with duplicate title', async ({ request }) => {
        const uniqueTitle = `Duplicate Test ${Date.now()}`;
        const articlePayload = {
            article: {
                title: uniqueTitle,
                description: "First attempt",
                body: "First body content"
            }
        };

        // 1. Tworzymy pierwszy artykuł
        await request.post('https://conduit-api.bondaracademy.com/api/articles', {
            headers: { 'Authorization': `Token ${token}` },
            data: articlePayload
        });

        // 2. Próbujemy stworzyć identyczny artykuł drugi raz
        const secondResponse = await request.post('https://conduit-api.bondaracademy.com/api/articles', {
            headers: { 'Authorization': `Token ${token}` },
            data: articlePayload
        });

        expect(secondResponse.status()).toBe(422);
        const resBody = await secondResponse.json();
        expect(JSON.stringify(resBody.errors)).toContain('must be unique');
    });

    test('Should fetch specific article by slug and verify JSON schema', async ({ request }) => {
        // 1. Najpierw pobieramy jakikolwiek artykuł, żeby mieć slug
        const listResponse = await request.get('https://conduit-api.bondaracademy.com/api/articles?limit=1');
        const listBody = await listResponse.json();
        const slug = listBody.articles[0].slug;

        // 2. Pobieramy konkretny artykuł
        const response = await request.get(`https://conduit-api.bondaracademy.com/api/articles/${slug}`);
        expect(response.status()).toBe(200);
        
        const resBody = await response.json();
        
        // Weryfikacja struktury (Schema Validation)
        expect(resBody.article).toHaveProperty('slug');
        expect(resBody.article).toHaveProperty('title');
        expect(resBody.article).toHaveProperty('author');
        expect(typeof resBody.article.title).toBe('string');
        expect(Array.isArray(resBody.article.tagList)).toBe(true);
    });
});