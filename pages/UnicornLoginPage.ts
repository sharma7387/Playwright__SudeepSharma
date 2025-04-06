import {Locator, Page} from '@playwright/test';
import { promises } from 'dns';

export class UnicornLoginPage{
    readonly page: Page;
    readonly usernamefield:Locator;
    readonly passwordfield:Locator;
    readonly signin:Locator;

    constructor (page:Page)
    {
        this.page = page;
        this.usernamefield = page.getByPlaceholder('Enter User Name');
        this.passwordfield = page.getByPlaceholder('Enter Password');
        this.signin = page.getByRole('button',{name:' SIGN IN'});
    }

    async gotopage():Promise<void>{
        await this.page.goto('https://trainee-web-app.azurewebsites.net/auth/login');
    }

    async enterUsername(username:string)
    {
        await this.usernamefield.fill(username);
    }

    async enterPassword(password:string)
    {
        await this.passwordfield.fill(password);
    }

    async clickOnSignIn()
    {
        await this.signin.click();
    }
    async closeBrowser()
    {
        await this.page.close();
    }
    




}