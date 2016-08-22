/* tslint:disable:no-unused-variable */
///<reference path="../../../../node_modules/@types/jasmine/index.d.ts"/>

import { addProviders, async, inject } from '@angular/core/testing';

import { CoreFirebaseService } from './core-firebase.service';

describe('Core firebase service', () => {
  beforeEach(() => {
    addProviders([CoreFirebaseService]);
  });

});
