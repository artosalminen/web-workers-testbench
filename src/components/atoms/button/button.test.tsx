import Button from "./button";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event"; // Import userEvent instead of fireEvent
import { describe, test, expect, vi } from "vitest";

describe("Button test", () => {
  test("Should render the specified label and register the click", () => {
    const onClick = vi.fn();
    const label = "This is a button";

    render(<Button onClick={onClick}>{label}</Button>);

    const button = screen.getByRole("button");

    expect(screen.getByText(label)).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    userEvent.click(button); // Use userEvent instead of fireEvent

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
