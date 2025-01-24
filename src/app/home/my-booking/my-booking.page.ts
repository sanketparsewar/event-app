import { BookingService } from 'src/app/services/booking/booking.service';
import { Component, OnInit } from '@angular/core';
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
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { BookingComponent } from 'src/app/components/booking/booking.component';

@Component({
  selector: 'app-my-booking',
  templateUrl: './my-booking.page.html',
  styleUrls: ['./my-booking.page.scss'],
  standalone: true,
  imports: [
    IonList,
    IonButton,
    IonLabel,
    IonItem,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,BookingComponent
  ],
})
export class MyBookingPage implements OnInit {
  eventData: any;
  bookingData: any = {
    name: '',
    email: '',
    phone: '',
    tickets: 1,
    showId: '',
  };
  constructor(private router: Router,private bookingService:BookingService) {}

  ngOnInit() {
    // Accessing data passed from the previous page
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.eventData = navigation.extras.state['eventData'];
      console.log('Data passed from ShowsComponent:', this.eventData);
    } else {
      console.log('No data received.');
    }
  }

  bookTickets() {
    // console.log(this.bookingData);
    // this.bookingData.showId = this.eventData._id;
    // this.bookingService.bookTicket(this.bookingData).subscribe({
    //   next: async (res: any) => {
    //     console.log('Booking successful:', res);
    //     this.router.navigateByUrl('/events')
    //     this.bookingData = {
    //       name: '',
    //       email: '',
    //       phone: '',
    //       tickets: 1,
    //       showId: '',
    //     };
    //   },
    //   error: (error: any) => console.error('Error:', error),
    // });
  }
}
