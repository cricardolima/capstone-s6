import React from "react";
import { render, screen } from "@testing-library/react";
import { OrderCardUnpicked } from "../../../components/Card/OrderCardUnpicked";

describe("Card Unpicked component", () => {
  it("Should be able to render the cards", () => {
    let item = {};
    render(<OrderCardUnpicked item={item} />);
    expect(screen.getByText("Resgatar")).toBeInTheDocument();
  });
});
