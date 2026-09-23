import { useEffect, useState } from "react";
import axios from "axios";

function AdminOrders({ setPage }) {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);


  // ==========================================
  // GET ALL ORDERS
  // ==========================================

  const getOrders = async () => {

    try {

      console.log("Getting all orders...");

      const response = await axios.get(
        "https://shopzone-ecommerce-production-0d1b.up.railway.app/api/orders/all"
      );


      console.log("ALL ORDERS:", response.data);


      setOrders(response.data);

    } catch (error) {

      console.log("Get orders error:", error);

      if (error.response) {

        console.log(
          "Backend response:",
          error.response.data
        );

      }

      alert("Failed to load orders");

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    getOrders();

  }, []);


  // ==========================================
  // UPDATE STATUS
  // ==========================================

  const updateStatus = async (orderId, status) => {

    try {

      const response = await axios.put(

        `https://shopzone-ecommerce-production-0d1b.up.railway.app/api/orders/${orderId}/status?status=${encodeURIComponent(status)}`

      );


      console.log("Status updated:", response.data);


      setOrders((previousOrders) =>

        previousOrders.map((order) =>

          order.id === orderId

            ? {
                ...order,
                status: response.data.status
              }

            : order

        )

      );


      alert(
        `Order #${orderId} updated to ${status}`
      );


    } catch (error) {

      console.log("Update status error:", error);

      alert("Failed to update order status");

    }

  };


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (

      <div className="admin-orders-page">

        <div className="admin-orders-loading">

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

    <div className="admin-orders-page">

      <div className="admin-orders-container">


        <button
          className="admin-back-btn"
          onClick={() => setPage("admin")}
        >
          ← Back to Dashboard
        </button>


        <div className="admin-orders-heading">

          <p>
            SHOPZONE ADMIN
          </p>

          <h1>
            Customer Orders
          </h1>

          <span>
            Manage customer orders and delivery status.
          </span>

        </div>


        {orders.length === 0 ? (

          <div className="no-orders-box">

            <div className="no-orders-icon">
              📦
            </div>

            <h2>
              No Orders Found
            </h2>

            <p>
              There are no customer orders yet.
            </p>

            <button
              onClick={getOrders}
              style={{
                marginTop: "20px",
                padding: "10px 18px",
                border: "none",
                borderRadius: "8px",
                background: "#111827",
                color: "white",
                cursor: "pointer"
              }}
            >
              Refresh Orders
            </button>

          </div>

        ) : (

          <div className="admin-orders-grid">

            {orders.map((order) => (

              <div
                className="admin-order-card"
                key={order.id}
              >


                {/* HEADER */}

                <div className="admin-order-top">

                  <div>

                    <span className="order-label">
                      ORDER ID
                    </span>

                    <h2>
                      #{order.id}
                    </h2>

                  </div>


                  <span className="order-status status-packed">

                    {order.status || "Packed"}

                  </span>

                </div>


                {/* CUSTOMER */}

                <div className="admin-order-section">

                  <h3>
                    Customer Details
                  </h3>

                  <p>
                    <strong>Name:</strong>{" "}
                    {order.name}
                  </p>

                  <p>
                    <strong>User ID:</strong>{" "}
                    {order.userId}
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


                {/* ORDER */}

                <div className="admin-order-section">

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

                  <p className="admin-order-total">

                    <strong>
                      Total:
                    </strong>{" "}

                    ₹{order.total}

                  </p>

                </div>


                {/* STATUS */}

                <div className="order-status-section">

                  <h3>
                    Update Delivery Status
                  </h3>


                  <div className="status-buttons">


                    <button
                      onClick={() =>
                        updateStatus(
                          order.id,
                          "Packed"
                        )
                      }
                    >
                      📦 Packed
                    </button>


                    <button
                      onClick={() =>
                        updateStatus(
                          order.id,
                          "Shipped"
                        )
                      }
                    >
                      🚚 Shipped
                    </button>


                    <button
                      onClick={() =>
                        updateStatus(
                          order.id,
                          "Out for Delivery"
                        )
                      }
                    >
                      🛵 Out for Delivery
                    </button>


                    <button
                      onClick={() =>
                        updateStatus(
                          order.id,
                          "Delivered"
                        )
                      }
                    >
                      ✅ Delivered
                    </button>

                  </div>

                </div>


              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  );

}

export default AdminOrders;