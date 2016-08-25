import { Injectable } from '@angular/core';

/*
This service is a singleton to store and manage the 2nd
verification step.
*/
@Injectable()
export class VaultService {

  private masterCode: string = '';
  constructor() {}

  storeMasterCode(masterCode: string): void {
    this.masterCode = masterCode;
  }

  getMasterCode(): string {
    return this.masterCode;
  }
}
