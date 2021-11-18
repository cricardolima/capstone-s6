import React from "react";
import { render, screen } from "@testing-library/react";
import { OrderCard } from "../../../components/Card/OrderCardUser";

describe("Card User component", () => {
  it("Should be able to render the cards", () => {
    let item = {
      id: 1,
      title: "Hello",
      description: "World",
      status: "concluded",
      address: "",
      vehicle: { model: "Kwid" },
    };
    render(<OrderCard item={item} />);
    expect(screen.getByText("Avaliar")).toBeInTheDocument();
  });
});
