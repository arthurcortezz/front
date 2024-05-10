import { NgModule, Optional, SkipSelf } from '@angular/core';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

import { AcsMediaWatcherModule } from '@acs/services/media-watcher';
import { AcsLoadingModule } from '@acs/services/loading';
import { AcsConfirmationModule } from '@acs/services/confirmation';

@NgModule({
  imports: [AcsMediaWatcherModule, AcsConfirmationModule, AcsLoadingModule],
  providers: [
    {
      provide: MATERIAL_SANITY_CHECKS,
      useValue: {
        doctype: true,
        theme: false,
        version: true,
      },
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'fill',
        floatLabel: 'always',
      },
    },
  ],
})
export class AcsModule {
  constructor(@Optional() @SkipSelf() parentModule?: AcsModule) {
    if (parentModule) {
      throw new Error(
        'AcsModule has already been loaded. Import this module in the AppModule only.'
      );
    }
  }
}
