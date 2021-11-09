import * as React from "react";
import { Switch } from "react-router-dom";
import { Home } from "../pages/Home";
import DashboardRoute from "./dashboardRoute";
import AuthRoute from "./routes";

export const Routes = () => {
  return (
    <Switch>
      <AuthRoute exact path="/" component={Home} />
      <AuthRoute exact isPrivate path="/dashboard" component={DashboardRoute} />
      {/* <AuthRoute path="/login" component={Login} /> */}
      {/* <AuthRoute path="/signup" component={RegisterUser} /> */}
      {/* <AuthRoute path="/signup-company" component={RegisterCompany} /> */}
      {/* <AuthRoute isPrivate path="/dashboard/user" component={UserDashboard} /> */}
      {/* <AuthRoute
        isPrivate
        path="/dashboard/worker"
        component={WorkerDashboard}
      /> */}
    </Switch>
  );
};
