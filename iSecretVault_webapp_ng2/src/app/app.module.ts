import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

/* tslint:disable:no-unused-variable */
import * as firebase from 'firebase';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

import { CoreModule } from './shared/core/core.module';

import { routing,
         appRoutingProviders } from './app.routing';

import { NavComponent } from './shared/layouts/nav.component';

import { AuthenticationLoginModule }
  from './authentication/authentication-login/authentication-login.module';
import { AuthenticationSignupModule }
  from './authentication/authentication-signup/authentication-signup.module';
import { VaultService } from './vault/vault.service';
import { VaultCreateModule } from './vault/vault-create/vault-create.module';
import { VaultUnlockModule } from './vault/vault-unlock/vault-unlock.module';
import { CategoriesModule } from './categories/categories.module';
import { SettingsModule } from './settings/settings.module';

import { AppComponent } from './app.component';

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
    // FormsModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG, FIREBASE_AUTH_CONFIG),
    CommonModule,
    CoreModule,
    routing,
    AuthenticationSignupModule,
    AuthenticationLoginModule,
    VaultCreateModule,
    VaultUnlockModule,
    CategoriesModule,
    SettingsModule
  ],
  declarations: [
    AppComponent,
    NavComponent
  ],
  providers: [
    appRoutingProviders,
    VaultService
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  entryComponents: [ AppComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
