import { AppPage } from './app.po';
import { $, $$, ExpectedConditions } from 'protractor';
import { metamaskLogin } from './functions/app.share-function-list';
import { permNone, permShare, permSell, permTrade, permShareSell, permShareTrade, permSellTrade, permAll, navigateTestChild } from './functions/app.permissions-function-list'
import { account1mnemonic, account1password } from './environment/app.accounts-info';

var protractor = require('protractor');
var browser = require("protractor").protractor.browser;
let EC = ExpectedConditions;
let page: AppPage;

/**
 * tests validating the permissions toggle properly
 * and display correct page content
 */
describe('health-nexus-wallet App - permissions tests', function () {
   
   beforeEach(function () {
      page = new AppPage();
   });

   it('logged in via MetaMask', async function () {
      metamaskLogin(account1mnemonic, account1password);
   });

   it('navigated to child key', async function(){
      navigateTestChild();
   })

   it('set: none', async function () {
      permNone();
   });

   it('set: share', async function () {
      permShare();
   });

   it('set: sell', async function () {
      permSell();
   });

   it('set: trade', async function () {
      permTrade();
   });

   it('set: share sell', async function () {
      permShareSell();
   });

   it('set: share trade', async function () {
      permShareTrade();
   });

   it('set: sell trade', async function () {
      permSellTrade();
   });

   it('set: share sell trade', async function () {
      permAll();
   });

})
