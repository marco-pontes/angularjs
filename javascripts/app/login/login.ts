import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router-deprecated';
import {AuthenticationService} from "../core/services/authentication";

@Component({
  directives: [
    ROUTER_DIRECTIVES,
  ],
    providers: [AuthenticationService],
  selector: '[login]',
  host: {
    class: 'login-page app'
  },
  templateUrl: '/static/views/login/login.html'
})
export class LoginPage {
    authInfo = {};
    hasErrors = false;
    message = '';
    pending = false;

    constructor(private _authenticationService : AuthenticationService, private _router : Router){
        //if (angular.isDefined($localStorage.state)) {
        //    ctrl.app.state = $localStorage.state;
        //} else {
        //    $localStorage.state = ctrl.app.state;
        //}
    }
    public login () {
        this.pending = true;
        this.hasErrors = false;
        this._authenticationService.login(this.authInfo).then(data =>  {
            this.hasErrors = false;
            this._router.navigate(['/App', 'Dashboard']);
            this.message = data.message;
            this.pending = false;
        }, data => {
            this.hasErrors = true;
            this.message = "Informações de login e senha inválidas";
            this.pending = false;
        });

    }
    public logout (log) {
        this._authenticationService.logout(this.authInfo).then(logoutSuccess, logoutError);
        function logoutSuccess(data){
            //angular.forEach($cookies, function (v, k) {
            //    delete $cookies[k];
            //});
            //$location.path("/")
            //$window.location.reload();
        }
        function logoutError(data){
            log.error(data.status);
        }
    }
}
