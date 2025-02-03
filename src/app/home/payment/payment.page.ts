import { BookingService } from 'src/app/services/booking/booking.service';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonAccordion,
  IonItem,
  IonLabel,
  IonAccordionGroup,
  IonIcon,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonAccordionGroup,
    IonLabel,
    IonItem,
    IonAccordion,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class PaymentPage implements OnInit {
  constructor(private bookingService: BookingService) {}
  router = inject(Router);
  ticketDetails: any;
  bookingDetails: any;
  today = new Date().toISOString().split('T')[0]; // Sets min date to today
  transaction:any={
    booking: '',
    paymentDetails:'',
  };
  paymentDetails = {
    nameOnCard: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  };
  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.ticketDetails = navigation.extras.state['ticketDetails'];
      console.log('ticketDetails', this.ticketDetails);
    } else {
      console.log('No data received.');
    }
  }

  handlePayment(event: Event) {
    event.preventDefault(); 

    this.bookingService.bookTicket(this.ticketDetails).subscribe({
      next: async (res: any) => {
        this.bookingDetails = res.booking;
        this.transaction.booking = this.bookingDetails?._id;
        this.transaction.paymentDetails = this.paymentDetails;
        this.router.navigateByUrl(`/ticket/${this.bookingDetails._id}`);
      },
      error: (error: any) => console.error('Error:', error),
    });
    console.log('Card Details:', this.paymentDetails);

  }
}
