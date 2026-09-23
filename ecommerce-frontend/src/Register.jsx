import { useState } from "react";
import axios from "axios";

function Register({ setPage }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const registerUser = (e) => {

    e.preventDefault();


    // Password length validation
    if (password.length < 6) {

      alert("Password must contain at least 6 characters!");

      return;
    }


    // Confirm password validation
    if (password !== confirmPassword) {

      alert("Passwords do not match!");

      return;
    }


    const user = {

      name: name,
      email: email,
      password: password

    };


    axios.post(
      "https://shopzone-ecommerce-production-0d1b.up.railway.app/api/users/register",
      user
    )

      .then((response) => {

        console.log(response.data);

        alert("Registration successful!");

        // Go to login page
        setPage("login");

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

          alert("Registration failed");

        }

      });

  };


  return (

    <div className="register-page">

      <div className="register-box">


        <h1>
          Create Account
        </h1>


        <p>
          Register to ShopZone
        </p>


        <form onSubmit={registerUser}>


          {/* NAME */}

          <label>
            Name
          </label>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            required
          />


          {/* EMAIL */}

          <label>
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />


          {/* PASSWORD */}

          <label>
            Password
          </label>

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            minLength="6"
            required
          />


          {/* CONFIRM PASSWORD */}

          <label>
            Confirm Password
          </label>

          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
            required
          />


          {/* REGISTER */}

          <button type="submit">
            Register
          </button>

        </form>


        <p>
          Already have an account?
        </p>


        <button
          className="login-link"
          onClick={() => setPage("login")}
        >
          Login
        </button>


      </div>

    </div>

  );
}

export default Register;