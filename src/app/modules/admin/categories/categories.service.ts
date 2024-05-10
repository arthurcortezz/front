import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  CategoryInterface,
  CategoryPaginatedInterface,
} from './categories.types';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private readonly httpClient: HttpClient) {}

  findAll(): Observable<CategoryPaginatedInterface> {
    return this.httpClient.get<CategoryPaginatedInterface>(
      '@acs-api/category/list'
    );
  }

  findOne(id: string): Observable<CategoryInterface> {
    return this.httpClient.get<CategoryInterface>(`@acs-api/category/${id}`);
  }

  create(
    data: CategoryInterface
  ): Observable<{ message: string; user: CategoryInterface }> {
    return this.httpClient.post<{ message: string; user: CategoryInterface }>(
      '@acs-api/category/create',
      data
    );
  }

  update(
    id: string,
    data: CategoryInterface
  ): Observable<{ message: string; user: CategoryInterface }> {
    return this.httpClient.put<{ message: string; user: CategoryInterface }>(
      `@acs-api/category/${id}`,
      data
    );
  }

  delete(id: string): Observable<{ message: string }> {
    return this.httpClient.delete<{ message: string }>(
      `@acs-api/category/${id}`
    );
  }
}
