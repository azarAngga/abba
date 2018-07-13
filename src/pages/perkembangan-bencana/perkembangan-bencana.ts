import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UriProvider } from '../../providers/uri/uri';
import { IdBencanaPage } from '../id-bencana/id-bencana';

/**
 * Generated class for the PerkembanganBencanaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-perkembangan-bencana',
  templateUrl: 'perkembangan-bencana.html',
})
export class PerkembanganBencanaPage {
	loader: any;
	id_bencana: any;
	jml_meninggal: any;
  jml_luka_berat: any;
  jml_luka_sedang: any;
	jml_luka_ringan: any;
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
  id_user: any;
	json_data: any;

  balita_l: any;
  anak_l: any;
  dewasa_l: any;
  lansia_l: any;

  balita_p: any;
  anak_p: any;
  dewasa_p: any;
  lansia_p: any;

  upaya: any;

  constructor(public navCtrl: NavController,public storage: Storage, public navParams: NavParams,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,public http: Http,public alertCtrl: AlertController,private uri: UriProvider) {
  	this.id_bencana = this.navParams.get("id_bencana");
    this.getDataId();
     this.storage.get('id_user')
      .then((val) => {
          this.id_user = val;
      });
  	console.log(this.id_bencana);
  	
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerkembanganBencanaPage');
  }

   putData(){

  	this.presentLoading();
  		
      console.log(this.uri.url+"put_perkembangan_bencana.php?"+
          "&balita_l="+this.balita_l+
          "&anak_l="+this.anak_l+
          "&dewasa_l="+this.dewasa_l+
          "&lansia_l="+this.lansia_l+

          "&balita_p="+this.balita_p+
          "&anak_p="+this.anak_p+
          "&dewasa_p="+this.dewasa_p+
          "&lansia_p="+this.lansia_p+

          "&upaya="+this.upaya+

          "&id_bencana="+this.id_bencana+
      "&jml_meninggal="+this.jml_meninggal+
      "&id_user="+this.id_user+
      "&jml_luka_berat="+this.jml_luka_berat+
      "&jml_luka_sedang="+this.jml_luka_sedang+
      "&jml_luka_ringan="+this.jml_luka_ringan+
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
      "&kerugian="+this.kerugian);
		 this.http.get(this.uri.url+"put_perkembangan_bencana.php?"+
          "&balita_l="+this.balita_l+
          "&anak_l="+this.anak_l+
          "&dewasa_l="+this.dewasa_l+
          "&lansia_l="+this.lansia_l+

          "&balita_p="+this.balita_p+
          "&anak_p="+this.anak_p+
          "&dewasa_p="+this.dewasa_p+
          "&lansia_p="+this.lansia_p+

          "&upaya="+this.upaya+

      		"&id_bencana="+this.id_bencana+
      "&jml_meninggal="+this.jml_meninggal+
		 	"&id_user="+this.id_user+
      "&jml_luka_berat="+this.jml_luka_berat+
      "&jml_luka_sedang="+this.jml_luka_sedang+
		 	"&jml_luka_ringan="+this.jml_luka_ringan+
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

  getDataId(){

    this.presentLoading();
      
     this.http.get(this.uri.url+"get_id_bencana.php")
      .map(res => res.json())
      .subscribe(dat =>{
          this.loader.dismiss();
        this.json_data = dat.data;
        console.log(this.json_data);
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

  // presentIdModal(){
  //     let profileModal = this.modalCtrl.create(IdBencanaPage);
  //     profileModal.onDidDismiss(data => {
  //        console.log("inii"+data.data);
  //        this.desa = data.data;
  //   });
  //     profileModal.present();
  // }

 
}
