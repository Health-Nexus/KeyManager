'use strict';

let protractor = require('protractor');
let browser = require("protractor").protractor.browser;
let EC = ExpectedConditions;

let pageTokens = function () {
   browser.get('localhost:4200');
};

pageTokens.prototype = Object.create({}, {

   tokensTab: {
      get: () => {
         browser.wait(EC.presenceOf($('#tokensTab')), 10000);
         return $('#tokensTab');
      }
   },
   keysTab: {
      get: () => {
         browser.wait(EC.presenceOf($('keysTab')), 10000);
         return $('#keysTab');
      }
   },
   maxTokensApprove: {
      get: () => {
         browser.wait(EC.presenceOf($('#maxTokensApprove')), 30000);
         return $('#maxTokensApprove')
      }
   },
   maxTokenInfoText: {
      get: () => {
         browser.wait(EC.presenceOf($('#maxTokensInfoText')), 30000);
         return $('#maxTokensInfoText');
      }
   },
   maxTokensInput: {
      get: () => {
         browser.wait(EC.presenceOf($('#maxTokensInput')), 30000);
         return $('#maxTokensInput');
      }
   },

});

module.exports = pageTokens;
