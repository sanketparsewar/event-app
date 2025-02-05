import { BookingService } from 'src/app/services/booking/booking.service';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonItem,
  IonIcon,
  IonAccordionGroup,
  IonAccordion,
  IonLabel,
  IonModal,
  IonButtons,
  IonList,
  IonImg,
  IonText,
} from '@ionic/angular/standalone';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert/alert.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    IonText,
    IonImg,
    IonList,
    IonButtons,
    IonModal,
    IonLabel,
    IonAccordion,
    IonAccordionGroup,
    IonIcon,
    IonItem,
    IonButton,
    IonCardContent,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ProfilePage implements OnInit {
  loggedUserData: any;
  router = inject(Router);
  bookingsList: any;
  @ViewChild('modal') modal: any;

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private toastService: ToastService,
    private bookingService: BookingService
  ) {}

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
    this.getLoggedUser();
  }
  getLoggedUser() {
    this.userService.getLoggedUser().subscribe({
      next: (response) => {
        this.loggedUserData = response.user; // Store user data in this.data
        // console.log('User :', this.loggedUserData);
        this.getUserBookings();
      },
      error: () => {
        console.log('User is not authenticated, redirecting to login...');
        this.router.navigate(['/login']);
      },
    });
  }

  getUserBookings() {
    this.bookingService.getUserBookings(this.loggedUserData._id).subscribe({
      next: (res) => {
        this.bookingsList = res;
        // console.log('User bookingsList :', this.bookingsList);
      },
      error: () => {
        console.log('Failed to fetch user bookings');
      },
    });
  }
  openModal() {
    if (this.modal) {
      this.modal.present();
    }
  }

  back() {
    // history.back();
    this.router.navigateByUrl('/home')
  }

  async logOut() {
    try {
      const result = await this.alertService.showAlert(
        'Logout Confirmation',
        'Are you sure you want to log out?',
        this.alertButtons
      );

      if (result === 'confirmed') {
        this.userService.logout();
        this.toastService.presentToast(
          'Logged Out Successfully!',
          'checkmark',
          'success'
        );
      }
    } catch (error) {
      console.log('Logout canceled');
    }
  }


  getRemainingTime(showDate: string, showTime: string): string | null {
    const showDateTime = new Date(showDate);
  
    // Extract time and convert to 24-hour format
    const [time, period] = showTime.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
  
    if (period === "PM" && hours !== 12) {
      hours += 12;
    } else if (period === "AM" && hours === 12) {
      hours = 0;
    }
  
    showDateTime.setHours(hours, minutes, 0, 0);
  
    const now = new Date();
    const diffInMs = showDateTime.getTime() - now.getTime();
  
    // If the show is over, return null
    if (diffInMs <= 0) {
      return null;
    }
  
    const diffInMinutes = Math.floor(diffInMs / 60000);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
  
    if (diffInDays > 0) {
      return `${diffInDays} day${diffInDays > 1 ? "s" : ""} to go`;
    } else if (diffInHours > 0) {
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} to start the show`;
    } else if (diffInMinutes > 0) {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} to start the show`;
    } else {
      return "Starting soon";
    }
  }
  
  onShowTicket(bookingId:string){
    this.router.navigate(['/ticket', bookingId]);
    this.modal.dismiss();
  }



}
