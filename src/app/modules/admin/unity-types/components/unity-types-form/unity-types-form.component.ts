import { finalize, Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

import { AcsToastService } from '@acs/services/toast';
import { UnityTypeInterface } from '../../unity-types.types';
import { UnityTypeService } from '../../unity-types.service';

@Component({
  selector: 'unity-types-form',
  templateUrl: './unity-types-form.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class UnityTypesFormComponent implements OnInit, OnDestroy {
  public id: string;
  public form: UntypedFormGroup;
  public unityType: UnityTypeInterface;
  private readonly unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private readonly router: Router,
    private readonly service: UnityTypeService,
    private readonly toastService: AcsToastService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
    });

    this.activatedRoute.paramMap.subscribe((params) => {
      this.id = params.get('id');
      if (this.id) {
        void this.service
          .findOne(this.id)
          .pipe(takeUntil(this.unsubscribeAll))
          .subscribe((res: UnityTypeInterface): void => {
            this.unityType = res;

            this.form.patchValue({ ...res });
          });
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
  }

  handleSaveOrUpdate(): void {
    this.form.disable();
    const formValue = {
      ...this.form.value,
    };

    if (this.id) {
      this.service
        .update(this.id, { ...formValue, id: this.id })
        .pipe(
          takeUntil(this.unsubscribeAll),
          finalize(() => {
            this.form.enable();
          })
        )
        .subscribe({
          next: (res) => {
            this.toastService.handleMessage(res, null, { handleRequest: true });
            this.router.navigateByUrl('unidades');
          },
          error: (error) => {
            this.toastService.handleMessage(
              error,
              'Não foi possível modificar a unidade de medida.',
              { handleRequest: true }
            );
          },
        });
    } else {
      this.service
        .create(formValue)
        .pipe(
          takeUntil(this.unsubscribeAll),
          finalize(() => {
            this.form.enable();
          })
        )
        .subscribe({
          next: (res) => {
            this.toastService.handleMessage(res, null, { handleRequest: true });
            this.router.navigateByUrl('unidades');
          },
          error: (error) => {
            this.toastService.handleMessage(
              error,
              'Não foi possível criar a unidade de medida.',
              { handleRequest: true }
            );
          },
        });
    }
  }

  removeMask(value: string): string {
    return value.replace(/\D/g, '');
  }
}
