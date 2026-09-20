import { useEffect, useState } from "react";

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


function App() {

  // ==================================================
  // GET PAGE FROM URL
  // ==================================================

  const getPageFromURL = () => {

    const path = window.location.pathname;


    if (path === "/admin-login") {
      return "adminLogin";
    }

    if (path === "/admin") {
      return "admin";
    }

    if (path === "/admin/add-product") {
      return "adminAddProduct";
    }

    if (path === "/admin/products") {
      return "adminProducts";
    }

    if (path === "/admin/orders") {
      return "adminOrders";
    }


    if (path === "/products") {
      return "products";
    }

    if (path === "/cart") {
      return "cart";
    }

    if (path === "/checkout") {
      return "checkout";
    }

    if (path === "/orders") {
      return "orders";
    }

    if (path === "/login") {
      return "login";
    }

    if (path === "/register") {
      return "register";
    }


    return "home";
  };


  // ==================================================
  // PAGE
  // ==================================================

  const [page, setPage] = useState(getPageFromURL);


  // ==================================================
  // CUSTOMER
  // ==================================================

  const [loggedInUser, setLoggedInUser] = useState(() => {

    const savedUser =
      localStorage.getItem("loggedInUser");

    return savedUser
      ? JSON.parse(savedUser)
      : null;

  });


  // ==================================================
  // ADMIN
  // ==================================================

  const [admin, setAdmin] = useState(() => {

    const savedAdmin =
      localStorage.getItem("admin");

    return savedAdmin
      ? JSON.parse(savedAdmin)
      : null;

  });


  // ==================================================
  // PRODUCTS
  // ==================================================

  const [products, setProducts] = useState([]);


  // ==================================================
  // CART COUNT
  // ==================================================

  const [cartCount, setCartCount] = useState(0);


  // ==================================================
  // SELECTED PRODUCT
  // ==================================================

  const [selectedProduct, setSelectedProduct] =
    useState(null);


  // ==================================================
  // CATEGORY
  // ==================================================

  const [selectedCategory, setSelectedCategory] =
    useState("All");


  // ==================================================
  // MENU
  // ==================================================

  const [menuOpen, setMenuOpen] = useState(false);


  // ==================================================
  // LOAD PRODUCTS
  // ==================================================

  const loadProducts = () => {

    fetch("http://localhost:8080/api/products")

      .then((response) => response.json())

      .then((data) => {

        setProducts(data);

      })

      .catch((error) => {

        console.log(
          "Product loading error:",
          error
        );

      });

  };


  useEffect(() => {

    loadProducts();

  }, []);


  // ==================================================
  // LOAD CART COUNT
  // ==================================================

  useEffect(() => {

    if (!loggedInUser) {

      setCartCount(0);

      return;

    }


    fetch(
      `http://localhost:8080/api/cart?userId=${loggedInUser.id}`
    )

      .then((response) => response.json())

      .then((data) => {

        const count = data.reduce(
          (total, item) =>
            total + item.quantity,
          0
        );

        setCartCount(count);

      })

      .catch((error) => {

        console.log(
          "Cart count error:",
          error
        );

      });

  }, [loggedInUser]);


  // ==================================================
  // NAVIGATION
  // ==================================================

  const navigate = (newPage) => {

    let newPath = "/";


    if (newPage === "home") {
      newPath = "/";
    }

    else if (newPage === "products") {
      newPath = "/products";
    }

    else if (newPage === "cart") {
      newPath = "/cart";
    }

    else if (newPage === "checkout") {
      newPath = "/checkout";
    }

    else if (newPage === "orders") {
      newPath = "/orders";
    }

    else if (newPage === "login") {
      newPath = "/login";
    }

    else if (newPage === "register") {
      newPath = "/register";
    }

    else if (newPage === "adminLogin") {
      newPath = "/admin-login";
    }

    else if (newPage === "admin") {
      newPath = "/admin";
    }

    else if (newPage === "adminAddProduct") {
      newPath = "/admin/add-product";
    }

    else if (newPage === "adminProducts") {
      newPath = "/admin/products";
    }

    else if (newPage === "adminOrders") {
      newPath = "/admin/orders";
    }


    window.history.pushState(
      {},
      "",
      newPath
    );


    setPage(newPage);

    setMenuOpen(false);


    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  };


  // ==================================================
  // BROWSER BACK / FORWARD
  // ==================================================

  useEffect(() => {

    const handlePopState = () => {

      setPage(getPageFromURL());

      setMenuOpen(false);

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

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


  // ==================================================
  // HOME
  // ==================================================

  const goHome = () => {

    navigate("home");

  };


  // ==================================================
  // PRODUCTS
  // ==================================================

  const goProducts = () => {

    setSelectedCategory("All");

    navigate("products");

  };


  // ==================================================
  // CART
  // ==================================================

  const openCart = () => {

    if (!loggedInUser) {

      alert("Please login first!");

      navigate("login");

      return;

    }


    navigate("cart");

  };


  // ==================================================
  // ORDERS
  // ==================================================

  const openOrders = () => {

    if (!loggedInUser) {

      alert("Please login first!");

      navigate("login");

      return;

    }


    navigate("orders");

  };


  // ==================================================
  // CUSTOMER LOGIN SUCCESS
  // ==================================================

  const handleLoginSuccess = (user) => {

    setLoggedInUser(user);


    localStorage.setItem(
      "loggedInUser",
      JSON.stringify(user)
    );


    alert("Login successful!");


    navigate("home");

  };


  // ==================================================
  // REGISTER SUCCESS
  // ==================================================

  const handleRegisterSuccess = () => {

    alert(
      "Registration successful!"
    );

    navigate("login");

  };


  // ==================================================
  // CUSTOMER LOGOUT
  // ==================================================

  const handleLogout = () => {

    localStorage.removeItem(
      "loggedInUser"
    );


    setLoggedInUser(null);

    setCartCount(0);


    alert(
      "Logged out successfully!"
    );


    navigate("home");

  };


  // ==================================================
  // ADMIN LOGIN SUCCESS
  // ==================================================

  const handleAdminLoginSuccess =
    (adminData) => {

      setAdmin(adminData);


      localStorage.setItem(
        "admin",
        JSON.stringify(adminData)
      );


      alert(
        "Admin login successful!"
      );


      navigate("admin");

    };


  // ==================================================
  // ADMIN LOGOUT
  // ==================================================

  const handleAdminLogout = () => {

    localStorage.removeItem(
      "admin"
    );


    setAdmin(null);


    alert(
      "Admin logged out!"
    );


    navigate("adminLogin");

  };


  // ==================================================
  // PRODUCT DETAILS
  // ==================================================

  const openProductDetails =
    (product) => {

      setSelectedProduct(product);


      setPage("productDetails");


      setMenuOpen(false);


      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    };


  // ==================================================
  // CATEGORIES
  // ==================================================

  const categories = [
    "All",
    ...new Set(
      products
        .map(
          (product) =>
            product.category
        )
        .filter(Boolean)
    )
  ];


  // ==================================================
  // FILTER PRODUCTS
  // ==================================================

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter(
          (product) =>
            product.category ===
            selectedCategory
        );


  // ==================================================
  // NAVBAR
  // ==================================================

  const Navbar = () => {

    return (

      <nav className="navbar">


        <div
          className="logo"
          onClick={goHome}
        >
          ShopZone
        </div>


        <div className="nav-links">


          <button onClick={goHome}>
            Home
          </button>


          <button onClick={goProducts}>
            Products
          </button>


          <button onClick={openCart}>

            🛒 Cart

            <span className="cart-badge">
              {cartCount}
            </span>

          </button>


          {loggedInUser && (

            <button onClick={openOrders}>
              Orders
            </button>

          )}


          {!loggedInUser && (

            <button
              onClick={() =>
                navigate("login")
              }
            >
              Login
            </button>

          )}


          {!loggedInUser && (

            <button
              onClick={() =>
                navigate("register")
              }
            >
              Register
            </button>

          )}


          {loggedInUser && (

            <span className="user-name">
              Hi, {loggedInUser.name}
            </span>

          )}


          {loggedInUser && (

            <button
              onClick={handleLogout}
            >
              Logout
            </button>

          )}


          {/* ADMIN NOT SHOWN */}

          <div className="menu-container">


            <button
              className="menu-button"
              onClick={() =>
                setMenuOpen(!menuOpen)
              }
            >
              ☰
            </button>


            {menuOpen && (

              <div className="menu-dropdown">

                <button
                  onClick={goHome}
                >
                  Home
                </button>


                <button
                  onClick={goProducts}
                >
                  Products
                </button>


                <button
                  onClick={openCart}
                >
                  Cart
                </button>


                {loggedInUser && (

                  <button
                    onClick={openOrders}
                  >
                    Orders
                  </button>

                )}

              </div>

            )}

          </div>

        </div>

      </nav>

    );

  };


  // ==================================================
  // HOME PAGE
  // ==================================================

  const HomePage = () => {

    return (

      <div className="home-page">


        <section className="hero-section">

          <div className="hero-content">

            <p className="hero-small">
              WELCOME TO SHOPZONE
            </p>


            <h1>
              Everything You Need,
              <br />
              All In One Place.
            </h1>


            <p className="hero-text">
              Discover quality products,
              amazing prices and a simple
              shopping experience.
            </p>


            <button
              className="hero-btn"
              onClick={goProducts}
            >
              Shop Now →
            </button>

          </div>


          <div className="hero-design">

            <div className="hero-circle"></div>


            <div className="hero-card">

              <span>
                🛍️
              </span>


              <h3>
                ShopZone
              </h3>


              <p>
                Premium Shopping
              </p>

            </div>

          </div>

        </section>


        <section className="home-category-section">

          <p className="section-small">
            SHOP BY CATEGORY
          </p>


          <h2>
            Explore Categories
          </h2>


          <p className="section-description">
            Find products that match your
            needs and style.
          </p>


          <div className="home-categories">

            {categories
              .filter(
                (category) =>
                  category !== "All"
              )
              .slice(0, 4)
              .map(
                (category) => (

                  <div
                    className="home-category-card"
                    key={category}
                    onClick={() => {

                      setSelectedCategory(
                        category
                      );

                      navigate(
                        "products"
                      );

                    }}
                  >

                    <div className="category-icon">
                      🛍️
                    </div>


                    <h3>
                      {category}
                    </h3>


                    <p>
                      Explore Products →
                    </p>

                  </div>

                )
              )}

          </div>

        </section>


        <section className="featured-section">

          <div className="featured-heading">

            <div>

              <p className="section-small">
                FEATURED PRODUCTS
              </p>


              <h2>
                Popular Products
              </h2>

            </div>


            <button
              onClick={goProducts}
            >
              View All
            </button>

          </div>


          <div className="product-container">

            {products
              .slice(0, 3)
              .map(
                (product) => (

                  <ProductCard
                    key={product.id}
                    product={product}
                    setCartCount={
                      setCartCount
                    }
                    loggedInUser={
                      loggedInUser
                    }
                    setPage={
                      (p) =>
                        navigate(p)
                    }
                    setSelectedProduct={
                      openProductDetails
                    }
                  />

                )
              )}

          </div>

        </section>


        <section className="why-section">

          <p className="section-small">
            WHY SHOPZONE
          </p>


          <h2>
            Shopping Made Simple
          </h2>


          <p className="section-description">
            We focus on making your
            shopping experience easy
            and enjoyable.
          </p>


          <div className="why-container">


            <div className="why-card">

              <div className="why-icon">
                🚚
              </div>


              <h3>
                Fast Delivery
              </h3>


              <p>
                Get your products
                delivered quickly
                and safely.
              </p>

            </div>


            <div className="why-card">

              <div className="why-icon">
                🔒
              </div>


              <h3>
                Secure Shopping
              </h3>


              <p>
                Your shopping
                experience is simple
                and secure.
              </p>

            </div>


            <div className="why-card">

              <div className="why-icon">
                ⭐
              </div>


              <h3>
                Quality Products
              </h3>


              <p>
                Discover products
                selected for a great
                shopping experience.
              </p>

            </div>


          </div>

        </section>

      </div>

    );

  };


  // ==================================================
  // PRODUCTS PAGE
  // ==================================================

  const ProductsPage = () => {

    return (

      <div className="app">


        <h1>
          Products
        </h1>


        <div className="category-menu">

          {categories.map(
            (category) => (

              <button
                key={category}
                className={
                  selectedCategory ===
                  category
                    ? "active-category"
                    : ""
                }
                onClick={() =>
                  setSelectedCategory(
                    category
                  )
                }
              >
                {category}
              </button>

            )
          )}

        </div>


        <div className="product-container">

          {filteredProducts.length ===
          0 ? (

            <p>
              No products available.
            </p>

          ) : (

            filteredProducts.map(
              (product) => (

                <ProductCard
                  key={product.id}
                  product={product}
                  setCartCount={
                    setCartCount
                  }
                  loggedInUser={
                    loggedInUser
                  }
                  setPage={
                    (p) =>
                      navigate(p)
                  }
                  setSelectedProduct={
                    openProductDetails
                  }
                />

              )
            )

          )}

        </div>

      </div>

    );

  };


  // ==================================================
  // PAGE CONTENT
  // ==================================================

  let content;


  // HOME

  if (page === "home") {

    content = <HomePage />;

  }


  // PRODUCTS

  else if (page === "products") {

    content = <ProductsPage />;

  }


  // PRODUCT DETAILS

  else if (
    page === "productDetails"
  ) {

    content = (

      <ProductDetails
        product={selectedProduct}
        setPage={
          (p) => navigate(p)
        }
        setCartCount={
          setCartCount
        }
        loggedInUser={
          loggedInUser
        }
      />

    );

  }


  // CART

  else if (page === "cart") {

    if (!loggedInUser) {

      content = (

        <Login
          onLoginSuccess={
            handleLoginSuccess
          }
          setPage={
            (p) => navigate(p)
          }
        />

      );

    } else {

      content = (

        <Cart
          loggedInUser={
            loggedInUser
          }
          setCartCount={
            setCartCount
          }
          setPage={
            (p) => navigate(p)
          }
        />

      );

    }

  }


  // CHECKOUT

  else if (
    page === "checkout"
  ) {

    if (!loggedInUser) {

      content = (

        <Login
          onLoginSuccess={
            handleLoginSuccess
          }
          setPage={
            (p) => navigate(p)
          }
        />

      );

    } else {

      content = (

        <Checkout
          loggedInUser={
            loggedInUser
          }
          setPage={
            (p) => navigate(p)
          }
        />

      );

    }

  }


  // ORDER SUCCESS

  else if (
    page === "orderSuccess"
  ) {

    content = (

      <OrderSuccess
        setPage={
          (p) => navigate(p)
        }
      />

    );

  }


  // ORDERS

  else if (
    page === "orders"
  ) {

    if (!loggedInUser) {

      content = (

        <Login
          onLoginSuccess={
            handleLoginSuccess
          }
          setPage={
            (p) => navigate(p)
          }
        />

      );

    } else {

      content = (

        <OrderHistory
          loggedInUser={
            loggedInUser
          }
          setPage={
            (p) => navigate(p)
          }
        />

      );

    }

  }


  // REGISTER

  else if (
    page === "register"
  ) {

    content = (

      <Register
        onRegisterSuccess={
          handleRegisterSuccess
        }
        setPage={
          (p) => navigate(p)
        }
      />

    );

  }


  // LOGIN

  else if (
    page === "login"
  ) {

    content = (

      <Login
        onLoginSuccess={
          handleLoginSuccess
        }
        setPage={
          (p) => navigate(p)
        }
      />

    );

  }


  // ==================================================
  // ADMIN LOGIN
  // ==================================================

  else if (
    page === "adminLogin"
  ) {

    content = (

      <AdminLogin
        onAdminLoginSuccess={
          handleAdminLoginSuccess
        }
        setPage={
          (p) => navigate(p)
        }
      />

    );

  }


  // ==================================================
  // ADMIN PANEL
  // ==================================================

  else if (
    page === "admin"
  ) {

    if (!admin) {

      content = (

        <AdminLogin
          onAdminLoginSuccess={
            handleAdminLoginSuccess
          }
          setPage={
            (p) => navigate(p)
          }
        />

      );

    } else {

      content = (

        <AdminPanel
          admin={admin}
          onLogout={
            handleAdminLogout
          }
          setPage={
            (p) => navigate(p)
          }
        />

      );

    }

  }


  // ==================================================
  // ADMIN ADD PRODUCT
  // ==================================================

  else if (
    page === "adminAddProduct"
  ) {

    if (!admin) {

      content = (

        <AdminLogin
          onAdminLoginSuccess={
            handleAdminLoginSuccess
          }
          setPage={
            (p) => navigate(p)
          }
        />

      );

    } else {

      content = (

        <AdminAddProduct
          setPage={
            (p) => navigate(p)
          }
        />

      );

    }

  }


  // ==================================================
  // ADMIN PRODUCTS
  // ==================================================

  else if (
    page === "adminProducts"
  ) {

    if (!admin) {

      content = (

        <AdminLogin
          onAdminLoginSuccess={
            handleAdminLoginSuccess
          }
          setPage={
            (p) => navigate(p)
          }
        />

      );

    } else {

      content = (

        <AdminProducts
          setPage={
            (p) => navigate(p)
          }
          loadProducts={
            loadProducts
          }
        />

      );

    }

  }


  // ==================================================
  // ADMIN ORDERS
  // ==================================================

  else if (
    page === "adminOrders"
  ) {

    if (!admin) {

      content = (

        <AdminLogin
          onAdminLoginSuccess={
            handleAdminLoginSuccess
          }
          setPage={
            (p) => navigate(p)
          }
        />

      );

    } else {

      content = (

        <AdminOrders
          setPage={
            (p) => navigate(p)
          }
        />

      );

    }

  }


  // ==================================================
  // DEFAULT
  // ==================================================

  else {

    content = <HomePage />;

  }


  // ==================================================
  // FOOTER
  // ==================================================

  const Footer = () => {

    return (

      <footer className="site-footer">


        <div className="footer-container">


          <div className="footer-column footer-brand">

            <h2>
              ShopZone
            </h2>


            <p>
              Your one-stop destination
              for quality products,
              great prices and a simple
              shopping experience.
            </p>


            <div className="footer-social">

              <span>𝕗</span>

              <span>𝕏</span>

              <span>◎</span>

              <span>▶</span>

            </div>

          </div>


          <div className="footer-column">

            <h3>
              Quick Links
            </h3>


            <button
              onClick={goHome}
            >
              Home
            </button>


            <button
              onClick={goProducts}
            >
              Products
            </button>


            <button
              onClick={openCart}
            >
              Cart
            </button>


            <button
              onClick={openOrders}
            >
              Orders
            </button>

          </div>


          <div className="footer-column">

            <h3>
              Customer
            </h3>


            {!loggedInUser && (

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

            )}


            <button
              onClick={goProducts}
            >
              Shop Now
            </button>

          </div>


          <div className="footer-column">

            <h3>
              Contact Us
            </h3>


            <p>
              📍 Chennai, India
            </p>


            <p>
              📧 support@shopzone.com
            </p>


            <p>
              📞 +91 98765 43210
            </p>

          </div>


        </div>


        <div className="footer-bottom">

          <p>
            © 2026 ShopZone.
            All Rights Reserved.
          </p>


          <div>

            <span>
              Privacy Policy
            </span>


            <span>
              Terms & Conditions
            </span>

          </div>

        </div>


      </footer>

    );

  };


  // ==================================================
  // FINAL RETURN
  // ==================================================

  return (

    <>

      {/* CUSTOMER NAVBAR */}

      {page !== "adminLogin" &&
       page !== "admin" &&
       page !== "adminAddProduct" &&
       page !== "adminProducts" &&
       page !== "adminOrders" && (

        <Navbar />

      )}


      {/* PAGE CONTENT */}

      {content}


      {/* CUSTOMER FOOTER */}

      {page !== "adminLogin" &&
       page !== "admin" &&
       page !== "adminAddProduct" &&
       page !== "adminProducts" &&
       page !== "adminOrders" && (

        <Footer />

      )}

    </>

  );

}


export default App;