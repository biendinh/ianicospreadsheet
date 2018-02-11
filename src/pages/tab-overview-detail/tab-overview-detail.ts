import { Component } from '@angular/core';
import { NavController, NavParams, AlertButton } from 'ionic-angular';
import { AlertInputOptions } from 'ionic-angular/components/alert/alert-options';
import { Subscription } from 'rxjs/Subscription';
import { UtilProvider } from '../../providers/util/util';
import { FirestoreProvider, ICO } from '../../providers/firestore/firestore';
import { ApiProvider } from '../../providers/api/api';
import { Decimal } from '../../models/decimal';
import { InAppBrowser } from '@ionic-native/in-app-browser';

/**
 * Generated class for the TabOverviewDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-tab-overview-detail',
  templateUrl: 'tab-overview-detail.html',
})
export class TabOverviewDetailPage {

  o: ICO;
  current_eth: number;
  subscriptions: Subscription[] = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public _util: UtilProvider,
    public _fs: FirestoreProvider,
    public _api: ApiProvider,
    public _iab : InAppBrowser
  ) {
    let overview_key = this.navParams.data.overview_key;
    let t = this._fs.ICOs().doc<ICO>(overview_key).valueChanges().subscribe(o => {
      this.o = o;
      this._api.ethereum().then(d => {
        this.current_eth = Number(d[0].price_usd);
      })
    });
    this.subscriptions.push(t);
  }

  isNumber(v) {
    return !isNaN(Number(v));
  }

  openUrl(url: string) {
    const browser = this._iab.create(url, '_blank');
    browser.show();
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
