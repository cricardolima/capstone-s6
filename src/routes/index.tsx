import * as React from "react";
import { CheckOut } from "../pages/CheckOut";
import { Switch } from "react-router-dom";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { RegisterCompany } from "../pages/RegisterCompany";
import { RegisterUser } from "../pages/RegisterUser";
import DashboardRoute from "./dashboardRoute";
import AuthRoute from "./routes";
import { DashboardUser } from "../pages/DashboardUser";

export const Routes = () => {
  return (
    <Switch>
      <AuthRoute exact path="/" component={Home} />
      <AuthRoute exact isPrivate path="/dashboard" component={DashboardRoute} />
      <AuthRoute path="/login" component={Login} />
      <AuthRoute path="/registerUser" component={RegisterUser} />
      <AuthRoute path="/registerCompany" component={RegisterCompany} />
      <AuthRoute path="/check" component={CheckOut} />
      <AuthRoute path="/dashboard/user" component={DashboardUser} />
      {/* <AuthRoute
        isPrivate
        path="/dashboard/worker"
        component={WorkerDashboard}
      /> */}
    </Switch>
  );
};
