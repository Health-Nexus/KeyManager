'use strict';

var protractor = require('protractor');
var browser = require("protractor").protractor.browser;
let EC = ExpectedConditions;ß

var pageMain = function () {
   browser.get('localhost:4200');
};

pageMain.prototype = Object.create({}, {
   rinkebyMsg: {
      get: () => {
         browser.wait(EC.presenceOf($('#rinkebyMsg')), 20000);
         return $('#rinkebyMsg')
      }
   },
   parentKeysTitleText: {
      get: () => {
         browser.wait(EC.presenceOf($('#parentKeysTitleText'), 5000));
         return $('#parentKeysTitleText');
      }
   },
   createParentTitleText: {
      get: () => {
         browser.wait(EC.presenceOf($('#createParentTitleText'), 5000));
         return $('#createParentTitleText');
      }
   },
   parentKey: {
      get: (num) => {
         browser.wait(EC.presenceOf($$("#parentKeysList").get(num)), 20000);
         return $$("#parentKeysList").get(num);
      }
   },
   parentKeyAddress:{
      get: (num) => {
         browser.wait(EC.presenceOf($$("#parentKeysList").get(num)), 20000);
         let address = $$("#parentKeysList").get(num).getText().then((text) => {
            return text.substring(0, 63);
         });
         return address;
      }
   },
   parentCreateInfo: {
      get: () => {
         browser.wait(EC.presenceOf($('#createParentInfo')), 20000);
         return $('#createParentInfo');
      }
   },
   parentCreateInput: {
      get: () => {
         browser.wait(EC.presenceOf($('#createParentInput')), 20000);
         return $('#createParentInput');
      }
   },
   parentCreateBtn: {
      get: () => {
         browser.wait(EC.elementToBeClickable(element(by.buttonText('Generate'))), 20000);
         return element(by.buttonText('Generate'));
      }
   },
   parentPaginator: {
      get: () => {
         browser.wait(EC.presenceOf($('#parentPaginator')), 20000);
         return $('#parentPaginator');
      }
   },
   ownedPaginator: {
      get: () => {
         browser.wait(EC.presenceOf($('#ownedPaginator')), 20000);
         return $('#ownedPaginator');
      }
   },
   ownedKeyFirst: {
      get: () => {
         browser.wait(EC.presenceOf($$("#ownedKeysList").first()), 20000);
         return $$("#ownedKeysList").first();
      }
   },
   ownedKeyLast: {
      get: () => {
         browser.wait(EC.presenceOf($$("#ownedKeysList").last()), 20000);
         browser.executeScript('arguments[0].scrollIntoView();', $$('#ownedKeysList').last().getWebElement());
         return $$("#ownedKeysList").last();
      }
   },
   phuseBtn: {
      get: () => {
         browser.wait(EC.elementToBeClickable($('#phViewBtn')), 20000);
         return $('#phViewBtn');
      }
   },
   originalBtn: {
      get: () => {
         browser.wait(EC.presenceOf($('#orgViewBtn')), 20000);
      }
   },
   phuseText: {
      get: () => {
         browser.wait(EC.presenceOf($('#phuseText')), 20000);
         return $('#phuseText');
      }
   },
   mediumLink: {
      get: () => {
         browser.wait(EC.presenceOf($('#mediumLink')), 20000)
         return $('#mediumLink')
      }
   },
   ownedTitle: {
      get: () => {
         browser.wait(EC.elementToBeClickable($('#ownedKeysTitleText')), 20000);
         return $('#ownedKeysTitleText');
      }
   },
   ownedLast: {
      get: () => {
         browser.wait(EC.elementToBeClickable($('#ownedKeysTitleText').last()), 20000);
         return $('#ownedKeysTitleText').last();
      }
   }
});

module.exports = pageMain;