/* tslint:disable:no-unused-variable */
///<reference path="../../node_modules/@types/jasmine/index.d.ts"/>

import { addProviders, async, inject } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('App Component', () => {
  beforeEach(() => {
    addProviders([AppComponent]);
  });

  it('should create the app',
    inject([AppComponent], (app: AppComponent) => {
      expect(app).toBeTruthy();
    }));
});
