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
  IonImg,
  IonButtons,
  IonModal,
} from '@ionic/angular/standalone';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EventService } from 'src/app/services/event/event.service';
import { Ievent } from 'src/app/interfaces/event.interface';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
  standalone: true,
  imports: [
    IonModal,
    IonButtons,
    IonImg,
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
  // show: any;
  router = inject(Router);
  constructor(
    private activatedRoute: ActivatedRoute,
    private eventService: EventService
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
        console.log(this.event);
      },
      error: (error) => {
        console.error('Error:', error); // Log error if request fails
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
    // this.show = await item;
    console.log(item);
    this.router.navigate(['/my-booking'], {
      state: { showData: item }, // Sending data as state
    });
   this.closeModal()
  }
}
