export interface UnityTypeInterface {
  id?: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UnityTypePaginatedInterface {
  rows: UnityTypeInterface[];
  total: number;
}
