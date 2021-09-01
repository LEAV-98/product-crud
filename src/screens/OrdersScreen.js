import React, { useEffect, useState } from "react";
import { firebase } from "../firebase/firebase-config";
import moment from "moment";
import { CssBaseline, makeStyles } from "@material-ui/core";
import { SideBar } from "./SideBar";
import { OrderList } from "./OrderList";
import { LoadingScreen } from "./LoadingScreen";
import { TableOrders } from "./TableOrders";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    paddingTop: "5rem",
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
}));
export const OrdersScreen = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [buttonToogle, setButtonToogle] = useState(0);
  useEffect(() => {
    firebase
      .firestore()
      .collection("orders")
      .orderBy("tiempo", "desc")
      .onSnapshot((snapshot) => {
        const newOrders = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(newOrders);
        setLoading(true);
      });
    return () => {
      setOrders([]);
    };
  }, []);

  const classes = useStyles();

  return (
    <>
      {loading ? (
        <div className={classes.root}>
          <CssBaseline />
          <SideBar />
          <main className={classes.content}>
            <div className="container">
              <h1>Ordenes</h1>
              <div className="btn-group my-2">
                <button
                  className="btn btn-primary"
                  onClick={() => setButtonToogle(0)}
                >
                  Tabla
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => setButtonToogle(1)}
                >
                  Cards
                </button>
              </div>
              <div
                className={
                  buttonToogle === 0 ? "view-container" : "hide-container"
                }
              >
                <h2>Ordenes del {moment(Date()).format("LL")}</h2>
                <TableOrders
                  orders={orders.filter(
                    (order) =>
                      moment(order.tiempo).format("LL") ===
                      moment(Date()).format("LL")
                  )}
                />
                <h2>Ordenes de otros dias</h2>
                <TableOrders
                  orders={orders.filter(
                    (order) =>
                      moment(order.tiempo).format("LL") !==
                      moment(Date()).format("LL")
                  )}
                />
              </div>
              <div
                className={
                  buttonToogle === 1 ? "view-container" : "hide-container"
                }
              >
                <h2>Ordenes del {moment(Date()).format("LL")}</h2>
                <div className="row">
                  <OrderList
                    orders={orders.filter(
                      (order) =>
                        moment(order.tiempo).format("LL") ===
                        moment(Date()).format("LL")
                    )}
                  />
                </div>
                <h2>Ordenes de otros dias</h2>
                <div className="row">
                  <OrderList
                    orders={orders.filter(
                      (order) =>
                        moment(order.tiempo).format("LL") !==
                        moment(Date()).format("LL")
                    )}
                  />
                </div>
              </div>
            </div>
          </main>
        </div>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
};
