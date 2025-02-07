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
  // IonToggle,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { EventService } from '../services/event/event.service';
import { CategoryService } from '../services/category/category.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderService } from '../services/loader/loader.service';
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
    // IonToggle,
    // IonMenu,
    // IonMenuButton,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePage implements OnInit {
  paletteToggle = false;

  swiperModule = [IonicSlides];
  // upcomingEvents: Ievent[] = [];
  currentEvents: Ievent[] = [];
  categories: Icategory[] = [];
  cityList: string[] = [];
  // today: string = new Date().toISOString();
  // minDate: string = this.today;
  // filterForm: FormGroup;
  // selectedCity: string = 'Pune';
  // selectedPriceRange: number = 1000;
  // selectedDate: string = this.today;
  // searchForm: FormGroup;
  filteredEvents: Ievent[] = [];
  searchQuery: string = '';
  selectedCategoryId: string = '';
  router = inject(Router);
  isLogged = signal<boolean>(false);
  loggedUserData: any;

  filter: any = {
    selectedCity: 'Pune',
    selectedCategoryId: '',
  };

  constructor(
    private eventService: EventService,
    private categoryService: CategoryService,
    private userService: UserService,
    private loaderService: LoaderService
  ) {
    // this.searchForm = new FormGroup({
    // searchQuery: new FormControl(''), // Default empty search query
    // });
    // this.filterForm = new FormGroup({
    // selectedCity: new FormControl(this.selectedCity),
    // selectedPriceRange: new FormControl(this.selectedPriceRange),
    // selectedDate: new FormControl(this.today),
    // });
  }

  ngOnInit(): void {
    this.fetchEvents();
    this.getEvents();
    this.getCategories();
  }
  // ngOnInit() {
  //   // Use matchMedia to check the user preference
  //   const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  //   // Initialize the dark palette based on the initial
  //   // value of the prefers-color-scheme media query
  //   this.initializeDarkPalette(prefersDark.matches);

  //   // Listen for changes to the prefers-color-scheme media query
  //   prefersDark.addEventListener('change', (mediaQuery) => this.initializeDarkPalette(mediaQuery.matches));
  // }

  // // Check/uncheck the toggle and update the palette based on isDark
  // initializeDarkPalette(isDark: boolean) {
  //   this.paletteToggle = isDark;
  //   this.toggleDarkPalette(isDark);
  // }

  // // Listen for the toggle check/uncheck to toggle the dark palette
  // toggleChange(event: CustomEvent) {
  //   this.toggleDarkPalette(event.detail.checked);
  // }

  // // Add or remove the "ion-palette-dark" class on the html element
  // toggleDarkPalette(shouldAdd: boolean) {
  //   document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);
  // }

  ionViewWillEnter() {
    // this.getEventsByCity(this.selectedCity);
    // this.fetchEvents();
    // this.getEvents();
    // this.getCategories();
    this.getLoggedUser();
  }

  updateCity(value: string) {
    this.filter.selectedCity = value;
    // this.filterForm.get('selectedCity')?.setValue(value);
    // this.getEventsByCity(this.selectedCity);
    this.fetchEvents();
  }
  // pinFormatter(value: number) {
  //   return `${value}`;
  // }
  // updatePriceRange(event: CustomEvent) {
  //   this.selectedPriceRange = event.detail.value;
  //   this.filterForm.get('selectedPriceRange')?.setValue(event.detail.value);

  // }

  // updateDate(event: any) {
  //   this.selectedDate = event.detail.value;
  //   this.filterForm.get('selectedDate')?.setValue(event.detail.value);
  // }

  // applyFilters() {
  //   console.log('Applied Filters:', this.filterForm.value);
  //   this.menuController.close();
  // }
  getEvents() {
    this.selectedCategoryId = '';
    this.eventService.getEvents().subscribe({
      next: (events) => {
        // this.currentEvents = events;
        // this.upcomingEvents = events;
        this.cityList = [
          ...new Set(events.map((event) => event.location.city)),
        ].sort();
      },
      error: (error) => console.error('Error:', error.error.message),
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

  getEventsByCategoryId(category?: any) {
    this.filter.selectedCategoryId = category ? category._id : '';
    // console.log(this.selectedCategoryId);
    this.fetchEvents();
  }
  getAllEventsByCityOnly() {
    this.filter.selectedCategoryId = '';
    this.fetchEvents();
  }

  fetchEvents() {
    this.loaderService.showLoading();
    this.eventService.getFilteredEvents(this.filter).subscribe({
      next: (res: any) => {
        this.currentEvents = res.events;
        // this.upcomingEvents = res.events;
        // console.log(this.currentEvents);
        this.loaderService.hideLoading();
      },
      error: (error) => {
        console.error('Error:', error.error.message), this.loaderService.hideLoading();
      },
    });
  }
}
