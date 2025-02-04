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
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
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
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  loading = false;

  router = inject(Router);

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastService: ToastService,
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(\+?[1-9]{1,4})?([0-9]{10})$/),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  async onSubmit() {
    if (this.registerForm.valid) {
      this.loading = true; // Show spinner

      this.userService.register(this.registerForm.value).subscribe({
        next: (res) => {
          // console.log('Registration successful:', res);
          this.loading = false;
          this.toastService.presentToast(
            'Registration successful!',
            'checkmark',
            'success'
          );
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.loading = false;
          this.toastService.presentToast(
            error.error.message,
            'alert',
            'danger'
          );
          console.error('Registration failed:', error.error.message);
        },
      });
    }
  }
}
