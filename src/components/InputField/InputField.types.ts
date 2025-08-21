export type InputVariant = "filled" | "outlined" | "ghost";
export type InputSize = "sm" | "md" | "lg";

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;

  disabled?: boolean;
  invalid?: boolean;

  variant?: InputVariant;
  size?: InputSize;
  type?: React.HTMLInputTypeAttribute;
  name?: string;
  id?: string;
  className?: string;
  inputClassName?: string;
  "aria-label"?: string;
}
