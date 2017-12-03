import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {AgmCoreModule} from '@agm/core';

import { AppComponent } from './app.component';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
      AgmCoreModule.forRoot({
          apiKey: 'AIzaSyAFWpnhOaN39nj2IWcxtYGCYjs6CHX5wNk'
      }),
      Ng4LoadingSpinnerModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
