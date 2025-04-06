import {expect, Locator, Page,TestInfo} from '@playwright/test';

export class SauceDemoCartPage{
    readonly page: Page;
    readonly testInfo: TestInfo;
    readonly productName:Locator;  
    readonly productName1:Locator;
    readonly productName2:Locator;      
    readonly checkoutButton:Locator;
    readonly finishButton:Locator;

    constructor(testInfo:TestInfo,page:Page)
    {
        this.page = page;
        this.testInfo = testInfo;
        this.productName = page.locator('.inventory_item_name');
        this.checkoutButton = page.locator('button#checkout');
        this.productName1 = page.locator("(//div[@class='inventory_item_name'])[1]");
        this.productName2 = page.locator("(//div[@class='inventory_item_name'])[2]");
        this.finishButton = page.locator('button#finish');
    }

    async verifyAddedItems(): Promise<[string,string]>{
        const cartitem1 = await this.productName1.textContent();
        if(cartitem1 === null)
            {
                throw new Error('dealer Name text nt found');
            }
        const cartitem2 = await this.productName2.textContent();
        if(cartitem2 === null)
            {
                throw new Error('dealer Name text nt found');
            }
        return [cartitem1,cartitem2];
    }
    async checkoutcart()
    {
        await this.checkoutButton.click();
    }
    async clickonFinishButton()
    {
        await this.finishButton.click();
    }


}