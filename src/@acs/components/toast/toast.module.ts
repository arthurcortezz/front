import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { AcsToastComponent } from './toast.component';

@NgModule({
  exports: [AcsToastComponent],
  declarations: [AcsToastComponent],
  imports: [CommonModule, MatIconModule, MatProgressBarModule],
})
export class AcsToastModule {}
