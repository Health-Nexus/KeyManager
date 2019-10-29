import { $, $$, ExpectedConditions } from 'protractor';
import { metamaskConfirm, switchToTab1 } from './app.functions-share';
import { AppPage } from '../app.po';

let protractor = require('protractor');
let browser = require("protractor").protractor.browser;
let EC = ExpectedConditions;
let page: AppPage = new AppPage();

/**
 * navigate to child key to 
 * test/validatae permissions
 */
export async function navigateTestChild() {
   browser.wait(EC.presenceOf($$('#parentKeysList').get(0)), 20000);
   let parentKey = await $$('#parentKeysList').get(0).getText().then(function (text) {
      return text.substring(0, 63);
   });
   browser.executeScript('window.scrollTo(0,500);');
   await $$('#parentKeysList').get(0).click();
   browser.wait(EC.presenceOf($$('#childKeysList').get(0)), 20000);
   let managingParentKey = await $$('#managingParentKey').get(0).getText().then(function (text) {
      return text.substring(0, 63);
   });
   await $('#managingParentTitleText').getText().then(function (text) {
      expect(text).toBe("Managing parent key");
   });
   await expect(managingParentKey).toBe(parentKey);
   await $('#childKeyTitleText').getText().then(function (text) {
      expect(text).toBe("Child keys");
   });
   await $('#childKeyInfoText').getText().then(function (text) {
      expect(text).toBe("Generate the permissioned childkeys here to be traded");
   });
   let childKey = await $$('#childKeysList').get(0).getText().then(function (text) {
      return text.substring(0, 63);
   });
   let firstKey = await $$('#childKeysList').get(0);
   await expect(firstKey.isDisplayed()).toBe(true); // expect at least 1 child key is present
   await $$('#childKeysList').get(0).click();
   browser.wait(EC.presenceOf($('#managingChildKey')), 20000);
   let managingChildKey = await $('#managingChildKey').getText().then(function (text) {
      return text.substring(0, 63);
   });
   await expect(managingChildKey).toBe(childKey);
   switchToTab1();
}

/**
 * set permissions to "none"
 */
export async function permNone(){
   browser.executeScript('window.scrollTo(0,1000)');
   browser.wait(EC.presenceOf($('.permissions.clearfix')), 5000)
   browser.wait(EC.elementToBeClickable($('#shareOff')), 5000);
   await $('#shareOff').click();
   browser.wait(EC.elementToBeClickable($('#sellOff')), 5000);
   await $('#sellOff').click();
   browser.wait(EC.elementToBeClickable($('#tradeOff')), 5000);
   await $('#tradeOff').click();
   browser.wait(EC.elementToBeClickable($('#savePermissions')), 5000);
   await $('#savePermissions').click();
   metamaskConfirm();
   browser.executeScript('window.scrollTo(0,1500)');
   browser.wait(EC.presenceOf($('#shareOff')), 5000);
   await expect($('#shareOff').getAttribute('class')).toContain('active');
   browser.wait(EC.presenceOf($('#sellOff')), 5000);
   await expect($('#sellOff').getAttribute('class')).toContain('active');
   browser.wait(EC.presenceOf($('#tradeOff')), 5000);
   await expect($('#tradeOff').getAttribute('class')).toContain('active');
   await expect($('#childKeyShare').isPresent()).toBeFalsy();
   await expect($('#childKeyUnshare').isPresent()).toBeFalsy();
   await expect($('#childKeySale').isPresent()).toBeFalsy();
   switchToTab1();
};

/**
 * set permissions to "share"
 */
