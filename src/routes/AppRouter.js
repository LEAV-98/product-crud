import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AddProduct } from "../screens/AddProduct";
import { EditProduct } from "../screens/EditProduct";
import { LoginScreen } from "../screens/LoginScreen";
import { OrderScreen } from "../screens/OrderScreen";
import { OrdersScreen } from "../screens/OrdersScreen";
import { PrincipalScreen } from "../screens/PrincipalScreen";
import { ProductsScreen } from "../screens/ProductsScreen";
import { firebase } from "./../firebase/firebase-config";
import { login } from "../actions/auth";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import { LoadingScreen } from "../screens/LoadingScreen";
export const AppRouter = () => {
  const dispatch = useDispatch();

  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName, user.email));
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }

      setChecking(false);
    });
  }, [dispatch, setChecking, setIsLoggedIn]);
  if (checking) {
    return <LoadingScreen />;
  } else {
    return (
      <Router>
        <div>
          <Switch>
            {/* <Route path="/add">
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
            </Route> */}
            <PrivateRoute
              isAuthenticated={isLoggedIn}
              path="/add"
              component={AddProduct}
            />
            <PrivateRoute
              exact
              isAuthenticated={isLoggedIn}
              path="/orders"
              component={OrdersScreen}
            />
            <PrivateRoute
              isAuthenticated={isLoggedIn}
              path="/orders/:id"
              component={OrderScreen}
            />
            <PrivateRoute
              isAuthenticated={isLoggedIn}
              path="/products"
              component={ProductsScreen}
            />
            <PrivateRoute
              isAuthenticated={isLoggedIn}
              path="/edit/:productId"
              component={EditProduct}
            />
            <PublicRoute
              path="/login"
              component={LoginScreen}
              isAuthenticated={isLoggedIn}
            />
            <PrivateRoute
              exact
              isAuthenticated={isLoggedIn}
              path="/"
              component={PrincipalScreen}
            />
            {/* <Route path="/dashboard">
              <PrincipalScreen />
            </Route>
            <Route path="/login">
              <LoginScreen />
            </Route> */}
          </Switch>
        </div>
      </Router>
    );
  }
};
