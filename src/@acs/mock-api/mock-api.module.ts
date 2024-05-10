import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ACS_MOCK_API_DEFAULT_DELAY } from '@acs/mock-api/mock-api.constants';
import { AcsMockApiInterceptor } from '@acs/mock-api/mock-api.interceptor';

import { environment } from '../../environments/environment';

@NgModule()
export class AcsMockApiModule {
  static forRoot(
    mockApiServices: any[],
    config?: { delay?: number }
  ): ModuleWithProviders<AcsMockApiModule> {
    if (environment.mockApi) {
      return {
        ngModule: AcsMockApiModule,
        providers: [
          {
            provide: APP_INITIALIZER,
            deps: [...mockApiServices],
            useFactory: () => (): any => null,
            multi: true,
          },
          {
            provide: ACS_MOCK_API_DEFAULT_DELAY,
            useValue: config?.delay ?? 0,
          },
          {
            provide: HTTP_INTERCEPTORS,
            useClass: AcsMockApiInterceptor,
            multi: true,
          },
        ],
      };
    }
  }
}
