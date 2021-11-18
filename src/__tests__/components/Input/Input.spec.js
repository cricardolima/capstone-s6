import React from "react";
import { render, screen,fireEvent } from "@testing-library/react";
import { Input } from "../../../components/Input";

describe("Input component", () => {
  it("Should be able to render the cards", () => {
    render(<Input name={"Telefone"} label={"Phone"} />);
    expect(screen.getByLabelText("Phone")).toBeTruthy();
  });
  test("should be able insert values on input",async()=>{
    render(<Input name={"Telefone"} label={"Phone"} />);
      const input = screen.getAllByPlaceholderText("Phone");
      await fireEvent.change(input,{target:{value:"85999987538"}})
        expect(input).toHaveTextContent("85999987538")
})
});
