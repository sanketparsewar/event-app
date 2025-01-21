// import { categories } from './../data/categories';
import { FormsModule } from '@angular/forms';
import { categories } from '../data/categories';
import { events } from '../data/events';
import { Icategory } from '../interfaces/category.interface';
import { Ievent } from '../interfaces/event.interface';
// import { events } from './../data/events';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonicSlides, IonContent } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonContent,CommonModule ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage implements OnInit{
  swiperModule=[IonicSlides];
  upcomingEvents:Ievent[] =[];
  currentEvents:Ievent[] =[];
  categories:Icategory[]=[]
  constructor() {}
  ngOnInit(): void {
    this.currentEvents=[...events]
    this.upcomingEvents=[...events]
    this.categories=[...categories]
  }
}
