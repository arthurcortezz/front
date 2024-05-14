import { Router } from '@angular/router';
import { finalize, Subject, takeUntil } from 'rxjs';
import { AcsToastService } from '@acs/services/toast';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';

import { AuthService } from '../../../core/auth/auth.service';
import { UserService } from '../../../core/user/user.service';
import { UserJWTInterface } from '../../../core/user/user.types';

@Component({
  selector: 'account',
  templateUrl: './account.component.html',
})
export class AccountComponent implements OnInit, OnDestroy {
  public user: UserJWTInterface;
  public form: UntypedFormGroup;
  private readonly unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private readonly router: Router,
    private readonly service: UserService,
    private readonly authService: AuthService,
    private readonly toastService: AcsToastService,
    private readonly formBuilder: UntypedFormBuilder
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
    });

    this.service
      .get()
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((res: UserJWTInterface) => {
        this.user = res;

        this.form.patchValue({
          ...res,
        });
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

    this.service
      .editProfile({ ...formValue, id: this.user.id })
      .pipe(
        takeUntil(this.unsubscribeAll),
        finalize(() => {
          this.form.enable();
        })
      )
      .subscribe({
        next: (res) => {
          this.service.user = res.user;
          this.authService.signInUsingToken();
          this.toastService.handleMessage(res, null, {
            handleRequest: true,
          });
          this.router.navigateByUrl('minha-conta');
        },
        error: (error) => {
          this.toastService.handleMessage(
            error,
            'Não foi possível modificar o usuário.',
            { handleRequest: true }
          );
        },
      });
  }
  removeMask(value: string): string {
    return value.replace(/\D/g, '');
  }
}
