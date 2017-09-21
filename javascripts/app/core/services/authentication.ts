import {Injectable, Inject} from '@angular/core';
import {Headers, RequestOptions, Http, Response, RequestOptionsArgs} from "@angular/http";
import '../../../../node_modules/rxjs/Rx';


@Injectable()
export class AuthenticationService {
    private _authCtrlUrl = 'login';

    constructor (private http: Http) {
    }

    public login(data: any) : Promise<any> {
        var creds = "username=" + data.username + "&password=" + data.password;
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post('/api/login', creds, options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    logoff() : Promise<any> {
        return this.http.get('/logoff')
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
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
        return Promise.reject(errMsg);
    }

}