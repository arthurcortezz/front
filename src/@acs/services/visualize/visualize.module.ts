import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { AcsVisualizeDialogComponent } from './dialog/dialog.component';
import { AcsVisualizeService } from './visualize.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [AcsVisualizeDialogComponent],
  imports: [
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatIconModule,
    CommonModule,
  ],
  providers: [AcsVisualizeService],
})
export class AcsVisualizeModule {
  constructor() {}
}
