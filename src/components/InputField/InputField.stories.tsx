import type { Meta, StoryObj } from "@storybook/react";
import { InputField } from "./InputField";

const meta: Meta<typeof InputField> = {
  title: "Components/InputField",
  component: InputField,
  tags: ["autodocs"], // enables auto docs in SB 7
};

export default meta;
type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  args: {
    label: "Email",
    placeholder: "Enter your email",
    helperText: "We'll never share your email",
    variant: "outlined",
    size: "md",
  },
};

export const ErrorState: Story = {
  args: {
    label: "Email",
    placeholder: "Enter your email",
    errorMessage: "Invalid email",
    invalid: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "Email",
    placeholder: "Disabled input",
    disabled: true,
  },
};
