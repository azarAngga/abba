import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { File } from '@ionic-native/file';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { UriProvider } from '../../providers/uri/uri';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
 
 declare var cordova: any;

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  loader: any;
  nama_lengkap: any;
  no_telp: any;
  username: any;
  password: any;
  re_password: any;
  
  path: any = "-";
  nama_file: any;
  id_user: any = "001";
 
  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController,public http: Http,public alertCtrl: AlertController,public TransferObject: FileTransferObject,
  private transfer: FileTransfer,private file: File,private filePath: FilePath,private camera: Camera,private uri: UriProvider) {
	  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  showAlert(x) {
    let alert = this.alertCtrl.create({
      title: 'Berhasil',
      subTitle: x,
      buttons: ['OK']
    });
    alert.present();
  }

  putData(){

  	this.presentLoading();
  		
  		if(this.password != this.re_password){
  			this.showAlert("Password dan Re-password tidak sama");
  		}else{
  			this.http.get(this.uri.url+"put_register.php?"+
		      		"&nama_lengkap="+this.nama_lengkap+
				 	"&username="+this.username+
				 	"&no_telp="+this.no_telp+
				 	"&foto="+this.nama_file+
				 	"&password="+this.password)
		      .map(res => res.json())
		      .subscribe(data =>{  
		        console.log(data);
		        	this.navCtrl.pop();
		        	this.showAlert(data.message);
		         this.loader.dismiss();
		    },error =>{

		    });	
  		}

		
  }

	/* photo */
	
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
        this.nama_file = newFileName;
		this.upload(this.nama_file,this.path);
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
  
  /* --photo */
  


   presentLoading() {

    this.loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    this.loader.present();

  }



}
