import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {ApiService} from "./services/api-service.service";

declare var google;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title: string = 'Aire';
	// Area 51 coordinates
	lat: number = 37.234894;
	lng: number = -115.81082;

	map: any;
	mapOptions: any;
	latLng: any;
	coordinates: any;
	airInfo: any;
    @ViewChild('map') mapElement: ElementRef;
	constructor(private spinnerService: Ng4LoadingSpinnerService, public apiService: ApiService) {

	}
    ngOnInit() {
		this.map = new google.maps.Map(document.getElementById('map'));
		console.log(this.map);
		this.setCoordinates();
		this.loadMap();
    }
    loadMap() {
		let latLng = new google.maps.LatLng(this.lat, this.lng);

		this.mapOptions = {
			center: latLng,
			zoom: 15,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
		};

		this.map.setOptions(this.mapOptions);
		this.getCurrentLocation();
    }

    getCurrentLocation() {
      let geolocation = navigator.geolocation.getCurrentPosition((resp) => {
        let coordinates = resp.coords;
        return coordinates;
      });
    }

    setCoordinates() {
		let geolocation = navigator.geolocation.getCurrentPosition((resp) => {
			this.coordinates = resp.coords;
		});
	}

    goToCurrentLocation() {
		let geolocation = navigator.geolocation.getCurrentPosition((resp) => {
			this.coordinates = resp.coords;
			this.latLng = new google.maps.LatLng(this.coordinates.latitude, this.coordinates.longitude);
			this.mapOptions = {
				center: this.latLng,
				zoom: 15,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
			};
			this.map.setOptions(this.mapOptions);
			let marker = new google.maps.Marker({
				position: this.latLng,
				title: 'Current location',
				label: 'A'
			});
			marker.setMap(this.map);
		});
    }

    showPollution() {
		let cityCircle = new google.maps.Circle({
			strokeColor: '#FF0000',
			strokeOpacity: 0.8,
			strokeWeight: 2,
			fillColor: '#FF0000',
			fillOpacity: 0.35,
			map: this.map,
			center: this.latLng,
			radius: 200
		});
	}

	getAirInformation() {
		this.goToCurrentLocation();
		if (!this.coordinates) {
			this.setCoordinates();
		}
		this.apiService.get(this.coordinates.latitude, this.coordinates.longitude).subscribe((res) => {
			console.log(res.data);
			this.airInfo = res.data;
			this.spinnerService.hide();
		}, (err) => {
			this.spinnerService.hide();
		});
		 this.spinnerService.hide();
	}

}
