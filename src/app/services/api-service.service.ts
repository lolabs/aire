import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Ng4LoadingSpinnerService} from "ng4-loading-spinner";

@Injectable()
export class ApiService {

	public apiURL = "https://api.waqi.info/feed/";
	public static TOKEN = "9996aaf77be1dde23dcdd11d2a0574be0a29fcc8";

	constructor(public http: HttpClient, public spinnerService: Ng4LoadingSpinnerService) {
	  console.log("service started");
    }

	get(lat, lng): Observable<any> {
		return this.http.get(this.apiURL + "geo:" + lat + ";" + lng + "/?token=" + ApiService.TOKEN).map((res) => {
            return res;
		});
	}

}
