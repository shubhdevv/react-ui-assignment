export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean; // checkbox multi-select
  onRowSelect?: (selectedRows: T[]) => void;
}

/**
 * Implementation note:
 * For stable selection when sorting, rows should include a unique `id` field.
 */
export type RowId = string | number;
