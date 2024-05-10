import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AcsConfirmationService } from '@acs/services/confirmation/confirmation.service';
import { AcsConfirmationDialogComponent } from '@acs/services/confirmation/dialog/dialog.component';

@NgModule({
  declarations: [AcsConfirmationDialogComponent],
  imports: [MatButtonModule, MatDialogModule, MatIconModule, CommonModule],
  providers: [AcsConfirmationService],
})
export class AcsConfirmationModule {
  constructor() {}
}
