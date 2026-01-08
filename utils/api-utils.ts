import { APIRequestContext, Page } from '@playwright/test';

export class ApiUtils {
    readonly request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async loginAndGetToken(userPayload: any) {
        const loginResponse = await this.request.post('https://conduit-api.bondaracademy.com/api/users/login', {
            data: { user: userPayload }
        });

        if (!loginResponse.ok()) {
            throw new Error(`Login failed with status ${loginResponse.status()}`);
        }

        const loginData = await loginResponse.json();
        return {
            token: loginData.user.token,
            username: loginData.user.username
        };
    }

    async createArticle(token: string, articlePayload: any) {
        return await this.request.post('https://conduit-api.bondaracademy.com/api/articles', {
            data: { article: articlePayload },
            headers: {
                'Authorization': `Token ${token}`
            }
        });
    }

    async deleteArticle(token: string, slug: string) {
        return await this.request.delete(`https://conduit-api.bondaracademy.com/api/articles/${slug}`, {
            headers: {
                'Authorization': `Token ${token}`
            }
        });
    }

    async injectToken(page: Page, token: string) {
        await page.goto('/'); 
        await page.evaluate((jwt) => {
            window.localStorage.setItem('jwtToken', jwt);
            window.localStorage.setItem('jwt', jwt);
        }, token);
        await page.reload();
    }
}