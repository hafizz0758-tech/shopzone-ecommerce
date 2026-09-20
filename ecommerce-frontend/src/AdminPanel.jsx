function AdminPanel({ admin, onLogout, setPage }) {

  return (
    <div className="admin-panel">

      <div className="admin-header">

        <div>
          <p className="admin-small">
            SHOPZONE ADMIN
          </p>

          <h1>
            Admin Dashboard
          </h1>

          <p>
            Welcome, {admin?.email}
          </p>
        </div>

        <button
          className="admin-logout-btn"
          onClick={onLogout}
        >
          Logout
        </button>

      </div>


      <div className="admin-cards">

        {/* ADD PRODUCT */}

        <div className="admin-card">

          <div className="admin-card-icon">
            ➕
          </div>

          <h2>
            Add Product
          </h2>

          <p>
            Add new products to your ShopZone store.
          </p>

          <button
            onClick={() => setPage("adminAddProduct")}
          >
            Add Product
          </button>

        </div>


        {/* MANAGE PRODUCTS */}

        <div className="admin-card">

          <div className="admin-card-icon">
            📦
          </div>

          <h2>
            Manage Products
          </h2>

          <p>
            View and delete products from your store.
          </p>

          <button
            onClick={() => setPage("adminProducts")}
          >
            Manage Products
          </button>

        </div>


        {/* ORDERS */}

        <div className="admin-card">

          <div className="admin-card-icon">
            🛒
          </div>

          <h2>
            Customer Orders
          </h2>

          <p>
            View all orders placed by customers.
          </p>

          <button
            onClick={() => setPage("adminOrders")}
          >
            View Orders
          </button>

        </div>

      </div>

    </div>
  );
}

export default AdminPanel;