// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts
const { SpecReporter } = require('jasmine-spec-reporter');

function encode(file) {
  var stream = require('fs').readFileSync(file);
  return new Buffer(stream).toString('base64');
}

exports.config = {
  allScriptsTimeout: 6000000,
  specs: [
    './e2e/app.basic-tests.ts',
    './e2e/app.permissions-tests.ts',
    './e2e/app.share-tests.ts',
    // './e2e/**/*.e2e-spec.ts'
  ],
  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      'extensions': [encode('./e2e/config/MetaMask.crx')],
      w3c: false,
    }
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine2',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 6000000,
    print: function() {}
  },
  // //Enabling blocking proxy
  // useBlockingProxy: true,
  // //Delaying for 3 sec before interacting with element and hightlighting it
  // highlightDelay: 500,
  onPrepare() {
    const browser = require('protractor').browser;
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  },
  
};
