import { AppPage } from './app.po';
import { by, $, $$, element, } from 'protractor';

var pluginPg = require('./protractor-javascript-master/pages/pluginPage.po.js');
//var dataProvider= require ("./../data/dataProvider");
var BrowserUtil = require("./protractor-javascript-master/utils/browser.util.js");

var protractor = require('protractor');
// require('/path/to/protractor/jasminewd');
var browser = require("protractor").protractor.browser;
var driver = browser.driver;

describe('health-nexus-wallet App', () => {
   let page: AppPage;

   beforeEach(() => {
      page = new AppPage();
   });

   it('should display welcome message', async () => {
      page.navigateTo();
      $('#welcomeMessage').getText().then((text) => {
         expect(text).toEqual('MetaMask is required. To install, please click here.' || 'To begin, login with MetaMask and refresh the page.');
         console.log("TEST 1 TEXT: " + text)
         browser.refresh();
      $('#welcomeMessage').getText().then((text) => {
         expect(text).toEqual('MetaMask is required. To install, please click here.' || 'To begin, login with MetaMask and refresh the page.');
         console.log("TEST 1 TEXT: " + text)

         });
      });
   });

   // it('check extensions page', async function () {
   //    browser.get('chrome://extensions/');
   //    browser.sleep(10000);
   // })

   it('welcome message click, successful metamask login', async () => {
      page.navigateTo();
      await $('#welcomeMessage').getText().then((text) => {
         expect(text).toEqual('MetaMask is required. To install, please click here.');
      });
      await browser.sleep(2000);
      await browser.executeScript('window.scrollTo(0, document.body.scrollHeight)').then(function () {
         $('#welcomeMessage').click();
         browser.sleep(2000);
      });
      browser.sleep(2000);

      // get 2nd tab and switch to it
      browser.getAllWindowHandles().then(function (handles) {
         browser.ignoreSynchronization = true;
         let handle0 = handles[0].toString();
         let handle1;
         let handle2;
         console.log("handle0: " + handle0);

         handle1 = handles[1].toString();
         console.log("handle1: " + handle1);
         browser.switchTo().window((handle1));

         browser.sleep(2000);
         $('#main-install-button').click();
         browser.sleep(2000);
         browser.pause();

         // get third tab and switch to it
         browser.getAllWindowHandles().then(function (handles) {
            handle2 = handles[2].toString();
            console.log("handle 2: " + handle2);
            browser.switchTo().window((handle2));

            console.log("switch to tab 2")
            browser.sleep(2000);
            // $$('[role="button"]').click();  // click install metamask button
            // console.log("button clicked");
            // browser.pause();
            // browser.sleep(4000);
            // console.log("line 62");

            // console.log("line 64");
            // browser.sleep(4000);
            // // browser.driver.switchTo().alert();
            // browser.sleep(4000);
            // // browser.driver.switchTo().alert();
            // element(by.buttonText("Reload")).click();
            // console.log("made it past alert functions");
            // console.log("11111111")
            // browser.driver.close()
            // console.log("22222222")
            // browser.sleep(2000)
            // console.log("13333333")
            // browser.driver.close()
            // console.log("144444444")
            // // handle0 = handles[0].toString();
            // browser.sleep(2000);
            // console.log("555555551")
            // // browser.switchTo().window((handle0));
            // console.log("11666666661")
            // console.log("switch to tab 0");
            // console.log("11777777711")
            // browser.sleep(2000);
            // console.log("888888")
            // browser.ignoreSynchronization = false;
            // console.log("199999999")
            // browser.sleep(2000);
            // console.log("1110101010111")


         });

      });



      // await $('#welcomeMessage').getText().then((text) => {
      //   expect(text).toEqual('To begin, login with MetaMask and refresh the page.');
      // });
      // await browser.sleep(2000);
      // await browser.executeScript('window.scrollTo(0, document.body.scrollHeight)').then(function () {
      //   $('#welcomeMessage').click();
      // });


      // await $('#password').sendKeys('ocVf45ty!!!!-')
      browser.sleep(2000);
   });

});
