(function(global) {

    var map = {
            'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api',
            '@angular':                   'node_modules/@angular',
            '@angular/core': 'node_modules/@angular/core/bundles/core.umd.js',
            '@angular/common': 'node_modules/@angular/common/bundles/common.umd.js',
            '@angular/compiler': 'node_modules/@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': 'node_modules/@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http': 'node_modules/@angular/http/bundles/http.umd.js',
            '@angular/router': 'node_modules/@angular/router/bundles/router.umd.js',
            '@angular/forms': 'node_modules/@angular/forms/bundles/forms.umd.js',
            // other libraries
            'rxjs': 'node_modules/rxjs'
    };

    var packages = {
        'javascripts/app':            { main: 'main.js',  defaultExtension: 'js' },
        'angular2-cookie':            { main: 'core.js',  defaultExtension: 'js' },
        'rxjs':                       { main: 'index.js', defaultExtension: 'js' },
        'angular2-in-memory-web-api': { main: 'index.js', defaultExtension: 'js' },
        '@angular/common'           : {  defaultExtension: 'js' },
        '@angular/compiler'         : { defaultExtension: 'js' },
        '@angular/core'             : { defaultExtension: 'js' },
        '@angular/http'             : { defaultExtension: 'js' },
        '@angular/platform-browser' : { defaultExtension: 'js' },
        '@angular/platform-browser-dynamic': { defaultExtension: 'js' },
        '@angular/router'           : { defaultExtension: 'js' }
    };

    var config = {
        map: map,
        packages: packages
    }

    if (global.filterSystemConfig) { global.filterSystemConfig(config); }

    System.config(config);

})(this);