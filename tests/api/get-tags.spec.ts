import { test, expect } from '@playwright/test';

test('API should return list of tags', async ({ request }) => {
    
    const response = await request.get('https://conduit-api.bondaracademy.com/api/tags');
    
    expect(response.ok()).toBeTruthy();
    
    const body = await response.json();
    
    expect(Array.isArray(body.tags)).toBeTruthy();
    expect(body.tags.length).toBeGreaterThan(0);
    
    expect(typeof body.tags[0]).toBe('string');
});