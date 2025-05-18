import { test, expect } from '@playwright/test'

import { BasePage } from '../pages/base.page';
import { LoginPage } from '../pages/login.page';
import { MainPage } from '../pages/main.page';
import { CoursePage } from '../pages/course.page';

test.describe("Course functionality feature", () => {

    test.beforeEach("Login before", async ({ page }) => {
        const email = String(process.env.EMAIL);
        const password = String(process.env.PASSWORD);
        const loginPage = new LoginPage(page);
        const basePage = new BasePage(page);
        await basePage.goTo("https://alison.com/");
        await loginPage.login(email, password);
        await loginPage.goToDashboard();
        await expect(page.locator("[class*='user-data']").first()).toBeVisible();
    });

    test("Course search and filtering test", async ({ page }) => {
        const mainPage = new MainPage(page);
        await mainPage.searchCourse("javascript");
        await mainPage.applyFilter("certificate", "certificate");
        await mainPage.applyFilter("subjects", ["computer-skills", "computer-science"]);
        await mainPage.applyFilter("learning", "job");

        expect(mainPage.getAppliedFilter("certificate").first()).toBeVisible();
        expect(mainPage.getAppliedFilter("job").first()).toBeVisible();
        expect(mainPage.getAppliedFilter("computer-science").first()).toBeVisible();
        expect(mainPage.getAppliedFilter("computer-skills").first()).toBeVisible();
    });

    test("Course details page test", async ({ page }) => {
        const coursePage = new CoursePage(page);
        await coursePage.goTo("./course/javascript-for-dynamic-and-interactive-web-pages");
        await coursePage.waitForPageLoading();
        expect(await coursePage.getCourseTitle().textContent()).toContain("JavaScript for Dynamic and Interactive Web Pages");
        expect(await coursePage.getPublisherName().textContent()).toContain("Laurence Svekis");
        expect(await coursePage.getCourseRating()).toBeVisible();
    });

})