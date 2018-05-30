// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {

  var seleniumWebgrid = {
    hostname: 'webtestgrid.sbb.ch',
    port: 4444
  };

  config.set({
    hostname: process.env.host || require('my-local-ip')(),
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-junit-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    junitReporter: {
      outputDir: 'reports',
      suite: 'unit-tests',
      outputFile: 'unit-tests.xml',
      useBrowserName: false
    },
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: 'reports/coverage',
      reports: ['html', 'lcovonly'],
      fixWebpackSourcePaths: true
    },
    reporters: config.angularCli && config.angularCli.codeCoverage
      ? ['progress', 'coverage-istanbul', 'junit']
      : ['progress', 'kjhtml'],
    port: process.env.externalport || 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    customLaunchers: {
      'SeleniumCH': {
        base: 'WebDriver',
        config: seleniumWebgrid,
        browserName: 'chrome'
      },
      'SeleniumFF': {
        base: 'WebDriver',
        config: seleniumWebgrid,
        browserName: 'firefox'
      },
      'SeleniumIE': {
        base: 'WebDriver',
        config: seleniumWebgrid,
        browserName: 'internet explorer',
        'x-ua-compatible': 'IE=edge'
      },
    },
    browsers: ['Chrome'],
    singleRun: false
  });
};
