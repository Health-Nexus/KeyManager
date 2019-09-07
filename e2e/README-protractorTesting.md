## Running Tests
1. clone git repository

2. install node modules using: $npm install

3. populate variables in /KeyManager/e2e/environment/app.accounts-info.ts with the relevant account information
      - account 1 public address, mnemonic, and password and account 2 private address are all that are strictly required
      - NOTE: only provide information for accounts that you are comfortable being used in an automated testing environment
      - NOTE: Ether for newly created test accounts can be acquired at the rinkeby faucet: https://faucet.rinkeby.io/
         1. post your testing account's public address on a social media platform (twitter, facebook, etc.)
         2. copy a link to your social media post to the rinkeby faucet page
         3. click the "Give Me Ether" button on the rinkeby faucet page, selecting the amount of ether you want to recieve

4. to run tests:
      1. set up an instance of the Key Manager application using: $ng serve
      2. then, in a new terminal window, run: $protractor protractor.conf.js

Note: This test suite takes 6-7 minutes to complete.
Note: These tests are at times unreliable. If errors occur when first run, please run a 2nd and 3rd time. One successful run of the full test suite will confirm the application's functionality. For most consistent results, do not switch focus from the tests as they run.


## Chromedriver vs. Selenium Server
To simplify the testing environment, these tests are written to test directly against Chrome 76 without using a Selenium Server. 
To download ChromeDriver 76, please visit: https://chromedriver.chromium.org/downloads
To instead use a Selenium Server, please follow Protractor's setup instructions at: https://www.protractortest.org/#/server-setup.


## Browser Details
These tests are currently only validated to run against the Chrome browser. To test against Firefox or another browser, please follow the "Using Browsers Other Than Chrome" section of Protractor's documentation at: https://www.protractortest.org/#/browser-setup