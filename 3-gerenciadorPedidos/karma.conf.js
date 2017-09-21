// Karma configuration
// Generated on Tue Jun 07 2016 16:30:52 GMT-0300 (Hora oficial do Brasil)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        'js/jquery-1.9.1.min.js',
        'js/libs/angular.min.js',
        'js/libs/angular-mocks.js',
        'js/libs/angular.sanitize.min.js',
        'js/libs/angular.cookies.min.js',
        'js/libs/angular-currency-code.min.js',
        'js/libs/locales/angular-locale_*.js',
        'js/libs/tmhDynamicLocale.min.js',
        'js/supportmessage/SupportChat.js',
        'js/**/*.module.js',
        'js/**/*.config.js',
        'js/**/*.directive.js',
        'js/**/*.filter.js',
        'js/**/*.service.js',
        'js/**/*.controller.js',
        'js/test/**/*.spec.js'
    ],

    // list of files to exclude
    exclude: [
              'js/test/services/optimization.service.spec.js',
              'js/test/services/optimization.controller.spec.js'
    ],



    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'junit'],
    
    junitReporter: {
        outputDir: 'test-results/', 
        outputFile: 'results.xml',
        useBrowserName: true,
        nameFormatter: function (browser, result){return browser + ' ' + result.suite.join(' ') + ' ' + result.description;}
    },
    
    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_DEBUG,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,
    
	customLaunchers : {
		Chrome_NoSandbox : {
			base : 'Chrome',
			flags : [ '--no-sandbox' ]
		}
	},


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Firefox', 'IE', 'Chrome_NoSandbox'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
