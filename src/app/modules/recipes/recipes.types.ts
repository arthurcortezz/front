import { CategoryInterface } from '../admin/categories/categories.types';
import { UnityTypeInterface } from '../admin/unity-types/unity-types.types';

export interface RecipeInterface {
  id: string;
  name: string;
  description: string;
  image: string;
  category: CategoryInterface;
  ingredients: RecipeIngredientInterface[];
  createdAt: Date;
  updatedAt: Date;
}

export interface RecipePaginatedInterface {
  rows: RecipeInterface[];
  total: number;
}

export interface RecipeIngredientInterface {
  id: number;
  name: string;
  unityType: UnityTypeInterface;
  unityValue: number;
}
