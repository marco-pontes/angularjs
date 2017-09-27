"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const forms_1 = require("@angular/forms");
const router_1 = require("@angular/router");
const error_1 = require("./error/error");
const app_component_1 = require("./core/app.component");
const home_component_1 = require("./home/home.component");
const price_component_1 = require("./price/price.component");
const contact_component_1 = require("./contact/contact.component");
const sidebar_component_1 = require("./core/sidebar/sidebar.component");
const navbar_component_1 = require("./core/navbar/navbar.component");
const appRoutes = [
    { path: 'contact', component: contact_component_1.ContactComponent },
    { path: 'price', component: price_component_1.PriceComponent },
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'error', component: error_1.ErrorPage }
];
let AppModule = class AppModule {
};
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            router_1.RouterModule.forRoot(appRoutes, { enableTracing: false })
        ],
        declarations: [
            app_component_1.AppComponent,
            home_component_1.HomeComponent,
            price_component_1.PriceComponent,
            contact_component_1.ContactComponent,
            sidebar_component_1.SidebarComponent,
            navbar_component_1.NavbarComponent,
            error_1.ErrorPage
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
