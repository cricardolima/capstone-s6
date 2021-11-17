import * as React from "react";
import { Switch } from "react-router-dom";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { RegisterCompany } from "../pages/RegisterCompany";
import { RegisterUser } from "../pages/RegisterUser";
import DashboardRoute from "./dashboardRoute";
import AuthRoute from "./routes";

export const Routes = () => {
  return (
    <Switch>
      <AuthRoute exact path="/" pageComponent={Home} />
      <AuthRoute path="/login" pageComponent={Login} />
      <AuthRoute path="/registerUser" pageComponent={RegisterUser} />
      <AuthRoute path="/registerCompany" pageComponent={RegisterCompany} />
      <AuthRoute isPrivate path="/dashboard" pageComponent={DashboardRoute} />
    </Switch>
  );
};
