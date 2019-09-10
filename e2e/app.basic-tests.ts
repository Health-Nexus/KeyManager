import { AppPage } from './app.po';
import { $, $$, ExpectedConditions } from 'protractor';
import { metamaskLogin, switchToTab1, } from './functions/app.share-function-list';
import { account1mnemonic, account1password } from './environment/app.accounts-info';

var protractor = require('protractor');
var browser = require("protractor").protractor.browser;
let EC = ExpectedConditions;

/**
 * tests validating basic display and navigation
 */
describe('health-nexus-wallet App - basic tests', function() {
   let page: AppPage;

   beforeEach(function () {
      page = new AppPage();
   });

   it('logged in via MetaMask', async function () {
      metamaskLogin(account1mnemonic, account1password);
      switchToTab1();
   });

   it('rinkeyby message is present', async function() {
      page.navigateTo();
      browser.wait(EC.presenceOf($('#rinkebyMsg')), 20000);
      browser.wait(EC.presenceOf($$('#parentKeysList').get(0)), 30000);
      await $('#rinkebyMsg').getText().then(function (text) {
         expect(text).toBe('You are connected to the Rinkeby Test network. Do not spend real ETH on Rinkeby.');
      });
      switchToTab1();
   });

   it('main page features are present', async function () {
      page.navigateTo();
      browser.executeScript('window.scrollTo(0,800);').then(function () {
      });
      browser.wait(EC.presenceOf($$('#parentKeysList').get(0)), 30000);
      await $('#createParentTitleText').getText().then(function (text) {
         expect(text).toBe('Create New Parent Key');
      });
      await $('#createParentInfo').getText().then(function (text) {
         expect(text).toBe('Create a parent key using the URL to your gatekeeper- or blockchain-enabled service');
      });
      await expect($('#createParentInput').isDisplayed()).toBe(true);
      await expect($('#createParentBtn').isDisplayed()).toBe(true);
      await $('#parentKeysTitleText').getText().then(function (text) {
         expect(text).toBe('My Parent Keys');
      });
      await expect($$('#parentKeysList').get(0).isDisplayed()).toBe(true); // expect at least one Key exists

      // Purchase Keys
      await $('#purchaseKeysTitleText').getText().then(function (text) {
         expect(text).toBe('Purchase Keys');
      });
      await expect($('#purchaseKeysInput').isDisplayed()).toBe(true);
      await expect($('#purchaseKeysBtn').isDisplayed()).toBe(true);

      await $('#ownedKeysTitleText').getText().then(function (text) {
         expect(text).toBe('Owned/Shared Keys');
      });
      await expect($$('#ownedKeysList').get(0).isDisplayed()).toBe(true); // expect at least owned/shared Key exists
      switchToTab1();
   });

   it('phuse/original buttons toggled phuse instructions', async function() {
      page.navigateTo();
      browser.wait(EC.presenceOf($('#phViewBtn')), 30000);
      browser.executeScript('arguments[0].scrollIntoView();', $('#phViewBtn').getWebElement()).then(function () {
      });
      await $('#phViewBtn').click();
      await expect($('#phuseText').isPresent()).toBeTruthy();
      await expect($('#phuseText').isDisplayed()).toBe(true);
      await $('#phuseText').getText().then(function(text){
         expect(text).toContain("1. Create");
         expect(text).toContain("2. Next");
         expect(text).toContain("3. Then");
         expect(text).toContain("4. Next");
         expect(text).toContain("5. If needed");
         expect(text).toContain("6. Finally");
         expect(text).toContain("For a more thorough walk through");
      });
      await expect($('#mediumLink').getAttribute('href')).toEqual('https://medium.com/simplyvital/lets-hit-the-ground-running-with-health-nexus-5c25df21c56d');
      await $('#orgViewBtn').click();
      await expect($('#phuseText').isPresent()).toBeFalsy();
      switchToTab1();
   });

   it('"My Tokens" and "My Keys" tabs exist and display proper content', async function() {
      page.navigateTo();
      browser.wait(EC.presenceOf($('#tokensTab')), 10000);
      browser.wait(EC.and((EC.presenceOf($('#tokensTab'))), (EC.presenceOf($('#keysTab')))));
      await expect($('#tokensTab').isDisplayed()).toBe(true);
      await expect($('#keysTab').isDisplayed()).toBe(true);
      browser.wait(EC.presenceOf($('#tokensTab')), 10000);
      //My Tokens tab
      browser.wait(EC.elementToBeClickable($$('#tabClickable').get(0)), 30000);
      browser.executeScript('window.scrollTo(0,0);');
      await $$('#tabClickable').get(0).click();
      browser.wait(EC.presenceOf($('#maxTokensApprove')), 30000);
      await $('#maxTokensInfoText').getText().then(function (text) {
         expect(text).toBe('Max number of tokens that can be used for key purchases:');
      });
      await expect($('#maxTokensInput').isDisplayed()).toBe(true);
      await expect($('#maxTokensApprove').isDisplayed()).toBe(true);
      //My Keys tab
      browser.wait(EC.elementToBeClickable($$('#tabClickable').get(1)), 30000);
      browser.executeScript('window.scrollTo(0,0);');
      await $$('#tabClickable').get(1).click();
      browser.wait(EC.presenceOf($$('#parentKeysList').get(0)), 30000);
      await expect($('#createParentTitleText').isDisplayed()).toBe(true);
      await expect($('#createParentInfo').isDisplayed()).toBe(true);
      await expect($('#createParentInput').isDisplayed()).toBe(true);
      await expect($('#createParentBtn').isDisplayed()).toBe(true);
      await expect($('#parentKeysTitleText').isDisplayed()).toBe(true);
      let firstKey = await $$('#parentKeysList').get(0);
      await expect((firstKey).isDisplayed()).toBe(true); // expect at least one Key exists
      await expect($('#purchaseKeysTitleText').isDisplayed()).toBe(true);
      await expect($('#purchaseKeysInput').isDisplayed()).toBe(true);
      await expect($('#purchaseKeysBtn').isDisplayed()).toBe(true);
      await expect($('#ownedKeysTitleText').isDisplayed()).toBe(true);
      await expect($$('#ownedKeysList').get(0).isDisplayed()).toBe(true); // expect at least owned/shared Key exists
      switchToTab1();
   });

   it('parent/child key pages displayed proper content', async function() {
      // main page
      page.navigateTo();
      browser.wait(EC.presenceOf($$('#parentKeysList').get(0)), 30000);
      let parentKey = await $$('#parentKeysList').get(0).getText().then(function(text){
         return text.substring(0,63);
      });
      browser.executeScript('window.scrollTo(0,500);').then(function () {
         $$('#parentKeysList').get(0).click();
      });
      // parent key page
      browser.wait(EC.presenceOf($$('#childKeysList').get(0)), 30000);
      await expect($('#myKeys-map').isDisplayed()).toBe(true);
      await expect($('#parentKey-map').isDisplayed()).toBe(true);
      let managingParentKey = await $$('#managingParentKey').get(0).getText().then(function (text) {
         return text.substring(0,63);
      });
      await $('#managingParentTitleText').getText().then(function(text){
         expect(text).toBe("Managing parent key");
      });
      await expect(managingParentKey).toBe(parentKey);
      await $('#childKeyInfoText').getText().then(function (text) {
         expect(text).toBe("Child keys");
      });
      await $('#childKeyInfo').getText().then(function (text) {
         expect(text).toBe("Generate the permissioned childkeys here to be traded");
      });
      let childKey = await $$('#childKeysList').get(0).getText().then(function(text){
         return text
      });
      let firstKey = await $$('#childKeysList').get(0);
      await expect(firstKey.isDisplayed()).toBe(true); // expect at least 1 child key is present
      await $$('#childKeysList').get(0).click();
      //child key page
      browser.wait(EC.presenceOf($('#cancelAllTrade')), 30000);
      await expect($('#myKeys-map').isDisplayed()).toBe(true);
      await expect($('#parentKey-map').isDisplayed()).toBe(true);
      await expect($('#childKey-map').isDisplayed()).toBe(true);
      let managingChildKey = await $('#managingChildKey').getText().then(function(text){
         return text;
      });
      await expect(managingChildKey).toBe(childKey);
      await $('#managingChildTitleText').getText().then(function (text) {
         expect(text).toBe("Managing child key");
      });
      await $('#gatekeeperTitleText').getText().then(function (text) {
         expect(text).toBe("Upload a file to the gatekeeper server:");
      });
      await $('#chooseInfoText').getText().then(function (text) {
         expect(text).toBe("Choose file:");
      });
      await expect($('#file').isDisplayed()).toBe(true);
      await $('#retrieveInfoText').getText().then(function (text) {
         expect(text).toBe("Retrieve child key data:");
      });
      await $('#retrieveWarning').getText().then(function (text) {
         expect(text).toBe("Warning: not verified for sensitive data; any data may be unsanitized. Additionally, make sure to only download data from trusted sources. We are not verifing the safety of the data");
      });
      await $('#insertInfoText').getText().then(function (text) {
         expect(text).toBe("Insert the parameter you would like to use to retrieve the data");
      });
      await expect($('#retrieveBtn').isDisplayed()).toBe(true);
      // Share/Unshare/Trade
      await $('#permissionsTitleText').getText().then(function (text) {
         expect(text).toBe("Managing child key permissions");
      });
      await expect($('#permissionShareRow').isDisplayed()).toBe(true);
      await expect($('#shareOn').isDisplayed()).toBe(true);
      await expect($('#shareOff').isDisplayed()).toBe(true);
      await expect($('#permissionSellRow').isDisplayed()).toBe(true);
      await expect($('#sellOn').isDisplayed()).toBe(true);
      await expect($('#sellOff').isDisplayed()).toBe(true);
      await expect($('#permissionTradeRow').isDisplayed()).toBe(true);
      await expect($('#tradeOn').isDisplayed()).toBe(true);
      await expect($('#tradeOff').isDisplayed()).toBe(true);
      await expect($('#getParameterBox').isDisplayed()).toBe(true);
      await expect($('#getParameterBtn').isDisplayed()).toBe(true);
      await expect($('#addParameterBox').isDisplayed()).toBe(true);
      await expect($('#enterParameterName').isDisplayed()).toBe(true);
      await expect($('#enterParameterValue').isDisplayed()).toBe(true);
      await expect($('#addParameterBtn').isDisplayed()).toBe(true);
      await expect($('#cancelAllTrade').isDisplayed()).toBe(true);
      switchToTab1();
   });

   it('owned/shared keys pages display proper content', async function() {
      // main page
      page.navigateTo();
      browser.wait(EC.presenceOf($$('#ownedKeysList').get(0)), 30000);
      let ownedKey = await $$('#ownedKeysList').get(0).getText().then(function (text) {
         return text.substring(0,63);
      });
      browser.executeScript('arguments[0].scrollIntoView();', $$('#ownedKeysList').get(0).getWebElement()).then(function () {
         $$('#ownedKeysList').get(0).click();
      });
      // managing child key page
      browser.wait(EC.presenceOf($('#retrieveBtn')), 30000);
      await expect($('#myKeys-map').isDisplayed()).toBe(true);
      await expect($('#childKey-map').isDisplayed()).toBe(true);
      let managingChildKey = await $('#managingChildKey').getText().then(function (text) {
         return text.substring(0, 63);
      });
      await expect(managingChildKey).toBe(ownedKey);

      await $('#gatekeeperTitleText').getText().then(function (text) {
         expect(text).toBe("Upload a file to the gatekeeper server:");
      });
      await $('#chooseInfoText').getText().then(function (text) {
         expect(text).toBe("Choose file:");
      });
      await expect($('#file').isDisplayed()).toBe(true);
      await $('#retrieveInfoText').getText().then(function (text) {
         expect(text).toBe("Retrieve child key data:");
      });
      await $('#retrieveWarning').getText().then(function (text) {
         expect(text).toBe("Warning: not verified for sensitive data; any data may be unsanitized. Additionally, make sure to only download data from trusted sources. We are not verifing the safety of the data");
      });
      await $('#insertInfoText').getText().then(function (text) {
         expect(text).toBe("Insert the parameter you would like to use to retrieve the data");
      });
      await expect($('#retrieveBtn').isDisplayed()).toBe(true);
   });

});