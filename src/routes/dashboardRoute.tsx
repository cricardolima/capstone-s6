import React from "react";
import { Route, Redirect, RouterProps } from "react-router-dom";

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
      render={() => (
        <Redirect
          to={user.type === "user" ? "/dashboard/user" : "/dashboard/worker"}
        />
      )}
    />
  );
};

export default DashboardRoute;
