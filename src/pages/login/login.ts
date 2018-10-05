import {Component} from "@angular/core";
import {NavController, AlertController, ToastController, MenuController, Platform} from "ionic-angular";
import {RegisterPage} from "../register/register";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiProvider} from "../../providers/api/api";
import {GlobalVariableProvider} from "../../providers/gloabal-variable/gloabal-variable";
import {Storage} from "@ionic/storage";
import {NFC} from "@ionic-native/nfc";
//import {SMS} from "../../providers/sms/sms";
import {SMS} from "@ionic-native/sms";
declare var cordova: any;
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  datalogin: FormGroup;
  smsmode: boolean=false ;
  type :string="password";
  internet:boolean =true;
  constructor(private sms:SMS,private platform:Platform,public nav: NavController,private nfc:NFC,private api:ApiProvider,private store:Storage,private Api:ApiProvider,private formBuilder : FormBuilder,private url :GlobalVariableProvider,public forgotCtrl: AlertController, public menu: MenuController, public toastCtrl: ToastController) {
    this.menu.swipeEnable(false);
    this.datalogin = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required]

    });
  }

  // go to register page
  register() {
    this.nav.setRoot(RegisterPage,{mode:"Online"});
  }

  login() {
        this.nfc.enabled().then(ok=>{

          this.Api.afficheloading();
          this.Api.getpost(this.url.URL+"serviceAuthentification/?identifiant="+encodeURI(this.datalogin.controls['login'].value)+"&mdp="+encodeURI(this.datalogin.controls['password'].value))
            .then(data=>{
              this.Api.dismissloadin();
              let val = JSON.parse(data.data);

              console.log("okk "+JSON.stringify(val));

              if(val.code=="0")
              {
                this.datalogin.controls['login'].setValue("");
                this.datalogin.controls['password'].setValue("");
                this.store.set("token",val.token);
                this.store.set("idmentor",val.idMentor);
                this.nav.push(RegisterPage,{mode:"Online"});
              }
              else this.Api.showError(val.message);
            }).catch(err=>{
            this.Api.dismissloadin();
            console.log("erreur "+JSON.stringify(err));
          })
        }).catch(r=>{
          if(r=="NO_NFC")
            this.api.showError("Cet appareil ne peut lire de carte ");
          else
            this.api.showError("Vous devez activer le lecteur de carte d'abord ");
        })
  }
  tester(message){
    //766026389
    let msg ="parrain|Dame|Camara|01-01-2001|h|775067661|123456789012|12345678987654321|098765432|234";
    this.sms.send('766026389', msg);
/*    this.platform.ready().then(() => {
    //  cordova.plugins.SMSPLUGINDAME.coolMethod(message);
      this.sms.coolMethod(message);
    });
   // this.sms.coolMethod(message);*/

  }
  changeModeSms(){
    this.internet = !this.smsmode;
    if(this.smsmode)
    {
      this.url.mode='sms';
      this.nav.setRoot(RegisterPage,{mode:"Offline"});
    }

  }
  changeModeinternet(){
    this.smsmode = !this.internet;
    if(this.smsmode)
    {
      this.url.mode='sms';
      this.nav.setRoot(RegisterPage,{mode:"Offline"});
    }
  }
  affichemdp() {
    this.type="text";

  /*  setTimeout(function () {
     this.type ="password";
    },5000);*/
    setTimeout(() => {
      this.type ="password";
    }, 5000);
}}
