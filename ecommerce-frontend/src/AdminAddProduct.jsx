import { useState } from "react";
import axios from "axios";

function AdminAddProduct({ setPage }) {

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);

  const addProduct = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select a product image");
      return;
    }

    const formData = new FormData();

    formData.append("name", name);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("category", category);
    formData.append("image", image);

    try {

      const response = await axios.post(
        "https://shopzone-ecommerce-production-0d1b.up.railway.app/api/products",
        formData
      );

      console.log(response.data);

      alert("Product added successfully!");

      // Clear form
      setName("");
      setPrice("");
      setQuantity("");
      setCategory("");
      setImage(null);

      // Go to Admin Products
      setPage("adminProducts");

    } catch (error) {

      console.log("Add product error:", error);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        alert(error.response.data.message);
      } else {
        alert("Failed to add product");
      }
    }
  };

  return (
    <div className="admin-add-product-page">

      <div className="admin-add-product-card">

        <button
          className="admin-back-btn"
          onClick={() => setPage("admin")}
        >
          ← Back to Dashboard
        </button>

        <div className="admin-form-heading">
          <p>SHOPZONE ADMIN</p>
          <h1>Add New Product</h1>
          <span>
            Add a new product to your ShopZone store.
          </span>
        </div>

        <form
          className="admin-product-form"
          onSubmit={addProduct}
        >

          <div className="form-group">
            <label>Product Name</label>

            <input
              type="text"
              placeholder="Enter product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>


          <div className="form-row">

            <div className="form-group">
              <label>Price</label>

              <input
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                min="0"
                required
              />
            </div>


            <div className="form-group">
              <label>Quantity</label>

              <input
                type="number"
                placeholder="Enter quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                min="0"
                required
              />
            </div>

          </div>


          <div className="form-group">
            <label>Category</label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">
                Select Category
              </option>

              <option value="Mobiles">
                Mobiles
              </option>

              <option value="Laptops">
                Laptops
              </option>

              <option value="Electronics">
                Electronics
              </option>

              <option value="Accessories">
                Accessories
              </option>

              <option value="Fashion">
                Fashion
              </option>

              <option value="Home">
                Home
              </option>

            </select>
          </div>


          <div className="form-group">

            <label>Product Image</label>

            <div className="image-upload-box">

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setImage(e.target.files[0])
                }
                required
              />

              {image && (
                <p className="selected-image">
                  Selected: {image.name}
                </p>
              )}

            </div>

          </div>


          <button
            type="submit"
            className="add-product-submit"
          >
            ➕ Add Product
          </button>

        </form>

      </div>

    </div>
  );
}

export default AdminAddProduct;