import { useEffect, useState } from "react";
import axios from "axios";

function AdminOrders({ setPage }) {

  const [orders, setOrders] = useState([]);


  const getOrders = () => {

    axios.get(
      "http://localhost:8080/api/orders/all"
    )
      .then((response) => {

        console.log(response.data);

        setOrders(response.data);

      })
      .catch((error) => {

        console.log(error);

        alert("Failed to load orders");

      });

  };


  useEffect(() => {

    getOrders();

  }, []);


  return (

    <div className="admin-orders">

      <h1>
        Customer Orders 📦
      </h1>


      <button
        onClick={() => setPage("admin")}
      >
        ← Back to Admin
      </button>


      {orders.length === 0 ? (

        <div>

          <h2>
            No Orders Found
          </h2>

          <p>
            No customer orders available.
          </p>

        </div>

      ) : (

        <div className="admin-orders-list">

          {orders.map((order) => (

            <div
              key={order.id}
              className="admin-order-card"
            >

              <h2>
                Order #{order.id}
              </h2>

              <p>
                <strong>User ID:</strong>{" "}
                {order.userId}
              </p>

              <p>
                <strong>Name:</strong>{" "}
                {order.name}
              </p>

              <p>
                <strong>Phone:</strong>{" "}
                {order.phone}
              </p>

              <p>
                <strong>Address:</strong>{" "}
                {order.address}
              </p>

              <p>
                <strong>Payment:</strong>{" "}
                {order.payment}
              </p>

              <p>
                <strong>Products:</strong>{" "}
                {order.productName}
              </p>

              <p>
                <strong>Quantity:</strong>{" "}
                {order.quantity}
              </p>

              <p>
                <strong>Total:</strong>{" "}
                ₹{order.total}
              </p>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}

export default AdminOrders;
