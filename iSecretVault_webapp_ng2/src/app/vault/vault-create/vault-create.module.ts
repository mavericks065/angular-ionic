import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VaultCreateComponent } from './vault-create.component';

import { vaultCreateRouting } from './vault-create.routing';

@NgModule({
  imports: [
    FormsModule,
    vaultCreateRouting
  ],
  declarations: [
    VaultCreateComponent
  ],
  providers: []
})
export class VaultCreateModule {
}
