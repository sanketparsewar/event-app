import { Component, OnInit, ViewChild } from '@angular/core';
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
  IonImg,
  IonButtons,
  IonModal,
  IonBadge,
} from '@ionic/angular/standalone';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EventService } from 'src/app/services/event/event.service';
import { Ievent } from 'src/app/interfaces/event.interface';
import { ShowsComponent } from 'src/app/components/shows/shows.component';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
  standalone: true,
  imports: [ShowsComponent,
   
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
  // presentingElement!: HTMLElement | null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private eventService: EventService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.eventId = params['id'];
        this.getEventById();
      }
    });

    // this.presentingElement = document.querySelector('.ion-page');
  }

  getEventById() {
    this.eventService.getEventById(this.eventId).subscribe({
      next: (res: Ievent) => {
        this.event = res; // Assigning response to event
        console.log(this.event);
      },
      error: (error) => {
        console.error('Error:', error); // Log error if request fails
      },
    });
  }

  // getRemainingTime(show: any): string {
  //   const showDate = new Date(show.date);
  //   const [hours, minutes, period] = show.time.match(/(\d+):(\d+)\s?(AM|PM)/i)!.slice(1);

  //   // Convert to 24-hour format
  //   let hour = parseInt(hours, 10);
  //   if (period.toUpperCase() === 'PM' && hour !== 12) {
  //     hour += 12;
  //   } else if (period.toUpperCase() === 'AM' && hour === 12) {
  //     hour = 0;
  //   }

  //   // Set the time for the show
  //   showDate.setHours(hour, parseInt(minutes, 10), 0, 0);

  //   const now = new Date();
  //   const diffInMs = showDate.getTime() - now.getTime();

  //   if (diffInMs <= 0) {
  //     return 'Show started';
  //   }

  //   // Calculate days, hours, and minutes
  //   const daysRemaining = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  //   const hoursRemaining = Math.floor((diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  //   const minutesRemaining = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));

  //   // Construct the remaining time string
  //   let timeString = '';
  //   if (daysRemaining > 0) {
  //     timeString += `${daysRemaining}d `;
  //   }
  //   if (hoursRemaining > 0 || daysRemaining > 0) {
  //     timeString += `${hoursRemaining}h `;
  //   }
  //   timeString += `${minutesRemaining}m remaining`;

  //   return timeString.trim();
  // }

  // bookTickets(item: any) {
  //   console.log(item)
  // }
}
