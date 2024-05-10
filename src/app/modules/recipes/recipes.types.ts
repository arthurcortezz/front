export interface RecipeInterface {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RecipePaginatedInterface {
  data: RecipeInterface[];
  total: number;
}
