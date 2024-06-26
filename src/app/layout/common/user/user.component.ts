import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { BooleanInput } from '@angular/cdk/coercion';
import { Subject, takeUntil } from 'rxjs';

import { UserJWTInterface } from '../../../core/user/user.types';
import { AuthService } from '../../../core/auth/auth.service';
import { UserService } from '../../../core/user/user.service';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'user',
})
export class UserComponent implements OnInit, OnDestroy {
  static ngAcceptInputType_showAvatar: BooleanInput;

  @Input() showAvatar: boolean = true;
  public user: UserJWTInterface;

  private readonly unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly service: UserService
  ) {}

  ngOnInit(): void {
    this.service.user$
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((user: UserJWTInterface) => {
        this.user = user;

        this.changeDetectorRef.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
  }

  signOut(): void {
    this.authService.signOut();
    this.router.navigate(['/login']);
  }
}
