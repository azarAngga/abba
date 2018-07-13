import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ViewController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { UriProvider } from '../../providers/uri/uri';
/**
 * Generated class for the DesaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-desa',
  templateUrl: 'desa.html',
})
export class DesaPage {
  nama_desa: any;
  items: any;
  json_data_desa: any;
  action: any;
  kec: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http,public viewCtrl: ViewController,private uri: UriProvider) {
    this.action = this.navParams.get('action');
  	this.kec = this.navParams.get('kec');
 	this.loadData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DesaPage');
  }

  loadData(){
    var ur;
    if(this.action =="1"){
      ur = "get_loc_country.php?kec="+this.kec;  
    }else{
      ur = "get_loc_country.php";
    }
    
    console.log(this.uri.url+ur);
  	this.http.get(this.uri.url+ur)
     // this.http.get("http://localhost/bencana/get_loc_country.php")
      .map(res => res.json())
      .subscribe(data => {
      	if(this.action == '1'){
      		this.nama_desa = data.data_desa;
      		this.json_data_desa = data.desa;
      	}else{
			this.nama_desa = data.data_kecamatan;
      		this.json_data_desa = data.kecamatan;
      	}
      	
      	this.initializeItems();
      });
  }

  initializeItems() {
    this.items = this.json_data_desa;
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;
    //console.log("search"+this.items);

    // if the value is an empty string don't filter the items

    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        try{
           return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
        }catch(err){
           return "error"; 
        }
      })
    }
  }

 dismiss(x) {
   let data = { 'data': x };
   console.log('tset'+x);
   this.viewCtrl.dismiss(data);
 }

}
