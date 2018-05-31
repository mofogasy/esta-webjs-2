// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const {SpecReporter} = require('jasmine-spec-reporter');

let hostname = process.env.host || require('my-local-ip')();
let externalport = process.env.externalport;

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './src/**/*.e2e-spec.ts'
  ],
  multiCapabilities: [
    {
      browserName: 'chrome'
    },
    {
      browserName: 'firefox'
    }
  ],
  baseUrl: 'http://' + hostname + ':' + externalport,
  seleniumAddress: 'http://webtestgrid.sbb.ch:4444/wd/hub',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function () {
    }
  },
  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.e2e.json')
    });
    jasmine.getEnv().addReporter(new SpecReporter({spec: {displayStacktrace: true}}));
    jasmine.getEnv().addReporter(new (require('jasmine-reporters').JUnitXmlReporter)({
      filePrefix: 'e2e-tests',
      savePath: 'reports',
      package: 'e2e',
      modifySuiteName: function (generatedSuiteName) {
        return 'e2e.' + generatedSuiteName.replace(/\./g, '#');
      }
    }));
  }
};
