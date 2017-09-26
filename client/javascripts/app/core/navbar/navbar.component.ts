import {Component, EventEmitter, OnInit, ElementRef} from '@angular/core';
declare var jQuery: any;

@Component({
  selector: '[navbar]',
  templateUrl: '/static/views/core/navbar/navbar.html'
})
export class NavbarComponent implements OnInit {
 hasErrors : boolean;
 message : string;

  constructor(el: ElementRef) {
  }

  ngOnInit(): void {
  }

  public logoff () : void {
      //this._authenticationService.logoff().then(data =>  {
        //this._router.navigate(['/LoginPage']);
      //}, data => {
        //this.hasErrors = true;
        //this.message = "Não foi possível deslogar";
     // });
  }
}
