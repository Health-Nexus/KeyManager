'use strict';

var protractor = require('protractor');
var browser = require("protractor").protractor.browser;
let EC = ExpectedConditions;

var pageOwned = function () {
   browser.get('localhost:4200');
};

pageOwned.prototype = Object.create({}, {
   myKeysNavigator: {
      get: () => {
         browser.wait(EC.presenceOf($('#myKeysNavigator')), 20000);
         return $('#myKeysNavigator');
      }
   },
   childKeyNavigator: {
      get: () => {
         browser.wait(EC.presenceOf($('#childKeyNavigator')), 20000);
         return $('#childKeyNavigator');
      }
   },
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
   chooseInfoText: {
      get: () => {
         browser.wait(EC.presenceOf($('#chooseInfoText')), 20000);
         return $('#chooseInfoText');
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


});

module.exports = pageOwned;