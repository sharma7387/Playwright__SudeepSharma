import {Locator, Page,TestInfo} from '@playwright/test';
import { LoadFnOutput } from 'module';

export class BoxLoginPage{
    readonly page: Page;
    readonly testInfo: TestInfo;
    readonly pagetitle: Locator;
    readonly usernamefield:Locator;
    readonly nextButton:Locator;
    readonly passwordfield:Locator;
    readonly usernamelist:Locator;
    readonly passwordlist:Locator;
    readonly loginButton:Locator;
    readonly username = 'sudeepsharma059@gmail.com';
    readonly password = 'Welcome@Box1234';
    readonly notesButton:Locator;
    readonly profileImage:Locator;
    readonly logoutButton:Locator;
    readonly createNoteButton:Locator;
    readonly noteTitleField:Locator;
    readonly optionmenu:Locator;
    readonly deleteoption:Locator;
    readonly notification:Locator;
    readonly clearnotification:Locator;

    constructor (testInfo:TestInfo,page:Page)
    {
        this.page = page;
        this.testInfo = testInfo;
        this.usernamefield = page.locator("//input[@name='login']");
        this.nextButton = page.locator("//button[text()=' Next']");
        this.passwordfield = page.locator("//input[@name='password']");
        this.loginButton = page.locator("//button[text()=' Log In']");
        this.notesButton = page.getByLabel('Notes');        
        this.profileImage = page.locator("//div[@class='ProfileButton-avatar']");
        this.logoutButton = page.locator("//span[text()='Log Out']");
        this.createNoteButton = page.frameLocator("//iframe[@id='service_iframe']").getByTestId('create-note-button');
        this.noteTitleField = page.frameLocator("//iframe[@id='service_iframe']").getByPlaceholder('Add a Title');
        this.optionmenu = page.frameLocator("//iframe[@id='service_iframe']").getByTestId('options-menu-trigger');
        this.deleteoption = page.frameLocator("//iframe[@id='service_iframe']").getByText('Delete this note');
        this.notification = page.frameLocator("//iframe[@id='service_iframe']").getByTestId('notification');
        this.clearnotification = page.frameLocator("//iframe[@id='service_iframe']").getByLabel('Clear Notification');
    }
    async getScreenshot(name:string): Promise<void>{
        const welcomeScreenshot = await this.page.screenshot();
        await this.testInfo.attach(name,{
            body:welcomeScreenshot,
            contentType:'image/png',
        });
    }

    async gotopage():Promise<void>{
        await this.page.goto('https://account.box.com/login');
    }
    async enterUserName(username:string)
    {
        await this.usernamefield.fill(username);
    }
    async clickOnNextButton()
    {
        await this.nextButton.click();
    }
    async enterpassword(password:string)
    {
        await this.passwordfield.fill(password);
    }
    async clickonLoginButton()
    {
        await this.loginButton.click();
    }
    async clickonCreateNewNote():Promise<void>
    {
        const [newPage] = await Promise.all([this.page.waitForEvent('popup'),this.page.click(notesButton)])
        const pageId = this.page.waitForEvent('popup');
        await this.notesButton.click();
        const page1 = await pageId;
        await this.createNoteButton.click()
    }
    async logoutBox()
    {
        await this.profileImage.click();
        await this.loginButton.click();
    }
    async closeBrowser()
    {
        await this.page.close();
    }
     
}
