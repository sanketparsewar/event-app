import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonList,
  IonButton,
  IonButtons,
  IonLabel,IonText,IonAvatar,
  IonModal,IonImg
} from '@ionic/angular/standalone';
import { BookingService } from 'src/app/services/booking/booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
  imports: [IonText,IonImg,
    IonContent,
    IonLabel,IonAvatar,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonList,
    IonButton,
    IonButtons,
    IonModal,
    FormsModule,
    CommonModule,
  ],
})
export class BookingComponent implements OnInit {
  @Input() show: any;
  bookingData: any = {
    name: '',
    email: '',
    phone: '',
    tickets: 1,
    showId: '',
  };
  constructor(private bookingService: BookingService, private router: Router) {}
  ngOnInit() {}

  bookTickets(modal: any) {
    console.log(this.bookingData);
    this.bookingData.showId = this.show._id;
    this.bookingService.bookTicket(this.bookingData).subscribe({
      next: async (res: any) => {
        console.log('Booking successful:', res);
        this.bookingData = {
          name: '',
          email: '',
          phone: '',
          tickets: 1,
          showId: '',
        };
        await modal.dismiss();
      },
      error: (error: any) => console.error('Error:', error),
    });
  }
}
