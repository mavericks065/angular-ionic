import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { routing,
         appRoutingProviders } from './app.routing';

/* tslint:disable:no-unused-variable */
import * as firebase from 'firebase';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

import { CoreModule } from './shared/core/core.module';
import { VaultService } from './vault/vault.service';
import { VaultCreateModule } from './vault/vault-create/vault-create.module';
import { VaultUnlockModule } from './vault/vault-unlock/vault-unlock.module';
import { CategoriesModule } from './categories/categories.module';
import { SettingsModule } from './settings/settings.module';

const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyCdBSHSDDXoZdDR7BCxr6-XJR2lvfBY2i4',
  authDomain: 'isecrevault-webapp-ng2.firebaseapp.com',
  databaseURL: 'https://isecrevault-webapp-ng2.firebaseio.com',
  storageBucket: 'isecrevault-webapp-ng2.appspot.com'
};

const FIREBASE_AUTH_CONFIG = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};

@NgModule({
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG, FIREBASE_AUTH_CONFIG),
    CommonModule,
    FormsModule,
    routing,
    CoreModule,
    VaultCreateModule,
    VaultUnlockModule,
    CategoriesModule,
    SettingsModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    appRoutingProviders,
    VaultService
  ],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {

}
