import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { LayoutModule } from './layout/layout.module';

import { AcsModule } from '@acs/acs.module';
import { AcsConfigModule } from '@acs/services/config';
import { AcsToastModule } from '@acs/components/toast';

import { appRoutes } from './app.routing';
import { appConfig } from './core/config/app.config';

const routerConfig: ExtraOptions = {
  preloadingStrategy: PreloadAllModules,
  scrollPositionRestoration: 'enabled',
};

@NgModule({
  imports: [
    CoreModule,
    AcsModule,
    LayoutModule,
    BrowserModule,
    AcsToastModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AcsConfigModule.forRoot(appConfig),
    RouterModule.forRoot(appRoutes, routerConfig),
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
