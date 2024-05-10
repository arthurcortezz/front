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

import { recipeRoutes } from './recipes.routing';
import { SharedModule } from '../../shared/shared.module';
import { RecipesListComponent } from './components/recipes-list/recipes-list.component';
import { RecipesFormComponent } from './components/recipes-form/recipes-form.component';

@NgModule({
  declarations: [RecipesListComponent, RecipesFormComponent],
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
    RouterModule.forChild(recipeRoutes),
  ],
})
export class RecipesModule {}
