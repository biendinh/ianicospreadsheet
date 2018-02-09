import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, AlertButton } from 'ionic-angular';
import { AlertInputOptions } from 'ionic-angular/components/alert/alert-options';
import { Subscription } from 'rxjs/Subscription';
import { UtilProvider } from '../../providers/util/util';
import { FirestoreProvider, ICO } from '../../providers/firestore/firestore';
import * as moment from "moment";
import { Decimal } from '../../models/decimal';

/**
 * Generated class for the TabIcoRatingDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-tab-ico-rating-detail',
  templateUrl: 'tab-ico-rating-detail.html',
})
export class TabIcoRatingDetailPage {

  i: ICO;
  subscriptions: Subscription[] = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public _modal: ModalController,
    public _util: UtilProvider,
    public _fs: FirestoreProvider
  ) {
    let ico_rating_key = this.navParams.get(`ico_rating_key`);
    let t = this._fs.ICOs().doc<ICO>(ico_rating_key).valueChanges().subscribe(i => {
      this.i = i;
    });
    this.subscriptions.push(t);
  }

  onBack() {
    this.navCtrl.pop();
  }

  ionViewWillUnload() {
    this.subscriptions.forEach((s: Subscription) => {
      if (!s.closed) s.unsubscribe();
    });
  }

  ionViewDidLoad() {
  }

}
