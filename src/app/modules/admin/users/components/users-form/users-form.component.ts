import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, Subject, takeUntil } from 'rxjs';

import { AcsToastService } from '@acs/services/toast';
import { CnpjValidator, CpfValidator, AcsValidators } from '@acs/validators';

import { UserInterface } from '../../users.types';
import { UsersService } from '../../users.service';

@Component({
  selector: 'users-form',
  templateUrl: './users-form.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class UsersFormComponent implements OnInit, OnDestroy {
  public id: string;
  public user: UserInterface;
  public form: UntypedFormGroup;
  private readonly unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly toastService: AcsToastService,
    private readonly service: UsersService,
    private readonly formBuilder: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        email: ['', [Validators.required]],
        personType: ['FÍSICA', [Validators.required]],
        cpf: ['', [Validators.required, CpfValidator.valid()]],
        cnpj: ['', [CnpjValidator.valid()]],
        phone: ['', [Validators.required]],
        password: ['', []],
        confirmPassword: ['', []],
        roleId: [null, [Validators.required]],
        companyId: ['', []],
        hasAgreedTermService: [true, []],
      },
      {
        validators: AcsValidators.mustMatch('password', 'confirmPassword'),
      }
    );

    this.activatedRoute.paramMap.subscribe((params) => {
      this.id = params.get('id');

      if (this.id) {
        void this.service
          .findOne(this.id)
          .pipe(takeUntil(this.unsubscribeAll))
          .subscribe((res: UserInterface): void => {
            this.user = res;

            this.form.patchValue({ ...res });

            this.onChangePersonType();
          });
      } else {
        this.form.get('password').addValidators([Validators.required]);
        this.form.get('confirmPassword').addValidators([Validators.required]);

        this.onChangePersonType();
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
  }

  onChangePersonType(resetForm?: boolean): void {
    if (resetForm) {
      this.form.get('cpf').reset();
      this.form.get('cnpj').reset();
    }

    if (this.form.get('personType').value === 'FÍSICA') {
      this.form
        .get('cpf')
        .addValidators([Validators.required, CpfValidator.valid()]);
      this.form.get('cnpj').clearValidators();
      this.form.get('cnpj').updateValueAndValidity();
    } else {
      this.form.get('cpf').clearValidators();
      this.form.get('cpf').updateValueAndValidity();
      this.form
        .get('cnpj')
        .addValidators([Validators.required, CnpjValidator.valid()]);
    }
  }

  handleSaveOrUpdate(): void {
    this.form.disable();
    const formValue = {
      ...this.form.value,
      cpf: this.removeMask(this.form.value.cpf),
      cnpj: this.removeMask(this.form.value.cnpj),
      phone: this.removeMask(this.form.value.phone),
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
            this.router.navigateByUrl('usuarios');
          },
          error: (error) => {
            this.toastService.handleMessage(
              error,
              'Não foi possível modificar o usuário.',
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
            this.router.navigateByUrl('usuarios');
          },
          error: (error) => {
            this.toastService.handleMessage(
              error,
              'Não foi possível criar o usuário.',
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
