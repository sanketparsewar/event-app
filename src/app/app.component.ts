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
  chevronForwardOutline,
  cloudUploadOutline,
  createOutline,
  giftOutline,
  globe,
  homeOutline,
  locateOutline,
  locationOutline,
  logoPaypal,
  logOutOutline,
  notificationsOutline,
  optionsOutline,
  personCircle,
  personOutline,
  settingsOutline,
  ticketOutline,
} from 'ionicons/icons'; // Import specific icons
import { Router } from '@angular/router';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor(private router: Router) {
    this.checkAuth();
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
      createOutline,
      homeOutline,
      globe,
      alert,
      checkmark,
      logOutOutline,
      settingsOutline,
      chevronForwardOutline,
      cloudUploadOutline,
    });
  }

  checkAuth() {
    const getToken = (): string | null => {
      return (
        document.cookie
          .split('; ')
          .find((row) => row.startsWith('token='))
          ?.split('=')[1] || null
      );
    };

    const token = getToken();

    if (token) {
      this.router.navigateByUrl('/home');
    } else {
      this.router.navigateByUrl('/welcome');
    }
  }
}
