import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {LoginPage} from "../login/login";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {WheelSelector} from "@ionic-native/wheel-selector";
import {NFC} from "@ionic-native/nfc";
import {Storage} from "@ionic/storage";
import {ApiProvider} from "../../providers/api/api";
import {GlobalVariableProvider} from "../../providers/gloabal-variable/gloabal-variable";
import {Camera, CameraOptions} from '@ionic-native/camera';
import {File} from "@ionic-native/file";
import {FilePath} from "@ionic-native/file-path";
import { normalizeURL } from 'ionic-angular';
//import {FileTransfer, FileTransferObject, FileUploadOptions} from "@ionic-native/file-transfer";
import {FTP} from "@ionic-native/ftp";



@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  minDate :any;
datauser : FormGroup;
departementsRegion :any;
communesdepartement :any;
photo :string;
phoneinvalid : boolean = false;
filepath : string;
filename : string;


listeRegion =[{description:"DAKAR"},{description:"DIOURBEL"},{description:"FATICK"},{description:"KAFFRINE"},{description:"KAOLACK"},
                {description :"KEDOUGOU"},{description:"KOLDA"},{description:"LOUGA"},{description:"MATAM"},{description:"SAINT LOUIS"},
                 {description:"SEDHIOU"},{description:"TAMBACOUNDA"},{description:"THIES"},{description:"ZIGUINCHOR"}];


listedepartements = [
  [{description:"DAKAR"},{description:"GUEDIAWAYE"},{description:"RUFISQUE"},{description:"PIKINE"}],
  [{description:"DIOURBEL"},{description:"BAMBEY"},{description:"MBACKE"}],
  [{description:"FATICK"},{description:"FOUNDIOUNE"},{description:"GOSSAS"}],
  [{description:"KAFFRINE"},{description:"BIRKILANE"},{description:"MALEM HODAR"},{description:"KOUNGHEUL"}],
  [{description:"KAOLACK"},{description:"GUINGUINEO"},{description:"NIORO DU RIP"}],
  [{description:"KEDOUGOU"},{description:"SALEMATA"},{description:"SARAYA"}],
  [{description:"KOLDA"},{description:"VELINGARA"},{description:"MEDINA YORO FOULAH"}],
  [{description:"LOUGA"},{description:"LINGUERE"},{description:"KEBEMER"}],
  [{description:"MATAM"},{description:"RANEROU"},{description:"KANEL"}],
  [{description:"SAINT LOUIS"},{description:"PODOR"},{description:"DAGANA"}],
  [{description:"SEDHIOU"},{description:"BOUNKILING"},{description:"GOUDOMP"}],
  [{description:"TAMBACOUNDA"},{description:"BAKEL"},{description:"KOUMPENTOUM"},{description:"GOUDIRY"}],
  [{description:"THIES"},{description:"MBOUR"},{description:"TIVAOUNE"}],
  [{description:"ZIGUINCHOR"},{description:"OUSSOUYE"},{description:"BIGNONA"}]

];


