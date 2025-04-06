import {Locator, Page,TestInfo} from '@playwright/test';
import { LoadFnOutput } from 'module';

export class SauceDemoLoginPage{
    readonly page: Page;
    readonly testInfo: TestInfo;
    readonly pagetitle: Locator;
    readonly usernamefield:Locator;
    readonly passwordfield:Locator;
    readonly usernamelist:Locator;
    readonly passwordlist:Locator;
    readonly login:Locator;

    constructor (testInfo:TestInfo,page:Page)
    {
        this.page = page;
        this.testInfo = testInfo;
        this.usernamelist = page.locator('.login_credentials');
        this.passwordlist = page.locator('.login_password');
        this.usernamefield = page.getByPlaceholder('Username');
        this.passwordfield = page.getByPlaceholder('Password');
        this.pagetitle = page.locator("span.title");
        this.login = page.locator("input.submit-button");
    }
    async getPageTitle(name:string): Promise<Locator>{
        const projectpageScreenshot = await this.page.screenshot();
        await this.testInfo.attach(name,{
            body:projectpageScreenshot,
            contentType:'image/png',
        });
        return this.pagetitle;
    }

    async gotopage():Promise<void>{
        await this.page.goto('https://www.saucedemo.com/');
    }

    async enterUsername()
    {
        const firstusername = await this.usernamelist.innerText().then((text) =>{
            const usernames = text.split('\n').filter((line) => line.trim() !== '');
            return usernames[1];
        });
        await this.usernamefield.click();
        await this.usernamefield.fill(firstusername);
    }

    async enterPassword()
    {
        const firstpassword = await this.passwordlist.innerText().then((text) =>{
            const passwords = text.split('\n').filter((line) => line.trim() !== '');
            return passwords[1];
        });
        await this.passwordfield.click();
        await this.passwordfield.fill(firstpassword);
    }

    async clickOnSignIn()
    {
        await this.login.click();
    }
    async closeBrowser()
    {
        await this.page.close();
    }



}
