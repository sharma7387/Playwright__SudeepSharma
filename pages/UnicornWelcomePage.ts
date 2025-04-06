import {Page, Locator, expect, TestInfo} from '@playwright/test';
import { LoadFnOutput } from 'module';

export class UnicornWelcomePage{
    readonly page:Page;
    readonly testInfo:TestInfo;
    readonly titleField:Locator;
    readonly profileButton:Locator;
    readonly logoutButton:Locator;
    readonly address:Locator;
    readonly dealNumber:Locator;
    readonly purchaseButton:Locator;
    readonly saleButton:Locator;
    readonly rentButton:Locator;
    readonly cashButton:Locator;
    readonly financeButton:Locator;
    readonly createNewButton:Locator;

    constructor (testInfo:TestInfo,page:Page){
        this.page = page;
        this.testInfo = testInfo;
        this.titleField = page.locator('h5.dashboard-title');
        this.profileButton = page.locator('div.profile-icon span');
        this.logoutButton = page.getByText('Logout');
        this.address = page.getByPlaceholder('Enter Address');
        this.dealNumber = page.getByPlaceholder('Enter Deal Number');
        this.purchaseButton = page.getByText('Purchase');
        this.saleButton = page.getByText('Sale');
        this.rentButton = page.getByText('Rent');
        this.cashButton = page.getByText('Cash');
        this.financeButton = page.getByText('Finance');
        this.createNewButton = page.getByText('CREATE NEW');
    }
    async getPageTitle(): Promise<Locator>{
        const welcomeScreenshot = await this.page.screenshot();
        await this.testInfo.attach('Welcome',{
            body:welcomeScreenshot,
            contentType:'image/png',
        });
        return this.titleField;
    }

    async enterPropertyAddress(address:string){
        await this.address.fill(address);
    }
    async enterDealNumber(dealNumer:string){
        await this.dealNumber.fill(dealNumer);
    }
    async clickonPurchaseButton(){
        await this.purchaseButton.click();
    }
    async clickonSaleButton(){
        await this.saleButton.click();
    }
    async clickonRentButton(){
        await this.rentButton.click();
    }
    async clickonCashButton(){
        await this.cashButton.click();
    }
    async clickonFinanceButton(){
        await this.financeButton.click();
    }
    async clickonCreateNewButton(){
        await this.createNewButton.click();
    }
    async logoutUnicorn(){
        await this.profileButton.click();
        await this.logoutButton.click();
    }

}