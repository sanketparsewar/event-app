import { Component, inject, OnInit } from '@angular/core';
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
})
export class ProfilePage implements OnInit {
  loggedUserData: any;
  router = inject(Router);

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private toastService: ToastService
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
        console.log('User :', this.loggedUserData);
      },
      error: () => {
        console.log('User is not authenticated, redirecting to login...');
        this.router.navigate(['/login']);
      },
    });
  }
  back() {
    history.back();
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
}
