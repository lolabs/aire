import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {AgmCoreModule} from '@agm/core';

import { AppComponent } from './app.component';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import {ApiService} from "./services/api-service.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
      AgmCoreModule.forRoot({
          apiKey: 'AIzaSyAFWpnhOaN39nj2IWcxtYGCYjs6CHX5wNk'
      }),
      Ng4LoadingSpinnerModule.forRoot(),
      HttpClientModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
