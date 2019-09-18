import { AppPage } from '../app.po';
import { by, $, $$, element, ExpectedConditions } from 'protractor';
import { countKeys, naviagteLastPageLastParent } from './app.pagination-functions'

var protractor = require('protractor');
var browser = require("protractor").protractor.browser;
let EC = ExpectedConditions;

export let page: AppPage;

/**
 * provided new instance AppPage
 */
export function newAppPage() {
   return page = new AppPage();
};

/**
 * function to handle beligerant welcome page
 */
export async function handleWelcomePage() {
   let welcomePage = await $('#welcomeMsg').isPresent().then(function (value) {
      return value;
   });
   if (welcomePage == true) {
      newAppPage();
      page.navigateTo();
   }
   page.navigateTo();
}

/**
 * login to metamask
 */
export function metamaskLogin(mnemonic, password) {
   newAppPage();
   page.navigateTo();
   browser.getAllWindowHandles().then(function (handles) {
      if (handles.length < 2) {
         return;
      };
      let handle0 = handles[0].toString();
      let handle1 = handles[1].toString();
      browser.switchTo().window((handle1));
      browser.ignoreSynchronization = true;
      if (browser.getTitle().then(function (text) {
         return text;
      }) == "MetaMask Notification") {
         browser.driver.close();
         browser.switchTo().window((handle0));
         browser.getAllWindowHandles().then(function (handles) {
            let handle1 = handles[1].toString();
            browser.switchTo().window((handle1));
            browser.ignoreSynchronization = true;
         });
      };
      browser.driver.wait(EC.elementToBeClickable($('.button.btn-primary.first-time-flow__button')), 5000);
      $('.button.btn-primary.first-time-flow__button').click();
      browser.driver.wait(EC.elementToBeClickable($$('.button.btn-primary.first-time-flow__button').get(0)), 5000);
      $$('.button.btn-primary.first-time-flow__button').get(0).click();
      browser.driver.wait(EC.elementToBeClickable($('.button.btn-default.btn--large.page-container__footer-button')), 5000);
      $$('.button.btn-default.btn--large.page-container__footer-button').get(0).click();
      browser.driver.wait(EC.presenceOf($('.first-time-flow__textarea')), 5000);
      $('.first-time-flow__textarea').sendKeys(mnemonic)
      $('#password').sendKeys(password)
      $('#confirm-password').sendKeys(password);
      $('.first-time-flow__checkbox').click();
      browser.driver.wait(EC.and(EC.elementToBeClickable($('.button.btn-primary.first-time-flow__button')), EC.elementToBeClickable($('.button.btn-primary.first-time-flow__button'))));
      $('.button.btn-primary.first-time-flow__button').click();
      browser.driver.wait(EC.presenceOf($('.loading-overlay')));
      browser.driver.wait(EC.stalenessOf($('.loading-overlay')));
      browser.driver.wait(EC.elementToBeClickable($('.button.btn-primary.first-time-flow__button')), 5000);
      $('.button.btn-primary.first-time-flow__button').click();
      browser.driver.wait(EC.elementToBeClickable($('.button.btn-primary.btn--large.page-container__footer-button')), 5000);
      $('.button.btn-primary.btn--large.page-container__footer-button').click();
      browser.driver.wait(EC.elementToBeClickable($('.network-component.pointer.ethereum-network')), 5000);
      $('.network-component.pointer.ethereum-network').click();
      browser.driver.wait(EC.elementToBeClickable($$('.network-name-item').get(3)), 5000);
      $$('.network-name-item').get(3).click();
      browser.driver.close();
      browser.sleep(1000);
   });
   switchToTab1();
};

/**
 * switch MetaMask wallets
 */
