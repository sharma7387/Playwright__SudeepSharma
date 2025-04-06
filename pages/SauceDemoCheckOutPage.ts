import {expect, Locator, Page,TestInfo} from '@playwright/test';
import { LoadFnOutput } from 'module';

export class SauceDemoCheckOutPage{
    readonly page: Page;
    readonly testInfo: TestInfo;
    readonly firstName:Locator;
    readonly lastName:Locator;
    readonly postalCode:Locator;
    readonly continueButton:Locator;
    readonly thankyouMessage:Locator;
    readonly backHomeButton:Locator;

    constructor(testInfo:TestInfo,page:Page)
    {
        this.page = page;
        this.testInfo = testInfo;        
        this.firstName = page.getByPlaceholder('First Name');
        this.lastName = page.getByPlaceholder('Last Name');
        this.postalCode = page.getByPlaceholder('Zip/Postal Code');
        this.continueButton = page.locator('input#continue');
        this.thankyouMessage = page.locator('h2.complete-header');   
        this.backHomeButton = page.locator('button#back-to-products');     
    }
    async enterFirstName(name:string)
    {
        await this.firstName.fill(name);
    }
    async enterLastName(lastName:string)
    {
        await this.lastName.fill(lastName);
    }
    async enterPotalCode(code:string)
    {
        await this.postalCode.fill(code);
    }
    async clickonContinueButton()
    {
        await this.continueButton.click();
    }
    async verifyThankYouMessage(): Promise<string>
    {
        const thanksMessage = await this.thankyouMessage.textContent();
        if(thanksMessage === null)
            {
                throw new Error('dealer Name text nt found');
            }
        return thanksMessage;
    }
    async clickonBackHomeButton(){
        await this.backHomeButton.click();
    }

    


}
