import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AppLoginPage } from '../pages/app-login/app-login';
import { AngularFireAuth } from 'angularfire2/auth';
import { AppDisclamerPage } from '../pages/app-disclamer/app-disclamer';
//import { AppDisclamerPage } from '../pages/app-disclamer/app-disclamer';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, _auth: AngularFireAuth) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
    _auth.authState.subscribe(user => {
      if (user) {
        this.rootPage = AppDisclamerPage;
      } else {
        this.rootPage = AppDisclamerPage;
      }
    })
  }
}

