import {Component, ElementRef} from '@angular/core';
import {ViewEncapsulation, OnInit} from '@angular/core';
import {HomeComponent} from './../home/home.component';
import {PriceComponent} from './../price/price.component';
import {ContactComponent} from './../contact/contact.component';
import { Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';


@Component({
  selector: '[app]',
  styleUrls: ['/static/stylesheets/application.css'],
  templateUrl: '/static/views/core/core.html'
})

export class AppComponent implements OnInit {
  el: ElementRef;
  router: Router;


  constructor(el: ElementRef, router: Router) {
    this.el = el;
    this.router = router;
  }

  ngOnInit(): void {
      var script = document.createElement('script');
      var pageScripts = document.getElementsByTagName('script')[1];
      script.async=true;
      script.src='static/javascripts/rd-tracking.js';
      pageScripts.parentNode.insertBefore(script, pageScripts);
      this.router.events.subscribe(
        function(event){
          if(event instanceof NavigationEnd) {
              if(window['trackVisit']){ 
                window['trackVisit'](document['clientId'], event.url);
              }
            }
          }
      )
  }
}
