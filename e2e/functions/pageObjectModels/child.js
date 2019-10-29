'use strict';

let protractor = require('protractor');
let browser = require("protractor").protractor.browser;
let EC = ExpectedConditions;

let pageChild = function () {
   browser.get('localhost:4200');
};

pageChild.prototype = Object.create({}, {

   managingChildTitleText: {
      get: () => {
         browser.wait(EC.presenceOf($('#managingChildTitleText')), 20000);
         return $('#managingChildTitleText');
      }
   },
   managingChildKey: {
      get: () => {
         browser.wait(EC.presenceOf($('#managingChildKey')), 20000);
         return $('#managingChildKey');
      }
   },
   managingChildKeyAddress: {
      get: () => {
         browser.wait(EC.presenceOf($('#managingChildKey')), 20000);
         let address = $('#managingChildKey').getText().then((text) => {
            return text.substring(0, 63);
         });
         return address;
      }
   },
   gatekeeperTitleText: {
      get: () => {
         browser.wait(EC.presenceOf($('#gatekeeperTitleText')), 20000);
         return $('#gatekeeperTitleText');
      }
   },
   retrieveInfoText: {
      get: () => {
         browser.wait(EC.presenceOf($('#retrieveInfoText')), 20000);
         return $('#retrieveInfoText');
      }
   },
   retrieveWarning: {
      get: () => {
         browser.wait(EC.presenceOf($('#retrieveWarning')), 20000);
         return $('#retrieveWarning');
      }
   },
   insertInfoText: {
      get: () => {
         browser.wait(EC.presenceOf($('#insertInfoText')), 20000);
         return $('#insertInfoText');
      }
   },
   retrieveBtn: {
      get: () => {
         browser.wait(EC.presenceOf($('#retrieveBtn')), 20000);
         return $('#retrieveBtn');
      }
   },
   permissionsTitleText: {
      get: () => {
         browser.wait(EC.presenceOf($('#permissionsTitleText')), 20000);
         return $('#permissionsTitleText');
      }
   },
   permissionsShareRow: {
      get: () => {
         browser.wait(EC.presenceOf($('#permissionsShareRow')), 20000);
         return $('#permissionsShareRow');
      }
   },
   permissionsSellRow: {
      get: () => {
         browser.wait(EC.presenceOf($('#permissionsSellRow')), 20000);
         return $('#permissionsSellRow');
      }
   },
   permissionsTradeRow: {
      get: () => {
         browser.wait(EC.presenceOf($('#permissionsTradeRow')), 20000);
         return $('#permissionsTradeRow');
      }
   },
   getParameterBox: {
      get: () => {
         browser.wait(EC.presenceOf($('#getParameterBox')), 20000)
         return $('#getParameterBox')
      }
   },
   getParameterBtn: {
      get: () => {
         browser.wait(EC.presenceOf($('#getParameterBtn')), 20000)
         return $('#getParameterBtn')
      }
   },
   addParameterBox: {
      get: () => {
         browser.wait(EC.presenceOf($('#addParameterBox')), 20000)
         return $('#addParameterBox')
      }
   },
   enterParameterName: {
      get: () => {
         browser.wait(EC.presenceOf($('#enterParameterName')), 20000)
         return $('#enterParameterName')
      }
   },
   enterParameterValue: {
      get: () => {
         browser.wait(EC.presenceOf($('#enterParameterValue')), 20000)
         return $('#enterParameterValue')
      }
   },
   addParameterBtn: {
      get: () => {
         browser.wait(EC.presenceOf($('#addParameterBtn')), 20000)
         return $('#addParameterBtn')
      }
   },
   cancelAllTrade: {
      get: () => {
         browser.wait(EC.presenceOf($('#cancelAllTrade')), 20000)
         return $('#cancelAllTrade')
      }
   },
   managingChildKey: {
      get: () => {
         browser.wait(EC.presenceOf($('#managingChildKey')), 20000);
         return $('#managingChildKey');
      }
   },
   shareOn: {
      get: () => {
         browser.wait(EC.elementToBeClickable($('#shareOn')), 20000);
         return $('#shareOn');
      }
   },
   shareOff: {
      get: () => {
         browser.wait(EC.elementToBeClickable($('#shareOff')), 20000);
         return $('#shareOff');
      }
   },
   sellOn: {
      get: () => {
         browser.wait(EC.elementToBeClickable($('#sellOn')), 20000);
         return $('#sellOn');
      }
   },
   sellOff: {
      get: () => {
         browser.wait(EC.elementToBeClickable($('#sellOff')), 20000);
         return $('#sellOff');
      }
   },
   tradeOn: {
      get: () => {
         browser.wait(EC.elementToBeClickable($('#tradeOn')), 20000);
         return $('#tradeOn');
      }
   },
   tradeOff: {
      get: () => {
         browser.wait(EC.elementToBeClickable($('#tradeOff')), 20000);
         return $('#tradeOff');
      }
   },
   shareInput: {
      get: () => {
         browser.wait(EC.elementToBeClickable($('#shareInput')), 30000);
         browser.executeScript('window.scrollTo(0,1500);');
         return $('#shareInput');
      }
   },
   shareBtn: {
      get: () => {
         browser.wait(EC.elementToBeClickable($('#shareBtn')), 20000);
         return $('#shareBtn');
      }
   },
   purchaseKeyTitle: {
      get: () => {
         browser.wait(EC.presenceOf($('#purchaseKeysTitleText')), 20000);
         return $('#purchaseKeysTitleText');
      }
   },
   purchaseKeysInput: {
      get: () => {
         browser.wait(EC.presenceOf($('#purchaseKeysInput')), 20000);
         return $('#purchaseKeysInput');
      }
   },
   purchaseKeysBtn: {
      get: () => {
         browser.wait(EC.elementToBeClickable($('#purchaseKeysBtn')), 20000);
         return $('#purchaseKeysBtn');
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
   childKeyNavigator: {
      get: () => {
         browser.wait(EC.presenceOf($('#childKeyNavigator')), 20000);
         return $('#childKeyNavigator');
      }
   },
   cancelAllTrade: {
      get: () => {
         browser.wait(EC.presenceOf($('#cancelAllTrade')), 20000);
         return $('#cancelAllTrade');
      }
   }

});

module.exports = pageChild;
