import * as React from "react";
import { Switch, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { RegisterCompany } from "../pages/RegisterCompany";
import { RegisterUser } from "../pages/RegisterUser";

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/registerUser" component={RegisterUser} />
      <Route exact path="/registerCompany" component={RegisterCompany} />
    </Switch>
  );
};
