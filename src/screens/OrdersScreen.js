import React, { useEffect, useState } from "react";
import { firebase } from "../firebase/firebase-config";
import moment from "moment";
import { Link } from "react-router-dom";
import { CssBaseline, makeStyles } from "@material-ui/core";
import { SideBar } from "./SideBar";
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
  useEffect(() => {
    firebase
      .firestore()
      .collection("orders")
      .orderBy("tiempo")
      .onSnapshot((snapshot) => {
        const newOrders = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(newOrders);
      });
    return () => {
      setOrders([]);
    };
  }, []);
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        <SideBar />
        <main className={classes.content}>
          <div className="container">
            <h1>Ordenes</h1>

            <div className="row">
              {orders.map((order) => (
                <div className="card col-md-4 col-sm-12" key={order.id}>
                  <div className="card-body">
                    <p className="card-title">N° de pedido: {order.id}</p>
                    <p>
                      Fecha y Hora:{" "}
                      {moment(order.tiempo).format("MMMM Do YYYY, h:mm:ss a")}
                    </p>
                    <p className="card-text d-inline">Estado de pedido </p>
                    <button
                      className={
                        order.estado === "Por Confirmar"
                          ? "btn btn-danger "
                          : order.estado === "Enviado"
                          ? "btn btn-warning"
                          : "btn btn-primary"
                      }
                    >
                      {order.estado}
                    </button>
                    <Link
                      className="btn btn-success d-block mt-2"
                      to={`/orders/${order.id}`}
                    >
                      Ver Más
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};
