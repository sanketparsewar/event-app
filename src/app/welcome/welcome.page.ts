import { SwiperModule } from './../../../node_modules/swiper/types/shared.d';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonicSlides,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonFooter,
  IonButton,
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonFooter,
    IonContent,
    RouterLink,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WelcomePage implements OnInit {
  constructor() {}

  ngOnInit() {}
  onboardingScreen = [
    { image: '1.jpg' },
    { image: '2.jpg' },
    { image: '3.jpg' },
  ];
  swiperModules = [IonicSlides];
}
