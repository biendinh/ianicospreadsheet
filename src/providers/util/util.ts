import { Injectable } from '@angular/core';
import {
  Alert, AlertController,
  Toast, ToastController, ToastOptions,
  LoadingController, LoadingOptions
} from 'ionic-angular';

/*
  Generated class for the UtilProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UtilProvider {

  constructor(
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
  ) {

  }

  getAlert(title: string, message: string, buttonOpts?: any, inputOpts?: Array<any>): Alert {
    let alert: Alert = this.alertCtrl.create({
      title: title,
      message: message,
      inputs: inputOpts,
      buttons: buttonOpts
    });

    return alert;
  }

  getToast(message: string): Toast {
    let toastOpts: ToastOptions = {
      message: message,
      position: `top`,
      duration: 2000,
      cssClass: `toastClass`
    }
    let toast: Toast = this.toastCtrl.create(toastOpts);
    return toast;
  }

  getLoading(loadingOpts?: LoadingOptions) {
    return this.loadingCtrl.create(loadingOpts);
  }

}