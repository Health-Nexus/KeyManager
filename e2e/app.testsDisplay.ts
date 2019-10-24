import { AppPage } from './app.po';
import { $, $$, ExpectedConditions } from 'protractor';
import { metamaskLogin, switchToTab1, } from './functions/app.functionsShare';
import { account1mnemonic, account1password } from './environment/app.accountsInfo';

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

});