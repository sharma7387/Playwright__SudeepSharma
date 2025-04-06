import {expect, Locator, Page,TestInfo} from '@playwright/test';
import { LoadFnOutput } from 'module';

export class BoxNoteBookpage{
    readonly page1: Page;
    readonly testInfo: TestInfo;
    readonly createNoteButton:Locator;
    readonly noteTitleField:Locator;
    readonly optionmenu:Locator;
    readonly deleteoption:Locator;
    readonly notification:Locator;
    readonly clearnotification:Locator;


    constructor (testInfo:TestInfo,page:Page)
    {
        this.page1 = page;
        this.testInfo = testInfo;
        this.createNoteButton = page.frameLocator("//iframe[@id='service_iframe']").getByTestId('create-note-button');
        this.noteTitleField = page.frameLocator("//iframe[@id='service_iframe']").getByPlaceholder('Add a Title');
        this.optionmenu = page.frameLocator("//iframe[@id='service_iframe']").getByTestId('options-menu-trigger');
        this.deleteoption = page.frameLocator("//iframe[@id='service_iframe']").getByText('Delete this note');
        this.notification = page.frameLocator("//iframe[@id='service_iframe']").getByTestId('notification');
        this.clearnotification = page.frameLocator("//iframe[@id='service_iframe']").getByLabel('Clear Notification');
    }

    async clickOnCreateNewNoteBook()
    {
        await this.createNoteButton.click();
    }
    async addNoteTitle(title:string)
    {
        await this.noteTitleField.click();
        await this.noteTitleField.fill(title);
    }
    async clickonOptionMenu()
    {
        await this.optionmenu.click();
    }
    async selectDeleteOption()
    {
        await this.deleteoption.click();
    }
    async verifyNotification()
    {
        const value = await this.notification.isVisible();
        expect(value).toBe(true);
    }
    async closeNotification()
    {
        await this.clearnotification.click();
    }
}
