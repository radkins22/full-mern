import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./register.css";

const Home = ({ handleUserAuth }) => {
  const nav = useNavigate();
  const [isReg, setIsReg] = useState(false);
  const [formData, setFormData] = useState({});

  const handleToggle = () => setIsReg(!isReg);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleValidation = (obj) => {
    if (isReg && !obj.username) {
      toast.error("Please enter a username.");
      return false;
    }
    if (!obj.email) {
      toast.error("Please enter an email.");
      return false;
    }
    if (!obj.password) {
      toast.error("Please enter a password.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isReg ? "register" : "login";
    console.log("Form Data:", formData, endpoint);
    if (handleValidation(formData)) {
      await axios({
        method: "POST",
        url: `http://localhost:8080/api/users/${endpoint}`,
        data: formData,
        withCredentials: true,
      })
        .then((res) => {
          console.log("Response:", res.data);
          const { msg, user, Error } = res.data;
          if (msg === "Success") {
            if (!isReg) {
              toast.success("Login successful!");
              handleUserAuth(user);
              nav("/dashboard");
            } else {
              toast.success("Registration successful!");
              setTimeout(() => toast.info("Please login."), 500);
              handleToggle();
              setFormData({});
            }
          } else toast.warning(Error);
        })
        .catch((error) => {
          console.log("Axios Error:", error);
          toast.warning("Login failed.");
        });
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="signup-title">{isReg ? "Register" : "Login"}</h2>
        <form onSubmit={handleSubmit}>
          {isReg && (
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username || ""}
              onChange={handleChange}
              className="signup-input"
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email || ""}
            onChange={handleChange}
            className="signup-input"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password || ""}
            onChange={handleChange}
            className="signup-input"
          />
          <button type="submit" className="signup-button">
            {isReg ? "Register" : "Login"}
          </button>
          <p className="signin-link" onClick={handleToggle}>
            {isReg
              ? "Already have an account? Login Here"
              : "Don't have an account? Register Here"}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Home;
