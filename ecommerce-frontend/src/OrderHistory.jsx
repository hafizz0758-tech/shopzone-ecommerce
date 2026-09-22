import { useEffect, useState } from "react";
import axios from "axios";

function OrderHistory({ loggedInUser, setPage }) {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);


  // ==========================================
  // GET CUSTOMER ORDERS
  // ==========================================

  useEffect(() => {

    if (!loggedInUser) {
      setPage("login");
      return;
    }

    axios
      .get(
        `http://localhost:8080/api/orders?userId=${loggedInUser.id}`
      )
      .then((response) => {

        console.log("CUSTOMER ORDERS:", response.data);

        setOrders(response.data);

        setLoading(false);

      })
      .catch((error) => {

        console.log("GET ORDERS ERROR:", error);

        setLoading(false);

      });

  }, [loggedInUser, setPage]);


  // ==========================================
  // STATUS CLASS
  // ==========================================

  const getStatusClass = (status) => {

    if (status === "Packed") {
      return "customer-status-packed";
    }

    if (status === "Shipped") {
      return "customer-status-shipped";
    }

    if (status === "Out for Delivery") {
      return "customer-status-out";
    }

    if (status === "Delivered") {
      return "customer-status-delivered";
    }

    return "customer-status-packed";

  };


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (

      <div className="customer-orders-page">

        <div className="customer-orders-loading">

          <h2>
            Loading Orders...
          </h2>

        </div>

      </div>

    );

  }


  // ==========================================
  // PAGE
  // ==========================================

  return (

    <div className="customer-orders-page">

      <div className="customer-orders-container">


        {/* BACK */}

        <button
          className="customer-back-btn"
          onClick={() => setPage("products")}
        >
          ← Continue Shopping
        </button>


        {/* HEADING */}

        <div className="customer-orders-heading">

          <p>
            SHOPZONE
          </p>

          <h1>
            My Orders
          </h1>

          <span>
            Track your orders and delivery status.
          </span>

        </div>


        {/* NO ORDERS */}

        {orders.length === 0 ? (

          <div className="customer-no-orders">

            <div className="customer-no-orders-icon">
              📦
            </div>

            <h2>
              No Orders Yet
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


          /* ORDERS */

          <div className="customer-orders-grid">

            {orders.map((order) => (

              <div
                className="customer-order-card"
                key={order.id}
              >


                {/* ORDER HEADER */}

                <div className="customer-order-header">

                  <div>

                    <span>
                      ORDER ID
                    </span>

                    <h2>
                      #{order.id}
                    </h2>

                  </div>


                  {/* STATUS */}

                  <div
                    className={`customer-order-status ${
                      getStatusClass(order.status)
                    }`}
                  >

                    {order.status || "Packed"}

                  </div>

                </div>


                {/* STATUS TRACKING */}

                <div className="order-tracking">

                  <div
                    className={
                      order.status === "Packed" ||
                      order.status === "Shipped" ||
                      order.status === "Out for Delivery" ||
                      order.status === "Delivered"
                        ? "tracking-step active"
                        : "tracking-step"
                    }
                  >

                    <div className="tracking-icon">
                      📦
                    </div>

                    <span>
                      Packed
                    </span>

                  </div>


                  <div
                    className={
                      order.status === "Shipped" ||
                      order.status === "Out for Delivery" ||
                      order.status === "Delivered"
                        ? "tracking-step active"
                        : "tracking-step"
                    }
                  >

                    <div className="tracking-icon">
                      🚚
                    </div>

                    <span>
                      Shipped
                    </span>

                  </div>


                  <div
                    className={
                      order.status === "Out for Delivery" ||
                      order.status === "Delivered"
                        ? "tracking-step active"
                        : "tracking-step"
                    }
                  >

                    <div className="tracking-icon">
                      🛵
                    </div>

                    <span>
                      Out for Delivery
                    </span>

                  </div>


                  <div
                    className={
                      order.status === "Delivered"
                        ? "tracking-step active"
                        : "tracking-step"
                    }
                  >

                    <div className="tracking-icon">
                      ✅
                    </div>

                    <span>
                      Delivered
                    </span>

                  </div>

                </div>


                {/* CUSTOMER DETAILS */}

                <div className="customer-order-section">

                  <h3>
                    Delivery Details
                  </h3>

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

                </div>


                {/* ORDER DETAILS */}

                <div className="customer-order-section">

                  <h3>
                    Order Details
                  </h3>

                  <p>
                    <strong>Product:</strong>{" "}
                    {order.productName}
                  </p>

                  <p>
                    <strong>Quantity:</strong>{" "}
                    {order.quantity}
                  </p>

                  <p>
                    <strong>Payment:</strong>{" "}
                    {order.payment}
                  </p>

                </div>


                {/* TOTAL */}

                <div className="customer-order-total">

                  <span>
                    Total Amount
                  </span>

                  <strong>
                    ₹{order.total}
                  </strong>

                </div>


              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  );

}

export default OrderHistory;