export function switchWallets(mnemonic, password) {
   browser.executeScript("window.open(arguments[0], '_blank')");
   browser.getAllWindowHandles().then(function (handles) {
      let handle0 = handles[0].toString();
      let handle1 = handles[1].toString();
      browser.switchTo().window((handle1));
      browser.ignoreSynchronization = true;
      browser.get("chrome-extension://jgdghhcboioigekocoopcgjlpfepkdgi/home.html#");
      browser.driver.wait(EC.elementToBeClickable($('.account-menu__icon')), 5000)
      $('.account-menu__icon').click();
      browser.driver.wait(EC.elementToBeClickable($('.account-menu__logout-button')), 5000)
      $('.account-menu__logout-button').click();
      browser.driver.wait(EC.elementToBeClickable($('.unlock-page__link.unlock-page__link--import')), 5000)
      $('.unlock-page__link.unlock-page__link--import').click();
      browser.driver.wait(EC.presenceOf($('.import-account__secret-phrase')), 5000)
      $('.import-account__secret-phrase').sendKeys(mnemonic);
      $('#password').sendKeys(password);
      $('#confirm-password').sendKeys(password);
      browser.driver.wait(EC.elementToBeClickable(element(by.buttonText('Restore'))), 5000)
      element(by.buttonText('Restore')).click();
      browser.driver.close();
   });
   switchToTab1();
};

/**
 * add account to test, pass
 * relevant test account's private key
 */
export function addAccount(privateKey) {
   browser.executeScript("window.open(arguments[0], '_blank')");
   browser.getAllWindowHandles().then(function (handles) {
      let handle0 = handles[0].toString();
      let handle1 = handles[1].toString();
      browser.switchTo().window((handle1));
      browser.ignoreSynchronization = true;
      browser.driver.get("chrome-extension://jgdghhcboioigekocoopcgjlpfepkdgi/home.html#");
      browser.driver.wait(EC.elementToBeClickable($('.account-menu__icon')), 5000);
      $('.account-menu__icon').click();
      browser.driver.wait(EC.elementToBeClickable($$('.menu__item.menu__item.menu__item--clickable').get(1)), 5000);
      $$('.menu__item.menu__item.menu__item--clickable').get(1).click();
      $('#private-key-box').sendKeys(privateKey);
      browser.driver.wait(EC.elementToBeClickable(element(by.buttonText('Import'))), 5000);
      element(by.buttonText('Import')).click();
      browser.driver.close();
   });
   switchToTab1();
};

/**
 * login to account:
 * pass "1" to access account 1
 * pass "2" to access account 2
 */
export function accountLogin(accountNum) {
   browser.executeScript("window.open(arguments[0], '_blank')");
   browser.getAllWindowHandles().then(function (handles) {
      let handle0 = handles[0].toString();
      let handle1 = handles[1].toString();
      browser.switchTo().window((handle1));
      browser.ignoreSynchronization = true;
      browser.driver.get("chrome-extension://jgdghhcboioigekocoopcgjlpfepkdgi/home.html#");
      browser.driver.wait(EC.elementToBeClickable($('.account-menu__icon')), 5000);
      $('.account-menu__icon').click();
      browser.driver.wait(EC.elementToBeClickable($$('.account-menu__account.menu__item--clickable').get(accountNum - 1)), 5000);
      $$('.account-menu__account.menu__item--clickable').get(accountNum - 1).click();
      browser.driver.close();
   });
   switchToTab1();
};

/**
 * handle confirm metamask popup
 */
export async function metamaskConfirm() {
   browser.sleep(2000);
   browser.getAllWindowHandles().then(function (handles) {
      let handle0 = handles[0].toString();
      let handle1 = handles[1].toString();
      browser.switchTo().window((handle1));
      browser.ignoreSynchronization = true;
      browser.driver.wait(EC.elementToBeClickable($('.confirm-detail-row__header-text.confirm-detail-row__header-text--edit')), 5000);
      $('.confirm-detail-row__header-text.confirm-detail-row__header-text--edit').click();
      browser.driver.wait(EC.elementToBeClickable($$('.button-group__button').last()), 5000);
      $$('.button-group__button').last().click();
      browser.driver.executeScript('window.scrollTo(0, document.body.scrollHeight)').then(function () { });;
      browser.driver.wait(EC.elementToBeClickable($('.button.btn-secondary.btn--large.page-container__footer-button')), 5000);
      $('.button.btn-secondary.btn--large.page-container__footer-button').click();
      browser.driver.executeScript('window.scrollTo(0, document.body.scrollHeight)').then(function () { });
      browser.driver.wait(EC.elementToBeClickable($('.button.btn-primary.btn--large.page-container__footer-button')));
      browser.driver.sleep(1000);
      $('.button.btn-primary.btn--large.page-container__footer-button').click();
      browser.driver.close();
      browser.driver.switchTo().window(handle0);
      browser.driver.executeScript("window.open(arguments[0], '_blank')");
      browser.getAllWindowHandles().then(function (handles) {
         browser.ignoreSynchronization = true;
         handle0 = handles[0].toString();
         handle1 = handles[1].toString();
         browser.switchTo().window((handle1));
         browser.wait(EC.urlContains("about:blank"), 10000);
         browser.get("chrome-extension://jgdghhcboioigekocoopcgjlpfepkdgi/home.html#");
         let txPending = $('.transaction-status.transaction-list-item__status.transaction-status--submitted');
         let transactionPending = EC.presenceOf(txPending);
         browser.wait(transactionPending, 240000);
         let transactionConfirmed = EC.not(EC.presenceOf(txPending));
         browser.wait(transactionConfirmed, 240000);
         browser.driver.close();
         browser.sleep(500);
      });
      switchToTab1();
   });
};

