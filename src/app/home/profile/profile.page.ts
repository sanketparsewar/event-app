import { BookingService } from 'src/app/services/booking/booking.service';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
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
import { UploadFileService } from 'src/app/services/uploadFile/upload-file.service';
import { LoaderService } from 'src/app/services/loader/loader.service';

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
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProfilePage implements OnInit {
  loggedUserData: any;
  router = inject(Router);
  bookingsList: any;
  @ViewChild('modal') modal: any;
  @ViewChild('editmodal') editmodal: any;
  selectedFile: File | null = null;
  loading = false;

  updateProfileData = {
    name: '',
    email: '',
    phone: '',
    image: '', // to store the selected file
  };
  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private toastService: ToastService,
    private bookingService: BookingService,
    private uploadService: UploadFileService,
    private loaderService: LoaderService
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
    this.loaderService.showLoading()
    this.userService.getLoggedUser().subscribe({
      next: (response) => {
        this.loggedUserData = response.user; // Store user data in this.data
        // console.log('User :', this.loggedUserData);
        this.updateProfileData.name = this.loggedUserData.name;
        this.updateProfileData.phone = this.loggedUserData.phone;
        this.updateProfileData.email = this.loggedUserData.email;
        this.updateProfileData.image = this.loggedUserData.image;
        // console.log('updateProfileData',this.updateProfileData)
        this.getUserBookings();
        this.loaderService.hideLoading()
      },
      error: (error) => {
        console.log('User is not authenticated, redirecting to login...',error.error.message);
        this.loaderService.hideLoading()
        this.router.navigate(['/login']);
      },
    });
  }

  // Method to handle file selection
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  // Method to handle form submission
  onSubmit() {
    this.loading = true; // Show spinner

    if (this.selectedFile) {
      this.uploadService.uploadFile(this.selectedFile).subscribe({
        next: (res: any) => {
          this.updateProfileData.image = res.file.url;
          // console.log(res)
          this.updateUser();
          this.toastService.presentToast(
            'Profile updated Successfully!',
            'checkmark',
            'success'
          );
        },
        error: (error: any) => {
          this.toastService.presentToast(error.error.message, 'alert', 'danger',);
        },
      });
    } else {
      this.updateUser();
      // console.log('No file selected');
    }
  }
  updateUser() {
    if (
      this.updateProfileData.name &&
      this.updateProfileData.email &&
      this.updateProfileData.phone
    ) {
      // console.log('Form Submitted:', this.updateProfileData);
      this.userService
        .updateUser(this.updateProfileData, this.loggedUserData._id)
        .subscribe({
          next: (res) => {
            // this.updateProfileData=res.user
            this.toastService.presentToast(
              'Profile updated Successfully!',
              'checkmark',
              'success'
            );
            this.loggedUserData = res.updatedUser;
            this.loading = false;
            // console.log('response from back',res)
            this.editmodal.dismiss();
            this.selectedFile;
          },
          error: (error: any) => {
            this.editmodal.dismiss();
            this.toastService.presentToast(error.error.message, 'alert', 'danger');
          },
        });
    }
  }

  getUserBookings() {
    this.bookingService.getUserBookings(this.loggedUserData._id).subscribe({
      next: (res) => {
        this.bookingsList = res;
        // console.log('User bookingsList :', this.bookingsList);
      },
      error: () => {
        this.toastService.presentToast(
          'Failed to fetch user bookings',
          'alert',
          'danger'
        );
        // console.log('Failed to fetch user bookings');
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
    this.router.navigateByUrl('/home');
  }

  onEdit() {
    this.editmodal.present();
  }

  async onLogOut() {
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
    const [time, period] = showTime.split(' ');
    let [hours, minutes] = time.split(':').map(Number);

    if (period === 'PM' && hours !== 12) {
      hours += 12;
    } else if (period === 'AM' && hours === 12) {
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
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} to go`;
    } else if (diffInHours > 0) {
      return `${diffInHours} hour${
        diffInHours > 1 ? 's' : ''
      } to start the show`;
    } else if (diffInMinutes > 0) {
      return `${diffInMinutes} minute${
        diffInMinutes > 1 ? 's' : ''
      } to start the show`;
    } else {
      return 'Starting soon';
    }
  }

  onShowTicket(bookingId: string) {
    this.router.navigate(['/ticket', bookingId]);
    this.modal.dismiss();
  }
}
