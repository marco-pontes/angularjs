import {ExceptionHandler} from "@angular/core";
import {Http} from "@angular/http";
import {Headers} from "@angular/http";
import {RequestOptions} from "@angular/http";
import {Response} from "@angular/http";
import {Inject} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";

class _ArrayLogger {
    res: any[] = [];
    log(s: any): void { this.res.push(s); }
    logError(s: any): void { this.res.push(s); }
    logGroup(s: any): void { this.res.push(s); }
    logGroupEnd(){};
}

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
export class HttpExceptionHandler extends ExceptionHandler {
    private _loggingResourceUrl = 'logs';
    private _errorStream = new Subject();
    constructor(@Inject(Http) private _http) {
        super(new _ArrayLogger(), true);
        this._errorStream
            .distinctUntilChanged()
            .flatMap(this.sendToServer )
            .subscribe(
                function handleValue( value ) {
                    // Nothing to do here, but WE DO NEED TO SUBSCRIBE to
                    // the stream in order for the event emitter to pass its
                    // values downstream to the HTTP flat-mapper.
                    console.debug( "Error logging success.", value );
                },
                function handleError( error ) {
                    console.debug( "Error logging error.", error );
                }
            );

    }

    static exceptionToString(exception: any, stackTrace: any = null, reason: string = null): string {
        let l = new _ArrayLogger();
        var e = new ExceptionHandler(l, false);
        e.call(exception, stackTrace, reason);
        let navigatorCopy : any = {};
        let navProps : any = ['appCodeName', 'appName', 'appVersion', 'battery', 'buildID', 'cookieEnabled',
            'doNotTrack', 'geolocation', 'language', 'languages', 'mediaDevices', 'mimeTypes', 'mozApps',
            'mozContacts', 'mozPay', 'onLine', 'oscpu', 'platform', 'plugins', 'product', 'productSub',
            'serviceWorker', 'userAgent', 'vendor', 'vendorSub'];
        for (var i = 0; i < navProps.length ; i ++){
            let currentProp = navProps[i];
            navigatorCopy[currentProp] = navigator[currentProp]
        }
        let log : any = {};
        log.exception = l.res[0];
        log.stackTrace = l.res[1] + stackTrace;
        log.reason = reason;
        log.navigator = JSON.stringify(navigatorCopy);
        log.time = new Date().getTime();
        let body = JSON.stringify(log);
        return body;
    }

    private sendToServer  = (body : string)  => {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post(this._loggingResourceUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    call(exception: any, stackTrace: any = null, reason: string = null): void {
        var body = HttpExceptionHandler.exceptionToString( exception, stackTrace, reason );
        this._errorStream.next(body);
        super.call(exception, stackTrace, reason);
    }

    protected extractData(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();
        return body || { };
    }

    protected handleError (error: any) {
        // In a real world app, we might send the error to remote logging infrastructure
        let errMsg = error.message || 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

}
