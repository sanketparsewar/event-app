import { UserService } from './../../services/user/user.service';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonIcon,
  IonItem,
  IonText,
  IonAvatar,
  IonSpinner,
  IonInput,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonInput,
    IonSpinner,
    IonAvatar,
    IonText,
    IonItem,
    IonIcon,
    IonButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  loading = false;

router=inject(Router)
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastService: ToastService,
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  async onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true; // Show spinner

      this.userService.login(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.loading = false;
          this.toastService.presentToast(
            'Login successful!',
            'checkmark',
            'success'
          );
          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.loading = false;
          this.toastService.presentToast(
            error.error.message,
            'alert',
            'danger'
          );
          console.error('Login failed:', error.error.message);
        },
      });
    }
  }
}
