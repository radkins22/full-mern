import React, { useState } from "react";
import axios from "axios";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const nav = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleValidation = (obj) => {
    if (obj.email === "") {
      alert("Please enter an email.");
      return false;
    }
    if (obj.password === "") {
      alert("Please enter a password.");
      return false;
    }
    return true;
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   await axios({
  //     method: "POST",
  //     url: "http://localhost:8080/api/users/login",
  //     data: formData,
  //     withCredentials: true,
  //   })
  //     .then((res) => {
  //       console.log("Sign-up successful:", res.data);
  //       alert("Sign-In successful!");
  //     })
  //     .catch((error) => {
  //       console.log("Error signing up:", error);
  //       alert("Sign-In failed.");
  //     });
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation(formData)) {
      await axios({
        method: "POST",
        url: "http://localhost:8080/api/users/login",
        data: formData,
        withCredentials: true,
      })
        .then((res) => {
          if (res.data.msg === "Success") {
            console.log("Sign-in successful:", res.data);
            alert("Sign-in successful!");
            nav("/dashboard");
          } else {
            alert(res.data.Error);
          }
        })
        .catch((error) => {
          console.log("Axios Error signing in:", error);
          alert("Sign-in failed.");
        });
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="signup-title">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="email"
            placeholder="email"
            value={formData.email}
            onChange={handleChange}
            className="signup-input"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="signup-input"
            required
          />
          <button type="submit" className="signup-button">
            Login
          </button>
        </form>
        <p className="signin-link">
          Don't have an account? <Link to="/">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
