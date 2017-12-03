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

	AQI_EXCELLENT: string = "excellent";
	AQI_MODERATE: string = "moderate";
	AQI_DANGEROUS_SG: string = "dangerous-sg";
	AQI_DANGEROUS: string = "dangerous";
	AQI_VERY_DANGEROUS: string = "very-dangerous";
	AQI_HIGH_RISK: string = "high-risk";

    @ViewChild('map') mapElement: ElementRef;
	constructor(private spinnerService: Ng4LoadingSpinnerService, public apiService: ApiService) {

	}
    ngOnInit() {
		this.map = new google.maps.Map(document.getElementById('map'));
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

    showPollution(aqi = null) {
		if (aqi) {
			var color = this.getRadiusColor(aqi);
		} else {
			var color = '#FF0000';
		}
		let cityCircle = new google.maps.Circle({
			strokeColor: color,
			strokeOpacity: 0.8,
			strokeWeight: 2,
			fillColor: color,
			fillOpacity: 0.35,
			map: this.map,
			center: this.latLng,
			radius: 1000
		});

	}

	getAirInformation() {
		this.spinnerService.show();
		this.goToCurrentLocation();
		if (!this.coordinates) {
			this.setCoordinates();
		}
		this.apiService.get(this.coordinates.latitude, this.coordinates.longitude).subscribe((res) => {
			this.airInfo = res.data;
			this.spinnerService.hide();
			this.showPollution(this.airInfo.aqi);
		}, (err) => {
			this.spinnerService.hide();
		}, () => {
			this.spinnerService.hide();
		});
	}

	getColor(aquiVal) {
		let styleClass = "row aqi ";
		if (aquiVal >= 0 && aquiVal <= 50) {
			return styleClass + this.AQI_EXCELLENT;
		}else if (aquiVal >= 51 && aquiVal <= 100) {
			return styleClass + this.AQI_MODERATE;
		} else if (aquiVal >= 101 && aquiVal <= 150) {
			return styleClass + this.AQI_DANGEROUS_SG;
		} else if (aquiVal >= 151 && aquiVal <= 200) {
			return styleClass + this.AQI_DANGEROUS;
		} else if (aquiVal >= 201 && aquiVal <= 300) {
			return styleClass + this.AQI_VERY_DANGEROUS;
		}else if (aquiVal >= 301) {
			return styleClass + this.AQI_HIGH_RISK;
		}

	}

	getRadiusColor(aquiVal) {
		if (aquiVal >= 0 && aquiVal <= 50) {
			return "#009966";
		}else if (aquiVal >= 51 && aquiVal <= 100) {
			return "#ffde33";
		} else if (aquiVal >= 101 && aquiVal <= 150) {
			return "#ff9933";
		} else if (aquiVal >= 151 && aquiVal <= 200) {
			return "#cc0033";
		} else if (aquiVal >= 201 && aquiVal <= 300) {
			return "very-dangerous";
		}else if (aquiVal >= 301) {
			return "#660099";
		}

	}
}
