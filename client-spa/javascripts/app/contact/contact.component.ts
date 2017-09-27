import {Component} from '@angular/core';
import {User} from './user';
import { Router } from '@angular/router';


@Component({
  selector: 'contact',
  templateUrl: '/static/views/contact/contact.html'
})

export class ContactComponent {
	router: Router;
	constructor(router : Router){
		this.router = router; 
	}
	user = {};
	submit(user : User) { 
		sessionStorage.setItem('e-mail', user.email);
		sessionStorage.setItem('name', user.name);
		this.router.navigate(['home']);
	}

}
