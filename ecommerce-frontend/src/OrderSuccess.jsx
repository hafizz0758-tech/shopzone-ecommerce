function OrderSuccess({ setPage }) {

  return (
    <div className="success-page">

      <div className="success-box">

        <div className="success-icon">
          ✓
        </div>

        <h1>Order Placed Successfully!</h1>

        <p>
          Thank you for your order.
        </p>

        <p>
          Your order has been successfully placed.
        </p>

        <button onClick={() => setPage("products")}>
          Continue Shopping
        </button>

      </div>

    </div>
  );
}

export default OrderSuccess;