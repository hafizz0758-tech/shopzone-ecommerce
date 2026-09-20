import { useEffect, useState } from "react";
import axios from "axios";

function Checkout({ setPage, loggedInUser }) {

  const [cartItems, setCartItems] = useState([]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("");


  // ================= GET CART =================

  useEffect(() => {

    if (!loggedInUser) {

      setPage("login");

      return;

    }

    axios.get(
      `http://localhost:8080/api/cart?userId=${loggedInUser.id}`
    )
      .then((response) => {

        console.log(response.data);

        setCartItems(response.data);

      })
      .catch((error) => {

        console.log(error);

      });

  }, [loggedInUser]);


  // ================= GRAND TOTAL =================

  const grandTotal = cartItems.reduce(
    (total, item) =>
      total + (item.price * item.quantity),
    0
  );


  // ================= PLACE ORDER =================

  const placeOrder = (e) => {

    e.preventDefault();


    // Check cart
    if (cartItems.length === 0) {

      alert("Your cart is empty!");

      return;

    }


    // Product names
    const productNames = cartItems
      .map((item) => item.name)
      .join(", ");


    // Total quantity
    const totalQuantity = cartItems.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );


    // Order object
    const order = {

      userId: loggedInUser.id,

      name: name,

      phone: phone,

      address: address,

      payment: payment,

      productName: productNames,

      quantity: totalQuantity,

      total: grandTotal

    };


    console.log("Order:", order);


    // Save order
    axios.post(
      "http://localhost:8080/api/orders",
      order
    )
      .then((response) => {

        console.log(
          "Order saved:",
          response.data
        );


        alert(
          "Order placed successfully!"
        );


        // Go to success page
        setPage("success");

      })
      .catch((error) => {

        console.log(error);


        // Backend error message
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {

          alert(
            error.response.data.message
          );

        } else {

          alert(
            "Failed to place order"
          );

        }

      });

  };


  // ================= UI =================

  return (

    <div className="checkout-page">


      <h1>
        Checkout
      </h1>


      {/* ================= ORDER SUMMARY ================= */}

      <div className="checkout-summary">

        <h2>
          Order Summary
        </h2>


        {cartItems.map((item) => (

          <div
            key={item.id}
            className="checkout-item"
          >


            {/* Product Image */}

            <img
              src={
                `http://localhost:8080/images/${item.image}`
              }
              alt={item.name}
              className="checkout-image"
            />


            {/* Product Details */}

            <div>

              <h3>
                {item.name}
              </h3>


              <p>
                Price: ₹{item.price}
              </p>


              <p>
                Quantity: {item.quantity}
              </p>


              <p>
                Total: ₹
                {item.price * item.quantity}
              </p>

            </div>

          </div>

        ))}


        <h2>
          Grand Total: ₹{grandTotal}
        </h2>

      </div>


      {/* ================= DELIVERY FORM ================= */}

      <div className="checkout-form">

        <h2>
          Delivery Details
        </h2>


        <form onSubmit={placeOrder}>


          {/* Name */}

          <label>
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
          />


          {/* Phone */}

          <label>
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
          />


          {/* Address */}

          <label>
            Address
          </label>

          <textarea
            placeholder="Enter delivery address"
            value={address}
            onChange={(e) =>
              setAddress(e.target.value)
            }
            required
          >
          </textarea>


          {/* Payment */}

          <label>
            Payment Method
          </label>

          <select
            value={payment}
            onChange={(e) =>
              setPayment(e.target.value)
            }
            required
          >

            <option value="">
              Select Payment Method
            </option>

            <option value="Cash on Delivery">
              Cash on Delivery
            </option>

            <option value="UPI">
              UPI
            </option>

            <option value="Card">
              Card
            </option>

          </select>


          {/* Place Order */}

          <button type="submit">
            Place Order
          </button>


          {/* Back */}

          <button
            type="button"
            onClick={() => setPage("cart")}
          >
            ← Back to Cart
          </button>

        </form>

      </div>

    </div>

  );

}

export default Checkout;