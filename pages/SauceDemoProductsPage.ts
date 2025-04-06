import {expect, Locator, Page,TestInfo} from '@playwright/test';
import { Console } from 'console';
import { LoadFnOutput } from 'module';


function isSortedAscending(arr:number[]):boolean{
    for(let i = 1; i < arr.length; i++){
        if (arr[i-1] > arr[i]){
            return false;
        }
    }
    return true;    
}

function isSortedDecending(arr:number[]):boolean{
    for(let i = 1; i < arr.length; i++){
        if (arr[i-1] < arr[i]){
            return false;
        }
    }
    return true;    
}
export class SauceDemoProductsPage{
    readonly page: Page;
    readonly testInfo: TestInfo;
    readonly filterField:Locator;
    readonly prices:Locator;
    readonly productName:Locator;
    readonly productName1:Locator;
    readonly productName2:Locator;
    readonly addToCartButton:Locator;
    readonly cartButton:Locator;
    readonly checkoutButton:Locator;
    readonly addtcartButton1:Locator;
    readonly addtcartButton2:Locator;
    

    constructor(testInfo:TestInfo,page:Page)
    {
        this.page = page;
        this.testInfo = testInfo;
        this.filterField = page.locator('select.product_sort_container');
        this.productName = page.locator('.inventory_item_name');
        this.prices = page.locator('.inventory_item_price');
        this.addToCartButton = page.locator('.inventory_item');
        this.addtcartButton1 = page.locator("(//button[text()='Add to cart'])[1]");
        this.addtcartButton2 = page.locator("(//button[text()='Add to cart'])[2]");
        this.productName1 = page.locator("(//div[@class='inventory_item_name '])[1]");
        this.productName2 = page.locator("(//div[@class='inventory_item_name '])[2]");
        this.cartButton = page.locator("a.shopping_cart_link");
        this.checkoutButton = page.locator('button#checkout');
    }
    
    async enterFilterValue(labelname:string):Promise<void>{
         //Name (A to Z) Name (Z to A) Price (low to high) Price (high to low)
        await this.filterField.click();
        await this.filterField.selectOption({label:labelname});
    }
    async countAddtoCartButton(buttoncount:number){
        const count = await this.addToCartButton.count();
        expect(count).toEqual(buttoncount);
    }

    async getPricesinAscendingOrder(){
        const pricesList = await this.prices.allTextContents();
        const listitems = pricesList.map(parseFloat);
        let isAscending = isSortedAscending(listitems);
        expect(isAscending).toBeTruthy();
        console.log('The list sorted in Ascending order');
    }

    async getPricesinDecendingOrder()
    {
        const pricesList = await this.prices.allTextContents();
        const listitems = pricesList.map(parseFloat);
        let isDecending = isSortedDecending(listitems);
        expect(isDecending).toBeTruthy();
        console.log('The list sorted in Decending order');
    }

    async addItemsTocart(index1:number,index2:number): Promise<[string,string]>
    {
        await this.addtcartButton1.click();
        const item1 = await this.productName1.textContent();
        if(item1 === null)
            {
                throw new Error('dealer Name text nt found');
            }
        await this.addtcartButton2.click();
        const item2 = await this.productName2.textContent();
        if(item2 === null)
            {
                throw new Error('dealer Name text nt found');
            }
        return [item1, item2];
    }
    async gotoCart()
    {
        await this.cartButton.click();
    }   




}