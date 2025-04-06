import {Locator, Page,TestInfo} from '@playwright/test';
import { KeyObject } from 'crypto';
import { promises } from 'dns';
import { LoadFnOutput } from 'module';

export class UnicornDealDetailsPage{
    readonly page:Page;
    readonly testInfo:TestInfo;
    readonly propertTypefield:Locator;
    readonly propertyFlat:Locator;
    readonly transactionType:Locator;
    readonly transactionSale:Locator;
    readonly cashOnlyButton:Locator;
    readonly dealerName:Locator;
    readonly loanAmount:Locator;
    readonly bookingDate:Locator;
    readonly closingDate:Locator;
    readonly fileUpload:Locator;
    readonly submitButton:Locator; 
    readonly previewButton:Locator;
    readonly pagetitle:Locator;

    constructor (testInfo:TestInfo,page:Page)
    {
        this.page = page;
        this.testInfo = testInfo;
        this.propertTypefield=page.locator("//ng-select[@name='disclosureType']");
        this.propertyFlat=page.locator("//span[text()='Resendential Flat']");
        this.transactionType=page.locator("//ng-select[@name='transactionType']");
        this.transactionSale=page.locator("//span[text()='Rent']");
        this.cashOnlyButton=page.locator("//label[text()='Cash Only']");
        this.dealerName=page.locator('input#dealAgentName');
        this.bookingDate=page.locator('input#closingDate');
        this.closingDate=page.locator('input#disbursementDate');
        this.fileUpload=page.locator("//span[text()='Upload Photo']");
        this.submitButton=page.locator('input.submit-btn');
        this.previewButton=page.locator("//button[text()=' Preview']");
        this.pagetitle = page.locator("//label[text()='Property Photos']");
    }

    async enterpropertType()
    {
        await this.propertTypefield.click();
        await this.propertyFlat.click();
    }
    async enterTransactionType()
    {
        await this.transactionType.click();
        await this.transactionSale.click();
    }
    async selectcashOnly()
    {
        await this.cashOnlyButton.check();
    }
    async enterBookingDate(bookDate:string)
    {
        await this.bookingDate.clear();
        await this.bookingDate.fill(bookDate);
        await this.bookingDate.press('Enter');
    }
    async enterClosingDate(closeDate:string)
    {
        await this.closingDate.clear();
        await this.closingDate.fill(closeDate);
        await this.closingDate.press('Enter');
    }
    async enterDealerName(dealName:string)
    {
        await this.dealerName.clear();
        await this.dealerName.fill(dealName);
    }
    async uploadfile(path:string):Promise<Locator>
    {
        await this.fileUpload.scrollIntoViewIfNeeded();
        await this.fileUpload.setInputFiles(path);
        return this.fileUpload;
    }
    async getuploadLabelTitle(): Promise<Locator>{
        const uploadfileScreenshot = await this.page.screenshot();
        await this.testInfo.attach('UploadFile',{
            body:uploadfileScreenshot,
            contentType:'image/png',
        });
        return this.pagetitle;
    }
    async submitDeal()
    {
        await this.submitButton.scrollIntoViewIfNeeded();
        await this.submitButton.click();
    }
    async clickOnPreview()
    {
        await this.previewButton.click();        
    }




}