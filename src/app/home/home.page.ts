import { routes } from './../app.routes';
import { UserService } from './../services/user/user.service';
// import { categories } from './../data/categories';
// import { FormsModule } from '@angular/forms';
// import { categories } from '../data/categories';
// import { events } from '../data/events';
import { Icategory } from '../interfaces/category.interface';
import { Ievent } from '../interfaces/event.interface';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonicSlides,
  IonContent,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { EventService } from '../services/event/event.service';
import { CategoryService } from '../services/category/category.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonContent, CommonModule, RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePage implements OnInit {
  swiperModule = [IonicSlides];
  upcomingEvents: Ievent[] = [];
  currentEvents: Ievent[] = [];
  categories: Icategory[] = [];
  constructor(
    private evenService: EventService,
    private categoryService: CategoryService,
    private userService: UserService
  ) {}
  router = inject(Router);
  isLogged=signal<boolean>(false);
  loggedUserData: any;
  ngOnInit(): void {
   
  }
  ionViewWillEnter() {
    this.getEvents();
    this.getCategories();
    this.getLoggedUser();
  }

  getEvents() {
    this.evenService.getEvents().subscribe({
      next: (events) => {
        // this.currentEvents = events.filter(event => new Date(event.date) >= new Date());
        this.currentEvents = events;
        this.upcomingEvents = events;
      },
      error: (error) => console.error('Error:', error),
    });
  }

  getCategories() {
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => console.error('Error:', error),
    });
  }

  getLoggedUser() {
    this.userService.getLoggedUser().subscribe({
      next: (response) => {
        // console.log('User is authenticated:', response);
        this.loggedUserData = response.user;
        console.log('User :',this.loggedUserData);
        this.isLogged.set(true)
      },
      error: () => {
        console.log('User is not authenticated, redirecting to login...');
        this.isLogged.set(false)
        // this.router.navigate(['/login']);
      },
    });
  }
  profile() {
    if(this.isLogged()){
      this.router.navigateByUrl('/profile');
    }else{
      this.router.navigateByUrl('/login');
    }
  }
}