export async function permShare(){
   // navigateTestChild();
   browser.executeScript('window.scrollTo(0,1000);');
   browser.wait(EC.elementToBeClickable($('#shareOn')), 5000);
   await $('#shareOn').click();
   browser.wait(EC.elementToBeClickable($('#sellOff')), 5000);
   await $('#sellOff').click();
   browser.wait(EC.elementToBeClickable($('#tradeOff')), 5000);
   await $('#tradeOff').click();
   browser.wait(EC.elementToBeClickable($('#savePermissions')), 5000);
   await $('#savePermissions').click();
   metamaskConfirm();
   browser.executeScript('window.scrollTo(0,1500);');
   browser.wait(EC.presenceOf($('#shareOn')), 5000);
   await expect($('#shareOn').getAttribute('class')).toContain('active');
   browser.wait(EC.presenceOf($('#sellOff')), 5000);
   await expect($('#sellOff').getAttribute('class')).toContain('active');
   browser.wait(EC.presenceOf($('#tradeOff')), 5000);
   await expect($('#tradeOff').getAttribute('class')).toContain('active');
   await expect($('#childKeyShare').isPresent()).toBe(true);
   shareDisplay();
   await expect($('#childKeyUnshare').isPresent()).toBe(true);
   unshareDisplay();
   await expect($('#childKeySale').isPresent()).toBeFalsy();
   switchToTab1();
};

/**
 * set permissions to "sell"
 */
export async function permSell(){
   // navigateTestChild();
   browser.executeScript('window.scrollTo(0,1000);');
   browser.wait(EC.elementToBeClickable($('#shareOff')), 5000);
   await $('#shareOff').click();
   browser.wait(EC.elementToBeClickable($('#sellOn')), 5000);
   await $('#sellOn').click();
   browser.wait(EC.elementToBeClickable($('#tradeOff')), 5000);
   await $('#tradeOff').click();
   browser.wait(EC.elementToBeClickable($('#savePermissions')), 5000);
   await $('#savePermissions').click();
   metamaskConfirm();
   browser.executeScript('window.scrollTo(0,1500);');
   browser.wait(EC.presenceOf($('#shareOff')), 5000);
   await expect($('#shareOff').getAttribute('class')).toContain('active');
   browser.wait(EC.presenceOf($('#sellOn')), 5000);
   await expect($('#sellOn').getAttribute('class')).toContain('active');
   browser.wait(EC.presenceOf($('#tradeOff')), 5000);
   await expect($('#tradeOff').getAttribute('class')).toContain('active');
   await expect($('#childKeyShare').isPresent()).toBeFalsy();
   await expect($('#childKeyUnshare').isPresent()).toBeFalsy();
   await expect($('#childKeySale').isPresent()).toBe(true);
   saleDisplay();
   switchToTab1();
};

/**
 * set permissions to "trade"
 */
export async function permTrade(){
   // navigateTestChild();
   browser.executeScript('window.scrollTo(0,1000);');
   browser.wait(EC.elementToBeClickable($('#shareOff')), 5000);
   await $('#shareOff').click();
   browser.wait(EC.elementToBeClickable($('#sellOff')), 5000);
   await $('#sellOff').click();
   browser.wait(EC.elementToBeClickable($('#tradeOn')), 5000);
   await $('#tradeOn').click();
   browser.wait(EC.elementToBeClickable($('#savePermissions')), 5000);
   await $('#savePermissions').click();
   metamaskConfirm();
   browser.executeScript('window.scrollTo(0,1500);');
   browser.wait(EC.presenceOf($('#shareOff')), 5000);
   await expect($('#shareOff').getAttribute('class')).toContain('active');
   browser.wait(EC.presenceOf($('#sellOff')), 5000);
   await expect($('#sellOff').getAttribute('class')).toContain('active');
   browser.wait(EC.presenceOf($('#tradeOn')), 5000);
   await expect($('#tradeOn').getAttribute('class')).toContain('active');
   await expect($('#childKeyShare').isPresent()).toBeFalsy();
   await expect($('#childKeyUnshare').isPresent()).toBeFalsy();
   await expect($('#childKeySale').isPresent()).toBeFalsy();
   switchToTab1();
};

/**
 * set permissions to "share" and "sell"
 */
