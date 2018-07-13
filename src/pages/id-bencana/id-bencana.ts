import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { UriProvider } from '../../providers/uri/uri';

/**
 * Generated class for the IdBencanaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-id-bencana',
  templateUrl: 'id-bencana.html',
})
export class IdBencanaPage {

 nama_desa: any;
  items: any;
  json_data_desa: any;
  action: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http,public viewCtrl: ViewController,private uri: UriProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IdBencanaPage');
  }

  loadData(){
  	this.http.get(this.uri.url+"get_id_bencana.php")
     // this.http.get(this.uri.url+"get_id_bencana.php")
      .map(res => res.json())
      .subscribe(data => {
      		this.nama_desa = data.data;
      		this.json_data_desa = data.id_nama;
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
