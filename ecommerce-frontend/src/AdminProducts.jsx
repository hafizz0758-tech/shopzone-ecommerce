import { useEffect, useState } from "react";
import axios from "axios";

function AdminProducts({ setPage }) {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // GET ALL PRODUCTS
  // ==========================================

  const getProducts = async () => {

    try {

      const response = await axios.get(
        "http://localhost:8080/api/products"
      );

      console.log("ADMIN PRODUCTS:", response.data);

      setProducts(response.data);
      setLoading(false);

    } catch (error) {

      console.log("GET PRODUCTS ERROR:", error);

      alert("Failed to load products");

      setLoading(false);
    }
  };


  // ==========================================
  // LOAD PRODUCTS
  // ==========================================

  useEffect(() => {

    getProducts();

  }, []);


  // ==========================================
  // DELETE PRODUCT
  // ==========================================

  const deleteProduct = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {
      return;
    }

    try {

      await axios.delete(
        `http://localhost:8080/api/products/${id}`
      );

      alert("Product deleted successfully!");

      setProducts((previousProducts) =>
        previousProducts.filter(
          (product) => product.id !== id
        )
      );

    } catch (error) {

      console.log("DELETE PRODUCT ERROR:", error);

      alert("Failed to delete product");
    }
  };


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (

      <div className="admin-products-page">

        <div className="admin-products-loading">

          <h2>Loading Products...</h2>

        </div>

      </div>

    );
  }


  // ==========================================
  // PAGE
  // ==========================================

  return (

    <div className="admin-products-page">

      <div className="admin-products-container">


        {/* BACK BUTTON */}

        <button
          className="admin-back-btn"
          onClick={() => setPage("admin")}
        >
          ← Back to Dashboard
        </button>


        {/* PAGE HEADING */}

        <div className="admin-products-heading">

          <div>

            <p>SHOPZONE ADMIN</p>

            <h1>Manage Products</h1>

            <span>
              View and manage products in your store.
            </span>

          </div>

        </div>


        {/* NO PRODUCTS */}

        {products.length === 0 ? (

          <div className="admin-no-products">

            <div className="admin-no-products-icon">
              📦
            </div>

            <h2>No Products Found</h2>

            <p>
              There are no products in your store.
            </p>

          </div>

        ) : (

          /* PRODUCTS GRID */

          <div className="admin-products-grid">

            {products.map((product) => (

              <div
                className="admin-product-card"
                key={product.id}
              >


                {/* PRODUCT IMAGE */}

                <div className="admin-product-image-box">

                  <img
                    src={`http://localhost:8080/images/${product.image}`}
                    alt={product.name}
                  />

                </div>


                {/* PRODUCT INFORMATION */}

                <div className="admin-product-info">

                  <span className="admin-product-category">
                    {product.category}
                  </span>

                  <h2>
                    {product.name}
                  </h2>

                  <p className="admin-product-price">
                    ₹{product.price}
                  </p>

                  <p className="admin-product-stock">
                    Stock: <strong>{product.quantity}</strong>
                  </p>


                  {/* DELETE BUTTON */}

                  <button
                    className="admin-delete-product-btn"
                    onClick={() => deleteProduct(product.id)}
                  >
                    🗑 Delete Product
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  );
}

export default AdminProducts;