'use strict';

var protractor = require('protractor');
var browser = require("protractor").protractor.browser;
let EC = ExpectedConditions;

var pageParent = function () {
   browser.get('localhost:4200');
};

pageParent.prototype = Object.create({}, {
   managingParentTitleText: {
      get: () => {
         browser.wait(EC.presenceOf($('#managingParentTitleText')), 20000);
         return $('#managingParentTitleText');
      }
   },
   childKeyTitleText: {
      get: () => {
         browser.wait(EC.presenceOf($$("#childKeyTitleText").last()), 20000);
         return $('#childKeyTitleText');
      }
   },
   childKeyInfoText: {
      get: () => {
         browser.wait(EC.presenceOf($$("#childKeyInfoText").last()), 20000);
         return $('#childKeyInfoText');
      }
   },
   childKeyFirst: {
      get: () => {
         browser.wait(EC.presenceOf($$("#childKeysList").first()), 20000);
         return $$("#childKeysList").first();
      }
   },
   childKeyLast: {
      get: () => {
         browser.wait(EC.presenceOf($$("#childKeysList").last()), 20000);
         return $$("#childKeysList").last();
      }
   },
   childCreateBtn: {
      get: () => {
         browser.wait(EC.elementToBeClickable(element(by.buttonText('Generate')), 20000));
         return element(by.buttonText('Generate'));
      }
   },
   childPaginator: {
      get: () => {
         browser.wait(EC.presenceOf($('#childPaginator')), 20000);
         return $('#childPaginator');
      }
   },
   managingParentKey: {
      get: () => {
         browser.wait(EC.presenceOf($('#managingParentKey')), 20000);
         return $('#managingParentKey');
      }
   },
   managingParentKeyAddress: {
      get: () => {
         browser.wait(EC.presenceOf($('#managingParentKey')), 20000);
         let address = $('#managingParentKey').getText().then((text) => {
            return text.substring(0, 63);
         });
         return address;
      }
   },
   myKeysNavigator: {
      get: () => {
         browser.wait(EC.presenceOf($('#myKeysNavigator')), 20000);
         return $('#myKeysNavigator');
      }
   },
   parentKeyNavigator: {
      get: () => {
         browser.wait(EC.presenceOf($('#parentKeyNavigator')), 20000);
         return $('#parentKeyNavigator');
      }
   },
});

module.exports = pageParent;