"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var http_2 = require("@angular/http");
var http_3 = require("@angular/http");
var core_2 = require("@angular/core");
var Subject_1 = require("rxjs/Subject");
var Observable_1 = require("rxjs/Observable");
var _ArrayLogger = (function () {
    function _ArrayLogger() {
        this.res = [];
    }
    _ArrayLogger.prototype.log = function (s) { this.res.push(s); };
    _ArrayLogger.prototype.logError = function (s) { this.res.push(s); };
    _ArrayLogger.prototype.logGroup = function (s) { this.res.push(s); };
    _ArrayLogger.prototype.logGroupEnd = function () { };
    ;
    return _ArrayLogger;
}());
/**
 * Provides a hook for centralized exception handling.
 *
 * The default implementation of `ExceptionHandler` prints error messages to the `Console`. To
 * intercept error handling,
 * write a custom exception handler that replaces this default as appropriate for your app.
 *
 * ### Example
 *
 * ```javascript
 *
 * class MyExceptionHandler implements ExceptionHandler {
 *   call(error, stackTrace = null, reason = null) {
 *     // do something with the exception
 *   }
 * }
 *
 * bootstrap(MyApp, [provide(ExceptionHandler, {useClass: MyExceptionHandler})])
 *
 * ```
 */
var HttpExceptionHandler = (function (_super) {
    __extends(HttpExceptionHandler, _super);
    function HttpExceptionHandler(_http) {
        var _this = this;
        _super.call(this, new _ArrayLogger(), true);
        this._http = _http;
        this._loggingResourceUrl = 'logs';
        this._errorStream = new Subject_1.Subject();
        this.sendToServer = function (body) {
            var headers = new http_2.Headers({ 'Content-Type': 'application/json' });
            var options = new http_3.RequestOptions({ headers: headers });
            return _this._http.post(_this._loggingResourceUrl, body, options)
                .map(_this.extractData)
                .catch(_this.handleError);
        };
        this._errorStream
            .distinctUntilChanged()
            .flatMap(this.sendToServer)
            .subscribe(function handleValue(value) {
            // Nothing to do here, but WE DO NEED TO SUBSCRIBE to
            // the stream in order for the event emitter to pass its
            // values downstream to the HTTP flat-mapper.
            console.debug("Error logging success.", value);
        }, function handleError(error) {
            console.debug("Error logging error.", error);
        });
    }
    HttpExceptionHandler.exceptionToString = function (exception, stackTrace, reason) {
        if (stackTrace === void 0) { stackTrace = null; }
        if (reason === void 0) { reason = null; }
        var l = new _ArrayLogger();
        var e = new core_1.ExceptionHandler(l, false);
        e.call(exception, stackTrace, reason);
        var navigatorCopy = {};
        var navProps = ['appCodeName', 'appName', 'appVersion', 'battery', 'buildID', 'cookieEnabled',
            'doNotTrack', 'geolocation', 'language', 'languages', 'mediaDevices', 'mimeTypes', 'mozApps',
            'mozContacts', 'mozPay', 'onLine', 'oscpu', 'platform', 'plugins', 'product', 'productSub',
            'serviceWorker', 'userAgent', 'vendor', 'vendorSub'];
        for (var i = 0; i < navProps.length; i++) {
            var currentProp = navProps[i];
            navigatorCopy[currentProp] = navigator[currentProp];
        }
        var log = {};
        log.exception = l.res[0];
        log.stackTrace = l.res[1] + stackTrace;
        log.reason = reason;
        log.navigator = JSON.stringify(navigatorCopy);
        log.time = new Date().getTime();
        var body = JSON.stringify(log);
        return body;
    };
    HttpExceptionHandler.prototype.call = function (exception, stackTrace, reason) {
        if (stackTrace === void 0) { stackTrace = null; }
        if (reason === void 0) { reason = null; }
        var body = HttpExceptionHandler.exceptionToString(exception, stackTrace, reason);
        this._errorStream.next(body);
        _super.prototype.call.call(this, exception, stackTrace, reason);
    };
    HttpExceptionHandler.prototype.extractData = function (res) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        var body = res.json();
        return body || {};
    };
    HttpExceptionHandler.prototype.handleError = function (error) {
        // In a real world app, we might send the error to remote logging infrastructure
        var errMsg = error.message || 'Server error';
        console.error(errMsg); // log to console instead
        return Observable_1.Observable.throw(errMsg);
    };
    HttpExceptionHandler = __decorate([
        __param(0, core_2.Inject(http_1.Http)), 
        __metadata('design:paramtypes', [Object])
    ], HttpExceptionHandler);
    return HttpExceptionHandler;
}(core_1.ExceptionHandler));
exports.HttpExceptionHandler = HttpExceptionHandler;
