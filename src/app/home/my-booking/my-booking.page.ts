import { BookingService } from 'src/app/services/booking/booking.service';
import {
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
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
import { UserService } from 'src/app/services/user/user.service';
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
  loggedUserData: any;

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.showData = navigation.extras.state['showData'];
      // console.log('mybooking showdata', this.showData);
    } else {
      console.log('No data received.');
    }
  }
  constructor(
    private bookingService: BookingService,
    private userService: UserService,
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
  ) {}

  ionViewWillEnter() {
    this.getLoggedUser();
  }

  getLoggedUser() {
    this.userService.getLoggedUser().subscribe({
      next: (response) => {
        this.loggedUserData = response.user; // Store user data in this.data
        // console.log('User :', this.loggedUserData);
        this.bookingData.name = this.loggedUserData.name;
        this.bookingData.email = this.loggedUserData.email;
        this.bookingData.phone = this.loggedUserData.phone;
      },
      error: () => {
        console.log('User is not authenticated, redirecting to login...');
        this.router.navigate(['/login']);
      },
    });
  }

  openModal() {
    if (this.modal) {
      this.modal.present();
    }
  }

  closeModal() {
    this.modal.dismiss();
  }

  bookNow() {
    this.bookingData.showId = this.showData._id;
    this.bookingData.totalAmount =
      this.bookingData.tickets * this.showData.ticketPrice;

    this.ticketDetails = this.bookingData;
    // console.log('ticketdetails', this.ticketDetails);
    this.openModal();
  }
  back() {
    history.back();
  }

  Payment() {
    this.ticketDetails = this.bookingData;
    this.router.navigate(['/payment'], {
      state: { ticketDetails: this.ticketDetails },
    });
    this.modal.dismiss();
    // console.log('ticketdetails', this.ticketDetails);
  }
}
