import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  @Input() toggleSideNav: boolean | undefined;
  @Output() toggleSideClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  toggleSideNavFlag: boolean | undefined;

  hideSidebar() {
  this.toggleSideNav = !this.toggleSideNav;
    this.toggleSideNavFlag = !this.toggleSideNavFlag;
    this.toggleSideClose.emit(this.toggleSideNavFlag);
  }
}
