import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Subscription } from 'rxjs';
import { UtilProvider } from '../../providers/util/util';
import { FirestoreProvider, ICO } from '../../providers/firestore/firestore';
import { InAppBrowser } from '@ionic-native/in-app-browser';

/**
 * Generated class for the TabIcoPassedDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-tab-ico-passed-detail',
  templateUrl: 'tab-ico-passed-detail.html',
})
export class TabIcoPassedDetailPage {

  i: ICO;
  subscriptions: Subscription[] = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public _modal: ModalController,
    public _util: UtilProvider,
    public _fs: FirestoreProvider,
    public _iab: InAppBrowser
  ) {
    let ico_rating_key = this.navParams.data.ico_rating_key;
    let t = this._fs.ICOs().doc(ico_rating_key).valueChanges().subscribe(i => {
      this.i = i;
    })
    this.subscriptions.push(t);
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
