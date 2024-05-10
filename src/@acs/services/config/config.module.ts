import { ModuleWithProviders, NgModule } from '@angular/core';
import { ACS_APP_CONFIG } from '@acs/services/config/config.constants';

@NgModule()
export class AcsConfigModule {
  constructor() {}

  static forRoot(config: any): ModuleWithProviders<AcsConfigModule> {
    return {
      ngModule: AcsConfigModule,
      providers: [
        {
          provide: ACS_APP_CONFIG,
          useValue: config,
        },
      ],
    };
  }
}
