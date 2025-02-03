import { BookingService } from 'src/app/services/booking/booking.service';
import { ChangeDetectorRef, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
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
  router = inject(Router);
  
  @ViewChild('modal') modal: any;
  ticketDetails: any;
  
  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.showData = navigation.extras.state['showData'];
console.log('showdata',this.showData)
    } else {
      console.log('No data received.');
    }
  }
  constructor(
    private bookingService: BookingService,
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
  ) {}

  

  openModal() {
    if (this.modal) {
      this.modal.present();
    }
  }

  closeModal() {
    if (this.modal) {
      if (confirm('Leaving this page?')) {
        this.modal.dismiss();
        this.router.navigateByUrl(`/event/${this.showData.eventId._id}`);
      }
    }
  }

  bookTickets() {
    this.bookingData.showId = this.showData._id;
    this.bookingData.totalAmount = this.bookingData.tickets * this.showData.ticketPrice;
    // this.bookingService.bookTicket(this.bookingData).subscribe({
    //   next: async (res: any) => {
    //     this.ticketDetails = res.booking;
        this.ticketDetails = this.bookingData;
        this.openModal();
        // this.bookingData = {
        //   name: '',
        //   email: '',
        //   phone: '',
        //   tickets: 1,
        //   showId: '',
        //   totalAmount: 0,
        // };
    //   },
    // });
  }

  Payment(){
    this.ticketDetails = this.bookingData;
    this.router.navigate(['/payment'], { state: { ticketDetails: this.ticketDetails } });
    this.modal.dismiss();
    console.log('ticketdetails',this.ticketDetails)
  }
  
}
