import React from "react";
import { render, screen } from "@testing-library/react";
import ModalOrderRegister from "../../../components/Modal/ModalOrder";

describe("Modal Create Order component", () => {
  it("Should be able to render the Modal", () => {
    render(
      <ModalOrderRegister isOpen={true} onClose={(r) => r} onOpen={(r) => r} />
    );
    expect(screen.getByText("Novo Chamado")).toBeInTheDocument();
    expect(screen.getByText("Cadastrar Chamado")).toBeInTheDocument();
  });
});
