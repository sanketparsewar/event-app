import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loading: HTMLIonLoadingElement | null = null;

  constructor(private loadingCtrl: LoadingController) {}
  // Show Loader
  async showLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Loading...',
      spinner: 'crescent', // You can change spinner type
    });

    await this.loading.present();
  }

  // Hide Loader
  async hideLoading() {
    if (this.loading) {
      await this.loading.dismiss();
      this.loading = null;
    }
  }
}
