import React, { useState } from "react";
import axios from "axios";
import "./signUp.css";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:8080/api/users", formData)
      .then((res) => {
        console.log("Sign-up successful:", res.data);
        alert("Sign-In successful!");
      })
      .catch((error) => {
        console.log("Error signing up:", error);
        alert("Sign-In failed.");
      });
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="signup-title">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
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
            Sign In
          </button>
        </form>
        <p className="signin-link">
          Don't have an account? <Link to="/">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
