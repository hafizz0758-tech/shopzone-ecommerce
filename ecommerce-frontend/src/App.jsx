import { useEffect, useState } from "react";
import axios from "axios";

import ProductCard from "./components/ProductCard";
import ProductDetails from "./components/ProductDetails";

import Cart from "./Cart";
import Checkout from "./Checkout";
import OrderSuccess from "./OrderSuccess";
import OrderHistory from "./OrderHistory";

import Register from "./Register";
import Login from "./Login";

import AdminLogin from "./AdminLogin";
import AdminPanel from "./AdminPanel";
import AdminAddProduct from "./AdminAddProduct";
import AdminProducts from "./AdminProducts";
import AdminOrders from "./AdminOrders";

import "./App.css";


// =====================================================
// GET PAGE FROM URL
// =====================================================

function getPageFromURL() {

  const path = window.location.pathname;

  // Home
  if (path === "/") {
    return "home";
  }

  // Customer pages
  if (path === "/products") {
    return "products";
  }

  if (path === "/product-details") {
    return "productDetails";
  }

  if (path === "/login") {
    return "login";
  }

  if (path === "/register") {
    return "register";
  }

  if (path === "/cart") {
    return "cart";
  }

  if (path === "/checkout") {
    return "checkout";
  }

if (path === "/success") {
    return "orderSuccess";
}

  if (path === "/orders") {
    return "orders";
  }


  // Admin pages
  if (path === "/admin") {
    return "admin";
  }

  if (path === "/admin/login") {
    return "adminLogin";
  }

  if (path === "/admin/add-product") {
    return "addProduct";
  }

  if (path === "/admin/products") {
    return "adminProducts";
  }

  if (path === "/admin/orders") {
    return "adminOrders";
  }


  // Unknown URL
  return "home";
}


// =====================================================
// GET URL FOR PAGE
// =====================================================

function getURLFromPage(page) {

  switch (page) {

    case "home":
      return "/";

    case "products":
      return "/products";

    case "productDetails":
      return "/product-details";

    case "login":
      return "/login";

    case "register":
      return "/register";

    case "cart":
      return "/cart";

    case "checkout":
      return "/checkout";

    case "orderSuccess":
    return "/success";

    case "orders":
      return "/orders";

    case "admin":
      return "/admin";

    case "adminLogin":
      return "/admin/login";

    case "addProduct":
      return "/admin/add-product";

    case "adminProducts":
      return "/admin/products";

    case "adminOrders":
      return "/admin/orders";

    default:
      return "/";
  }
}


// =====================================================
// APP
// =====================================================

