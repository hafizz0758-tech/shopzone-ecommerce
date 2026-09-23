import axios from "axios";

function ProductDetails({
  product,
  setPage,
  setCartCount,
  loggedInUser
}) {

  if (!product) {
    return (
      <div className="product-details-page">

        <h2>Product not found</h2>

        <button
          onClick={() => setPage("products")}
        >
          ← Back to Products
        </button>

      </div>
    );
  }


  // ---------------- ADD TO CART ----------------

  const addToCart = () => {

    if (!loggedInUser) {

      alert("Please login first!");

      setPage("login");

      return;
    }


    if (product.quantity <= 0) {

      alert("Product is out of stock!");

      return;
    }


    const cartItem = {

      userId: loggedInUser.id,

      productId: product.id,

      name: product.name,

      price: product.price,

      quantity: 1,

      image: product.image

    };


    axios.post(
      "https://shopzone-ecommerce-production-0d1b.up.railway.app/api/cart",
      cartItem
    )

      .then((response) => {

        console.log(response.data);

        alert("Product added to cart!");

        return axios.get(
          `https://shopzone-ecommerce-production-0d1b.up.railway.app/api/cart?userId=${loggedInUser.id}`
        );

      })

      .then((response) => {

        const count =
          response.data.reduce(
            (total, item) =>
              total + item.quantity,
            0
          );

        setCartCount(count);

      })

      .catch((error) => {

        console.log(error);

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
            "Failed to add product to cart"
          );

        }

      });

  };


  return (

    <div className="product-details-page">


      {/* BACK BUTTON */}

      <button
        className="back-product-btn"
        onClick={() => setPage("products")}
      >
        ← Back to Products
      </button>


      {/* PRODUCT DETAILS */}

      <div className="product-details-card">


        {/* IMAGE */}

        <div className="product-details-image-box">

          <img
            src={`https://shopzone-ecommerce-production-0d1b.up.railway.app/images/${product.image}`}
            alt={product.name}
            className="product-details-image"
          />

        </div>


        {/* INFORMATION */}

        <div className="product-details-info">


          <p className="product-category">
            {product.category}
          </p>


          <h1>
            {product.name}
          </h1>


          <h2 className="product-details-price">
            ₹{product.price}
          </h2>


          <p className="product-stock">
            Available Stock:{" "}
            <strong>
              {product.quantity}
            </strong>
          </p>


          <p className="product-description">
            This is a premium quality{" "}
            {product.name} available in
            our ShopZone store.
          </p>


          {/* ADD TO CART */}

          {product.quantity > 0 ? (

            <button
              className="details-cart-btn"
              onClick={addToCart}
            >
              🛒 Add to Cart
            </button>

          ) : (

            <button
              className="details-cart-btn out-of-stock"
              disabled
            >
              Out of Stock
            </button>

          )}


        </div>

      </div>

    </div>

  );

}

export default ProductDetails;