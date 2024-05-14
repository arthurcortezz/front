import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';

import { AuthUtils } from './auth.utils';
import { UserService } from '../user/user.service';
import { UserJWTInterface } from '../user/user.types';
import {
  ForgotPasswordBodyInterface,
  ForgotPasswordResponseInterface,
  LoginBodyInterface,
  LoginResponseInterface,
  RegisterBodyInterface,
  ResetPasswordBodyInterface,
  ResetPasswordResponseInterface,
} from './auth.types';

@Injectable()
export class AuthService {
  private authenticated: boolean = false;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly userService: UserService
  ) {}

  set accessToken(token: string) {
    localStorage.setItem('accessToken', token);
  }

  get accessToken(): string {
    return localStorage.getItem('accessToken') ?? '';
  }

  public signIn(
    credentials: LoginBodyInterface
  ): Observable<LoginResponseInterface> {
    if (this.authenticated) {
      return throwError(() => 'O usuário já está conectado.');
    }

    return this.httpClient.post('@acs-api/auth/signin', credentials).pipe(
      switchMap((response: LoginResponseInterface) => {
        if (response && response.accessToken && response.user) {
          this.authenticated = true;
          this.accessToken = response.accessToken;
          this.userService.user = response.user;
        }

        return of(response);
      })
    );
  }

  public signUp(
    credentials: RegisterBodyInterface
  ): Observable<LoginResponseInterface> {
    if (this.authenticated) {
      return throwError(() => 'O usuário já está conectado.');
    }

    return this.httpClient.post('@acs-api/auth/signup', credentials).pipe(
      switchMap((response: LoginResponseInterface) => {
        if (response && response.accessToken && response.user) {
          this.authenticated = true;
          this.accessToken = response.accessToken;
          this.userService.user = response.user;
        }

        return of(response);
      })
    );
  }

  public signInUsingToken(): Observable<boolean> {
    return this.httpClient.get('@acs-api/auth/signin-token').pipe(
      catchError(() => of(false)),
      switchMap((response: UserJWTInterface) => {
        console.log('🚀 ~ AuthService ~ switchMap ~ response:', response);
        this.authenticated = true;
        this.userService.user = response;

        return of(true);
      })
    );
  }

  public forgotPassword(
    data: ForgotPasswordBodyInterface
  ): Observable<ForgotPasswordResponseInterface> {
    return this.httpClient.post<ForgotPasswordResponseInterface>(
      '@acs-api/auth/recover-password',
      data
    );
  }

  public resetPassword(
    token: string,
    data: ResetPasswordBodyInterface
  ): Observable<any> {
    return this.httpClient.post<ResetPasswordResponseInterface>(
      `@acs-api/auth/reset-password/${token}`,
      data
    );
  }

  public signOut(): Observable<any> {
    localStorage.removeItem('accessToken');

    this.authenticated = false;

    return of(true);
  }

  public check(): Observable<boolean> {
    if (this.authenticated) {
      return of(true);
    }

    if (!this.accessToken) {
      return of(false);
    }

    if (AuthUtils.isTokenExpired(this.accessToken)) {
      return of(false);
    }

    return this.signInUsingToken();
  }
}
