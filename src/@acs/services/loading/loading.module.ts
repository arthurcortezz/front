import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AcsLoadingInterceptor } from '@acs/services/loading/loading.interceptor';

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AcsLoadingInterceptor,
      multi: true,
    },
  ],
})
export class AcsLoadingModule {}
