// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');
function encode(file) {
  var stream = require('fs').readFileSync(file);
  return new Buffer(stream).toString('base64');
}

exports.config = {
  allScriptsTimeout: 120000,
  specs: [
    './e2e/app.basic-tests.ts'
    // './e2e/app.metamask-test.ts'
    // './e2e/**/*.e2e-spec.ts'
  ],
  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      'extensions': [encode('/Users/kevincheli/Downloads/MetaMask.crx')],
    }
  },
  // directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine2',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 120000,
    print: function() {}
  },
  onPrepare() {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  },
  
};
