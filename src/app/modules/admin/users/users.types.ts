export interface UserInterface {
  id?: number;
  name: string;
  email: string;
  password?: string;
  role?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPaginatedInterface {
  rows: UserInterface[];
  count: number;
}

export interface UserFilterInterface {
  name?: string;
}
