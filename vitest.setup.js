/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,       // <-- allows `vi` and `expect` globally
    environment: "jsdom", // required for React Testing Library
    setupFiles: "./src/setupTests.ts", // optional
  },
});

