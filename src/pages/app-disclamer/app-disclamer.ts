import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the AppDisclamerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-app-disclamer',
  templateUrl: 'app-disclamer.html',
})
export class AppDisclamerPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
  }

  goToMain() {
    this.navCtrl.setRoot(TabsPage);
  }

  ionViewDidLoad() {
  }

}
