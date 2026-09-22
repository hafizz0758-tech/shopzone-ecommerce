function OrderSuccess({ setPage }) {

  return (

    <div className="order-success-page">

      <div className="order-success-card">

        <div className="success-icon">
          ✓
        </div>


        <p className="success-small">
          SHOPZONE
        </p>


        <h1>
          Order Placed Successfully!
        </h1>


        <p className="success-message">
          Thank you for shopping with ShopZone.
          Your order has been placed successfully.
        </p>


        <div className="success-buttons">

          <button
            className="success-orders-btn"
            onClick={() => setPage("orders")}
          >
            View My Orders
          </button>


          <button
            className="success-home-btn"
            onClick={() => setPage("products")}
          >
            Continue Shopping
          </button>

        </div>

      </div>

    </div>

  );

}

export default OrderSuccess;