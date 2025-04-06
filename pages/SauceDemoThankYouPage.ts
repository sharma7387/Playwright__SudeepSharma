import {expect, Locator, Page,TestInfo} from '@playwright/test';

export class SauceDemoThankYouPage{
    readonly page: Page;
    readonly testInfo: TestInfo;


    constructor (testInfo:TestInfo,page:Page)
    {
        this.page = page;
        this.testInfo = testInfo;
    }
}