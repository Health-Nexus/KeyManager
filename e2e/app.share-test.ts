import { AppPage } from './app.po';
import { metamaskLogin, accountLogin, 
         addAccount, createParentKey, 
         createChildKey, setChildKeyPermissions, 
         shareChildKey } from './functions/app.share-function-list';
import { countKeys } from './functions/app.pagination-functions'
import { account1mnemonic, account1password, account2private, account1public } from './environment/app.accounts-info';

/**
 * tests validating that keys can be 
 * created and shared between accounts
 */
describe('health-nexus-wallet App - key share test', function() {
   let page: AppPage;

   beforeEach(function () {
      page = new AppPage();
   });

   it('logged in via MetaMask', function () {
      metamaskLogin(account1mnemonic, account1password);
   });

   it('added second account', function(){
      addAccount(account2private);
   });

   it("counted account 1 shared keys", function () {
      countKeys(1, 'owned', 'original');
   });
      
   it("logged in to account 2", function(){
      accountLogin(2);
   });

   it("created parent key", function(){
      createParentKey()
   });

   it("created child key", function(){
      createChildKey();
   });

   it("set child key permissions", function(){
      setChildKeyPermissions();
   });

   it("shared child key", function () {
      shareChildKey(account1public);
   });

   it("validated key share", function(){
      countKeys(1, 'owned', 'updated');
   });

});