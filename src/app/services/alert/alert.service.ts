import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private alertController: AlertController) {}

  // Accepts header, message, and custom buttons, and returns a promise
  async showAlert(
    header: string,
    message: string,
    buttons: any[]
  ): Promise<any> {
    const alert = await this.alertController.create({
      header,
      message,
      buttons,
    });

    await alert.present();

    return new Promise((resolve, reject) => {
      // Handle the result when alert is dismissed
      alert.onDidDismiss().then((event) => {
        const { role } = event;
        if (role === 'confirm') {
          resolve('confirmed');
        } else {
          reject('canceled');
        }
      });
    });
  }
}
