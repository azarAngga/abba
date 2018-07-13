import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { PerkembanganPoskoPage } from '../perkembangan-posko/perkembangan-posko';
import { PerkembanganBencanaPage } from '../perkembangan-bencana/perkembangan-bencana';
import { UriProvider } from '../../providers/uri/uri';

/**
 * Generated class for the ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {
loader: any;
jumlah_data: any;
jenis_bencana: any;
data_json: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController,public http: Http,public alertCtrl: AlertController,private uri: UriProvider) {
  		 this.navParams.get('jenis_bencana');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
  }

  getData(){
  	this.presentLoading();
  		 console.log(this.uri.url+"get_daftar_laporan.php?jenis_bencana="+this.jenis_bencana);
		 this.http.get(this.uri.url+"get_daftar_laporan.php?jenis_bencana="+this.jenis_bencana)
      .map(res => res.json())
      .subscribe(data =>{
      		this.data_json = data.data;
      		try{
      			this.jumlah_data = data.data.length;
      		}catch (err){

      		}
      		
      		console.log("panjang length"+ this.jumlah_data);
         this.loader.dismiss();

    },error =>{

    });
  }

  actionPerkembangan(id_bencana){
  	this.navCtrl.push(PerkembanganBencanaPage,{id_bencana:id_bencana})
  }

  actionPerkembanganPosko(id_bencana){
  	this.navCtrl.push(PerkembanganPoskoPage,{id_bencana:id_bencana})
  }

  showAlert(x) {
    let alert = this.alertCtrl.create({
      title: 'Berhasil',
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

}