listesCommunes = [
   [
     {description:"GUEULE TAPEE FASS COLOBANE"},{description:"FANN POINT E AMITIE"},{description:"MEDINA"},{description:"PLATEAU"},
     {description:"CAMBERENE"},{description:"DIEUPPEUL DERKLE"},{description:"BISCUITERIE"},{description:"HLM"},{description:"HANN BEL AIR"},
     {description:"GRAND DAKAR"},{description:"SICAP LIBERTE"},{description:"YOFF"},{description:"MERMOZ SACRE COEUR"},{description:"NGOR"},
     {description:"OUAKAM"},{description:"GRAND YOFF"},{description:"PARCELLES ASSAINIES"},{description:"PATTE D'OIE"},{description:"GOREE"}
    ],
  [{description:"WAKHINANE NIMZAT"},{description:"GOLF"},{description:"MEDINA GOUNASS"},{description:"NDIAREME"},{description:"SAM NOTAIRE"}
    ],

  [
    {description:"RUFISQUE EST"},{description:"RUFISQUE NORD"},{description:"RUFISQUE OUEST"},{description:"BAMBYLOR"}, {description:" TIVAOUANE PEULH - NIAGA"},
    {description:"YENE"},{description:"BARGNY"},{description:"DIAMNIADIO"},{description:"JAXAAY NIAKHOURAB"}, {description:"SANGALKAM"},
    {description:"SEBIKOTANE"},{description:"SENDOU"}

    ],
  [
    {description:"DALIFORT"},{description:"DJIDDAH THIAROYE KAO"},{description:"GUINAW RAIL NORD"},{description:"GUINAW RAIL SUD"}, {description:"PIKINE EST"},
    {description:"PIKINE NORD"},{description:"PIKINE OUEST"},{description:"KEUR MASSAR"},{description:"MALIKA"}, {description:"YEUMBEUL NORD"},
    {description:"YEUMBEUL SUD"},{description:"MBAO"},{description:"DIAMAGUENE SICAP MBAO"},{description:"THIAROYE GARE"},{description:"THIAROYE SUR MER"},
    {description:"TIVAVOUANE DIAKSAO"}

  ],
    [
    {description:"DIOURBEL"},{description:"DANKH SENE"},{description:"GADE ESCALE"},{description:"KEUR NGALGOU"}, {description:"NDINDY"},
    {description:"NDOULO"},{description:"NGOHE"},{description:"PATAR"},{description:"TAIBA MOUSTOUPHA"}, {description:"TOCKY GARE"},
    {description:"TOURE MBONDE"}
  ],

    [
    {description:"BAMBEY"},{description:"BABA GARAGE"},{description:"DANGALMA"},{description:"DINGUIRAYE"}, {description:"GAWANE"},
    {description:"KEUR SAMBA KANE"},{description:"LAMBAYE"},{description:"NDONDOL"},{description:"NGOGOM"}, {description:"NGOYE"},
    {description:"THIAKHAR"},{description:"REFANE"}
  ],

    [
    {description:"MBACKE"},{description:"DALLA NGABOU"},{description:"DANDEYE GOUYGUI"},{description:"DAROU NAHIM"}, {description:"DAROU SALAM TYP"},
    {description:"KAEL"},{description:"MADINA"},{description:"MISSIRAH"},{description:"NDIOUMANE"}, {description:"NGHAYE"},
    {description:"SADIO"},{description:"TAIBA THIEKENE"},{description:"TAIF"},{description:"TOUBA FALL"},{description:"TOUBA MBOUL"},{description:"TOUBA MOSQUEE"}
  ],

    [
    {description:"FATICK"},{description:"DIOFIOR"},{description:"DIAKHAO"},{description:"DIAOULE"}, {description:"DIARRERE"},
    {description:"DIOUROUP"},{description:"DJILASS"},{description:"FIMELA"},{description:"LOUL SESSENE"}, {description:"MBELLACADIAO"},
    {description:"NDIOB"},{description:"NGAYOKHEME"},{description:"NIAKHAR"},{description:"PALMARIN FACAO"},{description:"PATAR"},{description:"TATTAGUINE"},{description:"THIARE NDIALGUI"}
  ],

    [
    {description:"FOUNDIOUGNE"},{description:"KARANG POSTE"},{description:"PASSI"},{description:"SOKONE"}, {description:"SOUM"},
    {description:"BASSOUL"},{description:"DIAGANE BARKA"},{description:"DIONEWAR"},{description:"DIOSSONG"},{description:"DJILOR"},
    {description:"DJIRNDA"},{description:"KEUR SALOUM DIANE"},{description:"KEUR SAMBA GUEYE"},{description:"MBAM"},{description:"NIASSENE"},
    {description:"NIORO ALASSANE TALL"},{description:"TOUBACOUTA"}
    ],

    [
    {description:"GOSSAS"},{description:"COLOBANE"},{description:"MBAR"},{description:"NDIENE LAGANE"}, {description:"OUADIOUR"}, {description:"PATAR LIA"}
    ],

    [
    {description:"KAFFRINE"},{description:"NGANDA"},{description:"BOULEL"},{description:"DIAMAGADIO"}, {description:"DIOKOUL MBELBOUCK"}, {description:"PATAR LIA"},
    {description:"GNIBY"},{description:"KAHI"},{description:"KATHIOTE"},{description:"MEDINATOUL SALAM 2"}
    ],
    [
    {description:"BIRKILANE"},{description:"DIAMAL"},{description:"KEUR MBOUCKI"},{description:"MABO"}, {description:"MBEULEUP"}, {description:"NDIOGNICK"},
    {description:"SEGRE GATTA"},{description:"TOUBA MBELLA"}
    ],
    [
    {description:"MALEM HODAR"},{description:"DAROU MINAM"},{description:"DJANKE SOUF"},{description:"KHELCOM"}, {description:"NDIOBENE SAMBA LAMO"}, {description:"NDIOUM NGAINTHE"}, {description:"SAGNA"}
    ],
    [
    {description:"KOUNGHEUL"},{description:"FASS THIEKENE"},{description:"IDA MOURIDE"},{description:"LOUR ESCALE"}, {description:"MAKA YOP"}, {description:"NDIOUM"}, {description:"NGAINTHE PATE"},
    {description:"RIBOT ESCALE"},{description:"SALY ESCALE"}
    ],
    [
    {description:"KAOLACK"},{description:"KAHONE"},{description:"GANDIAYE"},{description:"NDOFFANE"}, {description:"SIBASSOR"}, {description:"DYA"}, {description:"KEUR BAKA"},
    {description:"KEUR SOCE"},{description:"LATMINGUE"},{description:"NDIAFFATE"},{description:"NDIEBEL"},{description:"NDIEDIENG"},{description:"THIARE"},{description:"THIOMBY"}
    ],
    [
    {description:"GUINGUINEO"},{description:"FASS"},{description:"MBOSS"},{description:"DARA MBOSS"}, {description:"KHELCOM BIRAME"}, {description:"NDIAGO"}, {description:"NGAGNICK"},
    {description:"NGATHIE NAOUDE"},{description:"NGELLOU"},{description:"OUROUR"},{description:"PANAL WOLOF"}
    ],
    [
    {description:"NIORO DU RIP"},{description:"KEUR MADIABEL"},{description:"DABALY"},{description:"DAROU SALAM"}, {description:"GAINTE KAYE"}, {description:"KAYEMOR"}, {description:"KEUR MABA DIAKHOU"},
    {description:"KEUR MADONGO"},{description:"MEDINA SABAKH"},{description:"NDRAME ESCALE"},{description:"NGAYENE"},{description:"PAOSKOTO"},{description:"POROKHANE"},{description:"TAIBA NIASSENE"},{description:"WACK NGOUNA"}
    ],
    [
    {description:"KEDOUGOU"},{description:"BANDAFASSI"},{description:"DIMBOLI"},{description:"DINDEFELO"}, {description:"FONGOLIMBI"}, {description:"NINEFECHA"}, {description:"TOMBORONKOTO"}
    ],
    [
    {description:"SALEMATA"},{description:"DAKATELY"},{description:"DAR SALAM"},{description:"ETHIOLO"}, {description:"KEVOYE"}, {description:"OUBADJI"}
    ],
    [
    {description:"SARAYA"},{description:"BEMBOU"},{description:"KHOSSANTO"},{description:"MEDINA BAFFE"}, {description:"MISSIRAH SIRIMANA"}, {description:"SABODOLA"}
    ],
    [
    {description:"KOLDA"},{description:"DABO"},{description:"SALIKEGNE"},{description:"SARE YOBA DIEGA"}, {description:"BAGADAJI"}, {description:"COUMBACARA"},
    {description:"DIALAMBERE"},{description:"DIOULACOLON"},{description:"GUIRO YERO BOCAR"},{description:"MAMPATIM"}, {description:"MEDINA CHERIF"}, {description:"MEDINA EL HADJI"},
     {description:"SARE BIDJI"},{description:"TANKANTO ESCALE"},{description:"THIETTY"}
    ],
    [
    {description:"VELINGARA"},{description:"KOUNKANE"},{description:"BONCONTO"},{description:"KANDIA"}, {description:"KANDIAYE"}, {description:"LINKERING"},
    {description:"MEDINA GOUNASSE"},{description:"NEMATABA"},{description:"OUASSADOU"},{description:"PAKOUR"}, {description:"PAROUMBA"}, {description:"SARE COLI SALLE"},
     {description:"SINTHIANG KOUNDARA"},{description:"DIAOBE KABENDOU"}
    ],
    [
    {description:"MEDINA YORO FOULAH"},{description:"PATA"},{description:"BADION"},{description:"BIGNARABE"}, {description:"BOUROUCO"}, {description:"FAFACOUROU"},
    {description:"KEREWANE"},{description:"KOULINTO"},{description:"NDORNA"},{description:"NIAMING"}
    ],
    [
    {description:"LOUGA"},{description:"NDIAGNE"},{description:"GANDE"},{description:"GUET ARDO"}, {description:"KELLE GUEYE"}, {description:"KEUR MOMAR SARR"},
    {description:"KOKI"},{description:"LEONA"},{description:"NGUER MALAL"},{description:"NGUEUNE SARR"},{description:"NGUIDILE"},{description:"NIOMRE"},
      {description:"PETE OUARACK"},{description:"SAKAL"},{description:"SYER"},{description:"THIAMENE CAYOR"}
    ],
    [
    {description:"LINGUERE"},{description:"DAHRA"},{description:"MBEULEUKHE"},{description:"AFFE DJOLOF"}, {description:"BARKEDJI"}, {description:"BOULAL"},
    {description:"DEALY"},{description:"DODJI"},{description:"GASSANE"},{description:"KAMBE"},{description:"LABGAR"},{description:"MBOULA"},
      {description:"OUARKHOKH"},{description:"SAGATTA DJOLOF"},{description:"TESSEKERE FORAGE"},{description:"THIAMENE PASSE"},
      {description:"THIARGNY"},{description:"THIEL"},{description:"YANG YANG"}
    ],
    [
    {description:"KEBEMER"},{description:"GUEOUL"},{description:"BANDEGNE OUOLOF"},{description:"DAROU MARNANE"}, {description:"DAROU MOUSTI"}, {description:"DIOKOUL NDIAWRIGNE"},
    {description:"DIOKOUL NDIAWRIGNE"},{description:"KAB GAYE"},{description:"KANENE NDIOB"},{description:"LORO"},{description:"MBACKE CAJOR"},{description:"MBADIANE"},
      {description:"NDANDE"},{description:"NDOYENE"},{description:"NGOURANE OUOLOF"},{description:"SAGATA GUETH"},
      {description:"SAM YABAL"},{description:"THIEP"},{description:"THIOLOM FALL"},{description:"TOUBA MERINA"}
    ],
    [
    {description:"MATAM"},{description:"NGUIDJILONE"},{description:"OUROSSOGUI"},{description:"THILOGNE"}, {description:"BOKIDIAVE"}, {description:"DABIA"},
    {description:"DES AGNAM (AGNAM CIVOL)"},{description:"NABADJI CIVOL"},{description:"OGO"},{description:"OREFONDE"}
    ],
    [
    {description:"RANEROU"},{description:"VELINGARA"},{description:"OUDALAYE"},{description:"LOUGRE THIOLY"}
    ],
    [
    {description:"KANEL"},{description:"DEMBANCANE"},{description:"HAMADI HOUNARE"},{description:"ODOBERE"},
    {description:"OUAOUNDE"},{description:"SEMME"},{description:"SINTHIOU BAMAMBE BANADJI"},{description:"AOURE"},
    {description:"BOKILADJI"},{description:"NDENDORY"},{description:"ORKADIERE"},{description:"WOURO SIDY"}
    ],
    [
    {description:"SAINT LOUIS"},{description:"MPAL"},{description:"NDIEBENE GANDIOLE"},{description:"GANDON"},{description:"FASS NGOM"}
    ],
    [
    {description:"PODOR"},{description:"AERE LAO"},{description:"BODE LAO"},{description:"DEMETTE"},{description:"GALOYA TOUCOULEUR"},
    {description:"GOLLERE"},{description:"GUEDE CHANTIER"},{description:"MBOUMBA"},{description:"NDIOUM"},{description:"NIANDANE"},
    {description:"PETE"},{description:"GAMADJI SARE"},{description:"GUEDE VILLAGE"},{description:"DODEL"},{description:"DOUMGA LAO"},
    {description:"FANAYE"},{description:"WALALDE"},{description:"BOKE DIALLOUBE"},{description:"MADINA NDIATHBE"},{description:"MBOLO BIRANE"},
    {description:"MERI"},{description:"NDIAYENE PEINDAO"}
    ],
    [
    {description:"DAGANA"},{description:"GAE"},{description:"NDOMBO SANDJIRY"},{description:"RICHARD TOLL"},{description:"ROSS BETHIO"},
    {description:"ROSSO SENEGAL"},{description:"BOKHOL"},{description:"DIAMA"},{description:"GNITH"},{description:"MBANE"},
    {description:"PETE"},{description:"GAMADJI SARE"},{description:"GUEDE VILLAGE"},{description:"DODEL"},{description:"DOUMGA LAO"},
    {description:"RONKH"}
    ],
    [
    {description:"SEDHIOU"},{description:"MARSSASSOUM"},{description:"DIANAH MALARY"},{description:"SANSAMBA"},{description:"SAME KANTA PEULH"},
    {description:"SAKAR"},{description:"OUDOUCAR"},{description:"KOUSSY"},{description:"DJIREDJI"},{description:"DJIBABOUYA"},
    {description:"DIENDE"},{description:"DIANNAH BA"},{description:"BEMET BIDJINI"},{description:"BAMBALI"}
    ],
    [
    {description:"BOUNKILING"},{description:"MADINA WANDIFA"},{description:"NDIAMACOUTA"},{description:"BOGHAL"},{description:"BONA"},
    {description:"INOR"},{description:"KANDION MANGANA"},{description:"NDIAMALATHIEL"},{description:"TANKON"}
    ],
    [
    {description:"GOUDOMP"},{description:"DIATTACOUNDA"},{description:"SAMINE"},{description:"TANAFF"},{description:"BAGHERE"},
    {description:"DIOUDOUBOU"},{description:"DJIBANAR"},{description:"KAOUR"},{description:"KARANTABA"},{description:"KOLIBANTANG"},
    {description:"MANGAROUNGOU SANTO"},{description:"NIAGHA"},{description:"SIMBANDI BALANTE"},{description:"SIMBANDI BRASSOU"},{description:"YARANG BALANTE"},
    ],
    [
    {description:"TAMBACOUNDA"},{description:"DIALOKOTO"},{description:"KOUSSANAR"},{description:"MAKACOLIBANTANG"},{description:"NDOGA BABACAR"},
    {description:"NETTEBOULOU"},{description:"NIANI TOUCOULEUR"},{description:"SINTHIOU MALEME"}
    ],
    [
    {description:"BAKEL"},{description:"DIAWARA"},{description:"KIDIRA"},{description:"BALLOU"},{description:"BELE"},
    {description:"GABOU"},{description:"GATHIARI"},{description:"MOUDERI"},{description:"SADATOU"},{description:"SINTHIOU FISSA"},{description:"TOUMBOURA"}
    ],
    [
    {description:"KOUMPENTOUM"},{description:"MALEME NIANI"},{description:"BAMBA THIALENE"},{description:"KAHENE"},{description:"KOUTHIA GAYDI"},
    {description:"KOUTHIABA WOLOF"},{description:"MERETO"},{description:"NDAM"},{description:"PASS KOTO"},{description:"PAYAR"}
    ],
    [
    {description:"GOUDIRY"},{description:"KOTHIARY"},{description:"BALA"},{description:"BANI ISRAEL"},{description:"BOUTOUCOUFARA"},
    {description:"BOYNGUEL BAMBA"},{description:"DIANKE MAKHA"},{description:"DOUGUE"},{description:"GOUMBAYEL"},{description:"KOAR"},
    {description:"KOMOTI"},{description:"KOULOR"},{description:"KOUSSAN"},{description:"SINTHIOU BOCAR ALY"},{description:"SINTHIOU MAMADOU BOUBOU"}
    ],
    [
    {description:"THIES EST"},{description:"THIES OUEST"},{description:"THIES NORD"},{description:"DIENDER GUEDJI"},{description:"FANDENE"},
    {description:"KEUR MOUSSA"},{description:"NDIAYENE SIRAKH"},{description:"NGOUNDIANE"},{description:"NOTTO"},{description:"TASSETTE"},
    {description:"THIENABA"},{description:"TOUBA TOUL"},{description:"KAYAR"},{description:"KHOMBOLE"},{description:"POUT"}
    ],
    [
    {description:"DIASS"},{description:"FISSEL"},{description:"MALICOUNDA"},{description:"NDIAGANIAO"},{description:"NGUENIENE"},
    {description:"SANDIARA"},{description:"SESSENE"},{description:"SINDIA"},{description:"JOAL FADIOUTH"},{description:"MBOUR"},
    {description:"NGAPAROU"},{description:"NGUEKHOKH"},{description:"POPENGUINE-NDAYANE"},{description:"SALY PORTUDAL"},{description:"SOMONE"},{description:"THIADIAYE"}
    ],
    [
    {description:"CHERIF LO"},{description:"DAROU KHOUDOSS"},{description:"KOUL"},{description:"MBAYENE"},{description:"MEOUANE"},
    {description:"MERINA DAKHAR"},{description:"MONT ROLLAND"},{description:"NGANDIOUF"},{description:"NIAKHENE"},{description:"NOTTO GOUYE DIAMA"},
    {description:"PAMBAL"},{description:"PEKESSE"},{description:"PIRE GOUREYE"},{description:"TAIBA NDIAYE"},{description:"THILMAKHA"},{description:"MBORO"},
    {description:"MECKHE"},{description:"TIVAOUANE"}
    ],
    [
    {description:"ZIGUINCHOR"},{description:"ADEANE"},{description:"BOUTOUPA CAMARACOUND"},{description:"ENAMPOR"},{description:"NIAGUIS"},
    {description:"NIASSIA"}
    ],
    [
    {description:"OUSSOUYE"},{description:"DIEMBERING"},{description:"OUKOUT"},{description:"SANTHIABA MANJAQUE"}
    ],
    [
    {description:"BIGNONA"},{description:"DIOULOULOU"},{description:"THIONCK ESSYL"},{description:"BALINGORE"},
    {description:"COUBALAN"},{description:"DIEGOUNE"},{description:"DJIBIDIONE"},{description:"DJINAKI"},
    {description:"KAFOUNTINE"},{description:"KARTIACK"},{description:"KATABA 1"},{description:"MANGAGOULACK"},
    {description:"MLOMP"},{description:"NIAMONE"},{description:"OULAMPANE"},{description:"OUONCK"},
    {description:"SINDIAN"},{description:"SUEL"},{description:"TENGHORI"}
    ]



];

  constructor(public nav: NavController,private ftp:FTP,private file:File,private filePath: FilePath,private camera:Camera,private URL:GlobalVariableProvider,private api :ApiProvider,private formbuilder : FormBuilder,private selector:WheelSelector,private nfc :NFC,private store:Storage) {
    let date = new Date();
    let datesuivant =date.setFullYear(date.getFullYear()- this.URL.Ageminimum);
    this.minDate = new Date(datesuivant).toISOString();

  this.datauser = this.formbuilder.group({
    nom: ['', Validators.required],
    prenom: ['', Validators.required],
    telephone: ['', Validators.required],
    departement: ['', Validators.required],
    commune: ['', Validators.required],
    idnfc: ['',Validators.required],
    timestamp: ['',Validators.required],
    datenaissance:['',Validators.required],
    genre:['',Validators.required],
    region:['',Validators.required],
    piece:['',Validators.required],
    cdeao:['',Validators.required]

  });

    this.nfc.addTagDiscoveredListener(() => {
    }, (err) => {
      this.api.showError("Impossible de lire la carte: "+err)
    }).subscribe((event) => {
      //alert('received ndef message. the tag contains: '+ event.tag);
      //alert('decoded tag id'+ this.nfc.bytesToHexString(event.tag.id));
      this.api.showToast("L'id de la carte est recuperé avec succès .")
      this.datauser.controls['idnfc'].setValue(event.tag.id);
      this.datauser.controls['timestamp'].setValue(Date.now());
      this.filename = this.datauser.controls['idnfc'].value+"_"+this.datauser.controls['timestamp'].value+".png";



    })


  }
  connectftp(){

    if(this.photo)
    {
      this.api.afficheloading();
      this.ftp.connect('ftp.ajit.sn', 'ajitsnjgdk', 'Change2018')
        .then((res: any) => {


          this.ftp.upload(this.filepath,"/www/parti/ws/cni/"+this.filename).subscribe(data=>{
            if(data ==1){
              this.register();

            }
          },error => {
            this.api.dismissloadin();
            this.api.showError("Impossible d'envoyer l'image "+JSON.stringify(error))
          })
        })
        .catch((error: any) =>{
          this.api.dismissloadin();
          this.api.showError('Impossible de se connecter au serveur ftp '+JSON.stringify(error) );
        });
    }
    else{
      this.api.showError("Veuillez prendre en photo l'inscrit")
    }


  }
