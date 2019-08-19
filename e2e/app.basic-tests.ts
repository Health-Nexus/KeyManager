import { AppPage } from './app.po';
import { by, $, $$, element, WebElement} from 'protractor';

var protractor = require('protractor');
var browser = require("protractor").protractor.browser;

describe('health-nexus-wallet App', () => {
   let page: AppPage;

   beforeEach(() => {
      page = new AppPage();
   });

   it('login via MetaMask', async function () {
      page.navigateTo();
      browser.sleep(1000);
      // await $('#metaMaskLogin').click();
      browser.sleep(2000);

      browser.getAllWindowHandles().then(function (handles) {
         browser.ignoreSynchronization = true;
         let handle0 = handles[0].toString();
         let handle1 = handles[1].toString();
         browser.switchTo().window((handle1));
         element(by.buttonText("Get Started")).click();
         browser.sleep(1000);
         element(by.buttonText("Import Wallet")).click();
         browser.sleep(1000);
         element(by.buttonText("No Thanks")).click();
         browser.sleep(1000);
         let mnemonic = "lucky tide ritual belt fruit trumpet hurdle elevator jar else lunch morning";
         $('textarea').sendKeys(mnemonic);
         browser.sleep(1000);
         $('#password').sendKeys("ocVf45ty!!!!-");
         browser.sleep(1000);
         $('#confirm-password').sendKeys("ocVf45ty!!!!-");
         browser.sleep(1000);
         $('.first-time-flow__checkbox').click();
         browser.sleep(1000);
         element(by.buttonText("Import")).click();
         browser.sleep(1000);
         element(by.buttonText("All Done")).click();
         browser.sleep(1000);
         element(by.buttonText("Connect")).click();
         browser.sleep(1000);
         $('div[class="network-component pointer ethereum-network"]').click();
         browser.sleep(1000);
         $$('[class="network-name-item"]').get(3).click();
         browser.sleep(1000);
         browser.driver.close();
         browser.sleep(1000);
         browser.driver.switchTo().window(handles[0]);
         browser.ignoreSynchronization = false;
         browser.sleep(1000);
      });
   });

   // it("login via MetaMask popup", async function(){
   //    page.navigateTo();
   //    browser.sleep(30000);
   // })

   it('phuse/original buttons should toggle phuse text', async () => {
      page.navigateTo();
      browser.sleep(1000);

      await $('#phViewBtn').click();
      browser.sleep(1000);
      await $('#phuseText').getText().then(function(text){
         expect($('#phuseText').isPresent()).toBeTruthy();
         expect($('#phuseText').isDisplayed()).toBe(true);
         expect(text).toContain("1. Create");
         expect(text).toContain("2. Next");
         expect(text).toContain("3. Then");
         expect(text).toContain("4. Next");
         expect(text).toContain("5. If needed");
         expect(text).toContain("6. Finally");
         expect(text).toContain("For a more thorough walk through");
         expect($('#mediumLink').getAttribute('href')).toEqual('https://medium.com/simplyvital/lets-hit-the-ground-running-with-health-nexus-5c25df21c56d');
      });
      
      browser.sleep(1000);
      await $('#orgViewBtn').click();
      await expect($('#phuseText').isPresent()).toBeFalsy();

   });

   it('check extensions page', async function () {

   })

   it('welcome message click, successful metamask login', async () => {

   });

});
