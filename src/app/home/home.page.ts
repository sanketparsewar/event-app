import { UserService } from './../services/user/user.service';
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
  IonMenu,
  IonMenuButton,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { EventService } from '../services/event/event.service';
import { CategoryService } from '../services/category/category.service';
import { MenuController } from '@ionic/angular';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    FormsModule,
    ReactiveFormsModule,
    IonContent,
    CommonModule,
    RouterLink,
    IonMenu,
    IonMenuButton,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePage implements OnInit {
  swiperModule = [IonicSlides];
  upcomingEvents: Ievent[] = [];
  currentEvents: Ievent[] = [];
  categories: Icategory[] = [];
  cityList: string[] = [];
  today: string = new Date().toISOString();
  minDate: string = this.today;
  filterForm: FormGroup;
  selectedCity: string = 'Pune';
  selectedPriceRange: number = 1000;
  selectedDate: string = this.today;
  searchForm: FormGroup;
  filteredEvents: Ievent[] = [];
  searchQuery: string = '';
  constructor(
    private evenService: EventService,
    private categoryService: CategoryService,
    private userService: UserService,
    private menuController: MenuController
  ) {
    this.searchForm = new FormGroup({
      searchQuery: new FormControl(''), // Default empty search query
    });

    this.filterForm = new FormGroup({
      selectedCity: new FormControl(this.selectedCity),
      selectedPriceRange: new FormControl(this.selectedPriceRange),
      selectedDate: new FormControl(this.today),
    });
  }
  router = inject(Router);
  isLogged = signal<boolean>(false);
  loggedUserData: any;

  ngOnInit(): void {}

  ionViewWillEnter() {
    this.getEvents();
    this.getCategories();
    this.getLoggedUser();
  }
  customPopoverOptions = {
    // header: 'Hair Color',
    // subHeader: 'Select your City',
    // message: 'Only select your dominant hair color',
  };

  updateCity(value: string) {
    this.selectedCity = value;
    this.filterForm.get('selectedCity')?.setValue(value);
  }
  pinFormatter(value: number) {
    return `${value}`;
  }
  updatePriceRange(event: CustomEvent) {
    this.selectedPriceRange = event.detail.value;
    this.filterForm.get('selectedPriceRange')?.setValue(event.detail.value);
  }
  updateDate(event: any) {
    this.selectedDate = event.detail.value;
    this.filterForm.get('selectedDate')?.setValue(event.detail.value);
  }

  applyFilters() {
    console.log('Applied Filters:', this.filterForm.value);
    this.menuController.close();
  }
  getEvents() {
    this.selectedCategoryId = '';
    this.evenService.getEvents().subscribe({
      next: (events) => {
        this.currentEvents = events;
        this.upcomingEvents = events;
        this.cityList = [
          ...new Set(this.currentEvents.map((event) => event.location.city)),
        ];
      },
      error: (error) => console.error('Error:', error),
    });
  }

  searchEvents(event: any) {
    this.searchQuery = event.detail.value.trim().toLowerCase();
    if (event.detail.value != '') {
      this.filteredEvents = this.currentEvents.filter((event) =>
        event.name.toLowerCase().includes(this.searchQuery)
      );
     
    } else {
      this.filteredEvents = [];
    }
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
        this.loggedUserData = response.user;
        this.isLogged.set(true);
      },
      error: () => {
        console.log('User is not authenticated');
        this.isLogged.set(false);
      },
    });
  }
  profile() {
    if (this.isLogged()) {
      this.router.navigateByUrl('/profile');
    } else {
      this.router.navigateByUrl('/login');
    }
  }
  selectedCategoryId: string = '';
  getEventsByCategoryId(category: any) {
    this.selectedCategoryId = category._id;
    this.evenService.getEventsByCategory(category._id).subscribe({
      next: (res: any) => {
        this.currentEvents = res.events;
      },
      error: (error) => console.error('Error:', error),
    });
  }
}
