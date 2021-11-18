import React from "react";
import { render, screen } from "@testing-library/react";
import { TabsWorker } from "../../../components/Tabs/TabsWorker";
import { AppProvider } from "../../../providers";

describe("worker Tabs component", () => {
  it("should render the company tabs", function () {
    render(
      <AppProvider>
        <TabsWorker />
      </AppProvider>
    );

    expect(screen.getByText("Meus Serviços")).toBeInTheDocument();
    expect(screen.getByText("Tutorial do Maps")).toBeInTheDocument();
  });
});
