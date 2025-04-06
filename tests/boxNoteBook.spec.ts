import {test, expect} from '@playwright/test';

test("Create Note in box.com",{tag:['@TestPlaywright','@createnotetest']}, async({browser},testInfo): Promise<void> =>{
    const context = await browser.newContext();
    const page = await context.newPage();

    await test.step('go to box.com', async()=> {
       
        await page.goto("https://account.box.com");
    })
    
    await test.step('loin using username and password', async()=>{
        const loginpage  = await page.screenshot();
        testInfo.attach('Home Page', {body: loginpage,contentType: 'image/png',});
        await page.locator("//input[@name='login']").fill("sudeepsharma059@gmail.com");
        await page.locator("//button[text()=' Next']").click();

        await page.locator("//input[@name='password']").fill("Welcome@Box1234");
        await page.locator("//button[text()=' Log In']").click();
        const loggedinpage  = await page.screenshot();
        testInfo.attach('LoggedIn Page', {body: loggedinpage,contentType: 'image/png',});
    });
    
    //await expect(page).toHaveTitle('All Files | Powered by Box');
    
    await test.step('Handle new page, create Note, add title, delete and close popup', async()=>{
        
        //storing the pageid
        const pageId = page.waitForEvent('popup');
        await page.getByLabel('Notes').click();

        //switch to new page
        const page1 = await pageId;
        await page1.frameLocator("//iframe[@id='service_iframe']").getByTestId('create-note-button').click();

        await page1.frameLocator("//iframe[@id='service_iframe']").getByPlaceholder('Add a Title').click();
        await page1.frameLocator("//iframe[@id='service_iframe']").getByPlaceholder('Add a Title').pressSequentially('Test Note');

        await page1.frameLocator("//iframe[@id='service_iframe']").getByTestId('options-menu-trigger').click();
        await page1.frameLocator("//iframe[@id='service_iframe']").getByText('Delete this note').click();
        await expect(page1.frameLocator("//iframe[@id='service_iframe']").getByTestId('notification')).toHaveText('Item successfully moved to trash.');
        await page1.frameLocator("//iframe[@id='service_iframe']").getByLabel('Clear Notification').click();

        const newpage  = await page.screenshot();
        testInfo.attach('New Page', {body: newpage,contentType: 'image/png',});
        await page1.close();
    });
    
    await test.step('logout box.com, and close the browser', async()=>{
        await page.locator("//div[@class='ProfileButton-avatar']").click();
        await page.locator("//span[text()='Log Out']").click();
        const logoutpage  = await page.screenshot();
        testInfo.attach('Logout Page', {body: logoutpage,contentType: 'image/png',});

        await page.close();
    });    
    

});