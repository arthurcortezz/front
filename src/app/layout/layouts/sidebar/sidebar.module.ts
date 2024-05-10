import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

import { SharedModule } from '../../../shared/shared.module';
import { UserModule } from '../../common/user/user.module';

import { AcsNavigationModule } from '@acs/components/navigation';
import { AcsLoadingBarModule } from '@acs/components/loading-bar';
import { AcsToastModule } from '@acs/components/toast';

import { SidebarLayoutComponent } from './sidebar.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [SidebarLayoutComponent],
  imports: [
    HttpClientModule,
    RouterModule,
    SharedModule,
    MatButtonModule,
    MatIconModule,
    UserModule,
    AcsNavigationModule,
    AcsLoadingBarModule,
    AcsToastModule,
  ],
  exports: [SidebarLayoutComponent],
})
export class SidebarLayoutModule {}
