import { useEffect, useState } from "react";
import axios from "axios";

function Cart({ setPage, loggedInUser }) {

  const [cartItems, setCartItems] = useState([]);


  // Get current user's cart
  const getCartItems = () => {

    if (!loggedInUser) {
      setCartItems([]);
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

  };


  // Load cart
  useEffect(() => {

    getCartItems();

  }, [loggedInUser]);


  // Increase quantity
  const increaseQuantity = (item) => {

    const updatedItem = {

      userId: loggedInUser.id,

      productId: item.productId,

      name: item.name,

      price: item.price,

      quantity: item.quantity + 1,

      image: item.image

    };


    axios.put(
      `http://localhost:8080/api/cart/${item.id}`,
      updatedItem
    )
      .then(() => {

        getCartItems();

      })
      .catch((error) => {

        console.log(error);

        if (
          error.response &&
          error.response.data
        ) {

          const data = error.response.data;

          if (data.message) {

            alert(data.message);

          } else if (data.detail) {

            alert(data.detail);

          } else {

            alert("Stock limit exceeded");

          }

        } else {

          alert("Unable to update quantity");

        }

      });

  };


  // Decrease quantity
  const decreaseQuantity = (item) => {

    if (item.quantity <= 1) {

      return;

    }


    const updatedItem = {

      userId: loggedInUser.id,

      productId: item.productId,

      name: item.name,

      price: item.price,

      quantity: item.quantity - 1,

      image: item.image

    };


    axios.put(
      `http://localhost:8080/api/cart/${item.id}`,
      updatedItem
    )
      .then(() => {

        getCartItems();

      })
      .catch((error) => {

        console.log(error);

      });

  };


  // Remove item
  const removeItem = (id) => {

    axios.delete(
      `http://localhost:8080/api/cart/${id}`
    )
      .then(() => {

        getCartItems();

      })
      .catch((error) => {

        console.log(error);

      });

  };


  // Grand total
  const grandTotal = cartItems.reduce(
    (total, item) =>
      total + (item.price * item.quantity),
    0
  );


  // Checkout
  const proceedToCheckout = () => {

    if (loggedInUser) {

      setPage("checkout");

    } else {

      alert("Please login first!");

      setPage("login");

    }

  };


  return (

    <div className="cart-page">


      <h1>My Cart 🛒</h1>


      {/* Continue Shopping */}

      <button
        className="continue-btn"
        onClick={() => setPage("products")}
      >
        ← Continue Shopping
      </button>


      {/* Empty Cart */}

      {cartItems.length === 0 ? (

        <div className="empty-cart">

          <h2>
            Your Cart is Empty 🛒
          </h2>

          <p>
            Add some products to your cart.
          </p>

          <button
            onClick={() => setPage("products")}
          >
            Start Shopping
          </button>

        </div>

      ) : (

        <>


          {/* Cart Items */}

          <div className="cart-list">

            {cartItems.map((item) => (

              <div
                key={item.id}
                className="cart-item"
              >


                {/* Product Image */}

                <img
                  src={
                    `http://localhost:8080/images/${item.image}`
                  }
                  alt={item.name}
                  className="cart-image"
                />


                {/* Product Details */}

                <div className="cart-details">

                  <h2>
                    {item.name}
                  </h2>


                  <p className="cart-price">
                    ₹{item.price}
                  </p>


                  {/* Quantity */}

                  <div className="quantity">

                    <button
                      onClick={() =>
                        decreaseQuantity(item)
                      }
                    >
                      −
                    </button>


                    <span>
                      {item.quantity}
                    </span>


                    <button
                      onClick={() =>
                        increaseQuantity(item)
                      }
                    >
                      +
                    </button>

                  </div>


                  {/* Item Total */}

                  <p className="item-total">

                    Total: ₹
                    {item.price * item.quantity}

                  </p>


                  {/* Remove */}

                  <button
                    className="remove-btn"
                    onClick={() =>
                      removeItem(item.id)
                    }
                  >
                    Remove
                  </button>

                </div>

              </div>

            ))}

          </div>


          {/* Cart Summary */}

          <div className="cart-summary">

            <h2>
              Grand Total
            </h2>


            <h1>
              ₹{grandTotal}
            </h1>


            <button
              onClick={proceedToCheckout}
            >
              Proceed to Checkout →
            </button>

          </div>

        </>

      )}

    </div>

  );

}

export default Cart;