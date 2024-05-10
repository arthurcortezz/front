import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AcsTableModule } from '@acs/components/table';
import { AcsHeaderModule } from '@acs/components/header';
import { AcsMenuModule } from '@acs/components/menu/menu.module';
import {
  CepMaskDirective,
  CpfMaskDirective,
  CnpjMaskDirective,
  PhoneMaskDirective,
} from '@acs/directives';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, AcsMenuModule],
  declarations: [
    PhoneMaskDirective,
    CpfMaskDirective,
    CnpjMaskDirective,
    CepMaskDirective,
  ],
  exports: [
    FormsModule,
    CommonModule,
    AcsMenuModule,
    MatIconModule,
    MatInputModule,
    AcsTableModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    AcsHeaderModule,
    MatDividerModule,
    CpfMaskDirective,
    CepMaskDirective,
    CnpjMaskDirective,
    PhoneMaskDirective,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
})
export class SharedModule {}
