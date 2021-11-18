import React from "react";
import { render, screen } from "@testing-library/react";
import { TabsUser } from "../../../components/Tabs/TabsUser";
import { AppProvider } from "../../../providers";

describe("User Tabs component", () => {
  it("should render the user tabs", function () {
    render(
      <AppProvider>
        <TabsUser />
      </AppProvider>
    );

    expect(screen.getByText("Meus Serviços")).toBeInTheDocument();
  });
});
