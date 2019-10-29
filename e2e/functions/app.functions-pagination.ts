import { $, $$, ExpectedConditions } from 'protractor';
import { accountLogin, page } from './app.functions-share'

let protractor = require('protractor');
let browser = require("protractor").protractor.browser;
let EC = ExpectedConditions;

let counts: number[] = [];
let keyList, paginator, paginatorElem, numOfPages;

/**
 * "Count Keys" function
 * 
 * 3 varialbes required:
 * 
 * @param accountNumber:
 * as per your "./environment/app.account-info.ts" file,
 * input number "1" or "2" to log in to the associated account
 * input "0" to bypass account login
 * 
 * @param keyType:
 * input string "parent" "owned", or "child" to choose which key type to count
 * note: "child" count requires that a parent key has been naviagted to
 * 
 * @param countType:
 * input string "original" or "updated" to asign the relevant
 * count type. NOTE: comparison between "original" and "updated"
 * key counts is validated within "updated" function path 
 */
export async function countKeys(accountNumber, keyType, countType) {
   setup(accountNumber, keyType);
   await keyList.isPresent().then(async function (keys) {
      if (!keys) {
         counts.push(0);
      } else if (keys) {
         await paginator.$('li').isPresent().then(async function (paginatorExists) {
            if (!paginatorExists) {
               keysNoPages(keyType, countType);
            } else if (paginatorExists) {
               keysPages(keyType, countType);
            };
         });
      };
   });
};

/** 
 * setup() handles account login & assigning paginator variables
 * */ 
async function setup(accountNumber, keyType) {
   if (accountNumber != 0) {
      accountLogin(accountNumber);
      page.navigateTo();
   };
   keyList = $$('#' + keyType + 'KeysList');
   paginator = $('#' + keyType + 'Paginator');
   if (keyType === 'parent' || keyType === 'owned') {
      browser.wait(EC.presenceOf(keyList), 30000);
   };
   if (keyType === 'parent') {
      paginatorElem = $$('.ngx-pagination.responsive').get(0);
   } else if (keyType === 'owned') {
      await $('#parentPaginator').$('li').isPresent().then(async function (parentPaginator) {
         if (!parentPaginator) {
            paginatorElem = $$('.ngx-pagination.responsive').get(0);
         } else if (parentPaginator) {
            paginatorElem = $$('.ngx-pagination.responsive').get(1);
         };
      });
   } else if (keyType === 'child') {
      await $('#parentPaginator').$('li').isPresent().then(async function (parentPaginator) {
         await $('#ownedPaginator').$('li').isPresent().then(async function (ownedPaginator) {
            if (!parentPaginator && !ownedPaginator) {
               paginatorElem = $$('.ngx-pagination.responsive').get(0);
            } else if (!parentPaginator || !ownedPaginator) {
               paginatorElem = $$('.ngx-pagination.responsive').get(1);
            } else if (parentPaginator && ownedPaginator) {
               paginatorElem = $$('.ngx-pagination.responsive').get(2);
            };
         });
      });
   };
   browser.wait(EC.titleIs('HealthNexusWallet'), 10000);
};

/**
 * counts keys when no pages present
 */
async function keysNoPages(keyType, countType) {
   browser.wait(EC.presenceOf(keyList.last()), 30000);
   await keyList.count().then(function (num) {
      counts.push(num);
      if (countType === 'updated') {
         if (keyType === 'owned') {
            expect(counts[counts.length - 1]).toBe(counts[0] + 1);
         } else {
            expect(counts[counts.length - 1]).toBe(counts[counts.length - 2] + 1);
         };
      };
   });
};

/**
 * counts keys when pages present
 */
async function keysPages(keyType, countType) {
   browser.wait(EC.elementToBeClickable(paginator), 5000);
   await paginatorElem.$$('li').count().then(async function (num) {
      if (num < 10) {
         numOfPages = num - 3;
         browser.executeScript('window.scrollTo(0, document.body.scrollHeight)');
         await paginatorElem.$$('li').get(num - 1).click();
      } else if (num === 10) {
         numOfPages = await paginatorElem.$$('li').get(num - 2).$$('span').get(1).getText().then(function (pages) {
            return pages;
         });
         browser.executeScript('window.scrollTo(0, document.body.scrollHeight)');
         await paginatorElem.$$('li').get(num - 2).click();
      };
      browser.wait(EC.presenceOf($('.pagination-next.disabled')), 10000);
   });
   await keyList.count().then(function (num) {
      counts.push(num + (10 * (numOfPages - 1)));
      if (countType === 'updated') {
         if (keyType === 'owned') {
            expect(counts[counts.length - 1]).toBe(counts[0] + 1);
         } else {
            expect(counts[counts.length - 1]).toBe(counts[counts.length - 2] + 1);
         };
      };
   });
};

/**
 * naviates to last parent key of 
 * last page, when pagination is present
 */
export async function naviagteLastPageLastParent() {
   browser.wait(EC.elementToBeClickable($('#parentPaginator')));
   await $$('.ngx-pagination.responsive').get(0)
      .$$('li')
      .count()
      .then(async function (num) {
         browser.executeScript('window.scrollTo(0, document.body.scrollHeight)');
         await $$('.ngx-pagination.responsive').get(0).$$('li').get(num - 2).click();
         browser.wait(EC.presenceOf($('.pagination-next.disabled')));
   });
};
