import {test, expect} from '@playwright/test';
import { UnicornLoginPage } from "../pages/UnicornLoginPage";
import { UnicornWelcomePage } from '../pages/UnicornWelcomePage';
import { UnicornDealDetailsPage } from '../pages/UnicornDealDetailsPage';
import { UnicornPreviewPage } from '../pages/UnicornPreviewPage';

test('Unicorn.com Login Test',{tag:['@TestPlaywright','@unicorn','@LoginUnicorn']}, async ({page}, testInfo) =>{
    const loginpg = new UnicornLoginPage(page); 
    const welcomepg = new UnicornWelcomePage(testInfo, page);   

    await test.step('Navigate to Unicorn Page', async() =>{
        await loginpg.gotopage();
        await expect(page).toHaveTitle('UNICORN');
    })

    await test.step('Login to Unicorn', async() =>{
        await loginpg.enterUsername('test@test.com');
        await loginpg.enterPassword('test');
    })
    await test.step('Click on Login Button',async() =>{
        await loginpg.clickOnSignIn();
    })

    await test.step('verify welcome page', async() =>{
        await new Promise(resolve => setTimeout(resolve,2000));
        const pagetitle=await welcomepg.getPageTitle();
        await expect(pagetitle).toContainText('Welcome to');
    })
    await test.step('logout Unicorn', async() =>{
        await new Promise(resolve => setTimeout(resolve,2000));
        await welcomepg.logoutUnicorn();
    })
    await loginpg.closeBrowser();

})

test('Verify Welcome Page',{tag:['@TestPlaywright','@unicorn','@WelcomeUnicorn']}, async ({page}, testInfo) =>{
    const loginpg = new UnicornLoginPage(page); 
    const welcomepg = new UnicornWelcomePage(testInfo, page);
    const dealspg = new UnicornDealDetailsPage(testInfo, page);
    const previewpg = new UnicornPreviewPage(testInfo,page);
    let propertyAddress:string = "Yash Tech, Magarpatta, Pune";
    let dealNumber:string = '572trfsu888';
    let dealerName:string = 'leonardo'; 
    let bookingDate:string = '12-01-2024';
    let closingDate:string = '01-01-2025';

    await test.step('Navigate to Unicorn Page', async() => {
        await loginpg.gotopage();
        await expect(page).toHaveTitle('UNICORN');
    })

    await test.step('Login to Unicorn', async() =>{
        await loginpg.enterUsername('test@test.com');
        await loginpg.enterPassword('test');
    })
    await test.step('Click on Login',async() =>{
        await loginpg.clickOnSignIn();
    })
    await test.step('Enter Property Address',async() =>{
        await welcomepg.enterPropertyAddress(propertyAddress);
    })
    await test.step('Enter Deal Number',async()=>{
        await welcomepg.enterDealNumber(dealNumber);
    })
    await test.step('Select Agreement type', async()=>{
        await welcomepg.clickonSaleButton();
        await welcomepg.clickonFinanceButton();
    })
    await test.step('Click on Create New Button',async()=>{
        await welcomepg.clickonCreateNewButton();
    })
    await test.step('Enter property type', async()=>{
        await dealspg.enterpropertType();
    })
    await test.step('Enter transaction type', async()=>{
        await dealspg.enterTransactionType();
    })
    await test.step('Select Cash only', async()=>{
        await dealspg.selectcashOnly();
    })
    await test.step('Select Booking date', async()=>{
        await dealspg.enterBookingDate(bookingDate);
    })
    await test.step('Select closing date', async()=>{
        await dealspg.enterClosingDate(closingDate);
    })
    await test.step('Enter dealer name', async()=>{
        await dealspg.enterDealerName(dealerName);
    })
    await test.step('Upload photo',async()=>{
        await dealspg.uploadfile("C:/Users/sudeep.sharma/Pictures/Service Now.PNG");
        const dealUploadLabelTitle=await dealspg.getuploadLabelTitle();
        await expect(dealUploadLabelTitle).toContainText('Property Photos');
    })
    await test.step('Submit deal',async()=>{
        await dealspg.submitDeal();
    })
    await test.step('Submit deal confrimation',async()=>{
        await dealspg.clickOnPreview();
    })
    await test.step('verify deal number',async()=>{
        const dealNum = await previewpg.verifyDealNumber();
        await expect(dealNum).toContain(dealNumber);
    })
    await test.step('verify dealer name', async()=>{
        const dealName = await previewpg.verifyDealerName()
        await expect(dealName).toContain(dealerName)
    })
    await loginpg.closeBrowser();
})

