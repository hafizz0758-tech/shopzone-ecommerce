import { useEffect, useState } from "react";
import axios from "axios";

function AdminProducts({ setPage }) {

  const [products, setProducts] = useState([]);


  // Get all products
  const getProducts = () => {

    axios.get(
      "http://localhost:8080/api/products"
    )
      .then((response) => {

        console.log(response.data);

        setProducts(response.data);

      })
      .catch((error) => {

        console.log(error);

      });

  };


  // Load products
  useEffect(() => {

    getProducts();

  }, []);


  // Delete product
  const deleteProduct = (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this product?"
      );

    if (!confirmDelete) {
      return;
    }


    axios.delete(
      `http://localhost:8080/api/products/${id}`
    )
      .then(() => {

        alert("Product deleted successfully!");

        getProducts();

      })
      .catch((error) => {

        console.log(error);

        alert("Failed to delete product");

      });

  };


  return (

    <div className="admin-products">

      <h1>
        Manage Products
      </h1>

      <button
        onClick={() => setPage("admin")}
      >
        ← Back to Admin
      </button>


      <div className="admin-product-container">

        {products.map((product) => (

          <div
            className="admin-product-card"
            key={product.id}
          >

            <img
              src={
                `http://localhost:8080/images/${product.image}`
              }
              alt={product.name}
            />


            <h2>
              {product.name}
            </h2>


            <p>
              Price: ₹{product.price}
            </p>


            <p>
              Stock: {product.quantity}
            </p>


            <p>
              Category: {product.category}
            </p>


            <button
              onClick={() =>
                deleteProduct(product.id)
              }
            >
              🗑️ Delete
            </button>

          </div>

        ))}

      </div>

    </div>

  );

}

export default AdminProducts;