function App() {


  // ===================================================
  // PAGE
  // ===================================================

  const [page, setPage] = useState(() => {

    const currentPage = getPageFromURL();

    // If user opens /admin directly
    if (currentPage === "admin") {

      const savedAdmin =
        localStorage.getItem("admin");

      if (savedAdmin) {
        return "admin";
      }

      return "adminLogin";
    }


    // If user opens admin sub-pages directly
    if (
      currentPage === "addProduct" ||
      currentPage === "adminProducts" ||
      currentPage === "adminOrders"
    ) {

      const savedAdmin =
        localStorage.getItem("admin");

      if (savedAdmin) {
        return currentPage;
      }

      return "adminLogin";
    }


    return currentPage;

  });


  // ===================================================
  // PRODUCTS
  // ===================================================

  const [products, setProducts] = useState([]);


  // ===================================================
  // SELECTED PRODUCT
  // ===================================================

  const [selectedProduct, setSelectedProduct] =
    useState(null);


  // ===================================================
  // CART COUNT
  // ===================================================

  const [cartCount, setCartCount] =
    useState(0);


  // ===================================================
  // CUSTOMER LOGIN
  // ===================================================

  const [loggedInUser, setLoggedInUser] =
    useState(() => {

      const savedUser =
        localStorage.getItem("loggedInUser");

      if (!savedUser) {
        return null;
      }

      try {
        return JSON.parse(savedUser);
      } catch (error) {

        console.log(
          "Invalid loggedInUser data:",
          error
        );

        localStorage.removeItem(
          "loggedInUser"
        );

        return null;
      }

    });


  // ===================================================
  // ADMIN LOGIN
  // ===================================================

  const [admin, setAdmin] =
    useState(() => {

      const savedAdmin =
        localStorage.getItem("admin");

      if (!savedAdmin) {
        return null;
      }

      try {
        return JSON.parse(savedAdmin);
      } catch (error) {

        console.log(
          "Invalid admin data:",
          error
        );

        localStorage.removeItem("admin");

        return null;
      }

    });


  // ===================================================
  // GET PRODUCTS
  // ===================================================

  const getProducts = () => {

    axios
      .get(
        "https://shopzone-ecommerce-production-0d1b.up.railway.app/api/products"
      )
      .then((response) => {

        setProducts(response.data);

      })
      .catch((error) => {

        console.log(
          "Get products error:",
          error
        );

      });

  };


  // ===================================================
  // GET CART COUNT
  // ===================================================

  const getCartCount = (user) => {

    if (!user) {

      setCartCount(0);

      return;
    }


    axios
      .get(
        `https://shopzone-ecommerce-production-0d1b.up.railway.app/api/cart?userId=${user.id}`
      )
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

        console.log(
          "Get cart count error:",
          error
        );

        setCartCount(0);

      });

  };


  // ===================================================
  // INITIAL LOAD
  // ===================================================

  useEffect(() => {

    getProducts();

    if (loggedInUser) {

      getCartCount(loggedInUser);

    } else {

      setCartCount(0);

    }

  }, []);


  // ===================================================
  // BROWSER BACK / FORWARD
  // ===================================================

  useEffect(() => {

    const handlePopState = () => {

      const newPage =
        getPageFromURL();

      setPage(newPage);

    };


    window.addEventListener(
      "popstate",
      handlePopState
    );


    return () => {

      window.removeEventListener(
        "popstate",
        handlePopState
      );

    };

  }, []);


  // ===================================================
  // NAVIGATION
  // ===================================================

  const navigate = (newPage) => {

    // -----------------------------------------------
    // Product details
    // -----------------------------------------------

    if (
      newPage === "productDetails" &&
      !selectedProduct
    ) {

      newPage = "products";

    }


    // -----------------------------------------------
    // Admin protection
    // -----------------------------------------------

    if (
      (
        newPage === "admin" ||
        newPage === "addProduct" ||
        newPage === "adminProducts" ||
        newPage === "adminOrders"
      ) &&
      !admin
    ) {

      newPage = "adminLogin";

    }


    // -----------------------------------------------
    // Customer orders
    // -----------------------------------------------

    if (
      newPage === "orders" &&
      !loggedInUser
    ) {

      newPage = "login";

    }


    // -----------------------------------------------
    // Update browser URL
    // -----------------------------------------------

    const newURL =
      getURLFromPage(newPage);

    window.history.pushState(
      {},
      "",
      newURL
    );


    // -----------------------------------------------
    // Update React page
    // -----------------------------------------------

    setPage(newPage);


    // -----------------------------------------------
    // Refresh products
    // -----------------------------------------------

    if (newPage === "products") {

      getProducts();

    }


    // -----------------------------------------------
    // Refresh cart count
    // -----------------------------------------------

    if (
      newPage === "cart" &&
      loggedInUser
    ) {

      getCartCount(
        loggedInUser
      );

    }

  };


  // ===================================================
  // CUSTOMER LOGIN SUCCESS
  // ===================================================

  const handleLoginSuccess = (user) => {

    setLoggedInUser(user);

    localStorage.setItem(
      "loggedInUser",
      JSON.stringify(user)
    );

    getCartCount(user);

    navigate("home");

  };


  // ===================================================
  // CUSTOMER LOGOUT
  // ===================================================

  const handleLogout = () => {

    localStorage.removeItem(
      "loggedInUser"
    );

    setLoggedInUser(null);

    setCartCount(0);

    navigate("home");

  };


  // ===================================================
  // ADMIN LOGIN SUCCESS
  // ===================================================

  const handleAdminLoginSuccess = (
    adminData
  ) => {

    setAdmin(adminData);

    localStorage.setItem(
      "admin",
      JSON.stringify(adminData)
    );

    navigate("admin");

  };


  // ===================================================
  // ADMIN LOGOUT
  // ===================================================

  const handleAdminLogout = () => {

    localStorage.removeItem("admin");

    setAdmin(null);

    navigate("home");

  };


  // ===================================================
  // NAVBAR
  // ===================================================

  const Navbar = () => {

    return (

      <nav className="navbar">


        {/* LOGO */}

        <div
          className="logo"
          onClick={() =>
            navigate("home")
          }
        >
          ShopZone
        </div>


        {/* NAV LINKS */}

        <div className="nav-links">


          <button
            onClick={() =>
              navigate("home")
            }
          >
            Home
          </button>


          <button
            onClick={() =>
              navigate("products")
            }
          >
            Products
          </button>


          <button
            onClick={() =>
              navigate("cart")
            }
          >
            🛒 Cart ({cartCount})
          </button>


          {loggedInUser && (

            <button
              onClick={() =>
                navigate("orders")
              }
            >
              Orders
            </button>

          )}


          {!loggedInUser ? (

            <>

              <button
                onClick={() =>
                  navigate("login")
                }
              >
                Login
              </button>


              <button
                onClick={() =>
                  navigate("register")
                }
              >
                Register
              </button>

            </>

          ) : (

            <button
              onClick={handleLogout}
            >
              Logout
            </button>

          )}

        </div>

      </nav>

    );

  };


  // ===================================================
  // HOME
  // ===================================================

  if (page === "home") {

    return (

      <>

        <Navbar />


        <div className="home-page">


          {/* HERO */}

          <section className="hero-section">

            <div className="hero-content">

              <p className="hero-small">
                WELCOME TO SHOPZONE
              </p>


              <h1>
                Shop Smart.
                <br />
                Live Better.
              </h1>


              <p>
                Discover premium products
                at amazing prices.
                Shop your favourite products
                from ShopZone.
              </p>


              <button
                className="hero-btn"
                onClick={() =>
                  navigate("products")
                }
              >
                Shop Now →
              </button>

            </div>

          </section>


          {/* FEATURES */}

          <section className="features-section">


            <div className="feature-card">

              <div className="feature-icon">
                🚚
              </div>

              <h3>
                Fast Delivery
              </h3>

              <p>
                Get your products delivered
                quickly and safely.
              </p>

            </div>


            <div className="feature-card">

              <div className="feature-icon">
                🔒
              </div>

              <h3>
                Secure Shopping
              </h3>

              <p>
                Your shopping experience
                is safe and secure.
              </p>

            </div>


            <div className="feature-card">

              <div className="feature-icon">
                💳
              </div>

              <h3>
                Easy Payment
              </h3>

              <p>
                Simple and convenient
                payment options.
              </p>

            </div>


            <div className="feature-card">

              <div className="feature-icon">
                ⭐
              </div>

              <h3>
                Quality Products
              </h3>

              <p>
                Carefully selected
                products for you.
              </p>

            </div>


          </section>


          {/* CATEGORY */}

          <section className="category-section">

            <div className="section-heading">

              <p>
                EXPLORE
              </p>

              <h2>
                Shop By Category
              </h2>

              <span>
                Find products that match
                your lifestyle.
              </span>

            </div>


            <div className="category-grid">


              <div
                className="category-card"
                onClick={() =>
                  navigate("products")
                }
              >

                <div>
                  📱
                </div>

                <h3>
                  Mobiles
                </h3>

                <p>
                  Latest smartphones
                </p>

              </div>


              <div
                className="category-card"
                onClick={() =>
                  navigate("products")
                }
              >

                <div>
                  💻
                </div>

                <h3>
                  Laptops
                </h3>

                <p>
                  Powerful laptops
                </p>

              </div>


              <div
                className="category-card"
                onClick={() =>
                  navigate("products")
                }
              >

                <div>
                  🎧
                </div>

                <h3>
                  Electronics
                </h3>

                <p>
                  Modern electronics
                </p>

              </div>


              <div
                className="category-card"
                onClick={() =>
                  navigate("products")
                }
              >

                <div>
                  👕
                </div>

                <h3>
                  Fashion
                </h3>

                <p>
                  Stylish fashion
                </p>

              </div>


            </div>

          </section>


          {/* CTA */}

          <section className="home-cta">

            <div>

              <p>
                READY TO SHOP?
              </p>

              <h2>
                Find Something You'll Love
              </h2>

              <span>
                Explore our collection
                and start shopping today.
              </span>

            </div>


            <button
              onClick={() =>
                navigate("products")
              }
            >
              Explore Products →
            </button>

          </section>


        </div>


        {/* =================================================
            FOOTER - HOME PAGE ONLY
        ================================================= */}

        <footer className="home-footer">

          <div className="footer-container">


            {/* ABOUT */}

            <div className="footer-column">

              <h2>
                ShopZone
              </h2>

              <p>
                Your trusted online shopping
                destination for quality products
                at great prices.
              </p>

            </div>


            {/* QUICK LINKS */}

            <div className="footer-column">

              <h3>
                Quick Links
              </h3>


              <button
                onClick={() =>
                  navigate("home")
                }
              >
                Home
              </button>


              <button
                onClick={() =>
                  navigate("products")
                }
              >
                Products
              </button>


              <button
                onClick={() =>
                  navigate("cart")
                }
              >
                Cart
              </button>


              {loggedInUser && (

                <button
                  onClick={() =>
                    navigate("orders")
                  }
                >
                  My Orders
                </button>

              )}

            </div>


            {/* CUSTOMER */}

            <div className="footer-column">

              <h3>
                Customer
              </h3>


              {!loggedInUser ? (

                <>

                  <button
                    onClick={() =>
                      navigate("login")
                    }
                  >
                    Login
                  </button>


                  <button
                    onClick={() =>
                      navigate("register")
                    }
                  >
                    Register
                  </button>

                </>

              ) : (

                <button
                  onClick={handleLogout}
                >
                  Logout
                </button>

              )}

            </div>


            {/* CONTACT */}

            <div className="footer-column">

              <h3>
                Contact
              </h3>

              <p>
                📧 support@shopzone.com
              </p>

              <p>
                📞 +91 8778470130
              </p>

              <p>
                📍 Chennai,Velachery
              </p>

            </div>


          </div>


          {/* FOOTER BOTTOM */}

          <div className="footer-bottom">

            <p>
              © 2026 ShopZone.
              All Rights Reserved.
            </p>

            <p>
              Built with React + Spring Boot
            </p>

          </div>


        </footer>

      </>

    );

  }


  // ===================================================
  // PRODUCTS
  // ===================================================

  if (page === "products") {

    return (

      <>

        <Navbar />

        <div className="products-page">

          <div className="products-heading">

            <p>
              SHOPZONE
            </p>

            <h1>
              Our Products
            </h1>

            <span>
              Explore our latest collection.
            </span>

          </div>


          <div className="products-grid">

            {products.length === 0 ? (

              <div className="no-products">

                <h2>
                  No Products Available
                </h2>

                <p>
                  Please check again later.
                </p>

              </div>

            ) : (

              products.map((product) => (

                <ProductCard
                  key={product.id}
                  product={product}
                  setCartCount={setCartCount}
                  loggedInUser={loggedInUser}
                  setPage={navigate}
                  setSelectedProduct={
                    setSelectedProduct
                  }
                />

              ))

            )}

          </div>

        </div>

      </>

    );

  }


  // ===================================================
  // PRODUCT DETAILS
  // ===================================================

  if (page === "productDetails") {

    return (

      <>

        <Navbar />

        <ProductDetails
          product={selectedProduct}
          setPage={navigate}
          setCartCount={setCartCount}
          loggedInUser={loggedInUser}
        />

      </>

    );

  }


  // ===================================================
  // LOGIN
  // ===================================================

  if (page === "login") {

    return (

      <Login
        setPage={navigate}
        setLoggedInUser={
          handleLoginSuccess
        }
      />

    );

  }


  // ===================================================
  // REGISTER
  // ===================================================

  if (page === "register") {

    return (

      <Register
        setPage={navigate}
      />

    );

  }


  // ===================================================
  // CART
  // ===================================================

  if (page === "cart") {

    return (

      <>

        <Navbar />

        <Cart
          setPage={navigate}
          loggedInUser={loggedInUser}
          setCartCount={setCartCount}
        />

      </>

    );

  }


  // ===================================================
  // CHECKOUT
  // ===================================================

  if (page === "checkout") {

    return (

      <>

        <Navbar />

        <Checkout
          setPage={navigate}
          loggedInUser={loggedInUser}
        />

      </>

    );

  }


  // ===================================================
  // ORDER SUCCESS
  // ===================================================

 if (page === "orderSuccess") {

    return (

      <>

        <Navbar />

        <OrderSuccess
          setPage={navigate}
        />

      </>

    );

  }


  // ===================================================
  // ORDER HISTORY
  // ===================================================

  if (page === "orders") {

    if (!loggedInUser) {

      return (

        <Login
          setPage={navigate}
          setLoggedInUser={
            handleLoginSuccess
          }
        />

      );

    }


    return (

      <>

        <Navbar />

        <OrderHistory
          setPage={navigate}
          loggedInUser={loggedInUser}
        />

      </>

    );

  }


  // ===================================================
  // ADMIN LOGIN
  // ===================================================

  if (page === "adminLogin") {

    return (

      <AdminLogin
        setPage={navigate}
        onAdminLoginSuccess={
          handleAdminLoginSuccess
        }
      />

    );

  }


  // ===================================================
  // ADMIN DASHBOARD
  // ===================================================

  if (page === "admin") {

    if (!admin) {

      return (

        <AdminLogin
          setPage={navigate}
          onAdminLoginSuccess={
            handleAdminLoginSuccess
          }
        />

      );

    }


    return (

      <AdminPanel
        admin={admin}
        onLogout={handleAdminLogout}
        setPage={navigate}
      />

    );

  }


  // ===================================================
  // ADMIN ADD PRODUCT
  // ===================================================

  if (page === "addProduct") {

    if (!admin) {

      return (

        <AdminLogin
          setPage={navigate}
          onAdminLoginSuccess={
            handleAdminLoginSuccess
          }
        />

      );

    }


    return (

      <AdminAddProduct
        setPage={navigate}
      />

    );

  }


  // ===================================================
  // ADMIN PRODUCTS
  // ===================================================

  if (page === "adminProducts") {

    if (!admin) {

      return (

        <AdminLogin
          setPage={navigate}
          onAdminLoginSuccess={
            handleAdminLoginSuccess
          }
        />

      );

    }


    return (

      <AdminProducts
        setPage={navigate}
      />

    );

  }


  // ===================================================
  // ADMIN ORDERS
  // ===================================================

  if (page === "adminOrders") {

    if (!admin) {

      return (

        <AdminLogin
          setPage={navigate}
          onAdminLoginSuccess={
            handleAdminLoginSuccess
          }
        />

      );

    }


    return (

      <AdminOrders
        setPage={navigate}
      />

    );

  }


  // ===================================================
  // FALLBACK
  // ===================================================

  return (

    <>

      <Navbar />

      <div className="page-not-found">

        <h1>
          Page Not Found
        </h1>

        <button
          onClick={() =>
            navigate("home")
          }
        >
          Go Home
        </button>

      </div>

    </>

  );

}


export default App;