import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { routing,
         appRoutingProviders } from './app.routing';

import *as firebase from 'firebase';
import { AngularFireModule } from 'angularfire2';

import { CoreModule } from './shared/core/core.module';

const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyCdBSHSDDXoZdDR7BCxr6-XJR2lvfBY2i4',
  authDomain: 'isecrevault-webapp-ng2.firebaseapp.com',
  databaseURL: 'https://isecrevault-webapp-ng2.firebaseio.com',
  storageBucket: 'isecrevault-webapp-ng2.appspot.com'
}

@NgModule({
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    CommonModule,
    FormsModule,
    routing,
    CoreModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    appRoutingProviders
  ],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {

}