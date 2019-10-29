import { AppPage } from './app.po';
import { $, $$, ExpectedConditions } from 'protractor';
import { metamaskLogin } from './functions/app.functions-share';
import { permNone, permShare, permSell, permTrade, permShareSell, permShareTrade, permSellTrade, permAll, navigateTestChild } from './functions/app.functions-permissions'
import { account1mnemonic, account1password } from './environment/app.accountsInfo';

let protractor = require('protractor');
let browser = require("protractor").protractor.browser;
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

})
