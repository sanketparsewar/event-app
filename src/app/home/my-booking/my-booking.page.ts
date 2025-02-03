import { BookingService } from 'src/app/services/booking/booking.service';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonButton,
  IonList,
  IonText,
  IonGrid,
  IonRow,
  IonCol,
  IonButtons,
  IonModal,
  IonIcon,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonCard,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-booking',
  templateUrl: './my-booking.page.html',
  styleUrls: ['./my-booking.page.scss'],
  standalone: true,
  imports: [
    IonCard,
    IonCardContent,
    IonCardTitle,
    IonCardSubtitle,
    IonCardHeader,
    IonIcon,
    IonModal,
    IonButtons,
    IonCol,
    IonRow,
    IonGrid,
    IonText,
    IonList,
    IonButton,
    IonLabel,
    IonItem,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class MyBookingPage implements OnInit {
  showData: any;
  bookingData: any = {
    name: '',
    email: '',
    phone: '',
    tickets: 1,
    showId: '',
    totalAmount: 0,
  };
  ticketDetails: any;
  constructor(private bookingService: BookingService) {}
  router = inject(Router);
  @ViewChild('modal') modal: any;
  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.showData = navigation.extras.state['showData'];
      console.log('Data passed from ShowsComponent:', this.showData);
    } else {
      console.log('No data received.');
    }
  }

  openModal() {
    if (this.modal) {
      this.modal.present();
    }
  }

  closeModal() {
    if (this.modal) {
      if(confirm('Download ticket before leaving this page?')){
        this.modal.dismiss();
        this.router.navigateByUrl(`/event/${this.showData.eventId}`);
      }
    }
  }

  bookTickets() {
    this.bookingData.showId = this.showData._id;
    this.bookingData.totalAmount =
      this.bookingData.tickets * this.showData.ticketPrice;
    this.bookingService.bookTicket(this.bookingData).subscribe({
      next: async (res: any) => {
        this.ticketDetails = res.booking;
        console.log('ticketDetails successful:', res);
        this.openModal();
        this.bookingData = {
          name: '',
          email: '',
          phone: '',
          tickets: 1,
          showId: '',
          totalAmount: 0,
        };
      },
      error: (error: any) => console.error('Error:', error),
    });
  }
}
