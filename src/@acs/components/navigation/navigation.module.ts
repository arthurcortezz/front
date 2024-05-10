import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AcsNavigationComponent } from '@acs/components/navigation/navigation.component';
import { AcsNavigationItemComponent } from '@acs/components/navigation/components/item/item.component';
import { AcsNavigationSwitcherModeComponent } from './components/switcher-mode/switcher-mode.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule,
  ],
  declarations: [
    AcsNavigationComponent,
    AcsNavigationItemComponent,
    AcsNavigationSwitcherModeComponent,
  ],
  exports: [AcsNavigationComponent],
})
export class AcsNavigationModule {}
