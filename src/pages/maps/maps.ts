import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,Platform  } from 'ionic-angular';
import { GoogleMaps, GoogleMap, GoogleMapsEvent,GoogleMapOptions,LatLng } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { Events } from 'ionic-angular';


/**
 * Generated class for the MapsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html',
})
export class MapsPage {
	map: GoogleMap;
	koordinat: any;
	latitude: any;
	longitude: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private geolocation: Geolocation,public viewCtrl: ViewController,public platform: Platform,public events: Events) {
 	
  }

  ionViewDidLoad() {
  	 this.platform.ready().then(() => {
  		this.loadMap();
    	console.log('ionViewDidLoad MapsPage');	 	
  	 });
  	
  }

  carrentLocation(){
  	this.geolocation.getCurrentPosition().then((resp) => {
	 // resp.coords.latitude
	 // resp.coords.longitude

	 this.map.moveCamera({
	  target: {lat: resp.coords.latitude, lng: resp.coords.longitude},
	  zoom: 17,
	  tilt: 60,
	  bearing: 140,
	  duration: 5000
	}).then(() => {
	  //alert("Camera target has been changed");
	});
		
	 //console.log("koordinat"+resp.coords.longitude);
	}).catch((error) => {
	  console.log('Error getting location', error);
	  
	});
	
	
	let watch = this.geolocation.watchPosition();
	watch.subscribe((data) => {
	 console.log("koordinat"+data.coords.longitude);
	 // data can be a set of coordinates, or an error (if an error occurred).
	 // data.coords.latitude
	 // data.coords.longitude
	});

  }

  loadMap() {

    // Create a map after the view is ready and the native platform is ready.
    let options: GoogleMapOptions = {
      controls: {
        compass: true,
        myLocation: true,
        myLocationButton: true,
        mapToolbar: true
      }
    };

    this.map = GoogleMaps.create('map_canvas',options);

    this.map.moveCamera({
	  target: {lat: -6.175542, lng: 106.827206},
	  zoom: 17,
	  tilt: 60,
	  bearing: 140,
	  duration: 5000
	}).then(() => {
	  //alert("Camera target has been changed");
	});

	this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe((params: any[]) => {
	  let latLng: LatLng = params[0];
	  //alert("koordinat : "+latLng.lat+","+latLng.lng);
	  this.koordinat = latLng.lat+","+latLng.lng;
	  this.latitude = latLng.lat;
	  this.longitude = latLng.lng;
	  this.map.clear();
	  this.map.addMarker({
	    position: latLng
	  });

	});

	this.carrentLocation();

    // No longer wait GoogleMapsEvent.MAP_READY event
    // ( except you use map.getVisibleRegion() )
  }

  onMapClick(params: any[]) {
	  let latLng: LatLng = params[0];
	  let map: GoogleMap = params[1];  // <-- You can get the target of MAP_CLICK event

	  map.addMarker({
	    position: latLng
	  });
	}

	actionParse(){
		this.navCtrl.pop();
		//let data = { 'foo': 'bar' };
   		//this.viewCtrl.dismiss(data);
   		this.events.publish('maps:init', this.latitude, this.longitude);

	}



}
