import React from "react";
import { Route, RouterProps } from "react-router-dom";
import { DashboardUser } from "../pages/DashboardUser";
import { DashboardWorker } from "../pages/DashboardWorker";

interface IUser {
  email: string;
  name: string;
  company_name: string;
  cpf_cnpj?: string;
  address?: string;
  id: number;
  type: "user" | "company";
  phone?: string;
}

const DashboardRoute = (props: RouterProps) => {
  const user: IUser = JSON.parse(`${localStorage.getItem("@conserta:user")}`);

  return (
    <Route
      {...props}
      render={() =>
        user.type === "user" ? <DashboardUser /> : <DashboardWorker />
      }
    />
  );
};

export default DashboardRoute;
