import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  UnityTypeInterface,
  UnityTypePaginatedInterface,
} from './unity-types.types';

@Injectable({
  providedIn: 'root',
})
export class UnityTypeService {
  constructor(private readonly httpClient: HttpClient) {}

  findAll(): Observable<UnityTypePaginatedInterface> {
    return this.httpClient.get<UnityTypePaginatedInterface>(
      '@acs-api/unity-type/list'
    );
  }

  findOne(id: string): Observable<UnityTypeInterface> {
    return this.httpClient.get<UnityTypeInterface>(`@acs-api/unity-type/${id}`);
  }

  create(
    data: UnityTypeInterface
  ): Observable<{ message: string; user: UnityTypeInterface }> {
    return this.httpClient.post<{ message: string; user: UnityTypeInterface }>(
      '@acs-api/unity-type/create',
      data
    );
  }

  update(
    id: string,
    data: UnityTypeInterface
  ): Observable<{ message: string; user: UnityTypeInterface }> {
    return this.httpClient.put<{ message: string; user: UnityTypeInterface }>(
      `@acs-api/unity-type/${id}`,
      data
    );
  }

  delete(id: string): Observable<{ message: string }> {
    return this.httpClient.delete<{ message: string }>(
      `@acs-api/unity-type/${id}`
    );
  }
}
