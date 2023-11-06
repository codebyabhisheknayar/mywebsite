import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('animatedElement', { static: true }) animatedElement!: ElementRef;
  testimonial: any;
  // private owl: any;

  constructor() {
    this.testimonial = {
      items: 1,
      margin: 30,
      stagePadding: 0,
      smartSpeed: 450,
      autoHeight: true,
      loop: false,
      nav: false,
      dots: false,
    }
  }
  ngOnInit(): void {
    gsap.registerPlugin(ScrollTrigger);

    const defaults = {
      duration: 1.2,
      ease: 'power4.out',
      animation: 'fade_from_bottom',
    };

    gsap.utils.toArray<HTMLElement>('.scroll-animation').forEach((box: HTMLElement) => {
      const gsapObj: any = {};
      const settings = {
        duration: box.getAttribute('data-animation-duration') || defaults.duration,
      };

      const animations: { [key: string]: any } = {
        fade_from_bottom: {
          y: 180,
          opacity: 0,
        },
        fade_from_top: {
          y: -180,
          opacity: 0,
        },
        fade_from_left: {
          x: -180,
          opacity: 0,
        },
        fade_from_right: {
          x: 180,
          opacity: 0,
        },
        fade_in: {
          opacity: 0,
        },
        rotate_up: {
          y: 180,
          rotation: 10,
          opacity: 0,
        },
        // Add more animation definitions here
      };

      const scrollTriggerOptions = {
        scrollTrigger: {
          trigger: box,
          start: 'top bottom+=20%',
          toggleActions: 'play none none reverse',
          markers: false,
        },
      };

      Object.assign(gsapObj, settings);
      Object.assign(gsapObj, animations[box.getAttribute('data-animation') || defaults.animation]);
      Object.assign(gsapObj, scrollTriggerOptions);

      gsap.from(box, gsapObj);
    });
  }

  }


