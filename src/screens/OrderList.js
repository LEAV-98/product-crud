import React from "react";
import { OrderItem } from "./OrderItem";

export const OrderList = ({ orders }) => {
  return (
    <>
      {orders.map((order) => (
        <OrderItem order={order} key={order.id} />
      ))}
    </>
  );
};
