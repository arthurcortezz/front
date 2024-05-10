export interface CategoryInterface {
  id?: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryPaginatedInterface {
  rows: CategoryInterface[];
  total: number;
}
