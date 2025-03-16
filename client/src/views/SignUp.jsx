import React, { useState } from "react";
import axios from "axios";
import "./signUp.css";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const nav = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    // repeatPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleValidation = (obj) => {
    // check if username is empty
    if (obj.username === "") {
      alert("Username cannot be empty");
      return false;
    }
    // check if email is empty
    if (obj.email === "") {
      alert("Email cannot be empty");
      return false;
    }
    // check if password is empty
    if (obj.password === "") {
      alert("Password cannot be empty");
      return false;
    }
    // if (obj.repeatPassword === "") {
    //   alert("Repeat Password cannot be empty");
    //   return false;
    // }
    // if (obj.password !== obj.repeatPassword) {
    //   alert("Passwords do not match");
    //   return false;
    // }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation(formData)) {
      await axios({
        method: "POST",
        data: formData,
        withCredentials: true,
        url: "http://localhost:8080/api/users/register",
      })
        .then((res) => {
          if (res.data.msg === "Success") {
            console.log("Sign-up successful:", res.data);
            alert("Sign-up successful!");
            nav("/signIn");
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
            // required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="signup-input"
            // required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="signup-input"
            // required
          />
          <button type="submit" className="signup-button">
            Sign Up
          </button>
          <p className="signin-link">
            Already have an account? <Link to="/signIn">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
