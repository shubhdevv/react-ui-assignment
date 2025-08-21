import * as React from "react";
import type { InputFieldProps, InputVariant, InputSize } from "./Inputfield.types";
import clsx from "clsx";

const sizeClasses: Record<InputSize, string> = {
  sm: "text-sm py-1.5 px-2 rounded-md",
  md: "text-base py-2.5 px-3 rounded-lg",
  lg: "text-lg py-3 px-4 rounded-xl",
};

const variantClasses: Record<InputVariant, string> = {
  filled:
    "bg-gray-100 border border-transparent focus-within:border-blue-500 focus-within:bg-white",
  outlined:
    "border border-gray-300 focus-within:border-blue-500 bg-white",
  ghost:
    "bg-transparent border-b border-gray-300 focus-within:border-blue-500 rounded-none",
};

export function InputField({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled,
  invalid,
  variant = "outlined",
  size = "md",
  type = "text",
  name,
  id,
  className,
  inputClassName,
  "aria-label": ariaLabel,
}: InputFieldProps) {
  const [internal, setInternal] = React.useState<string>(value ?? "");
  const isControlled = value !== undefined;
  const inputValue = isControlled ? value! : internal;

  const inputId = id || (label ? `input-${label.replace(/\s+/g, "-").toLowerCase()}` : undefined);
  const describedById = helperText || errorMessage ? `${inputId}-desc` : undefined;

  return (
    <div className={clsx("flex flex-col gap-1", className)}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          {label}
        </label>
      )}

      <div
        className={clsx(
          "flex items-center transition-colors",
          sizeClasses[size],
          variantClasses[variant],
          disabled && "opacity-50 cursor-not-allowed",
          invalid && "border-red-500 focus-within:border-red-500"
        )}
        aria-invalid={invalid || undefined}
      >
        <input
          id={inputId}
          name={name}
          type={type}
          value={inputValue}
          onChange={(e) => {
            if (!isControlled) setInternal(e.target.value);
            onChange?.(e);
          }}
          placeholder={placeholder}
          disabled={disabled}
          aria-label={ariaLabel || label}
          aria-describedby={describedById}
          className={clsx(
            "w-full bg-transparent outline-none placeholder-gray-400",
            inputClassName
          )}
        />
      </div>

      {helperText && !errorMessage && (
        <p id={describedById} className="text-xs text-gray-500">{helperText}</p>
      )}
      {errorMessage && (
        <p id={describedById} className="text-xs text-red-600">{errorMessage}</p>
      )}
    </div>
  );
}
