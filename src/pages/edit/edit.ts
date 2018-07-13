import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { UriProvider } from '../../providers/uri/uri';
/**
 * Generated class for the EditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage {
	loader: any;
	jenis_bencana: any;
	waktu_bencana: any;
	tanggal_bencana: any;
	dusun: any;
	rt: any;
	rw: any;
	desa: any;
	kecamatan: any;
	penyebab: any;
	nama_bencana: any;
	kronologi_kejadian: any;
	id_bencana: any;
	v_id_bencana: any;
	jml_meninggal: any;
	jml_luka_berat: any;
	jml_hilang: any;
	pengungsi_jiwa: any;
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
	pengungsi_kk: any;
	id_laporan: any;
  id_user: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public http: Http
    ,public storage: Storage
	,private uri: UriProvider,
    public alertCtrl: AlertController) {
 	//var date1  = new Date("12-12-2018 01:00:00").toISOString();
 	//console.log(date1);
 	//this.tanggal_bencana = date1;
 	//var d = new Date().toISOString();
	//this.waktu_bencana = date1; 
	//this.navParams.get("id_laporan");
  this.storage.get('id_user')
      .then((val) => {
          this.id_user = val;
      });
	this.id_bencana = this.navParams.get("id_bencana");;
 	this.getData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPage');
  }

  showAlert(x) {
    let alert = this.alertCtrl.create({
      title: 'Berhasil',
      subTitle: x,
      buttons: ['OK']
    });
    alert.present();
  }

  getData(){
  	this.presentLoading();
  		 console.log(this.uri.url+"get_bencana.php?id_bencana="+this.id_bencana);
		 this.http.get(this.uri.url+"get_bencana.php?id_bencana="+this.id_bencana)
      .map(res => res.json())
      .subscribe(data =>{
      	//var satu = "12-12-2018";
      	//var dua = "01:00:00";
      	//var date1  = new Date(satu+" "+dua).toISOString();
 		console.log(data.data[0].tanggal_laporan);
      	//var date1  = new Date(data.data[0].jam+" "+data.data[0].tanggal_laporan).toISOString();
      	//console.log(mydate.toDateString());
      	 this.penyebab = data.data[0].penyebab; 	
      	 this.jenis_bencana = data.data[0].jenis_bencana; 	
      	 //this.waktu_bencana = date1; 	
      	 //this.tanggal_bencana = date1; 	
      	 this.dusun = data.data[0].dusun; 	
      	 this.rt = data.data[0].rt; 	
      	 this.rw = data.data[0].rw; 	
      	 this.desa = data.data[0].desa; 	
      	 this.kecamatan = data.data[0].kecamatan; 	
      	 this.penyebab = data.data[0].penyebab; 	
      	 this.nama_bencana = data.data[0].nama_bencana; 	
      	 this.kronologi_kejadian = data.data[0].kronologi_kejadian; 	
      	 this.id_bencana = data.data[0].id_bencana; 	
      	 this.jml_meninggal = data.data[0].meninggal; 	
      	 this.jml_luka_berat = data.data[0].luka_berat; 	
      	 this.jml_hilang = data.data[0].hilang; 	
      	 this.pengungsi_jiwa = data.data[0].mengungsi_jiwa; 	
      	 this.pengungsi_kk = data.data[0].mengungsi_kk; 	
      	 this.rumah = data.data[0].rumah; 	
      	 this.kantor = data.data[0].kantor; 	
      	 this.kesehatan = data.data[0].fasilitas_kesehatan; 	
      	 this.pendidikan = data.data[0].fasilitas_pendidikan; 	
      	 this.umum = data.data[0].fasilitas_umum; 	
      	 this.ibadah = data.data[0].sarana_ibadah; 	
      	 this.jembatan = data.data[0].jembatan; 	
      	 this.jalan = data.data[0].jalan; 	
      	 this.kerusakan = data.data[0].kerusakan; 	
      	 this.kerugian = data.data[0].kerugian; 	
      	 this.v_id_bencana = this.id_bencana;
         this.loader.dismiss();
    },error =>{
      
    });
  }

  PutData(){
  	this.presentLoading();
  	var url = "jam="+this.waktu_bencana
  		+"&tanggal="+this.tanggal_bencana
  		+"&penyebab="+this.penyebab
  		+"&jenis_bencana="+this.jenis_bencana
  		+"&kronologi_kejadian="+this.kronologi_kejadian
  		+"&lokasi="+this.dusun+","+this.rt+","+this.rw+","+this.desa+","+this.kecamatan
  		+"&nama_bencana="+this.nama_bencana
  		+"&jumlah_meninggal="+this.jml_meninggal
  		+"&jumlah_luka_berat="+this.jml_luka_berat
  		+"&jumlah_korban_hilang="+this.jml_hilang
  		+"&pengungsi_jiwa="+this.pengungsi_jiwa
  		+"&pengungsi_kk="+this.pengungsi_kk
  		+"&rumah="+this.rumah
  		+"&kantor="+this.kantor
  		+"&kesehatan="+this.kesehatan
  		+"&pendidikan="+this.pendidikan
  		+"&umum="+this.umum
  		+"&ibadah="+this.ibadah
  		+"&jembatan="+this.jembatan
  		+"&jalan="+this.jalan
  		+"&kerusakan="+this.kerusakan
  		+"&id_laporan="+this.id_laporan
  		+"&id_bencana="+this.id_bencana
  		+"&kerugian="+this.kerugian;
  		this.http.get(this.uri.url+"update_bencana.php?"+url)
      	.map(res => res.json())
      	.subscribe(data =>{
      		//var date1  = new Date(satu+" "+dua).toISOString();
        this.loader.dismiss();
    },error =>{

    });
  }

   presentLoading() {

    this.loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    this.loader.present();

  }

}