import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AddProduct } from "../screens/AddProduct";
import { EditProduct } from "../screens/EditProduct";
import { OrderScreen } from "../screens/OrderScreen";
import { OrdersScreen } from "../screens/OrdersScreen";
import { PrincipalScreen } from "../screens/PrincipalScreen";
import { ProductsScreen } from "../screens/ProductsScreen";
export const AppRouter = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/add">
            <AddProduct />
          </Route>
          <Route path="/orders" exact>
            <OrdersScreen />
          </Route>
          <Route path="/orders/:id">
            <OrderScreen />
          </Route>
          <Route path="/products">
            <ProductsScreen />
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
