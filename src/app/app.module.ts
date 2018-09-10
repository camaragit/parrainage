import { BrowserModule } from '@angular/platform-browser';
import {ErrorHandler, Injectable, Injector, NgModule} from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {NFC} from "@ionic-native/nfc";
import {IonicStorageModule} from '@ionic/storage';
import { MyApp } from './app.component';
import {LoginPage} from "../pages/login/login";
import {RegisterPage} from "../pages/register/register";
import {HTTP} from "@ionic-native/http";
import {WheelSelector} from "@ionic-native/wheel-selector";
import {Toast} from "@ionic-native/toast";
import {Camera} from "@ionic-native/camera";
import {FTP} from "@ionic-native/ftp";
import {ApiProvider} from "../providers/api/api";
import {GlobalVariableProvider} from "../providers/gloabal-variable/gloabal-variable";
import {Pro} from "@ionic/pro";
import {File} from "@ionic-native/file";
import {FilePath} from "@ionic-native/file-path";
import {Base64} from "@ionic-native/base64";
import {SMS} from "@ionic-native/sms";

Pro.init('d1ec8226', {
  appVersion: '0.0.1'
})

@Injectable()
export class MyErrorHandler implements ErrorHandler {
  ionicErrorHandler: IonicErrorHandler;

  constructor(injector: Injector) {
    try {
      this.ionicErrorHandler = injector.get(IonicErrorHandler);
    } catch(e) {
      // Unable to get the IonicErrorHandler provider, ensure
      // IonicErrorHandler has been added to the providers list below
    }
  }

  handleError(err: any): void {
    Pro.monitoring.handleNewError(err);
    // Remove this if you want to disable Ionic's auto exception handling
    // in development mode.
    this.ionicErrorHandler && this.ionicErrorHandler.handleError(err);
  }
}
@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    RegisterPage
  ],
  imports: [
    BrowserModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp, {
      scrollPadding: false,
      scrollAssist: true,
      autoFocusAssist: false
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    RegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HTTP,
    ApiProvider,
    GlobalVariableProvider,
    WheelSelector,
    NFC,Toast,Camera,FTP,File,FilePath,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    IonicErrorHandler,Base64,
    [{ provide: ErrorHandler, useClass: MyErrorHandler }],
    SMS
  ]
})
export class AppModule {}
