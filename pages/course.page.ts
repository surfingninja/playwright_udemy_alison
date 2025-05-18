import { Page } from "@playwright/test";
import { MainPage } from "./main.page";

export class CoursePage extends MainPage {

    private readonly courseTitle = this.locator("[class*='course-title']");
    private readonly publisherName = this.locator("span[class*='pub__name']");
    private readonly courseRating = this.locator("[class*=rating__love]");

    constructor(page: Page) {
        super(page);
    }

    public getCourseTitle() {
        return this.courseTitle.first();
    }

    public getPublisherName() {
        return this.publisherName;
    }

    public getCourseRating() {
        return this.courseRating.first();
    }

}