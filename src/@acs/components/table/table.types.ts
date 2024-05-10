export interface AcsTableInterface {
  view?: boolean;
  changes?: boolean;
  allowChanges?: boolean;
  orderBy?: boolean;
  title: string;
  headers: AcsTableHeaderInterface[];
  content: AcsTableContentInterface[];
  actions?: boolean;
  selection?: boolean;
  searchable?: boolean;
  searchableConfig?: AcsTableFilterConfigInterface;
  paginator?: boolean;
  paginatorConfig?: AcsTablePaginatorConfigInterface;
  sortable?: boolean;
  sortConfig?: AcsTableSortConfigInterface;
  showMore?: boolean;
  navigateUrl?: string;
}

export interface AcsTableHeaderInterface {
  name: string;
  key?: string;
}

export interface AcsTableContentInterface {
  type: string;
  key: string;
}

export interface AcsTablePaginatorConfigInterface {
  defaultPageSize?: number;
  requestPagination?: boolean;
}

export interface AcsTableFilterConfigInterface {
  requestPagination?: boolean;
}

export interface AcsTableSortConfigInterface {
  requestPagination?: boolean;
}

export interface AcsTablePaginatorInterface {
  pageNumber: number;
  perPage: number;
}

export interface AcsTableSortInterface {
  field: string;
  sort: 'asc' | 'desc';
}
