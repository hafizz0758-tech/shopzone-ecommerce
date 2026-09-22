import { useEffect, useState } from "react";
import axios from "axios";

function Cart({ setPage, loggedInUser, setCartCount }) {

  const [carts, setCarts] = useState([]);

  useEffect(() => {

    if (!loggedInUser) {
      return;
    }

    axios
      .get(`http://localhost:8080/api/cart?userId=${loggedInUser.id}`)
      .then((response) => {

        setCarts(response.data);

        const count = response.data.reduce(
          (total, item) => total + item.quantity,
          0
        );

        setCartCount(count);

      })
      .catch((error) => {
        console.log("Cart error:", error);
      });

  }, [loggedInUser, setCartCount]);


  const removeFromCart = (id) => {

    axios
      .delete(`http://localhost:8080/api/cart/${id}`)
      .then(() => {

        setCarts((previousCarts) =>
          previousCarts.filter((item) => item.id !== id)
        );

        setCartCount((previousCount) =>
          Math.max(previousCount - 1, 0)
        );

      })
      .catch((error) => {
        console.log("Remove cart error:", error);
      });

  };


  const total = carts.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );


  if (!loggedInUser) {

    return (
      <div className="cart-page">

        <div className="empty-cart">

          <h2>
            Please Login
          </h2>

          <p>
            Login to view your cart.
          </p>

          <button onClick={() => setPage("login")}>
            Login
          </button>

        </div>

      </div>
    );

  }


  return (

    <div className="cart-page">

      <div className="cart-container">

        <div className="cart-heading">

          <p>
            SHOPZONE
          </p>

          <h1>
            My Cart
          </h1>

          <span>
            Review your selected products.
          </span>

        </div>


        {carts.length === 0 ? (

          <div className="empty-cart">

            <div className="empty-cart-icon">
              🛒
            </div>

            <h2>
              Your Cart is Empty
            </h2>

            <p>
              You haven't added any products yet.
            </p>

            <button onClick={() => setPage("products")}>
              Continue Shopping
            </button>

          </div>

        ) : (

          <>

            <div className="cart-items">

              {carts.map((item) => (

                <div
                  className="cart-item"
                  key={item.id}
                >

                  <img
                    src={`http://localhost:8080/images/${item.image}`}
                    alt={item.name}
                    className="cart-item-image"
                  />

                  <div className="cart-item-info">

                    <h2>
                      {item.name}
                    </h2>

                    <p>
                      Price: ₹{item.price}
                    </p>

                    <p>
                      Quantity: {item.quantity}
                    </p>

                    <h3>
                      ₹{item.price * item.quantity}
                    </h3>

                  </div>


                  <button
                    className="remove-cart-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>

                </div>

              ))}

            </div>


            <div className="cart-summary">

              <h2>
                Cart Summary
              </h2>

              <div className="cart-total">

                <span>
                  Total
                </span>

                <strong>
                  ₹{total}
                </strong>

              </div>

              <button
                className="checkout-btn"
                onClick={() => setPage("checkout")}
              >
                Proceed to Checkout →
              </button>

            </div>

          </>

        )}

      </div>

    </div>

  );
}

export default Cart;