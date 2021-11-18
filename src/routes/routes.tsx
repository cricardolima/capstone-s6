import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";

interface AuthRouteProps extends RouteProps {
  pageComponent: React.ElementType;
  isPrivate?: boolean;
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
