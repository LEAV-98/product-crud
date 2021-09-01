import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

export const TableOrders = ({ orders }) => {
  return (
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Fecha y Hora</th>
          <th scope="col">Estado del pedido</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr>
            <th scope="row">{order.id}</th>
            <td>{moment(order.tiempo).format("MMMM Do YYYY, h:mm:ss a")}</td>
            <td>
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
            </td>
            <td>
              <Link
                className="btn btn-success d-block"
                to={`/orders/${order.id}`}
              >
                Ver Más
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
