import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest"; // <- import vitest functions
import { DataTable } from "./DataTable";

// Define your row type
type Row = { id: number; name: string; age: number };

// Define Column type matching your DataTable
interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

// Columns
const columns: Column<Row>[] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "age", title: "Age", dataIndex: "age", sortable: true },
];

// Sample data
const data: Row[] = [
  { id: 1, name: "Bob", age: 30 },
  { id: 2, name: "Alice", age: 25 },
];

describe("DataTable", () => {
  it("renders rows", () => {
    render(<DataTable<Row> data={data} columns={columns} />);
    expect(screen.getByText("Bob")).toBeInTheDocument();
    expect(screen.getByText("Alice")).toBeInTheDocument();
  });

  it("sorts by column on click", () => {
    render(<DataTable<Row> data={data} columns={columns} />);
    fireEvent.click(screen.getByText("Name")); // asc: Alice first
    const cells = screen.getAllByRole("cell");
    expect(cells[0]).toHaveTextContent("Alice");
  });

  it("selects rows", () => {
    const onRowSelect = vi.fn(); // now recognized
    render(
      <DataTable<Row> data={data} columns={columns} selectable onRowSelect={onRowSelect} />
    );
    const chk = screen.getAllByRole("checkbox")[1]; // first row checkbox (0 is Select All)
    fireEvent.click(chk);
    expect(onRowSelect).toHaveBeenCalledWith([{ id: 1, name: "Bob", age: 30 }]);
  });
});
