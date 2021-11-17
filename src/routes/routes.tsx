import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";

interface AuthRouteProps extends RouteProps {
  pageComponent: React.ElementType;
  isPrivate?: boolean;
}

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

const AuthRoute = ({
  pageComponent: Component,
  isPrivate,
  ...rest
}: AuthRouteProps) => {
  const token: string | null = JSON.parse(
    `${localStorage.getItem("@conserta:accessToken")}`
  );

  return (
    <Route
      {...rest}
      render={() =>
        !!isPrivate === !!token ? (
          <Component />
        ) : (
          <Redirect to={isPrivate ? "/" : "/dashboard"} />
        )
      }
    />
  );
};

export default AuthRoute;
