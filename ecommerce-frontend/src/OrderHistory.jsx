import { useEffect, useState } from "react";
import axios from "axios";

function OrderHistory({ setPage, loggedInUser }) {

  const [orders, setOrders] = useState([]);


  // Get logged-in user's orders
  useEffect(() => {

    if (!loggedInUser) {

      setPage("login");

      return;

    }


    axios.get(
      `http://localhost:8080/api/orders?userId=${loggedInUser.id}`
    )
      .then((response) => {

        console.log(response.data);

        setOrders(response.data);

      })
      .catch((error) => {

        console.log(error);

      });

  }, [loggedInUser]);


  return (

    <div className="orders-page">

      <h1>My Orders 📦</h1>


      {/* Back to Products */}

      <button
        onClick={() => setPage("products")}
      >
        ← Continue Shopping
      </button>


      {/* No Orders */}

      {orders.length === 0 ? (

        <div className="empty-orders">

          <h2>
            No Orders Found 📦
          </h2>

          <p>
            You haven't placed any orders yet.
          </p>

          <button
            onClick={() => setPage("products")}
          >
            Start Shopping
          </button>

        </div>

      ) : (

        <div className="orders-list">

          {orders.map((order) => (

            <div
              key={order.id}
              className="order-card"
            >

              <h2>
                Order #{order.id}
              </h2>

              <p>
                <strong>Name:</strong> {order.name}
              </p>

              <p>
                <strong>Phone:</strong> {order.phone}
              </p>

              <p>
                <strong>Address:</strong> {order.address}
              </p>

              <p>
                <strong>Payment:</strong> {order.payment}
              </p>

              <p className="order-total">
                <strong>Total:</strong> ₹{order.total}
              </p>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}

export default OrderHistory;