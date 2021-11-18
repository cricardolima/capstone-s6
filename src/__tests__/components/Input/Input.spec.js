import React from "react";
import { render, screen } from "@testing-library/react";
import { Input } from "../../../components/Input";

describe("Input component", () => {
  it("Should be able to render the cards", () => {
    render(<Input name={"Telefone"} label={"Phone"} />);
    expect(screen.getByLabelText("Phone")).toBeTruthy();
  });
});
