import { CategoryInterface } from '../admin/categories/categories.types';
import { UnityTypeInterface } from '../admin/unity-types/unity-types.types';

export interface RecipeInterface {
  id: number;
  name: string;
  description: string;
  image: Blob;
  category: CategoryInterface;
  ingredients: RecipeIngredientInterface[];
  createdAt: Date;
  updatedAt: Date;
}

export interface RecipePaginatedInterface {
  data: RecipeInterface[];
  total: number;
}

export interface RecipeIngredientInterface {
  id: number;
  name: string;
  unityType: UnityTypeInterface;
  unityValue: number;
}
