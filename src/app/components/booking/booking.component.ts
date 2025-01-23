import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonList,
  IonButton,
  IonButtons,
  IonLabel,
  IonModal, 
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
  imports: [
    IonContent,
    IonLabel,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonList,
    IonButton,
    IonButtons,
    IonModal,
    FormsModule,
    CommonModule,
  ],
})
export class BookingComponent implements OnInit {
  @Input() show: any; // Input property to receive 'show' data
  formData: any={
    name: '',
    email: '',
    phone: '',
    tickets: 1,
  };
  ngOnInit() {
    console.log('Show data in booking modal:', this.show); // Debugging log to check if the data is passed
  }

  bookTickets(){
    console.log(this.formData)

  }
}
