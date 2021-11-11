import React from "react";
import { Route, Redirect, RouterProps } from "react-router-dom";

const DashboardRoute = (props: RouterProps) => {
  // implementar o acesso ao typo de usuário por meio de
  // localStorage ou Contexto
  const user: string = "user";

  return (
    <Route
      {...props}
      render={() => (
        <Redirect
          to={user === "user" ? "/dashboard/user" : "/dashboard/worker"}
        />
      )}
    />
  );
};

export default DashboardRoute;
