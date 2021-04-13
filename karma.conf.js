// Karma configuration
// Generated on Mon Sep 03 2018 21:41:15 GMT+0200 (CEST)

const customLaunchers = {
  sl_chrome_latest: {
    base: 'SauceLabs',
    browserName: 'chrome',
    version: 'latest'
  },
  // sl_chrome_latest_i8n: {
  //   base: 'SauceLabs',
  //   browserName: 'chrome',
  //   version: 'latest',
  //   chromeOptions: {
  //     args: ['--lang=tr'],
  //   },
  // },
  // sl_firefox_43: {
  //   base: 'SauceLabs',
  //   browserName: 'firefox',
  //   version: '43',
  // },
  sl_firefox_latest: {
    base: 'SauceLabs',
    browserName: 'firefox',
    version: 'latest'
  },
  // sl_safari_9: {
  //   base: 'SauceLabs',
  //   browserName: 'safari',
  //   platform: 'OS X 10.11',
  //   version: '9',
  // },
  // sl_safari_10_1: {
  //   base: 'SauceLabs',
  //   browserName: 'safari',
  //   platform: 'macOS 10.12',
  //   version: '10.1',
  // },
  sl_safari_latest: {
    base: 'SauceLabs',
    browserName: 'safari',
    platform: 'macOS 10.13',
    version: 'latest'
  },
  // sl_edge_17: {
  //   base: 'SauceLabs',
  //   browserName: 'microsoftedge',
  //   platform: 'Windows 10',
  //   version: '17.17134',
  // },
  // sl_edge_latest: {
  //   base: 'SauceLabs',
  //   browserName: 'microsoftedge',
  //   platform: 'Windows 10',
  //   version: '18.17763',
  // },
  sl_ie_11: {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    platform: 'Windows 8.1',
    version: '11',
  }
  // sl_ios_latest: {
  //   base: 'SauceLabs',
  //   browserName: 'safari',
  //   platform: 'ios',
  //   device: 'iPhone X Simulator',
  //   version: '13.0',
  // },
  // sl_android_latest: {
  //   base: 'SauceLabs',
  //   browserName: 'chrome',
  //   platform: 'android',
  //   device: 'Android GoogleAPI Emulator',
  //   version: '10.0',
  // },
}

module.exports = function (config) {
  if ((!process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY) && process.env.CI) {
    console.log('Make sure the SAUCE_USERNAME and SAUCE_ACCESS_KEY environment variables are set.')
    process.exit(1)
  }

  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['karma-typescript', 'mocha', 'sinon-chai', 'fixture'],

    // list of files / patterns to load in the browser
    files: [
      'spec/**/*_spec.js',
      'spec/fixtures/*.html',
      {
        pattern: '**/*.js.map',
        included: false
      },
      'src/**/*.ts'
    ],

    // list of files / patterns to exclude
    exclude: ['**/*.d.ts'],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'spec/**/*.js': ['webpack', 'sourcemap'],
      'src/**/*.ts': ['karma-typescript'],
      'spec/fixtures/*.html': ['html2js']
    },

    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: [/node_modules/],
            use: {
              loader: 'babel-loader',
              options: {
                plugins: ['@babel/plugin-proposal-class-properties']
              }
            }
          },
          {
            test: /\.ts?$/,
            use: 'ts-loader',
            exclude: /node_modules/
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          }
        ]
      },
      resolve: {
        extensions: ['.tsx', '.ts', '.js']
      }
    },

    client: {
      captureConsole: true,
      chai: {
        includeStack: true
      },
      clearContext: false
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['dots', 'karma-typescript'],

    coverageReporter: {
      reporters: [
        {
          type: 'lcov'
        },
        {
          type: 'html'
        },
        {
          type: 'text-summary'
        },
        {
          type: 'text'
        }
      ]
    },

    // hostname: '0.0.0.0',

    captureTimeout: 180000,
    browserDisconnectTimeout: 180000,
    browserDisconnectTolerance: 3,
    browserNoActivityTimeout: 300000,
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['ChromeHeadless'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  })

  if (process.env.CI) {
    config.customLaunchers = customLaunchers
    config.browsers = Object.keys(customLaunchers)
    config.sauceLabs = {
      region: 'eu',
      testName: 'Stimulus Browser Tests',
      build: process.env.CIRCLE_BUILD_NUM
    }
    config.reporters = ['dots', 'saucelabs']
  }
}
