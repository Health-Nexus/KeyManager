import { AppPage } from './app.po';
import { metamaskLogin, 
         accountLogin, 
         addAccount, 
         createParentKey, 
         createChildKey, 
         setChildKeyPermissions, 
         shareChildKey 
      } from './functions/app.functionsShare';
import { countKeys } from './functions/app.functionsPagination'
import { account1mnemonic, 
         account1password, 
         account2private, 
         account1public 
      } from './environment/app.accountsInfo';

/**
 * tests validating that keys can be 
 * created and shared between accounts
 */
describe('health-nexus-wallet App - key share test', function() {
   let page: AppPage;

   beforeEach(function () {
      page = new AppPage();
   });

});