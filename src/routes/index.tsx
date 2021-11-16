import * as React from "react";
import { Switch } from "react-router-dom";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { RegisterCompany } from "../pages/RegisterCompany";
import { RegisterUser } from "../pages/RegisterUser";
import DashboardRoute from "./dashboardRoute";
import AuthRoute from "./routes";
import { DashboardUser } from "../pages/DashboardUser";
import { DashboardWorker } from "../pages/DashboardWorker";

export const Routes = () => {
  return (
    <Switch>
      <AuthRoute exact path="/" pageComponent={Home} />
      <AuthRoute path="/login" pageComponent={Login} />
      <AuthRoute path="/registerUser" pageComponent={RegisterUser} />
      <AuthRoute path="/registerCompany" pageComponent={RegisterCompany} />
      <AuthRoute
        exact
        isPrivate
        path="/dashboard"
        pageComponent={DashboardRoute}
      />
      <AuthRoute
        isPrivate
        path="/dashboard/user"
        pageComponent={DashboardUser}
      />
      <AuthRoute
        isPrivate
        path="/dashboard/worker"
        pageComponent={DashboardWorker}
      />
    </Switch>
  );
};
