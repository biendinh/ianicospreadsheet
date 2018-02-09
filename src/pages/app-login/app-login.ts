import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { GooglePlus } from '@ionic-native/google-plus';
import { AngularFireAuth } from 'angularfire2/auth';

import * as firebase from "firebase";
import { UtilProvider } from '../../providers/util/util';
import { FirestoreProvider, USER } from '../../providers/firestore/firestore';

/**
 * Generated class for the AppLoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-app-login',
  templateUrl: 'app-login.html',
})
export class AppLoginPage {

  constructor(
    public navCtrl: NavController,
    public _google: GooglePlus,
    public _auth: AngularFireAuth,
    public _util: UtilProvider,
    public _fs: FirestoreProvider
  ) {

  }

  onLogin() {
    let loading = this._util.getLoading({ duration: 5000 });
    loading.present().then(() => {
      this._google.login({
        'webClientId': '73489202333-g80hgenneh1d4oi4496j404o9pilc0ra.apps.googleusercontent.com',
        'offline': true
      }).then(res => {
        return this._auth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken)).then((u) => {
          return this.saveUser(u);
        });
      }).then(() => {
        loading.dismiss();
      }).catch(e => {
        loading.dismiss().then(() => {
          this._util.getAlert(`Error`, e).present();
        });
      });
    });
  }

  saveUser(user: firebase.User) {
    return this._fs.AdminUsers().doc<USER>(user.uid).set({
      user_name: user.displayName,
      user_email: user.email,
      user_role: 'user',
      user_picture: user.photoURL
    });
  }

  ionViewDidLoad() {
  }

}