/*  upload() {

    const fileTransfer: FileTransferObject = this.transfer.create();
    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: this.filename,
      headers: {}

  }

this.api.afficheloading();
    fileTransfer.upload(this.filepath, this.URL.URL+"cni", options)
      .then((data) => {
        this.api.dismissloadin();
        alert("okk "+JSON.stringify(data))
      //  this.register();
      }, (err) => {
        this.api.dismissloadin();
        alert("err " +JSON.stringify(err))
      })
  }*/
  formaterdate(date){
    return date.substr(8,2)+"-"+date.substr(5,2)+"-"+date.substr(0,4);

  }

  veriftel()
  {
    let suffix =  this.datauser.controls['telephone'].value.substring(0,2);
    let tabsuffix =['77','70','76','78'];
    this.phoneinvalid = (tabsuffix.indexOf(suffix)===-1 || this.datauser.controls['telephone'].value.length!==9)  ? true :false;

  }
  resetphone(){
    this.phoneinvalid = false;
  }

  // register and go to home page
  register() {
     this.store.get("token").then(token=>{
      if(token!=null){

        this.store.get("idmentor").then(idmentor=>{
          if(idmentor!=null)
          {
            // http://ajit.sn/parrainage/ws/serviceAjoutParrainage/?
            // token=c2fa13ff170d81671ffd64733374bc53a0eae10b
            // &idMentor=1&
            // nfcid=451lbgeAPD14S4EMA&
            // cni=1755197904128&cdeao=45445213654712564
            // &prenom=demba&nom=biteye
            // &telephone=776821478
            // &region=thies&
            // departement=thies&commune=pout&genre=h&datenaissance=05-12-1984&timestamp=1755197904128
            let datenaiss = this.formaterdate(this.datauser.controls['datenaissance'].value);

            let url = this.URL.URL+"serviceAjoutParrainage/?token="+token+"&idMentor="+idmentor+"&nfcid="+this.datauser.controls['idnfc'].value;
            url += "&cni="+encodeURI(this.datauser.controls['piece'].value)+"&cdeao="+encodeURI(this.datauser.controls['cdeao'].value)+"&prenom="+encodeURI(this.datauser.controls['prenom'].value);
            url += "&nom="+encodeURI(this.datauser.controls['nom'].value)+"&telephone="+encodeURI(this.datauser.controls['telephone'].value);
            url += "&region="+encodeURI(this.datauser.controls['region'].value)+"&departement="+encodeURI(this.datauser.controls['departement'].value);
            url += "&commune="+encodeURI(this.datauser.controls['commune'].value)+"&genre="+this.datauser.controls['genre'].value;
            url += "&datenaissance="+encodeURI(datenaiss)+"&timestamp="+encodeURI(this.datauser.controls['timestamp'].value);




            this.api.getdata(url).then(data=>{
              //alert(JSON.stringify(data))
              this.api.dismissloadin();
              let val = JSON.parse(data.data);
              if(val.code=="0")
              {
                this.api.showAlert(val.message);
                this.datauser.reset();
                this.datauser.controls['idnfc'].setValue("");
                this.photo = null;
              }
              else this.api.showError(val.message)


            }).catch(err=>{
              this.api.dismissloadin();

            })
          }

        }).catch(err=>{
          this.api.showError("Impossible de recuperer le idmentor "+JSON.stringify(err));
        })

      }
    }).catch(err=>{
      this.api.showError("Impossible de recuperer le token "+JSON.stringify(err));
    })

  }
  selectionDepartement(){
    this.hideselector();
    this.selector.show({
      title: "Selectionner un département",
      negativeButtonText:"Quitter",
      positiveButtonText :"Choisir",
      items: [
        this.departementsRegion
      ],
    }).then(
      result => {

        let count = 0;
        let sortir : boolean = false;
        for(let i=0; i<this.listedepartements.length;i++)
        {
          for(let j=0;j<this.listedepartements[i].length; j++)
          {

            if(this.listedepartements[i][j].description==result[0].description)
            {
              sortir = true;
              break;
            }
            count ++;
          }
          if(sortir)
            break;
        }

        this.communesdepartement = this.listesCommunes[count];

        this.datauser.controls['departement'].setValue(result[0].description);
        this.datauser.controls['commune'].setValue("");

      }).catch(err=>{


    })
  }
  selectionCommune(){
    this.hideselector();
    this.selector.show({
      title: "Selectionner une commune",
      negativeButtonText:"Quitter",
      positiveButtonText :"Choisir",
      items: [
        this.communesdepartement
      ],
    }).then(
      result => {
        this.datauser.controls['commune'].setValue(result[0].description)
      }).catch(err=>{


    })
  }
  // go to login page
  logout() {
    this.store.remove("user");
    this.nav.setRoot(LoginPage);
  }
  hideselector(){
    this.selector.hideSelector().then((data)=>{
    //  alert(JSON.stringify('sussesss   '+data) )
    }).catch((err)=>{
     // alert(JSON.stringify("Erreur "+err))
    })
  }
  selectionRegion(){
    this.hideselector();
    this.selector.show({
      title: "Selectionner une région",
      negativeButtonText:"Quitter",
      positiveButtonText :"Choisir",
      items: [
        this.listeRegion
      ],
    }).then(
      result => {
        this.datauser.controls['region'].setValue(result[0].description)
        this.departementsRegion = this.listedepartements[result[0].index];
        this.datauser.controls['departement'].setValue("");
        this.datauser.controls['commune'].setValue("");

      }).catch(err=>{


        })
      }
      photographier(){
    /*    if(this.datauser.controls['idnfc'].value==""){
          this.api.showError("Veuillez approchez votre carte d'abord!")
        }
        else {*/

          const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.PNG,
            targetWidth : 180,
            targetHeight : 100,
            correctOrientation:true,
            allowEdit :true,
            mediaType: this.camera.MediaType.PICTURE,

          };

          this.camera.getPicture(options).then((imageData) => {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64 (DATA_URL):
            //this.photo = 'data:image/jpeg;base64,' + imageData;
            //alert(JSON.stringify(imageData))
            //imageData = normalizeURL(imageData)
            // this.photo =  imageData;
              this.photo =  normalizeURL(imageData);
        //    console.log("BAYE DAME+++++"+imageData)
           // this.photo =  imageData.replace(/^file:\/\//, '');
        //    console.log("Photo dame ===>"+this.photo);

            //   this.file.moveFile()
    /*        this.filePath.resolveNativePath(imageData)
              .then((path) => {

                let imagePath = path.substr(0, path.lastIndexOf("/") + 1);
                let imageName = path.substring(path.lastIndexOf("/") + 1, path.length);
                this.filepath = imagePath+""+this.filename;

                this.file.moveFile(imagePath, imageName, imagePath, this.filename)
                  .then(newFile => {
                       //this.photo = newFile;
                   // this.filepath = newFile.nativeURL;

                    //console.log(newFile);
                  })
                  .catch(err => {
                    console.error(err);
                  })
              })
              .catch((err) => {
                console.error(err);
              })*/

          }, (err) => {
            console.log("une belle erreur dame "+JSON.stringify(err))
          });
    //   }
        }


}
