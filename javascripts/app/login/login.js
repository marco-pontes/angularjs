"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_deprecated_1 = require('@angular/router-deprecated');
var authentication_1 = require("../core/services/authentication");
var LoginPage = (function () {
    function LoginPage(_authenticationService, _router) {
        this._authenticationService = _authenticationService;
        this._router = _router;
        this.authInfo = {};
        this.hasErrors = false;
        this.message = '';
        this.pending = false;
        //if (angular.isDefined($localStorage.state)) {
        //    ctrl.app.state = $localStorage.state;
        //} else {
        //    $localStorage.state = ctrl.app.state;
        //}
    }
    LoginPage.prototype.login = function () {
        var _this = this;
        this.pending = true;
        this.hasErrors = false;
        this._authenticationService.login(this.authInfo).then(function (data) {
            _this.hasErrors = false;
            _this._router.navigate(['/App', 'Dashboard']);
            _this.message = data.message;
            _this.pending = false;
        }, function (data) {
            _this.hasErrors = true;
            _this.message = "Informações de login e senha inválidas";
            _this.pending = false;
        });
    };
    LoginPage.prototype.logout = function (log) {
        this._authenticationService.logout(this.authInfo).then(logoutSuccess, logoutError);
        function logoutSuccess(data) {
            //angular.forEach($cookies, function (v, k) {
            //    delete $cookies[k];
            //});
            //$location.path("/")
            //$window.location.reload();
        }
        function logoutError(data) {
            log.error(data.status);
        }
    };
    LoginPage = __decorate([
        core_1.Component({
            directives: [
                router_deprecated_1.ROUTER_DIRECTIVES,
            ],
            providers: [authentication_1.AuthenticationService],
            selector: '[login]',
            host: {
                class: 'login-page app'
            },
            templateUrl: '/static/views/login/login.html'
        }), 
        __metadata('design:paramtypes', [authentication_1.AuthenticationService, router_deprecated_1.Router])
    ], LoginPage);
    return LoginPage;
}());
exports.LoginPage = LoginPage;
