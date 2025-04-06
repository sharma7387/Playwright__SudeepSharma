import {Locator, Page,TestInfo} from '@playwright/test';
import { LoadFnOutput } from 'module';

export class UnicornPreviewPage{
    readonly page:Page;
    readonly testInfo:TestInfo;
    readonly dealNumber:Locator;
    readonly dealerName:Locator;


    constructor (testInfo:TestInfo,page:Page){
        this.page = page;
        this.testInfo = testInfo;
        this.dealNumber = page.locator("//th[text()='Deal Number']/following-sibling::td");
        this.dealerName = page.locator("//th[text()='Deal Agent Name']/following-sibling::td");

    }
    async verifyDealNumber():Promise<string>{
        const dNum = await this.dealNumber.textContent();
        if(dNum === null)
        {
            throw new Error('deal Number text nt found');
        }
        return dNum ;
    }

    async verifyDealerName():Promise<string>{
        const dName = await this.dealerName.textContent();
        if(dName === null)
            {
                throw new Error('dealer Name text nt found');
            }
        return dName;
    }
   




}