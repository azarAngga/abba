import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { IonicStorageModule  } from '@ionic/storage';
import { FileChooser } from '@ionic-native/file-chooser';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { DocumentViewer } from '@ionic-native/document-viewer';
import { FileOpener } from '@ionic-native/file-opener';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps } from "@ionic-native/google-maps";
import { AndroidPermissions } from '@ionic-native/android-permissions';


import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { DataPage } from '../pages/data/data';
import { MainMenuPage } from '../pages/main-menu/main-menu';
import { BencanaPage } from '../pages/bencana/bencana';
import { PerkembanganBencanaPage } from '../pages/perkembangan-bencana/perkembangan-bencana';
import { PerkembanganPoskoPage } from '../pages/perkembangan-posko/perkembangan-posko';
import { ListOwnerPage } from '../pages/list-owner/list-owner';
import { EditPage } from '../pages/edit/edit';
import { LoginPage } from '../pages/login/login';
import { KontakPage } from '../pages/kontak/kontak';
import { RegisterPage } from '../pages/register/register';
import { TentangPage } from '../pages/tentang/tentang';
import { MapsPage } from '../pages/maps/maps';
import { DesaPage } from '../pages/desa/desa';
import { KecamatanPage } from '../pages/kecamatan/kecamatan';
import { IdBencanaPage } from '../pages/id-bencana/id-bencana';

import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { Device } from '@ionic-native/device';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UriProvider } from '../providers/uri/uri';

@NgModule({
  declarations: [
    MyApp,
    RegisterPage,
    KontakPage,
    MainMenuPage,
    MapsPage,
    HomePage,
    ListOwnerPage,
    BencanaPage,
    PerkembanganBencanaPage,
    PerkembanganPoskoPage,
    DataPage,
    LoginPage,
    ListPage,
    EditPage,
    IdBencanaPage,
    DesaPage,
    KecamatanPage,
    TentangPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    RegisterPage,
    KontakPage,
    MainMenuPage,
    HomePage,
    IdBencanaPage,
    ListOwnerPage,
    MapsPage,
    BencanaPage,
    PerkembanganBencanaPage,
    PerkembanganPoskoPage,
    DataPage,
    LoginPage,
    ListPage,
    EditPage,
    DesaPage,
    KecamatanPage,
    TentangPage
  ],
  providers: [
  AndroidPermissions,
  ScreenOrientation,
  DocumentViewer,
  BarcodeScanner,
  Device,
  FilePath,
  FileOpener,
  File,
  Geolocation,
  Camera,
  FileTransferObject,
  GoogleMaps,
  FileTransfer,
    FileChooser,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UriProvider
  ]
})
export class AppModule {}
