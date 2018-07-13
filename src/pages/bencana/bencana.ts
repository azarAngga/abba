import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ModalController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
import { File } from '@ionic-native/file';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { UriProvider } from '../../providers/uri/uri';
import { DesaPage } from '../desa/desa';
import { MapsPage } from '../maps/maps';
import { Events } from 'ionic-angular';

/**
 * Generated class for the BencanaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 declare var cordova: any;


@Component({
  selector: 'page-bencana',
  templateUrl: 'bencana.html',
})
export class BencanaPage {
	loader: any;
	jenis_bencana: any;
	waktu_bencana: any;
	tanggal_bencana: any;
	dusun: any;
	koordinat: any;

  rt: any;
  rw: any;
	
  desa: any;
	kecamatan: any;
	penyebab: any;
	nama_bencana: any;
  kronologi_kejadian: any;
  kebutuhan_darurat: any;
  upaya_sementara: any;

  path: any = "-";
  nama_file: any;
  id_user: any = "001";
  latitude: any;
  longitude: any;
  json_bencana: any;
  daerah: any = "-";
  
  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController,public http: Http,public alertCtrl: AlertController,
  public TransferObject: FileTransferObject,public storage: Storage,public modalCtrl: ModalController,public events: Events,
  private transfer: FileTransfer,private file: File,private filePath: FilePath,
  private geolocation: Geolocation,private camera: Camera,private uri: UriProvider
  ){

    //this.waktu_bencana = new Date().toISOString();
    this.tanggal_bencana = new Date().toISOString();


	  this.loadNamaBencana();
    this.events.subscribe('maps:init', (latitude, longitude) => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      //alert(latitude);
      this.koordinat = latitude+","+longitude;
      this.latitude = latitude;
      this.longitude = longitude;
      this.getLocation();
    });

	  this.geolocation.getCurrentPosition().then((resp) => {
		this.latitude = resp.coords.latitude;
		this.longitude = resp.coords.longitude;
	 // resp.coords.latitude
	 // resp.coords.longitude
		this.getLocation();
		this.koordinat = this.latitude+","+this.longitude;
	 console.log("koordinat"+resp.coords.longitude);
	}).catch((error) => {
	  console.log('Error getting location', error);
	  this.koordinat = "-";
	});
	
	let watch = this.geolocation.watchPosition();
	watch.subscribe((data) => {
		console.log("koordinat"+data.coords.longitude);	
		if(this.daerah == "-"){
      this.latitude = data.coords.latitude;
      this.longitude = data.coords.longitude;
      this.koordinat = this.latitude+","+this.longitude;
      this.getLocation();
    }

	 // data can be a set of coordinates, or an error (if an error occurred).
	 // data.coords.latitude
	 // data.coords.longitude
	});
	  
     this.storage.get('id_user')
      .then((val) => {
          this.id_user = val;
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BencanaPage');
  }

presentModal() {
     //let profileModal = this.modalCtrl.create(MapsPage);
     //profileModal.onDidDismiss(data => {
     //  console.log(data);
     //});
     //profileModal.present();
     this.navCtrl.push(MapsPage);
  }

  fotoAction(i){
      this.takePicture(this.camera.PictureSourceType.CAMERA,i);
  }

  public takePicture(sourceType,i) {
      // Create options for the Camera Dialog
        var options = {
          quality: 100,
          sourceType: sourceType,
          saveToPhotoAlbum: false,
          correctOrientation: true
      };

        // Get the data of an image
        this.camera.getPicture(options).then((imagePath) => {
          // Special handling for Android library
          
            var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
            var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName(),i);
          
        }, (err) => {
          //this.presentToast('Error while selecting image.');
        });
    }

    private createFileName() {
      var d = new Date(),
      n = d.getTime(),
      newFileName =  n + ".jpg";
      return newFileName;
    }

    // Copy the image to a local folder
    private copyFileToLocalDir(namePath, currentName, newFileName,i) {
      this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
        this.path = cordova.file.dataDirectory + newFileName;
        this.nama_file = this.id_user+"_"+newFileName;
      }, error => {
        //this.presentToast('Error while storing file.');
      });
    }

    upload(nama,path){
      var options = {
        fileKey: "file",
        fileName: nama,
        chunkedMode: false,
        mimeType: "multipart/form-data",
        params : {'fileName': nama}
      };
     
      //var url = this.anyUrl.url+"upload.php";
      var url = this.uri.url+"upload.php";
    console.log("urlfoto","url"+url);
      const fileTransfer: FileTransferObject = this.transfer.create();
    
     
      //Use the FileTransfer to upload the image
      fileTransfer.upload(path, url, options,true).then(data => {

      }, err => {
       this.path ="schoon.jpg";
    });
    }

	putData(){
    this.upload(this.nama_file,this.path);
  	this.presentLoading();
  	 console.log(this.uri.url+"put_bencana.php?"+
      "&jenis_bencana="+this.jenis_bencana+
      "&tanggal="+this.tanggal_bencana+
      "&latitude="+this.latitude+
      "&longitude="+this.longitude+
      "&daerah="+this.daerah+
      "&penyebab="+this.penyebab+
      "&id_user="+this.id_user+
      "&foto="+this.nama_file+
      "&nama_bencana="+this.nama_bencana+
      "&kebutuhan_darurat="+this.kebutuhan_darurat+
      "&upaya_sementara="+this.upaya_sementara+
      "&lokasi="+this.rt+","+this.rw+","+this.desa+","+this.kecamatan+
      "&jam="+this.waktu_bencana+
      "&kecamatan="+this.kecamatan+
      "&desa="+this.desa+
      "&kronologi_kejadian="+this.kronologi_kejadian);
		 this.http.get(this.uri.url+"put_bencana.php?"+
      "&jenis_bencana="+this.jenis_bencana+
		 	"&tanggal="+this.tanggal_bencana+
      "&latitude="+this.latitude+
      "&longitude="+this.longitude+
      "&daerah="+this.daerah+
      "&penyebab="+this.penyebab+
      "&id_user="+this.id_user+
      "&foto="+this.nama_file+
      "&nama_bencana="+this.nama_bencana+
      "&kebutuhan_darurat="+this.kebutuhan_darurat+
		 	"&upaya_sementara="+this.upaya_sementara+
		 	"&lokasi="+this.rt+","+this.rw+","+this.desa+","+this.kecamatan+
      "&jam="+this.waktu_bencana+
      "&kecamatan="+this.kecamatan+
		 	"&desa="+this.desa+
      "&kronologi_kejadian="+this.kronologi_kejadian
		 	)
      .map(res => res.json())
      .subscribe(data =>{  
        console.log(data);
        	this.navCtrl.pop();
        	this.showAlert(data.data[0].message);
         this.loader.dismiss();
    },error =>{

    });
  }
  
  getLocation(){
    	
		 this.http.get(this.uri.url+"get_location.php?"+
      "&latitude="+this.latitude+
      "&longitude="+this.longitude
		 	)
      .map(res => res.json())
      .subscribe(data =>{  
		this.daerah = data.alamat;
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


  presentDesaModal() {
      let profileModal = this.modalCtrl.create(DesaPage,{action : '1',kec : this.kecamatan});
      profileModal.onDidDismiss(data => {
         console.log("inii"+data.data);
         this.desa = data.data;
    });
      profileModal.present();
  }

  presentKecamatanModal() {
    console.log("inii");
      let profileModal = this.modalCtrl.create(DesaPage,{action : '2'});
      profileModal.onDidDismiss(data => {
         console.log("inii"+data.data);
         this.kecamatan = data.data;
    });
      profileModal.present();
  }

  loadNamaBencana(){
    this.http.get(this.uri.url+"get_nama_bencana.php")
      //this.http.get("http://localhost/bencana/get_nama_bencana.php")
      .map(res => res.json())
      .subscribe(data => {
        this.json_bencana = data.data_bencana;
      });
  }




}
