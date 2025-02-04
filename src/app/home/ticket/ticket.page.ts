import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from 'src/app/services/booking/booking.service';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonIcon,
  IonButton,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.page.html',
  styleUrls: ['./ticket.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonIcon,
    IonList,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class TicketPage implements OnInit {
  bookingDetails: any;
  constructor(
    private bookingService: BookingService,
    private activatedRoute: ActivatedRoute
  ) {}
  router = inject(Router);

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.bookingService.getBookingById(params['id']).subscribe({
          next: (res: any) => {
            this.bookingDetails = res;
            console.log('bookingDetails:', this.bookingDetails);
          },
          error: (error) => {
            console.error('Error:', error);
          },
        });
      }
    });
  }
  back(){
    history.back()
  }
}
