/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";

const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,          // enables global `vi`, `expect`, etc.
    environment: "jsdom",   // needed for React Testing Library
    setupFiles: "./src/setupTests.ts", // for jest-dom
    include: ["src/**/*.{test,spec}.{ts,tsx}"],

    // add Storybook plugin correctly
    hookTimeout: 60000, // optional for slow Storybook tests
  },
});
