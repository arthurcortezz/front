import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserInterface, UserPaginatedInterface } from './users.types';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private readonly httpClient: HttpClient) {}

  findAll(): Observable<UserPaginatedInterface> {
    return this.httpClient.get<UserPaginatedInterface>('@acs-api/user/list');
  }

  findOne(id: string): Observable<UserInterface> {
    return this.httpClient.get<UserInterface>(`@acs-api/users/${id}`);
  }

  create(
    data: UserInterface
  ): Observable<{ message: string; user: UserInterface }> {
    return this.httpClient.post<{ message: string; user: UserInterface }>(
      '@acs-api/users',
      data
    );
  }

  update(
    id: string,
    data: UserInterface
  ): Observable<{ message: string; user: UserInterface }> {
    return this.httpClient.put<{ message: string; user: UserInterface }>(
      `@acs-api/users/${id}`,
      data
    );
  }

  delete(id: string): Observable<{ message: string }> {
    return this.httpClient.delete<{ message: string }>(`@acs-api/users/${id}`);
  }
}
