import React from "react";
import { render, screen } from "@testing-library/react";
import { ModalCheckoutOrder } from "../../../components/Modal/ModalCheckoutOrder";

describe("Modal Checkout component", () => {
  it("Should be able to render the Modal", () => {
    render(
      <ModalCheckoutOrder
        isOpen={true}
        onClose={(r) => r}
        onOpen={(r) => r}
        orderId={2}
      />
    );
    expect(screen.getByText("Checkout da Ordem")).toBeInTheDocument();
    expect(screen.getByText("Concluir")).toBeInTheDocument();
  });
});