/**
 * creates parent key by appending Date.now()
 * to the url "https://medium.com/search?q="
 */
export async function createParentKey() {
   page.navigateTo();
   browser.wait(EC.presenceOf($$("#parentKeysList").last()), 30000);
   browser.executeScript('arguments[0].scrollIntoView();', $$("#parentKeysList").last().getWebElement());
   await countKeys(0, 'parent', 'original');
   await $('#createParentInput').sendKeys("https://medium.com/search?q=" + Date.now());
   browser.wait(EC.elementToBeClickable(element(by.buttonText('Generate'))), 5000);
   await element(by.buttonText('Generate')).click();
   metamaskConfirm();
   switchToTab1();
   browser.sleep(2000);
   page.navigateTo();
   browser.wait(EC.presenceOf($$("#parentKeysList").last()), 30000);
   browser.sleep(1000);
   browser.executeScript('arguments[0].scrollIntoView();', $$("#parentKeysList").last().getWebElement());
   await countKeys(0, 'parent', 'updated');
   switchToTab1();
};

/**
 * create child key on
 * last created parent key
 */
export async function createChildKey() {
   page.navigateTo();
   browser.wait(EC.presenceOf($$('#parentKeysList').last()), 30000);
   await $('#parentPaginator').isDisplayed().then(async function (result) {
      if (result) {
         await naviagteLastPageLastParent();
      };
   });
   let a2_pLast = await $$('#parentKeysList').last().getText().then(function (text) {
      return text.substring(0, 63);
   });
   browser.wait(EC.elementToBeClickable($$('#parentKeysList').last()), 5000);
   browser.executeScript('arguments[0].scrollIntoView();', $$('#parentKeysList').last().getWebElement()).then(function () {
      $$('#parentKeysList').last().click();
   });
   browser.wait(EC.presenceOf($('#managingParentKey')), 5000);
   let a2_pm1 = await $('#managingParentKey').getText().then(function (text) {
      return text.substring(0, 63);
   });
   await expect(a2_pm1).toBe(a2_pLast);
   browser.wait(EC.stalenessOf($$('#childKeysList').get(0)), 5000);
   await countKeys(0, 'child', 'original');
   browser.wait(EC.elementToBeClickable($('#generateChildBtn')), 5000);
   await $('#generateChildBtn').click();
   metamaskConfirm();
   page.navigateTo();
   browser.wait(EC.elementToBeClickable($$("#parentKeysList").last()), 30000);
   await $('#parentPaginator').isDisplayed().then(async function (result) {
      if (result) {
         await naviagteLastPageLastParent();
      }
   });
   a2_pLast = await $$('#parentKeysList').last().getText().then(function (text) {
      return text.substring(0, 63);
   });
   browser.executeScript('arguments[0].scrollIntoView();', $$('#parentKeysList').last().getWebElement()).then(function () {
      $$('#parentKeysList').last().click();
   });
   browser.sleep(1000);
   browser.wait(EC.presenceOf($('#managingParentKey')), 5000);
   a2_pm1 = await $('#managingParentKey').getText().then(function (text) {
      return text.substring(0, 63);
   });
   await expect(a2_pm1).toBe(a2_pLast);
   browser.wait(EC.presenceOf($('#childKeysList')), 30000);
   await countKeys(0, 'child', 'updated');
   let a2_pLast_cLast = await $$('#childKeysList').last().getText().then(function (text) {
      return text.substring(0, 63);
   });
   browser.wait(EC.elementToBeClickable($$('#childKeysList').last()));
   await $$('#childKeysList').last().click();
   browser.wait(EC.presenceOf($('#managingChildKey')), 30000);
   let a2_pLast_c_managing = await $('#managingChildKey').getText().then(function (text) {
      return text.substring(0, 63);
   });
   await expect(a2_pLast_c_managing).toBe(a2_pLast_cLast)
   switchToTab1();
};