export async function permShareSell(){
   browser.executeScript('window.scrollTo(0,1000);');
   browser.wait(EC.elementToBeClickable($('#shareOn')), 5000);
   await $('#shareOn').click();
   browser.wait(EC.elementToBeClickable($('#sellOn')), 5000);
   await $('#sellOn').click();
   browser.wait(EC.elementToBeClickable($('#tradeOff')), 5000);
   await $('#tradeOff').click();
   browser.wait(EC.elementToBeClickable($('#savePermissions')), 5000);
   await $('#savePermissions').click();
   metamaskConfirm();
   browser.executeScript('window.scrollTo(0,1500);');
   browser.wait(EC.presenceOf($('#shareOn')), 5000);
   await expect($('#shareOn').getAttribute('class')).toContain('active');
   browser.wait(EC.presenceOf($('#sellOn')), 5000);
   await expect($('#sellOn').getAttribute('class')).toContain('active');
   browser.wait(EC.presenceOf($('#tradeOff')), 5000);
   await expect($('#tradeOff').getAttribute('class')).toContain('active');
   await expect($('#childKeyShare').isPresent()).toBe(true);
   await shareDisplay();
   await expect($('#childKeyUnshare').isPresent()).toBe(true);
   unshareDisplay();
   await expect($('#childKeySale').isPresent()).toBe(true);
   saleDisplay();
   switchToTab1();
};

/**
 * set permissions to "share" and "trade"
 */
export async function permShareTrade(){
   browser.executeScript('window.scrollTo(0,1000);');
   browser.wait(EC.elementToBeClickable($('#shareOn')), 5000);
   await $('#shareOn').click();
   browser.wait(EC.elementToBeClickable($('#sellOff')), 5000);
   await $('#sellOff').click();
   browser.wait(EC.elementToBeClickable($('#tradeOn')), 5000);
   await $('#tradeOn').click();
   browser.wait(EC.elementToBeClickable($('#savePermissions')), 5000);
   await $('#savePermissions').click();
   metamaskConfirm();
   browser.executeScript('window.scrollTo(0,1500);');
   browser.wait(EC.presenceOf($('#shareOn')), 5000);
   await expect($('#shareOn').getAttribute('class')).toContain('active');
   browser.wait(EC.presenceOf($('#sellOff')), 5000);
   await expect($('#sellOff').getAttribute('class')).toContain('active');
   browser.wait(EC.presenceOf($('#tradeOn')), 5000);
   await expect($('#tradeOn').getAttribute('class')).toContain('active');
   await expect($('#childKeyShare').isPresent()).toBe(true);
   shareDisplay();
   await expect($('#childKeyUnshare').isPresent()).toBe(true);
   unshareDisplay();
   await expect($('#childKeySale').isPresent()).toBeFalsy();
   switchToTab1();
};

/**
 * set permissions to "sell" and "trade"
 */
export async function permSellTrade(){
   // navigateTestChild();
   browser.executeScript('window.scrollTo(0,1000);');
   browser.wait(EC.elementToBeClickable($('#shareOff')), 5000);
   await $('#shareOff').click();
   browser.wait(EC.elementToBeClickable($('#sellOn')), 5000);
   await $('#sellOn').click();
   browser.wait(EC.elementToBeClickable($('#tradeOn')), 5000);
   await $('#tradeOn').click();
   browser.wait(EC.elementToBeClickable($('#savePermissions')), 5000);
   await $('#savePermissions').click();
   metamaskConfirm();
   browser.executeScript('window.scrollTo(0,1500);');
   browser.wait(EC.presenceOf($('#shareOff')), 5000);
   await expect($('#shareOff').getAttribute('class')).toContain('active');
   browser.wait(EC.presenceOf($('#sellOn')), 5000);
   await expect($('#sellOn').getAttribute('class')).toContain('active');
   browser.wait(EC.presenceOf($('#tradeOn')), 5000);
   await expect($('#tradeOn').getAttribute('class')).toContain('active');
   await expect($('#childKeyShare').isPresent()).toBeFalsy();
   await expect($('#childKeyUnshare').isPresent()).toBeFalsy();
   await expect($('#childKeySale').isPresent()).toBe(true);
   saleDisplay();
   switchToTab1();
};

/**
 * set permissions to "share", "sell," and "trade"
 */
