# React UI Assignment

This repository contains two reusable React components built using **React**, **TypeScript**, and **TailwindCSS**:

- **InputField** – A flexible input component with validation states.
- **DataTable** – A data table component with sorting, row selection, and loading/empty states.

## 📦 Tech Stack

- React 18+
- TypeScript
- TailwindCSS
- Storybook (for component documentation)
- Vitest & Testing Library (for basic tests)

## 🔹 Components

### **1. InputField**

Props:

```ts
interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

🚀 Getting Started
# Install dependencies
npm install

# Run the development server
npm run dev

# Open Storybook
npm run storybook

# Run tests
npm run test