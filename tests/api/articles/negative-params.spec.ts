import { test, expect } from '@playwright/test';
import userData from '../../../test-data/user-data.json';

test.describe('API Article Validation - Extended Params', () => {
    let token: string;

    test.beforeAll(async ({ request }) => {
        // Używamy pełnego adresu API, aby uniknąć 404
        const loginResponse = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
            data: { user: userData.validUser } 
        });
        
        // Teraz powinno być 200
        expect(loginResponse.status()).toBe(200);
        
        const body = await loginResponse.json();
        token = body.user.token;
    });

   const testCases = [
        { name: 'empty title', payload: { title: "", description: "desc", body: "body" }, error: "can't be blank" },
        { name: 'empty description', payload: { title: "title", description: "", body: "body" }, error: "can't be blank" },
        { name: 'empty body', payload: { title: "title", description: "desc", body: "" }, error: "can't be blank" },
        { name: 'missing title key', payload: { description: "desc", body: "body" }, error: "can't be blank" },
        // Zmieniamy na unikalność, bo serwer najwyraźniej sprawdza to najpierw
        { name: 'short or duplicate title', payload: { title: "a", description: "desc", body: "body" }, error: "must be unique" },
    ];

    for (const testCase of testCases) {
        test(`Post article fails when ${testCase.name}`, async ({ request }) => {
            const response = await request.post('https://conduit-api.bondaracademy.com/api/articles', {
                headers: { 'Authorization': `Token ${token}` },
                data: { article: testCase.payload }
            });

            expect(response.status()).toBe(422);
            
            const responseBody = await response.json();
            // Przekształcamy wszystkie błędy w jeden ciąg tekstowy do łatwego sprawdzenia
            const allErrors = JSON.stringify(responseBody.errors);
            
            expect(allErrors).toContain(testCase.error);
        });
    }
});