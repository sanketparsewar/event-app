import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) { }

  async presentToast(message: string, icon: string = 'information-circle',color:string) {
    const toast = await this.toastController.create({
      message: message,
      color: color,
      duration: 3000,
      icon: icon,
      position: 'bottom', // You can also change the position to 'top' or 'middle'
      buttons: [
        {
          side: 'end',
          role: 'cancel',
          
        }
      ]
    });
    await toast.present();
  }
}
