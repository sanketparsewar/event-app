import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonIcon,
  IonList,
  IonAvatar,
  IonText,
  IonButton,
  IonImg,
  IonButtons,
  IonModal,
} from '@ionic/angular/standalone';
import { Ievent } from 'src/app/interfaces/event.interface';
import { BookingComponent } from '../booking/booking.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.scss'],
  imports: [
    BookingComponent,
    IonContent,
    DatePipe,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonIcon,
    IonList,
    IonAvatar,
    IonText,
    IonButton,
    IonImg,
    IonButtons,
    IonModal,
    FormsModule,
    CommonModule,
  ],
})
export class ShowsComponent implements OnInit {
  @Input() event!: Ievent;
  show: any;
  constructor(private router:Router) {}
  presentingElement!: HTMLElement | null;

  ngOnInit() {
    this.presentingElement = document.querySelector('.ion-page');
  }

  async bookTickets(modal:any,item: any) {    
    this.show = await item;
    console.log(item);
     // Passing data using router navigation
     this.router.navigate(['/my-booking'], {
      state: { eventData: item },  // Sending data as state
    });
    modal.dismiss()
  }
}
