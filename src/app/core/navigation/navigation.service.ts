import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject, tap } from 'rxjs';

import { UserJWTInterface, MenuInterface } from '../user/user.types';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private navigation: ReplaySubject<MenuInterface[]> = new ReplaySubject<
    MenuInterface[]
  >(1);

  constructor(private readonly httpClient: HttpClient) {}

  get navigation$(): Observable<MenuInterface[]> {
    return this.navigation.asObservable();
  }
}
