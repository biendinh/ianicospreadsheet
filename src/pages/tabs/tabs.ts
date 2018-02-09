import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TabOverviewPage } from '../tab-overview/tab-overview';
import { TabIcoRatingPage } from '../tab-ico-rating/tab-ico-rating';

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1: any = TabOverviewPage;
  tab2: any = TabIcoRatingPage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
  }

  ionViewDidLoad() {
  }

}
