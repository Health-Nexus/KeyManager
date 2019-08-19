import { AppPage } from './app.po';
import { $, $$, } from 'protractor';

var pluginPg = require('./protractor-javascript-master/pages/pluginPage.po.js');
//var dataProvider= require ("./../data/dataProvider");
var BrowserUtil = require("./protractor-javascript-master/utils/browser.util.js");

var protractor = require('../node_modules/protractor');
// require('/path/to/protractor/jasminewd');
var browser = require("protractor").protractor.browser;
var driver = browser.driver;

describe('health-nexus-wallet App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    $('#welcomeMessage').getText().then((text) => {
      expect(text).toEqual('MetaMask is required. To install, please click here.' || 'To begin, login with MetaMask and refresh the page.');
    });
  });

  it('check extensions page', async function(){
    browser.get('chrome://extensions/');
    browser.sleep(10000);
  })

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
        $$('[role="button"]').click();  // click install metamask button
        console.log("button clicked");
        browser.pause();
        browser.sleep(15000);
        console.log("line 62");

        console.log("line 64");
        browser.sleep(20000);
        console.log("made it past alert functions");

        browser.pause();
        // browser.switchTo().alert().accept();
        handle0 = handles[0].toString();
        browser.sleep(2000);
        browser.switchTo().window((handle0));
        console.log("switch to tab 0");
        browser.sleep(2000);
        browser.ignoreSynchronization = false;
        browser.sleep(2000);


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

