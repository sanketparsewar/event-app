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
  IonButton,
  IonButtons,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert/alert.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
  standalone: true,
  imports: [
    IonButtons,
    IonButton,
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
  constructor(
    private bookingService: BookingService,
    private alertService: AlertService,
    private toastService: ToastService,
    private loaderService: LoaderService
  ) {}
  router = inject(Router);
  ticketDetails: any;
  bookingDetails: any;
  today = new Date().toISOString().split('T')[0]; // Sets min date to today
  transaction: any = {
    booking: '',
    paymentDetails: '',
  };
  paymentDetails = {
    nameOnCard: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  };

  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
    },
    {
      text: 'Confirm',
      role: 'confirm',
    },
  ];
  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.ticketDetails = navigation.extras.state['ticketDetails'];
      // console.log('ticketDetails', this.ticketDetails);
    } else {
      console.log('No data received.');
    }
  }

  async handlePayment(event: Event) {
    try {
      const result = await this.alertService.showAlert(
        'Payment Confirmation',
        'Are you sure you want to Continue?',
        this.alertButtons
      );

      if (result === 'confirmed') {
        this.loaderService.showLoading();
        event.preventDefault();
        this.bookingService.bookTicket(this.ticketDetails).subscribe({
          next: async (res: any) => {
            await this.loaderService.hideLoading();
            this.bookingDetails = res.booking;
            this.transaction.booking = this.bookingDetails?._id;
            this.transaction.paymentDetails = this.paymentDetails;
            // console.log('transaction', this.transaction);
            this.toastService.presentToast(
              'Ticket Booked!',
              'checkmark',
              'success'
            );
            this.router.navigateByUrl(`/ticket/${this.bookingDetails._id}`);
          },
          error: (error: any) => {
            this.toastService.presentToast('Error!', 'alert', 'danger');
            console.error('Error:', error.error.message);
            this.loaderService.hideLoading();
          },
        });
        // console.log('Card Details:', this.paymentDetails);
      }
    } catch (error) {
      this.toastService.presentToast('Error!', 'alert', 'danger');
      this.router.navigateByUrl('/home');
      console.log('Payment canceled',);
    }
  }
  back() {
    history.back();
  }
}
