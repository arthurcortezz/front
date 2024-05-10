import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { AcsLoadingBarComponent } from '@acs/components/loading-bar/loading-bar.component';

@NgModule({
  exports: [AcsLoadingBarComponent],
  declarations: [AcsLoadingBarComponent],
  imports: [CommonModule, MatProgressBarModule],
})
export class AcsLoadingBarModule {}
