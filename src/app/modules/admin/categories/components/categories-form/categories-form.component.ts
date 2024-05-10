import { finalize, Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

import { AcsToastService } from '@acs/services/toast';
import { CategoryInterface } from '../../categories.types';
import { CategoriesService } from '../../categories.service';

@Component({
  selector: 'categories-form',
  templateUrl: './categories-form.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class CategoriesFormComponent implements OnInit, OnDestroy {
  public id: string;
  public recipe: CategoryInterface;
  public form: UntypedFormGroup;
  private readonly unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private readonly router: Router,
    private readonly service: CategoriesService,
    private readonly toastService: AcsToastService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });

    this.activatedRoute.paramMap.subscribe((params) => {
      if (this.id) {
        void this.service
          .findOne(this.id)
          .pipe(takeUntil(this.unsubscribeAll))
          .subscribe((res: CategoryInterface): void => {
            this.recipe = res;

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
            this.router.navigateByUrl('categorias');
          },
          error: (error) => {
            this.toastService.handleMessage(
              error,
              'Não foi possível modificar a categoria.',
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
            this.router.navigateByUrl('categorias');
          },
          error: (error) => {
            this.toastService.handleMessage(
              error,
              'Não foi possível criar a categoria.',
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
