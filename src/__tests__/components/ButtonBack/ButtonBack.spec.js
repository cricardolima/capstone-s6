import React from "react";
import { render, screen } from "@testing-library/react";
import { ButtonBack } from "../../../components/ButtonBack";

describe("Button component", () => {
  it("Should be able to render the button", () => {
    render(<ButtonBack />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
