import { AppPage } from './app.po';
import { $, $$, ExpectedConditions } from 'protractor';
import { metamaskLogin } from './functions/app.functionsShare';
import { permNone, 
         permShare, 
         permSell, 
         permTrade, 
         permShareSell, 
         permShareTrade, 
         permSellTrade, 
         permAll, 
         navigateTestChild 
      } from './functions/app.functionsPermissions'
import { account1mnemonic, account1password } from './environment/app.accountsInfo';

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

})
