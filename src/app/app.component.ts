import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';

import { LoginPage } from '../pages/login/login';
import { MainMenuPage } from '../pages/main-menu/main-menu'; 
import { BencanaPage } from '../pages/bencana/bencana';
import { PerkembanganBencanaPage } from '../pages/perkembangan-bencana/perkembangan-bencana';
import { PerkembanganPoskoPage } from '../pages/perkembangan-posko/perkembangan-posko';
import { KontakPage } from '../pages/kontak/kontak';
import { RegisterPage } from '../pages/register/register';
import { TentangPage } from '../pages/tentang/tentang';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { EditPage } from '../pages/edit/edit';
import { MapsPage } from '../pages/maps/maps';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  nama: any;
  jabatan: any; 
  foto: any;
  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,public storage: Storage,public events: Events) {
    this.initializeApp();
    this.events.subscribe('menu:tampilNama', (nama,foto,no_hp) => {
        this.nama = nama;
        this.foto = foto;
        this.jabatan = no_hp;
    });

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.rootPage = LoginPage;
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
