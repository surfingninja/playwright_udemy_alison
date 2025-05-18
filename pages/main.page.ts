import { LoginPage } from "./login.page";
import { type Page } from '@playwright/test';

export class MainPage extends LoginPage {

    private readonly search = this.locator("#autocomplete");
    private readonly refineSearchByDropDown = this.locator("[class*=filter-heading]");
    private readonly refineSearchByBlocks = this.locator("[class*=categories]");
    private readonly showMore = this.locator("span[class*=categories]");
    private readonly showMoreOverflow = this.locator("[class*=overflow]");
    private readonly applyButton = this.locator("a[class*=apply]");

    private getFilterTicks(tick: string) {
        return this.locator(`label[for*='${tick}']`);
    }

    public getAppliedFilter(filter: string) {
        return this.locator(`[data-pill*='${filter}']`);
    }

    constructor(page: Page) {
        super(page);
    }

    public async searchCourse(query: string) {
        await this.search.fill(query);
        await this.page.keyboard.press('Enter');
        await this.waitForPageLoading();
    }

    public async applyFilter(filtername: string, ticknames: string | string[]) {
        const ticks = Array.isArray(ticknames) ? ticknames : [ticknames];
        await this.refineSearchByDropDown.filter({ hasText: filtername }).first().click();

        try {
            await this.refineSearchByBlocks.filter({ hasText: filtername }).first()
                .locator(this.showMore).last().waitFor({ state: 'visible', timeout: 2000 });
            await this.refineSearchByBlocks.filter({ hasText: filtername }).first().locator(this.showMore).last().click();
            for (const tick of ticks) {
                await this.showMoreOverflow.locator(this.getFilterTicks(tick)).first().click();
            }
            await this.locator(this.applyButton).first().click();
            await this.waitForPageLoading();
        } catch (error) {
            console.warn("Show more button is not available here or is missing. Continue with normal flow.");
            for (const tick of ticks) {
                await this.getFilterTicks(tick).first().click();
                await this.waitForPageLoading();
            }
        }
    }

}
