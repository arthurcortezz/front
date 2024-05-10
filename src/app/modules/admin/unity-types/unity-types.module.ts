import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { categoryRoutes } from './unity-types.routing';
import { SharedModule } from '../../../shared/shared.module';
import { UnityTypesComponent } from './components/unity-types-list/unity-types-list.component';
import { UnityTypesFormComponent } from './components/unity-types-form/unity-types-form.component';

@NgModule({
  declarations: [UnityTypesComponent, UnityTypesFormComponent],
  imports: [
    SharedModule,
    MatIconModule,
    MatTabsModule,
    MatMenuModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    NgOptimizedImage,
    MatCheckboxModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    RouterModule.forChild(categoryRoutes),
  ],
})
export class UnityTypesModule {}
