import React from "react";
import { render, screen } from "@testing-library/react";
import ModalEvaluationScreen from "../../../components/Modal/ModalEvaluationScreen";

describe("Modal Evaluation component", () => {
  it("Should be able to render the Modal", () => {
    render(
      <ModalEvaluationScreen
        isOpen={true}
        onClose={(r) => r}
        onOpen={(r) => r}
        orderId={2}
        id={2}
      />
    );
    expect(screen.getByText("Avaliação de Serviço")).toBeInTheDocument();
    expect(screen.getByText("Concluir")).toBeInTheDocument();
  });
});
