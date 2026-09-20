import { useState } from "react";
import axios from "axios";

function Login({ setPage, setLoggedInUser }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = (e) => {

    e.preventDefault();

    const user = {
      email: email,
      password: password
    };

    axios.post(
      "http://localhost:8080/api/users/login",
      user
    )
    .then((response) => {

      console.log(response.data);

      // Save user in browser
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(response.data)
      );

      // Set logged-in user
      setLoggedInUser(response.data);

      alert("Login successful!");

      // Go to products
      setPage("products");

    })
    .catch((error) => {

      console.log(error);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {

        alert(error.response.data.message);

      } else {

        alert("Login failed");

      }

    });
  };

  return (
    <div className="login-page">

      <div className="login-box">

        <h1>Welcome Back</h1>

        <p>Login to ShopZone</p>

        <form onSubmit={loginUser}>

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

        <p>
          Don't have an account?
        </p>

        <button
          className="register-link"
          onClick={() => setPage("register")}
        >
          Create Account
        </button>

      </div>

    </div>
  );
}

export default Login;