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

import { landingRoutes } from './landing.routing';
import { LandingComponent } from './landing.component';
import { SharedModule } from '../../shared/shared.module';
import { LandingHeroComponent } from './components/hero/hero.component';
import { LandingAboutComponent } from './components/about/about.component';
import { LandingFooterComponent } from './components/footer/footer.component';
import { LandingSolutionsComponent } from './components/solutions/solutions.component';
import { LandingProjectsComponent } from './components/feedback/projects.component';

@NgModule({
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
    RouterModule.forChild(landingRoutes),
  ],
  declarations: [
    LandingComponent,
    LandingHeroComponent,
    LandingAboutComponent,
    LandingFooterComponent,
    LandingProjectsComponent,
    LandingSolutionsComponent,
  ],
})
export class LandingModule {}
