import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { UriProvider } from '../../providers/uri/uri';

/**
 * Generated class for the PerkembanganPoskoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-perkembangan-posko',
  templateUrl: 'perkembangan-posko.html',
})
export class PerkembanganPoskoPage {
	loader: any;
	id_bencana: any;
	jml_meninggal: any;
	jml_luka_berat: any;
	jml_hilang: any;
	pengungsi_jiwa: any;
	pengungsi_kk: any;
	rumah: any;
	kantor: any;
	kesehatan: any;
	pendidikan: any;
	umum: any;
	ibadah: any;
	jembatan: any;
	jalan: any;
	kerusakan: any;
	kerugian: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController,public http: Http,public alertCtrl: AlertController,private uri: UriProvider) {
    this.id_bencana = this.navParams.get("id_bencana");
  	console.log(this.id_bencana);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerkembanganPoskoPage');
  }

  putData(){

  	this.presentLoading();
  		
		 this.http.get(this.uri.url+"put_perkembangan_posko.php?"+
      		"&id_bencana="+this.id_bencana+
		 	"&jml_meninggal="+this.jml_meninggal+
		 	"&jml_luka_berat="+this.jml_luka_berat+
		 	"&jml_korban_hilang="+this.jml_hilang+
		 	"&jml_pengungsi_jiwa="+this.pengungsi_jiwa+
		 	"&jml_pengungsi_kk="+this.pengungsi_kk+
		 	"&rumah="+this.rumah+
		 	"&kantor="+this.kantor+
		 	"&kesehatan="+this.kesehatan+
		 	"&pendidikan="+this.pendidikan+
		 	"&umum="+this.umum+
		 	"&ibadah="+this.ibadah+
		 	"&jembatan="+this.jembatan+
		 	"&jalan="+this.jalan+
		 	"&kerusakan="+this.kerusakan+
		 	"&kerugian="+this.kerugian)
      .map(res => res.json())
      .subscribe(data =>{
        console.log(data);
        	this.navCtrl.pop();
        	this.showAlert(data.data[0].message);
         this.loader.dismiss();
    },error =>{

    });
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
