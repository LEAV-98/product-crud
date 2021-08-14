import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AddProduct } from "../screens/AddProduct";
import { EditProduct } from "../screens/EditProduct";
import { PrincipalScreen } from "../screens/PrincipalScreen";
export const AppRouter = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/add">
            <AddProduct />
          </Route>
          <Route path="/edit/:productId">
            <EditProduct />
          </Route>
          <Route path="/">
            <PrincipalScreen />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};
