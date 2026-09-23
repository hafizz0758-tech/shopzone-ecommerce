import axios from "axios";

function ProductCard({
  product,
  setCartCount,
  loggedInUser,
  setPage,
  setSelectedProduct
}) {


  // ---------------- ADD TO CART ----------------

  const addToCart = (e) => {

    // Prevent product card click
    e.stopPropagation();


    if (!loggedInUser) {

      alert("Please login first!");

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


        // Update cart count

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


  // ---------------- OPEN PRODUCT DETAILS ----------------

  const openProductDetails = () => {

    setSelectedProduct(product);

    setPage("productDetails");

  };


  return (

    <div
      className="product-card"
      onClick={openProductDetails}
    >


      {/* PRODUCT IMAGE */}

      <img
        src={`https://shopzone-ecommerce-production-0d1b.up.railway.app/images/${product.image}`}
        alt={product.name}
        className="product-image"
      />


      {/* PRODUCT NAME */}

      <h2>
        {product.name}
      </h2>


      {/* PRICE */}

      <p className="price">
        ₹{product.price}
      </p>


      {/* STOCK */}

      <p>
        Stock: {product.quantity}
      </p>


      {/* CATEGORY */}

      <p>
        Category: {product.category}
      </p>


      {/* ADD TO CART */}

      {product.quantity > 0 ? (

        <button
          onClick={addToCart}
        >
          Add to Cart
        </button>

      ) : (

        <button
          className="out-of-stock"
          disabled
          onClick={(e) =>
            e.stopPropagation()
          }
        >
          Out of Stock
        </button>

      )}


    </div>

  );

}

export default ProductCard;