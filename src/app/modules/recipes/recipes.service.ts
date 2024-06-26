import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeInterface, RecipePaginatedInterface } from './recipes.types';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  constructor(private readonly httpClient: HttpClient) {}

  findAll(): Observable<RecipePaginatedInterface> {
    return this.httpClient.get<RecipePaginatedInterface>(
      '@acs-api/recipe/list'
    );
  }

  findOne(id: string): Observable<RecipeInterface> {
    return this.httpClient.get<RecipeInterface>(`@acs-api/recipe/${id}`);
  }

  create(
    data: FormData
  ): Observable<{ message: string; user: RecipeInterface }> {
    return this.httpClient.post<{ message: string; user: RecipeInterface }>(
      '@acs-api/recipe/create',
      data
    );
  }

  update(
    id: string,
    data: FormData
  ): Observable<{ message: string; user: RecipeInterface }> {
    return this.httpClient.put<{ message: string; user: RecipeInterface }>(
      `@acs-api/recipe/${id}`,
      data
    );
  }

  delete(id: string): Observable<{ message: string }> {
    return this.httpClient.delete<{ message: string }>(`@acs-api/recipe/${id}`);
  }
}
