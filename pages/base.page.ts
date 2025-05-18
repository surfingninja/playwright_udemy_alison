import { Locator, type Page } from '@playwright/test';

export class BasePage {

    protected readonly page: Page

    constructor(page: Page) {
        this.page = page;
    }

    public async goTo(url: string) {
        await this.page.goto(url, { waitUntil: "domcontentloaded" });
    }

    public async reload() {
        await this.page.reload();
    }

    public locator(selector: string | Locator): Locator {
        return typeof selector === 'string' ? this.page.locator(selector) : selector;
    }

    public async waitForPageLoading() {
        try {
            await this.page.locator("[class*='spinner']").waitFor({ state: 'visible', timeout: 2000 });
            await this.page.locator("[class*='spinner']").waitFor({ state: 'hidden', timeout: 10000 });
        } catch {
        }
        await this.page.locator("[class*='spinner']").waitFor({ state: 'hidden', timeout: 10000 });
    }
}

