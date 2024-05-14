import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AcsConfirmationConfig } from '@acs/services/confirmation/confirmation.types';

@Component({
  selector: 'acs-visualize-dialog',
  templateUrl: './dialog.component.html',
  styles: [
    `
      .acs-confirmation-dialog-panel {
        @screen md {
          @apply w-128;
        }

        .mat-mdc-dialog-container {
          .mat-mdc-dialog-surface {
            padding: 0 !important;
          }
        }
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class AcsVisualizeDialogComponent {
  public imageLoaded = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: AcsConfirmationConfig) {}

  loadImage(): void {
    this.imageLoaded = true;
  }
}
