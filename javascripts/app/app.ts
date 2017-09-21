///<reference path="../../node_modules/angular2-in-memory-web-api/typings/browser.d.ts"/>
import {Component} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, ComponentInstruction, OnActivate} from '@angular/router-deprecated';
import {Core} from './core/core';
import {ErrorPage} from './error/error';
import {LoginPage} from './login/login';
declare var jQuery: any;

@Component({
  selector: 'body',
  directives: [ROUTER_DIRECTIVES],
  templateUrl: '/static/views/app.html',
  providers: [ROUTER_PROVIDERS]
})
@RouteConfig([
  { path: '/app/...', component: Core, name: 'App'},
  { path: '/error', component: ErrorPage, name: 'ErrorPage' },
  { path: '/login', component: LoginPage, name: 'LoginPage', useAsDefault: true}
])
export class App implements OnActivate {

  routerOnActivate(next: ComponentInstruction, prev: ComponentInstruction) {
    console.log(`Finished navigating from "${prev ? prev.urlPath : 'null'}" to "${next.urlPath}"`);
  }
}
