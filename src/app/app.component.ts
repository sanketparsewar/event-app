import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { register } from 'swiper/element/bundle';
import {
  alert,
  arrowDownCircleOutline,
  arrowRedoOutline,
  calendarOutline,
  cardOutline,
  checkmark,
  chevronBackCircleOutline,
  createOutline,
  giftOutline,
  globe,
  homeOutline,
  locateOutline,
  locationOutline,
  logoPaypal,
  notificationsOutline,
  optionsOutline,
  personCircle,
  personOutline,
  ticketOutline,
} from 'ionicons/icons'; // Import specific icons

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {
    addIcons({
      locateOutline,
      notificationsOutline,
      optionsOutline,
      locationOutline,
      arrowRedoOutline,
      calendarOutline,
      arrowDownCircleOutline,
      chevronBackCircleOutline,
      ticketOutline,
      personCircle,
      cardOutline,
      logoPaypal,
      giftOutline,
      personOutline,
      createOutline,homeOutline,globe,
      alert,checkmark
    });
  }
}
