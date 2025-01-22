import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { register } from 'swiper/element/bundle';
import {  arrowRedoOutline, locateOutline, locationOutline, notificationsOutline, optionsOutline } from 'ionicons/icons'; // Import specific icons

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
     arrowRedoOutline
    });
  }
}
