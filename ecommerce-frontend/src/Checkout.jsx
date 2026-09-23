import { useEffect, useState } from "react";
import axios from "axios";

function Checkout({ loggedInUser, setPage }) {

  const [carts, setCarts] = useState([]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("Cash on Delivery");

  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);


  // ==========================================
  // GET CART ITEMS
  // ==========================================

  useEffect(() => {

    if (!loggedInUser) {
      setPage("login");
      return;
    }

    axios
      .get(
        `https://shopzone-ecommerce-production-0d1b.up.railway.app/api/cart?userId=${loggedInUser.id}`
      )
      .then((response) => {

        console.log("CHECKOUT CART:", response.data);

        setCarts(response.data);

        setLoading(false);

      })
      .catch((error) => {

        console.log("CART ERROR:", error);

        setLoading(false);

      });

  }, [loggedInUser, setPage]);


  // ==========================================
  // TOTAL
  // ==========================================

  const total = carts.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );


  // ==========================================
  // PLACE ORDER
  // ==========================================

  const placeOrder = async (e) => {

    e.preventDefault();

    if (carts.length === 0) {

      alert("Cart is empty!");

      return;

    }


    if (!name || !phone || !address) {

      alert("Please fill all details");

      return;

    }


    setPlacingOrder(true);


    try {

      const productName = carts
        .map((item) => item.name)
        .join(", ");


      const quantity = carts.reduce(
        (sum, item) => sum + item.quantity,
        0
      );


      const orderData = {

        userId: loggedInUser.id,

        name: name,

        phone: phone,

        address: address,

        payment: payment,

        productName: productName,

        quantity: quantity,

        total: total,

        status: "Packed"

      };


      console.log("ORDER DATA:", orderData);


      const response = await axios.post(
        "https://shopzone-ecommerce-production-0d1b.up.railway.app/api/orders",
        orderData
      );


      console.log("ORDER RESPONSE:", response.data);


      alert("Order placed successfully!");


      setPage("orderSuccess");


    } catch (error) {

      console.log("ORDER ERROR:", error);

      if (error.response) {

        console.log(
          "BACKEND ERROR:",
          error.response.data
        );

      }

      alert("Failed to place order");

    } finally {

      setPlacingOrder(false);

    }

  };


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (

      <div
        style={{
          minHeight: "100vh",
          background: "#f5f7fb",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >

        <h2 style={{ color: "#111827" }}>
          Loading Checkout...
        </h2>

      </div>

    );

  }


  // ==========================================
  // CHECKOUT PAGE
  // ==========================================

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        padding: "40px 20px",
        color: "#111827"
      }}
    >

      <div
        style={{
          maxWidth: "1100px",
          margin: "auto"
        }}
      >


        {/* BACK BUTTON */}

        <button
          onClick={() => setPage("cart")}
          style={{
            padding: "10px 18px",
            border: "1px solid #d1d5db",
            borderRadius: "8px",
            background: "white",
            color: "#111827",
            cursor: "pointer",
            marginBottom: "30px"
          }}
        >
          ← Back to Cart
        </button>


        {/* HEADING */}

        <div style={{ marginBottom: "30px" }}>

          <p
            style={{
              color: "#2563eb",
              fontSize: "12px",
              fontWeight: "bold",
              letterSpacing: "3px"
            }}
          >
            SHOPZONE
          </p>

          <h1
            style={{
              fontSize: "40px",
              margin: "8px 0",
              color: "#111827"
            }}
          >
            Checkout
          </h1>

          <p
            style={{
              color: "#6b7280"
            }}
          >
            Complete your order.
          </p>

        </div>


        {/* MAIN GRID */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "25px"
          }}
        >


          {/* ==================================
              DELIVERY FORM
          ================================== */}

          <div
            style={{
              background: "white",
              padding: "30px",
              borderRadius: "20px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
            }}
          >

            <h2
              style={{
                marginBottom: "25px",
                color: "#111827"
              }}
            >
              Delivery Details
            </h2>


            <form onSubmit={placeOrder}>


              {/* NAME */}

              <div style={{ marginBottom: "18px" }}>

                <label
                  style={{
                    display: "block",
                    marginBottom: "7px",
                    fontWeight: "600",
                    color: "#374151"
                  }}
                >
                  Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  required
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    padding: "13px",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    color: "#111827",
                    background: "white"
                  }}
                />

              </div>


              {/* PHONE */}

              <div style={{ marginBottom: "18px" }}>

                <label
                  style={{
                    display: "block",
                    marginBottom: "7px",
                    fontWeight: "600",
                    color: "#374151"
                  }}
                >
                  Phone
                </label>

                <input
                  type="tel"
                  placeholder="Enter phone number"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value)
                  }
                  required
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    padding: "13px",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    color: "#111827",
                    background: "white"
                  }}
                />

              </div>


              {/* ADDRESS */}

              <div style={{ marginBottom: "18px" }}>

                <label
                  style={{
                    display: "block",
                    marginBottom: "7px",
                    fontWeight: "600",
                    color: "#374151"
                  }}
                >
                  Address
                </label>

                <textarea
                  placeholder="Enter delivery address"
                  value={address}
                  onChange={(e) =>
                    setAddress(e.target.value)
                  }
                  required
                  rows="4"
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    padding: "13px",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    color: "#111827",
                    background: "white",
                    resize: "vertical"
                  }}
                />

              </div>


              {/* PAYMENT */}

              <div style={{ marginBottom: "25px" }}>

                <label
                  style={{
                    display: "block",
                    marginBottom: "7px",
                    fontWeight: "600",
                    color: "#374151"
                  }}
                >
                  Payment Method
                </label>

                <select
                  value={payment}
                  onChange={(e) =>
                    setPayment(e.target.value)
                  }
                  style={{
                    width: "100%",
                    padding: "13px",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    color: "#111827",
                    background: "white"
                  }}
                >

                  <option value="Cash on Delivery">
                    Cash on Delivery
                  </option>

                  <option value="Card">
                    Card
                  </option>

                  <option value="UPI">
                    UPI
                  </option>

                </select>

              </div>


              {/* PLACE ORDER */}

              <button
                type="submit"
                disabled={placingOrder}
                style={{
                  width: "100%",
                  padding: "15px",
                  border: "none",
                  borderRadius: "10px",
                  background: "#111827",
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "700",
                  cursor: placingOrder
                    ? "not-allowed"
                    : "pointer",
                  opacity: placingOrder ? 0.7 : 1
                }}
              >

                {placingOrder
                  ? "Placing Order..."
                  : "Place Order"
                }

              </button>

            </form>

          </div>


          {/* ==================================
              ORDER SUMMARY
          ================================== */}

          <div
            style={{
              background: "white",
              padding: "30px",
              borderRadius: "20px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              height: "fit-content"
            }}
          >

            <h2
              style={{
                marginBottom: "25px",
                color: "#111827"
              }}
            >
              Order Summary
            </h2>


            {carts.length === 0 ? (

              <p
                style={{
                  color: "#6b7280"
                }}
              >
                Your cart is empty.
              </p>

            ) : (

              carts.map((item) => (

                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "15px",
                    padding: "15px 0",
                    borderBottom: "1px solid #e5e7eb"
                  }}
                >

                  <img
                    src={`https://shopzone-ecommerce-production-0d1b.up.railway.app/images/${item.image}`}
                    alt={item.name}
                    style={{
                      width: "75px",
                      height: "75px",
                      objectFit: "contain",
                      borderRadius: "10px",
                      background: "#f3f4f6"
                    }}
                  />


                  <div>

                    <h3
                      style={{
                        margin: "0 0 7px",
                        color: "#111827"
                      }}
                    >
                      {item.name}
                    </h3>

                    <p
                      style={{
                        margin: 0,
                        color: "#6b7280"
                      }}
                    >
                      ₹{item.price} × {item.quantity}
                    </p>

                  </div>

                </div>

              ))

            )}


            {/* TOTAL */}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "25px",
                paddingTop: "20px",
                borderTop: "2px solid #111827"
              }}
            >

              <strong
                style={{
                  fontSize: "20px",
                  color: "#111827"
                }}
              >
                Total
              </strong>

              <strong
                style={{
                  fontSize: "22px",
                  color: "#2563eb"
                }}
              >
                ₹{total}
              </strong>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Checkout;