/**
 * navigate to newest child 
 * key's page
 */
export async function navigateNewChild() {
   page.navigateTo();
   browser.wait(EC.presenceOf($$("#parentKeysList").last()), 30000);
   await $('#parentPaginator').isDisplayed().then(async function (result) {
      if (result) {
         await naviagteLastPageLastParent();
      }
   });
   browser.sleep(1000);
   let a2_pLast = await $$('#parentKeysList').last().getText().then(function (text) {
      return text.substring(0, 63);
   });
   browser.wait(EC.elementToBeClickable($$('#parentKeysList').last()), 5000);
   browser.executeScript('arguments[0].scrollIntoView();', $$('#parentKeysList').last().getWebElement()).then(function () {
      $$('#parentKeysList').last().click();
   });
   browser.wait(EC.presenceOf($('#managingParentKey')), 5000);
   browser.sleep(1000);
   let a2_pm1 = await $('#managingParentKey').getText().then(function (text) {
      return text.substring(0, 63);
   });
   await expect(a2_pm1).toBe(a2_pLast);
   let a2_pLast_cLast = await $$('#childKeysList').last().getText().then(function (text) {
      return text.substring(0, 63);
   });
   await $$('#childKeysList').last().click();
   browser.wait(EC.presenceOf($('#managingChildKey')), 30000);
   let a2_pLast_c_managing = await $('#managingChildKey').getText().then(function (text) {
      return text.substring(0, 63);
   });
   await expect(a2_pLast_c_managing).toBe(a2_pLast_cLast);
   browser.sleep(1000);
   switchToTab1();
};

/**
 * set child key "share" permission
 */
export async function setChildKeyPermissions() {
   navigateNewChild();
   await browser.executeScript('window.scrollTo(0,1000);').then(function () {
   });
   browser.wait(EC.elementToBeClickable($('#shareOn')), 10000);
   await $('#shareOn').click();
   browser.wait(EC.elementToBeClickable($('#sellOff')), 10000);
   await $('#sellOff').click();
   browser.wait(EC.elementToBeClickable($('#tradeOff')), 10000);
   await $('#tradeOff').click();
   browser.wait(EC.elementToBeClickable($('#savePermissions')), 10000);
   await $('#savePermissions').click();
   metamaskConfirm();
   browser.executeScript('window.scrollTo(0,1500);').then(function () {
   });
   browser.wait(EC.presenceOf($('#shareOn')), 5000);
   await expect($('#shareOn').getAttribute('class')).toContain('active');
   browser.wait(EC.presenceOf($('#sellOff')), 5000);
   await expect($('#sellOff').getAttribute('class')).toContain('active');
   browser.wait(EC.presenceOf($('#tradeOff')), 5000);
   await expect($('#tradeOff').getAttribute('class')).toContain('active');
   await expect($('#childKeyShare').isPresent()).toBe(true);
   await expect($('#childKeyUnshare').isPresent()).toBe(true);
   await expect($('#childKeySale').isPresent()).toBeFalsy();
   switchToTab1();
};

/**
 * share the newly created child key, 
 * pass in receiving account's public address
 */
export async function shareChildKey(account) {
   navigateNewChild();
   browser.wait(EC.elementToBeClickable($('#shareInput')), 30000);
   browser.executeScript('window.scrollTo(0,1500);');
   browser.wait(EC.elementToBeClickable($('#shareInput')), 30000);
   await $('#shareInput').sendKeys(account);
   await $('#shareBtn').click();;
   metamaskConfirm();
   switchToTab1();
};

/**
 * refocus the browser to tab 1
 */
export function switchToTab1() {
   browser.getAllWindowHandles().then(function (handles) {
      let handle0 = handles[0].toString();
      browser.switchTo().window(handle0);
      browser.ignoreSynchronization = false;
   });
};