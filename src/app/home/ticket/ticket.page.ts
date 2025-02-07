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
  IonButtons,
} from '@ionic/angular/standalone';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.page.html',
  styleUrls: ['./ticket.page.scss'],
  standalone: true,
  imports: [
    IonButtons,
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
  router = inject(Router);
  constructor(
    private bookingService: BookingService,
    private activatedRoute: ActivatedRoute,
    private loaderService: LoaderService,
    private toastService: ToastService
  ) {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.loaderService.showLoading();
        this.bookingService.getBookingById(params['id']).subscribe({
          next: (res: any) => {
            this.loaderService.hideLoading();
            this.bookingDetails = res;
          },
          error: (error) => {
            this.loaderService.hideLoading();
            this.toastService.presentToast(
              error.error.message,
              'alert',
              'danger'
            );
            this.router.navigate(['/home']);
            console.error('Error:', error.error.message);
          },
        });
      }
    });
  }

  ngOnInit() {}

  back() {
    history.back();
  }
  backToEvent(){
    this.router.navigateByUrl('/event/'+this.bookingDetails?.showId?.eventId?._id)
  }
}
