import * as React from "react";
import type { DataTableProps, Column } from "./Datatable.types";
import clsx from "clsx";

type SortState<T> = { key: keyof T; direction: "asc" | "desc" } | null;

export function DataTable<T extends { id?: string | number }>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
}: DataTableProps<T>) {
  const [sort, setSort] = React.useState<SortState<T>>(null);
  const [selected, setSelected] = React.useState<Set<string | number | number>>(new Set());

  const sortedData = React.useMemo(() => {
    if (!sort) return data;
    const { key, direction } = sort;
    return [...data].sort((a, b) => {
      const av = a[key];
      const bv = b[key];
      if (av == null && bv == null) return 0;
      if (av == null) return 1;
      if (bv == null) return -1;
      if (av < bv) return direction === "asc" ? -1 : 1;
      if (av > bv) return direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sort]);

  const resolveRowKey = (row: T, index: number) =>
    (row as any).id ?? index; // stable key when id missing (index fallback)

  const toggleSort = (col: Column<T>) => {
    if (!col.sortable) return;
    if (!sort || sort.key !== col.dataIndex) {
      setSort({ key: col.dataIndex, direction: "asc" });
    } else {
      setSort({ key: col.dataIndex, direction: sort.direction === "asc" ? "desc" : "asc" });
    }
  };

  const toggleRow = (row: T, index: number) => {
    const key = resolveRowKey(row, index);
    const next = new Set(selected);
    next.has(key) ? next.delete(key) : next.add(key);
    setSelected(next);
    onRowSelect?.(sortedData.filter((r, i) => next.has(resolveRowKey(r, i))));
  };

  const allChecked =
    selectable &&
    sortedData.length > 0 &&
    sortedData.every((r, i) => selected.has(resolveRowKey(r, i)));

  const toggleAll = () => {
    if (!selectable) return;
    const next = new Set<string | number | number>();
    if (!allChecked) sortedData.forEach((r, i) => next.add(resolveRowKey(r, i)));
    setSelected(next);
    onRowSelect?.(sortedData.filter((r, i) => next.has(resolveRowKey(r, i))));
  };

  return (
    <div className="w-full overflow-x-auto">
      <table
        className="w-full border-collapse border border-gray-200 text-sm md:text-base"
        role="table"
      >
        <thead className="bg-gray-100">
          <tr>
            {selectable && (
              <th className="p-2 w-10 text-center align-middle">
                <input
                  aria-label="Select all rows"
                  type="checkbox"
                  checked={allChecked}
                  onChange={toggleAll}
                />
              </th>
            )}
            {columns.map((col) => {
              const isActive = sort?.key === col.dataIndex;
              return (
                <th
                  key={col.key}
                  scope="col"
                  aria-sort={
                    col.sortable ? (isActive ? (sort!.direction === "asc" ? "ascending" : "descending") : "none") : "none"
                  }
                  onClick={() => toggleSort(col)}
                  className={clsx(
                    "px-3 py-2 text-left font-semibold text-gray-700 select-none",
                    col.sortable && "cursor-pointer"
                  )}
                >
                  <div className="flex items-center gap-1">
                    {col.title}
                    {col.sortable && isActive && (
                      <span aria-hidden>{sort!.direction === "asc" ? "▲" : "▼"}</span>
                    )}
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr aria-live="polite">
              <td
                className="text-center py-8 text-gray-500"
                colSpan={columns.length + (selectable ? 1 : 0)}
              >
                Loading…
              </td>
            </tr>
          ) : sortedData.length === 0 ? (
            <tr>
              <td
                className="text-center py-8 text-gray-400"
                colSpan={columns.length + (selectable ? 1 : 0)}
              >
                No data available
              </td>
            </tr>
          ) : (
            sortedData.map((row, i) => {
              const key = resolveRowKey(row, i);
              const isSelected = selected.has(key);
              return (
                <tr
                  key={String(key)}
                  className={clsx("hover:bg-gray-50 transition-colors", isSelected && "bg-blue-50")}
                  aria-selected={isSelected || undefined}
                >
                  {selectable && (
                    <td className="px-3 py-2 text-center align-middle">
                      <input
                        aria-label={`Select row ${key}`}
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleRow(row, i)}
                      />
                    </td>
                  )}
                  {columns.map((col) => (
                    <td key={col.key} className="px-3 py-2 border-t border-gray-200">
                      {String(row[col.dataIndex] ?? "")}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
