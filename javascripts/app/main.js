"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../../typings/browser/ambient/jquery/index.d.ts" />
var core_1 = require('@angular/core');
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var router_deprecated_1 = require('@angular/router-deprecated');
var app_1 = require('./app');
var config_1 = require('./core/config');
var http_1 = require("@angular/http");
var core_2 = require("@angular/core");
var http_exception_handler_1 = require("./core/http-exception-handler");
var ENV_PROVIDERS = [];
//ENV_PROVIDERS.push(ELEMENT_PROBE_PROVIDERS);
var CustomRequestOptions = (function (_super) {
    __extends(CustomRequestOptions, _super);
    function CustomRequestOptions() {
        _super.call(this);
        if (this.headers) {
            this.headers.append('X-XSRF-TOKEN', this.getCookie('XSRF-TOKEN'));
        }
        else {
            this.headers = new http_1.Headers({ 'X-XSRF-TOKEN': this.getCookie('XSRF-TOKEN') });
        }
    }
    CustomRequestOptions.prototype.merge = function (options) {
        var result = new CustomRequestOptions(_super.prototype.merge.call(this, options));
        //result.url = 'http://localhost:8080/api/' + options.url;
        result.url = options.url;
        return result;
    };
    CustomRequestOptions.prototype.getCookie = function (name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2)
            return parts.pop().split(";").shift();
    };
    return CustomRequestOptions;
}(http_1.BaseRequestOptions));
exports.CustomRequestOptions = CustomRequestOptions;
platform_browser_dynamic_1.bootstrap(app_1.App, [config_1.ConfigService, ENV_PROVIDERS, http_1.HTTP_PROVIDERS, router_deprecated_1.ROUTER_PROVIDERS,
    core_1.provide(core_2.ExceptionHandler, { useClass: http_exception_handler_1.HttpExceptionHandler })])
    .catch(function (err) { return console.error(err); });
