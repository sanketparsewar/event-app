import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonLabel,
  IonItem,
  IonCol,
  IonRow,
  IonIcon,
  IonCard,
  IonList,
  IonListHeader,
  IonAvatar,
  IonText,
  IonButton,
  IonButtons,
  IonModal,
  IonImg,
} from '@ionic/angular/standalone';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EventService } from 'src/app/services/event/event.service';
import { Ievent } from 'src/app/interfaces/event.interface';
import { ShowService } from 'src/app/services/show/show.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
  standalone: true,
  imports: [
    IonImg,
    IonModal,
    IonButtons,
    IonButton,
    IonText,
    IonAvatar,
    RouterLink,
    IonListHeader,
    IonList,
    IonCard,
    IonIcon,
    IonRow,
    IonCol,
    IonItem,
    IonLabel,
    IonToolbar,
    IonTitle,
    IonHeader,
    IonContent,
    CommonModule,
    FormsModule,
  ],
})
export class EventPage implements OnInit {
  eventId: string = '';
  event: Ievent = {
    _id: 0,
    name: '',
    date: new Date(),
    image: '',
    location: '',
    headliners: [],
    performers: [],
    categoryId: '',
    description: '',
    shows: [],
    bookings: [],
  };
  showsList: any;
  router = inject(Router);
  constructor(
    private activatedRoute: ActivatedRoute,
    private eventService: EventService,
    private showService: ShowService
  ) {}
  @ViewChild('modal') modal!: IonModal;
  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.eventId = params['id'];
        this.getEventById();
       
      }
    });
  }

  getEventById() {
    this.eventService.getEventById(this.eventId).subscribe({
      next: (res: Ievent) => {
        this.event = res; // Assigning response to event
        console.log('event', res);
        this.getShowsByEvent();
      },
      error: (error) => {
        console.error('Error:', error); // Log error if request fails
      },
    });
  }
  getShowsByEvent() {
    this.showService.getShowsByEvent(this.eventId).subscribe({
      next: (shows) => {
        const currentDateTime = new Date(); // Get current date and time
  
        this.showsList = shows.filter((show) => {
          const showDateTime = new Date(show.date);
          const [time, period] = show.time.split(" "); // Splitting "9:00 PM"
          let [hours, minutes] = time.split(":").map(Number);
  
          // Convert 12-hour format to 24-hour format
          if (period === "PM" && hours !== 12) hours += 12;
          if (period === "AM" && hours === 12) hours = 0;
  
          showDateTime.setHours(hours, minutes, 0, 0); // Set time in showDateTime
  
          return showDateTime > currentDateTime; // Filter future shows
        });
  
        console.log("Filtered showsList:", this.showsList);
      },
      error: (error) => {
        console.error("Error:", error);
      },
    });
  }
  

  openModal() {
    this.modal.present();
  }

  closeModal() {
    this.modal.dismiss();
  }

  async bookTickets(item: any) {
    this.router.navigate(['/my-booking'], {
      state: { showData: item }, // Sending data as state
    });
    this.closeModal();
  }
}
