import {Component} from "@angular/core";
import {NavController, AlertController, ToastController, MenuController} from "ionic-angular";
import {RegisterPage} from "../register/register";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiProvider} from "../../providers/api/api";
import {GlobalVariableProvider} from "../../providers/gloabal-variable/gloabal-variable";
import {Storage} from "@ionic/storage";
import {NFC} from "@ionic-native/nfc";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  datalogin: FormGroup;
  constructor(public nav: NavController,private nfc:NFC,private api:ApiProvider,private store:Storage,private Api:ApiProvider,private formBuilder : FormBuilder,private url :GlobalVariableProvider,public forgotCtrl: AlertController, public menu: MenuController, public toastCtrl: ToastController) {
    this.menu.swipeEnable(false);
    this.datalogin = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required]

    });
  }

  // go to register page
  register() {
    this.nav.setRoot(RegisterPage);
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
            this.nav.push(RegisterPage);
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
  forgotPass() {
    let forgot = this.forgotCtrl.create({
      title: 'Forgot Password?',
      message: "Enter you email address to send a reset link password.",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            console.log('Send clicked');
            let toast = this.toastCtrl.create({
              message: 'Email was sended successfully',
              duration: 3000,
              position: 'top',
              cssClass: 'dark-trans',
              closeButtonText: 'OK',
              showCloseButton: true
            });
            toast.present();
          }
        }
      ]
    });
    forgot.present();
  }

}
