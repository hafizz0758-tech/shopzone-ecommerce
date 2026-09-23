import { useState } from "react";
import axios from "axios";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    console.log("Login button clicked");

    try {

      const response = await axios.post(
        "https://shopzone-ecommerce-production-0d1b.up.railway.app/api/users/login",
        {
          email: email,
          password: password
        }
      );

      console.log("LOGIN SUCCESS");
      console.log("User:", response.data);

      // Save logged-in user
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(response.data)
      );

      console.log("User saved in localStorage");

      // Go to home page
      window.location.href = "/";

    } catch (error) {

      console.log("LOGIN ERROR");

      if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Response:", error.response.data);
      } else {
        console.log("Error:", error.message);
      }

      // No alert
    }
  };

  return (
    <div className="login-page">

      <div className="login-box">

        <h1>Welcome Back</h1>

        <p>Login to ShopZone</p>

        <form onSubmit={handleLogin}>

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">
            Login
          </button>

        </form>

        <p>Don't have an account?</p>

        <button
          type="button"
          className="register-link"
          onClick={() => {
            window.location.href = "/register";
          }}
        >
          Create Account
        </button>

      </div>

    </div>
  );
}

export default Login;