import { useState } from "react";
import axios from "axios";

function AdminLogin({ setPage, onAdminLoginSuccess }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginAdmin = (e) => {

    e.preventDefault();

    const adminData = {
      email: email,
      password: password
    };

    axios
      .post(
        "http://localhost:8080/api/admin/login",
        adminData
      )
      .then((response) => {

        // App.jsx handles admin state and localStorage
        onAdminLoginSuccess(response.data);

      })
      .catch((error) => {

        console.log("Admin login error:", error);

        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {

          alert(error.response.data.message);

        } else {

          alert("Invalid admin email or password");

        }

      });

  };


  return (

    <div className="login-page">

      <div className="login-card">
<div className="admin-login-label">
  SHOPZONE ADMIN
</div>


        <h1>
          Admin Login
        </h1>

        <p>
          Login to access the ShopZone admin panel.
        </p>


        <form onSubmit={loginAdmin}>

          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />


          <input
            type="password"
            placeholder="Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />


          <button type="submit">
            Login as Admin
          </button>

        </form>


        <button
          className="back-login-btn"
          onClick={() => setPage("home")}
        >
          ← Back to Shop
        </button>

      </div>

    </div>

  );

}

export default AdminLogin;