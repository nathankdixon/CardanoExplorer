import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Button from "../Button";

describe("Button", () => {
  test("renders a button with the correct text", () => {
    const { getByText } = render(<Button text="Click me!" />);
    const button = getByText("Click me!");
    expect(button).toBeInTheDocument();
  });

  test("calls onClick when the button is clicked", () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <Button text="Click me!" onClick={handleClick} />
    );
    const button = getByText("Click me!");
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalled();
  });
});
