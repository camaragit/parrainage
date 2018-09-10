import { Injectable } from '@angular/core';
import {Cordova,Plugin,IonicNativePlugin} from '@ionic-native/core';

@Plugin({
pluginName: "SMSPLUGINDAME",
plugin: "cordova.plugin.sms.port.dame",
pluginRef : "cordova.plugin.sms.port.dame",
platforms :["android"]
})
@Injectable()
export class SMS extends IonicNativePlugin{

  @Cordova()
  envoyersms(arg1: any): Promise<any> {
    return;
  }
  @Cordova()
  ecoute_reception_sms(arg1:any):Promise<any>{
    return;
  }
  @Cordova()
  coolMethod(arg1:any):Promise<any>{
    return;
  }

}
