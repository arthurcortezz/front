import { CategoryInterface } from '../admin/categories/categories.types';

export interface RecipeInterface {
  id: number;
  name: string;
  description: string;
  category: CategoryInterface;
  createdAt: Date;
  updatedAt: Date;
}

export interface RecipePaginatedInterface {
  data: RecipeInterface[];
  total: number;
}
