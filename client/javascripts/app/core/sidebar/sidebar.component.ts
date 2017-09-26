import {Component, OnInit, ElementRef} from '@angular/core';
import {Location} from '@angular/common';
declare var jQuery: any;

@Component({
  selector: '[sidebar]',
  templateUrl: '/static/views/core/sidebar/sidebar.html'
})

export class SidebarComponent implements OnInit {
  $el: any;
  config: any;
  location: Location;

  constructor(el: ElementRef, location: Location) {
    this.$el = jQuery(el.nativeElement);
    this.location = location;
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
  }
}
