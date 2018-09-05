import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
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

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    RegisterPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp), IonicStorageModule.forRoot()
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
    NFC,Toast,Camera,FTP,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
