import {Component, EventEmitter, OnInit, ElementRef} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router-deprecated';
import {ConfigService} from '../config';
import {Notifications} from '../notifications/notifications';
import {AuthenticationService} from "../services/authentication";
declare var jQuery: any;

@Component({
  selector: '[navbar]',
  events: ['toggleSidebarEvent', 'toggleChatEvent'],
  directives: [Notifications, ROUTER_DIRECTIVES],
  templateUrl: '/static/views/core/navbar/navbar.html',
  providers: [AuthenticationService]
})
export class Navbar implements OnInit {
  toggleSidebarEvent: EventEmitter<any> = new EventEmitter();
  toggleChatEvent: EventEmitter<any> = new EventEmitter();
  $el: any;
  config: any;
    hasErrors : boolean;
    message : string;

  constructor(el: ElementRef, config: ConfigService,
              private _authenticationService : AuthenticationService,
              private _router : Router) {
    this.$el = jQuery(el.nativeElement);
    this.config = config.getConfig();
  }

  toggleSidebar(state): void {
    this.toggleSidebarEvent.emit(state);
  }

  toggleChat(): void {
    this.toggleChatEvent.emit(null);
  }

  ngOnInit(): void {
    // demo-only code. remove in production
    setTimeout(() => {
      let $chatNotification = jQuery('#chat-notification');
      $chatNotification.removeClass('hide').addClass('animated fadeIn')
        .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', () => {
          $chatNotification.removeClass('animated fadeIn');
          setTimeout(() => {
            $chatNotification.addClass('animated fadeOut')
              .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd' +
                ' oanimationend animationend', () => {
                $chatNotification.addClass('hide');
              });
          }, 8000);
        });
      $chatNotification.siblings('#toggle-chat')
        .append('<i class="chat-notification-sing animated bounceIn"></i>');
    }, 4000);

    this.$el.find('.input-group-addon + .form-control').on('blur focus', function(e): void {
      jQuery(this).parents('.input-group')
        [e.type === 'focus' ? 'addClass' : 'removeClass']('focus');
    });
  }

  public logoff () : void {
      this._authenticationService.logoff().then(data =>  {
        this._router.navigate(['/LoginPage']);
      }, data => {
        this.hasErrors = true;
        this.message = "Não foi possível deslogar";
      });
  }
}
