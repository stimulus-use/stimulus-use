// Karma configuration
// Generated on Mon Sep 03 2018 21:41:15 GMT+0200 (CEST)

module.exports = function (config) {
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
        included: false,
      },
      'src/**/*.ts',
    ],

    // list of files / patterns to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'spec/**/*.js': ['webpack', 'sourcemap'],
      'src/**/*.ts': ['karma-typescript'],
      'spec/fixtures/*.html': ['html2js'],
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
                plugins: ['@babel/plugin-proposal-class-properties'],
              },
            },
          },
          {
            test: /\.ts?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
          },
        ],
      },
      resolve: {
        extensions: ['.tsx', '.ts', '.js'],
      },
    },

    client: {
      captureConsole: true,
      chai: {
        includeStack: true,
      },
      clearContext: false,
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'karma-typescript'],

    coverageReporter: {
      reporters: [
        {
          type: 'lcov',
        },
        {
          type: 'html',
        },
        {
          type: 'text-summary',
        },
        {
          type: 'text',
        },
      ],
    },
    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['ChromeHeadless'],
    // browsers: ['Chrome'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: 5,
  })
}
