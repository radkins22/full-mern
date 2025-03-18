import React, { useState } from "react";
import axios from "axios";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const nav = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleValidation = (obj) => {
    if (obj.username === "") {
      alert("Please enter a username.");
      return false;
    }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation(formData)) {
      await axios({
        method: "POST",
        url: "http://localhost:8080/api/users/register",
        data: formData,
        withCredentials: true,
      })
        .then((res) => {
          if (res.data.msg === "Success") {
            console.log("Sign-up successful:", res.data);
            alert("Sign-up successful!");
            nav("/login");
          } else {
            alert(res.data.Error);
          }
        })
        .catch((error) => {
          console.log("Axios Error signing up:", error);
          alert("Sign-up failed.");
        });
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="signup-title">Create Account</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="signup-input"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="signup-input"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="signup-input"
          />
          <button type="submit" className="signup-button">
            Sign Up
          </button>
          <p className="signin-link">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
