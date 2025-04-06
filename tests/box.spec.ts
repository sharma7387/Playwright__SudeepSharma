import {test, expect} from '@playwright/test';
import { BoxLoginPage } from '../pages/boxLoginPage';
import { BoxNoteBookpage } from '../pages/boxNoteBookpage';
import { log } from 'console';

test('box.com Login Test',{tag:['@Box.com']}, async ({page}, testInfo) =>{
    const loginpg = new BoxLoginPage(testInfo,page);
    const noteBookpg = new BoxNoteBookpage(testInfo,page);
    let username:string = "sudeepsharma059@gmail.com";
    let password:string = "Welcome@Box1234";

    await test.step('go to box.com', async()=>{
        await loginpg.gotopage();
    })
    await test.step('login box.com', async()=>{
        await loginpg.enterUserName(username);
        await loginpg.clickOnNextButton();
        await loginpg.enterpassword(password);
        await loginpg.clickonLoginButton();
    })
    await test.step('click on create new NoteBook, Enter title, delete NoteBook',async()=>{
        const page1 = await loginpg.clickonCreateNewNote();
    })


    //await loginpg.closeBrowser();
});
