import { Component, OnInit } from '@angular/core';
import MouseFollower from "mouse-follower";
import gsap from "gsap";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  showLoader = true;
  onToggleSideNav: boolean = false;

  constructor() {
    MouseFollower.registerGSAP(gsap);
    const cursor = new MouseFollower({
      speed: 0.8
    });
  }

  ngOnInit() {
    setTimeout(() => {
      this.showLoader = false;
    }, 3000);
  }

  onToggle() {
    this.onToggleSideNav = !this.onToggleSideNav;
  }
  onToggleSideNavF(){
    this.onToggleSideNav = !this.onToggleSideNav;
  }
}
