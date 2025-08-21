import type { Meta, StoryObj } from "@storybook/react";
import { DataTable } from "./DataTable";

// Define your User type
interface User {
  id: number;
  name: string;
  email: string;
}

// Define a Column type matching DataTable expectations
interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

// Story metadata
const meta: Meta<typeof DataTable<User>> = {
  title: "Components/DataTable",
  component: DataTable<User>,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DataTable<User>>;

// Sample data
const sampleData: User[] = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
];

// Sample columns
const sampleColumns: Column<User>[] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "email", title: "Email", dataIndex: "email" },
];

// Default story
export const Default: Story = {
  args: {
    data: sampleData,
    columns: sampleColumns,
    selectable: true,
  },
};

// Loading state story
export const Loading: Story = {
  args: {
    data: [],
    columns: sampleColumns,
    loading: true,
  },
};

// Empty state story
export const Empty: Story = {
  args: {
    data: [],
    columns: sampleColumns,
  },
};
