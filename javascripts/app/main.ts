///<reference path="../../typings/browser/ambient/jquery/index.d.ts" />
import {provide, enableProdMode} from '@angular/core';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {ELEMENT_PROBE_PROVIDERS} from '@angular/platform-browser';
import {ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {App} from './app';
import {ConfigService} from './core/config';
import {HTTP_PROVIDERS, RequestOptions,BaseRequestOptions, RequestOptionsArgs, Headers} from "@angular/http";
import {ExceptionHandler} from "@angular/core";
import {HttpExceptionHandler} from "./core/http-exception-handler";

const ENV_PROVIDERS = [];

//ENV_PROVIDERS.push(ELEMENT_PROBE_PROVIDERS);

export class CustomRequestOptions extends BaseRequestOptions {

    constructor() {
        super();
        if(this.headers){
            this.headers.append('X-XSRF-TOKEN', this.getCookie('XSRF-TOKEN'));
        } else {
            this.headers = new Headers({'X-XSRF-TOKEN' : this.getCookie('XSRF-TOKEN')});
        }
    }

    merge(options?:RequestOptionsArgs):RequestOptions {
        let result = new CustomRequestOptions(super.merge(options));
        //result.url = 'http://localhost:8080/api/' + options.url;
        result.url = options.url;
        return result;
    }

    getCookie(name) {
        let value = "; " + document.cookie;
        let parts = value.split("; " + name + "=");
        if (parts.length == 2)
            return parts.pop().split(";").shift();
    }
}


bootstrap(App, [ConfigService, ENV_PROVIDERS, HTTP_PROVIDERS, ROUTER_PROVIDERS,
    provide(ExceptionHandler, { useClass: HttpExceptionHandler })])
  .catch(err => console.error(err));
