import React, { useState } from "react";
import { InputField } from "./components/InputField/InputField";
import { DataTable } from "./components/DataTable/DataTable";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

function App() {
  // For InputField demo
  const [value, setValue] = useState("");

  // For DataTable demo
  const users: User[] = [
    { id: 1, name: "Alice", email: "alice@example.com", role: "Admin" },
    { id: 2, name: "Bob", email: "bob@example.com", role: "User" },
    { id: 3, name: "Charlie", email: "charlie@example.com", role: "Manager" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8 space-y-12">
      {/* InputField Demo */}
      <section>
        <h2 className="text-xl font-bold mb-4">🔤 InputField Demo</h2>
        <InputField
          label="Username"
          placeholder="Enter your username"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          helperText="This is a helper text"
          errorMessage={value.length < 3 ? "Must be at least 3 chars" : ""}
          invalid={value.length > 0 && value.length < 3}
          size="md"
          variant="outlined"
        />
        <p className="mt-2 text-gray-700">Value: {value}</p>
      </section>

      {/* DataTable Demo */}
      <section>
        <h2 className="text-xl font-bold mb-4">📊 DataTable Demo</h2>
        <DataTable<User>
          data={users}
          columns={[
            { key: "name", title: "Name", dataIndex: "name", sortable: true },
            { key: "email", title: "Email", dataIndex: "email" },
            { key: "role", title: "Role", dataIndex: "role", sortable: true },
            ]}
          selectable
          onRowSelect={(selectedRows) => {
            console.log("Selected rows:", selectedRows);
          }}
        />
      </section>
    </div>
  );
}

export default App;
