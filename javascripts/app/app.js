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
///<reference path="../../node_modules/angular2-in-memory-web-api/typings/browser.d.ts"/>
var core_1 = require('@angular/core');
var router_deprecated_1 = require('@angular/router-deprecated');
var core_2 = require('./core/core');
var error_1 = require('./error/error');
var login_1 = require('./login/login');
var App = (function () {
    function App() {
    }
    App.prototype.routerOnActivate = function (next, prev) {
        console.log("Finished navigating from \"" + (prev ? prev.urlPath : 'null') + "\" to \"" + next.urlPath + "\"");
    };
    App = __decorate([
        core_1.Component({
            selector: 'body',
            directives: [router_deprecated_1.ROUTER_DIRECTIVES],
            templateUrl: '/static/views/app.html',
            providers: [router_deprecated_1.ROUTER_PROVIDERS]
        }),
        router_deprecated_1.RouteConfig([
            { path: '/app/...', component: core_2.Core, name: 'App' },
            { path: '/error', component: error_1.ErrorPage, name: 'ErrorPage' },
            { path: '/login', component: login_1.LoginPage, name: 'LoginPage', useAsDefault: true }
        ]), 
        __metadata('design:paramtypes', [])
    ], App);
    return App;
}());
exports.App = App;