export async function permAll(){
   browser.executeScript('window.scrollTo(0,1000);');
   browser.wait(EC.elementToBeClickable($('#shareOn')), 5000);
   await $('#shareOn').click();
   browser.wait(EC.elementToBeClickable($('#sellOn')), 5000);
   await $('#sellOn').click();
   browser.wait(EC.elementToBeClickable($('#tradeOn')), 5000);
   await $('#tradeOn').click();
   browser.wait(EC.elementToBeClickable($('#savePermissions')), 5000);
   await $('#savePermissions').click();
   metamaskConfirm();
   browser.executeScript('window.scrollTo(0,1500);');
   browser.wait(EC.presenceOf($('#shareOn')), 5000);
   await expect($('#shareOn').getAttribute('class')).toContain('active');
   browser.wait(EC.presenceOf($('#sellOn')), 5000);
   await expect($('#sellOn').getAttribute('class')).toContain('active');
   browser.wait(EC.presenceOf($('#tradeOn')), 5000);
   await expect($('#tradeOn').getAttribute('class')).toContain('active');
   await expect($('#childKeyShare').isPresent()).toBe(true);
   shareDisplay();
   await expect($('#childKeyUnshare').isPresent()).toBe(true);
   unshareDisplay();
   await expect($('#childKeySale').isPresent()).toBe(true);
   saleDisplay();
   switchToTab1();
};

/**
 * validate correct share display 
 */
export async function shareDisplay() {
   browser.wait(EC.presenceOf($('#childKeyShare')), 5000);
   await expect($('#childKeyShare').isDisplayed()).toBe(true);
   await $('#shareTitleText').getText().then(function (text) {
      expect(text).toBe("Share keys");
   });
   await $('#shareInfoText').getText().then(function (text) {
      expect(text).toBe("Insert the address for the person you would like to share with:");
   });
   await expect($('#shareInput').isDisplayed()).toBe(true);
   await expect($('#shareBtn').isDisplayed()).toBe(true);
   await expect($('#cancelAllTrade').isDisplayed()).toBe(true);
   await $('#cancelAllTrade').getText().then(function (text) {
      expect(text).toBe("Cancel all outstanding trade offers");
   });
};

/**
 * validate correct unshare display
 */
export async function unshareDisplay() {
   browser.wait(EC.presenceOf($('#childKeyUnshare')), 5000);
   await expect($('#childKeyUnshare').isDisplayed()).toBe(true);
   browser.wait(EC.presenceOf($('#unshareTitleText')), 5000);
   await $('#unshareTitleText').getText().then(function (text) {
      expect(text).toBe("Unshare keys");
   });
   await $('#unshareInfoText').getText().then(function (text) {
      expect(text).toBe("Insert the address for the person you would like to unshare with:");
   });
   await expect($('#unshareInput').isDisplayed()).toBe(true);
   await expect($('#unshareBtn').isDisplayed()).toBe(true);
   await expect($('#cancelAllTrade').isDisplayed()).toBe(true);
   await $('#cancelAllTrade').getText().then(function (text) {
      expect(text).toBe("Cancel all outstanding trade offers");
   });
};

/**
 * validate correct sale display
 */
export async function saleDisplay() {
   browser.wait(EC.presenceOf($('#childKeySale')), 5000);
   await expect($('#childKeySale').isDisplayed()).toBe(true);
   await $('#saleTitleText').getText().then(function (text) {
      expect(text).toBe("Make sale offer");
   });
   await $('#saleInfoText').getText().then(function (text) {
      expect(text).toBe("Insert the address for the person you would like to make an offer to:")
   });
   await expect($('#saleTo').isDisplayed()).toBe(true);
   await expect($('#saleAmount').isDisplayed()).toBe(true);
   await expect($('#saleBtn').isDisplayed()).toBe(true);
   await expect($('#cancelAllTrade').isDisplayed()).toBe(true);
   await $('#cancelAllTrade').getText().then(function (text) {
      expect(text).toBe("Cancel all outstanding trade offers");
   });
};
