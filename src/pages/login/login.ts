import { Component } from '@angular/core';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Device } from '@ionic-native/device';
import { Events } from 'ionic-angular';

import { MainMenuPage } from '../main-menu/main-menu';
import { Http } from '@angular/http';
import { RegisterPage } from '../register/register';
import { UriProvider } from '../../providers/uri/uri';
import { AndroidPermissions } from '@ionic-native/android-permissions';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
   username: any;
   password: any;
   loader: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http,public alertCtrl: AlertController,
  public loadingCtrl: LoadingController,private device: Device,public storage: Storage,private uri: UriProvider,private androidPermissions: AndroidPermissions,public events: Events) {
    console.log('Version ' + parseInt(this.device.version));
    var int_version = parseInt(this.device.version);

    if(int_version > 5){
      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
        result => alert('Has permission?'+result.hasPermission),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
      );
      this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.GET_ACCOUNTS]);
    }

    this.storage.get('username')
      .then((val) => {
          if(val != undefined){
            this.username = val;
          }
          
      });

     this.storage.get('password')
      .then((val) => {
          if(val != undefined){
            this.password = val;
          }
      }); 
		//console.log(this.uri.url);
//     this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
//       result => alert('Has permission?'+result.hasPermission),
//     err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
// );

//     this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.GET_ACCOUNTS]);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
	actionLogin(){
    this.presentLoading();
		 console.log(this.uri.url+"login.php?username="+this.username+"&password="+this.password);
		 this.http.get(this.uri.url+"login.php?username="+this.username+"&password="+this.password)
      .map(res => res.json())
      .subscribe(data =>{  
        console.log(data);
        if(data.data[0].status == "ok"){
          this.navCtrl.setRoot(MainMenuPage);
          this.setUsername(this.username);
          this.setPassword(this.password);
          this.setIdUser(data.data[0].id_user);    
          this.setImg(data.data[0].img); 
          this.setImg(data.data[0].no_hp); 
          this.events.publish('menu:tampilNama', data.data[0].nama,data.data[0].img,data.data[0].no_hp);
        }else{
           this.showAlert(data.data[0].message);
        }
         this.loader.dismiss();
    },error =>{
		alert(error);
		this.loader.dismiss();
    });
}


   showAlert(x) {
    let alert = this.alertCtrl.create({
      title: 'Mohon Maaf',
      subTitle: x,
      buttons: ['OK']
    });
    alert.present();
  }


  presentLoading() {

    this.loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    this.loader.present();

  }

  actionRegister(){
    this.navCtrl.push(RegisterPage);
  }

  setIdUser(x){
    this.storage.set('id_user',x);
  }

  setUsername(x){
    this.storage.set('username',x);
  }

  setPassword(x){
    this.storage.set('password',x);
  }


  setImg(x){
    this.storage.set('img',x);
  }

}
