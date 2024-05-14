import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { settingsRoutes } from './settings.routing';
import { SettingsComponent } from './settings.component';
import { AccountComponent } from './account/account.component';
import { SharedModule } from '../../shared/shared.module';
import { SecurityComponent } from './security/security.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AccountComponent, SecurityComponent, SettingsComponent],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    RouterModule.forChild(settingsRoutes),
  ],
})
export class SettingsModule {}
