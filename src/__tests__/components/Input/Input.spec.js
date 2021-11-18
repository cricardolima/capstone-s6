import React from "react";
import { render, screen,fireEvent,waitFor} from "@testing-library/react";
import { Input } from "../../../components/Input";

describe("Input component", () => {
  it("Should be able to render the cards", () => {
    render(<Input name={"Telefone"} label={"Phone"} />);
    expect(screen.getByLabelText("Phone")).toBeTruthy();
  });
  test("should be able insert values on input",  ()=>{
    render(<Input name={"Telefone"} placeholder="Phone" label={"Phone"} />);
      const input = screen.getByPlaceholderText("Phone");
      fireEvent.change(input,{target:{value:"85999987538"}})
      expect(input).toHaveValue("85999987538")  
})
});
