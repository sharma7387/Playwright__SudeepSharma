import {test, expect} from '@playwright/test';

import { SauceDemoLoginPage } from '../pages/SauceDemoLoginPage';
import { SauceDemoProductsPage} from '../pages/SauceDemoProductsPage';
import { SauceDemoCartPage } from '../pages/SauceDemoCartPage';
import {SauceDemoCheckOutPage} from '../pages/SauceDemoCheckOutPage';

test('SauceDemo Login Page',{tag:['@TestPlaywright','@sauceDemo']}, async ({page}, testInfo) =>{
    const labelNameLH = "Price (low to high)";
    const labelNameHL = "Price (high to low)";
    const index1 = 0;
    const index2 = 1;
    const buttonCount = 6;
    const firstName = "test";
    const lastName = "@test";
    const postalCode = "400001";
    const thankyouMessage = 'Thank you for your order!';
    const loginpg = new SauceDemoLoginPage(testInfo,page);
    const productpg = new SauceDemoProductsPage(testInfo,page);  
    const cartpg = new SauceDemoCartPage(testInfo,page);
    const checkoutpg = new SauceDemoCheckOutPage(testInfo,page);
    //const 

    await test.step('Navigate to SauceDemo Page', async() =>{
        await loginpg.gotopage();
    })
    await test.step('Login to SauceDemo', async() =>{
        await loginpg.enterUsername();
        await loginpg.enterPassword();
    })
    await test.step('Click on Login',async() =>{
        await loginpg.clickOnSignIn();
        const pagetitle=await loginpg.getPageTitle('Welcome Page');
        await expect(pagetitle).toContainText('Products');
    })
    await test.step('Select Price low to high, count of add to cart button, prices in ascending order', async()=>{
        await productpg.enterFilterValue(labelNameLH);
        await productpg.countAddtoCartButton(buttonCount);
        await productpg.getPricesinAscendingOrder();
        await loginpg.getPageTitle('Prices Low to High');
    })
    await test.step('Select price High to low, verify prices in Decending order', async()=>{
        await productpg.enterFilterValue(labelNameHL);
        await productpg.getPricesinDecendingOrder();
    })
    await test.step('Add Items to cart and verify item names in cart', async()=>{
        let itemNames =  await productpg.addItemsTocart(index1,index2);
        await productpg.gotoCart();
        let cartItemNames = await cartpg.verifyAddedItems();
        if(itemNames === cartItemNames)
        {
            console.log("Item names are same")
        } else{
            console.log("Items are not same");
        }
    })
    await test.step('checkout Cart',async()=>{
        await cartpg.checkoutcart();
    })
    await test.step('Enter FirtsName, LastName, PostalCode and click on Continue button', async()=>{
        await checkoutpg.enterFirstName(firstName);
        await checkoutpg.enterLastName(lastName);
        await checkoutpg.enterPotalCode(postalCode);
        await checkoutpg.clickonContinueButton();
    })
    await test.step('Click on Finsih Button',async()=>{
        await cartpg.clickonFinishButton();
    })

    await test.step('verify Thanks Mesage',async()=>{
        const message = await checkoutpg.verifyThankYouMessage();
        expect(message).toBe(thankyouMessage);
        await loginpg.getPageTitle('Thank you page');
        await checkoutpg.clickonBackHomeButton();
    })
    await loginpg.closeBrowser();
})