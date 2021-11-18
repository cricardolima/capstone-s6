import React from "react";
import { render, screen } from "@testing-library/react";
import { OrderCardCompany } from "../../../components/Card/OrderCardCompany";

describe("Card Company component", () => {
  it("Should be able to render the cards", () => {
    let item = {};
    render(<OrderCardCompany item={item} />);
    expect(screen.getByText("Maps")).toBeInTheDocument();
    expect(screen.getByText("Atualizar")).toBeInTheDocument();
  });
});
