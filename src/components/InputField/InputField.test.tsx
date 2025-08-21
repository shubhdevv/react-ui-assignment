import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InputField } from "./InputField";

test("renders label and helper", () => {
  render(<InputField label="Email" helperText="We'll never share it" />);
  expect(screen.getByText("Email")).toBeInTheDocument();
  expect(screen.getByText("We'll never share it")).toBeInTheDocument();
});

test("fires onChange with event", async () => {
  const user = userEvent.setup();
  const onChange = vi.fn();
  render(<InputField onChange={onChange} placeholder="Type" />);
  await user.type(screen.getByPlaceholderText("Type"), "abc");
  expect(onChange).toHaveBeenCalled();
});
