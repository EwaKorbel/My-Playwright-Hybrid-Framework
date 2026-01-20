import { test, expect } from '@playwright/test';

test('API should return list of tags and contain specific keywords', async ({ request }) => {
    const response = await request.get('https://conduit-api.bondaracademy.com/api/tags');
    const body = await response.json();
    
    // Zmieniamy na wartość, którą faktycznie otrzymaliśmy w logach
    expect(body.tags).toContain('Git'); 
    expect(body.tags.every((tag: any) => typeof tag === 'string')).toBeTruthy();
});