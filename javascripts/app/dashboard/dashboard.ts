import {Component} from '@angular/core';
import {Widget} from '../core/widget/widget';

@Component({
  selector: 'dashboard',
  templateUrl: '/static/views/dashboard/dashboard.html',
  directives: [Widget]
})

export class Dashboard {
}
