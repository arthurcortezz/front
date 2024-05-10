import { finalize } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  NgForm,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

import { AcsToastService } from '@acs/services/toast';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'auth-sign-up',
  templateUrl: './sign-up.component.html',
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
      .mat-mdc-form-field-flex {
        background: white;
      }
      .mdc-text-field {
        border: 1px solid white;
      }
      .mdc-text-field {
        .mdc-floating-label {
          .mat-mdc-form-field-required-marker {
            color: black;
          }
        }
      }
      @media (prefers-color-scheme: dark) {
        .mdc-text-field {
          .mdc-floating-label {
            .mat-mdc-form-field-required-marker {
              color: black;
            }
          }
        }
      }
      .mdc-checkbox__background {
        border: 2px solid #e3651d !important;
      }
    `,
  ],
})
export class AuthSignUpComponent implements OnInit {
  public hidePassword = true;
  @ViewChild('signUpNgForm') signUpNgForm: NgForm;

  public signUpForm: UntypedFormGroup;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: UntypedFormBuilder,
    private readonly toastService: AcsToastService
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  signUp(): void {
    this.signUpForm.disable();

    this.authService
      .signUp({ ...this.signUpForm.value, role: 'USER' })
      .pipe(
        finalize(() => {
          this.signUpForm.enable();
        })
      )
      .subscribe({
        next: () => {
          const redirectURL =
            this.activatedRoute.snapshot.queryParamMap.get('redirectURL') ||
            '/-';
          this.router.navigateByUrl(redirectURL);
        },
        error: (error) => {
          this.toastService.handleMessage(
            error,
            'Não foi possível fazer login.',
            { handleRequest: true }
          );
        },
      });
  }
  clickBack(): void {
    this.router.navigateByUrl('/', { skipLocationChange: true });
  }
}
