import axios from "./axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";

function Order() {
  const [{ user }] = useStateValue();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios
      .post("/orders/get", { email: user.email })
      .then((res) => setOrders(res.data));
  }, []);
  console.log(orders);

  return (
    <div className="Container">
      <div className="Main">
        <div className="OrderContainer">
          <h2>Your Orders</h2>
          <p>{moment.unix(orders.data.created).format("MMMM Do YYYY, h:mma")}</p>
          {orders.map((order) => (
            <div className="OrderDetail">
              <div className="AddressComponent">
                <h4>Shipping Address</h4>

                <div>
                  <p>{order.address.fullName}</p>
                  <p>{order.address.flat}</p>
                  <p>{order.address.area}</p>

                  <p>
                    {order.address.city} {order.address.state}
                  </p>
                  <p>Phone : {order.address.phone}</p>
                </div>
              </div>
              <div className="OrderBasket">
                <h4>Order</h4>
                <p>
                  Subtotal : $ <span>{order.price}</span>
                </p>

                {order.products.map((product) => (
                  <div className="Product">
                    <CheckoutProduct
                      id={product.id}
                      title={product.title}
                      image={product.image}
                      price={product.price}
                      rating={product.rating}
                      hideButton
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Order;
