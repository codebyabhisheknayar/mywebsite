import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EmailService } from 'src/app/services/email.service';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Lightbox, IAlbum } from 'ngx-lightbox';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('fadeOut', [
      state('visible', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('visible => hidden', animate('300ms')),
    ]),
  ],
})
export class HomeComponent implements OnInit {
  @ViewChild('animatedElement', { static: true }) animatedElement!: ElementRef;
  testimonial: any;
  emailForm: FormGroup;
  isSubmitted: boolean = false;
  showFailAlert: boolean = false;
  showSuccessAlert: boolean = false;
  fadeOutState: 'visible' | 'hidden' = 'visible';
  isMenuOpen: boolean = false;
  year = new Date().getFullYear();
  private _album: IAlbum[] = [];

  constructor(private emailService: EmailService, private fb: FormBuilder, private el: ElementRef, private lightbox: Lightbox) {
    this.emailForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
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
    this._album.push(
      {
        src: './assets/images/portfolio1.jpg',
        caption: 'Rock the Tok - TikTok Content',
        thumb: './assets/images/portfolio1.jpg'
      },
      {
        src: './assets/images/portfolio2.jpg',
        caption: 'Theron Solutions',
        thumb: './assets/images/portfolio2.jpg'
      },
      {
        src: './assets/images/portfolio3.jpg',
        caption: 'Herramientas Legales',
        thumb: './assets/images/portfolio3.jpg'
      },
      {
        src: './assets/images/portfolio4.jpg',
        caption: 'TrackNAB - School Bus Tracking System',
        thumb: './assets/images/portfolio4.jpg'
      }, {
      src: './assets/images/portfolio5.jpg',
        caption: 'Funtura - Lulu Mall',
        thumb: './assets/images/portfolio5.jpg'
    }
    );
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
  openLightbox(index: number): void {
    // open lightbox at the specified index
    this.lightbox.open(this.images, index);
  }
  get images(): IAlbum[] {
    return this._album;
  }

  toggleClass() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  submitForm(formDirective: FormGroupDirective) {
    if (this.emailForm.valid) {
      this.isSubmitted = false;
      const formData = this.emailForm.value;
      this.emailService.sendEmail(formData).subscribe(
        (response) => {
          this.isSubmitted = false;
          this.emailForm.reset();
          formDirective.resetForm();
          this.showSuccessAlert = true;
          setTimeout(() => {
            this.fadeOutState = 'hidden';
            setTimeout(() => {
              this.closeSuccessAlert();
            }, 300);
          }, 3000);
        },
        (error) => {
          this.isSubmitted = false;
          if (error) {
            this.showFailAlert = true;
            setTimeout(() => {
              this.fadeOutState = 'hidden';
              setTimeout(() => {
                this.closeFailAlert();
              }, 300);
            }, 3000);
          }
        }
      );
    } else {
      const invalidControl = this.el.nativeElement.querySelector('.ng-invalid:not(form):not(div):not(mat-form-field)');
      if (invalidControl) {
        invalidControl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => {
          invalidControl.focus();
        }, 800);
      }
    }
  }
  closeSuccessAlert() {
    this.showSuccessAlert = false;
    this.isSubmitted = false;
    this.fadeOutState = 'visible';
  }

  closeFailAlert() {
    this.showFailAlert = false;
    this.fadeOutState = 'visible';
  }

  }


