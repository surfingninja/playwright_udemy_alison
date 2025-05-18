import { BasePage } from "./base.page";
import { type Page } from '@playwright/test';

export class LoginPage extends BasePage {

    private readonly loginButton = this.locator("[class*='button login']");
    private readonly emailInput = this.locator("[name=email]");
    private readonly passwordInput = this.locator("[name=password]");
    private readonly submitButton = this.locator("[class*=submit]");
    private readonly dashboard = this.locator("#ab-dashboard");

    constructor(page: Page) {
        super(page);
    }

    public async login(email: string, pass: string) {
        await this.loginButton.click();
        await this.emailInput.first().fill(email);
        await this.passwordInput.first().fill(pass);
        await this.submitButton.first().click();
        await this.waitForPageLoading();
    }

    public async goToDashboard() {
        try {
            await this.dashboard.waitFor({state: 'visible', timeout: 3000});
            await this.dashboard.click();
        } catch { }

    }

}