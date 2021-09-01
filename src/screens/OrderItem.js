import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

export const OrderItem = ({ order }) => {
  return (
    <div className="card col-md-4 col-sm-12" key={order.id}>
      <div className="card-body">
        <p className="card-title">N° de pedido: {order.id}</p>
        <p>
          Fecha y Hora: {moment(order.tiempo).format("MMMM Do YYYY, h:mm:ss a")}{" "}
          <br />
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
  );
};
