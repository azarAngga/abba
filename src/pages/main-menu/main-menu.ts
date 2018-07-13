import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BencanaPage } from '../bencana/bencana';
import { PerkembanganBencanaPage } from '../perkembangan-bencana/perkembangan-bencana';
import { PerkembanganPoskoPage } from '../perkembangan-posko/perkembangan-posko';
import { ListPage } from '../list/list';
import { EditPage } from '../edit/edit';
import { ListOwnerPage } from '../list-owner/list-owner';
import { KontakPage } from '../kontak/kontak';
import { TentangPage } from '../tentang/tentang';
import { LoginPage } from '../login/login';
/**
 * Generated class for the MainMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-main-menu',
  templateUrl: 'main-menu.html',
})
export class MainMenuPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainMenuPage');
  }

  actionLaporan(){
  		this.navCtrl.push(BencanaPage);
  }

  actionlaporanPerkembangan(){
  		this.navCtrl.push(PerkembanganBencanaPage);
  }

  actionlaporanPerkembanganPosko(){
      this.navCtrl.push(PerkembanganPoskoPage);
  }
  actionList(){
      this.navCtrl.push(ListPage);
  }
  actionEdit(){
    this.navCtrl.push(EditPage);
  }

  actionListOwner(){
    this.navCtrl.push(ListOwnerPage);
  }

  actionKontak(){
    this.navCtrl.push(KontakPage);
  }
  actionTentang(){
    this.navCtrl.push(TentangPage);
  }

  actionLogout(){
    this.navCtrl.setRoot(LoginPage);
  }
}
