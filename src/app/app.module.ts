import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { GooglePlus } from "@ionic-native/google-plus";

import "rxjs";

import { PagesModule } from "../pages/pages.module";

import { FBCONFIG } from "../constants/firebase.conf";
import { AngularFireModule } from "angularfire2";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFirestoreModule } from "angularfire2/firestore";

import { MyApp } from './app.component';
import { UtilProvider } from '../providers/util/util';
import { FirestoreProvider } from '../providers/firestore/firestore';
import { ApiProvider } from '../providers/api/api';
import { SearchProvider } from '../providers/search/search';

const APPCONFIG = {
  backButtonText: "",
  tabsHighlight: true,
  tabsPlacement: "bottom",
  tabsHideOnSubPages: true,
  scrollAssist: true,
  autoFocusAssist: true
};

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, APPCONFIG),
    PagesModule,
    AngularFireModule.initializeApp(FBCONFIG),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GooglePlus,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    UtilProvider,
    FirestoreProvider,
    ApiProvider,
    SearchProvider,
  ]
})
export class AppModule { }
