import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./views/Register";
import Login from "./views/Login";
import Dashboard from "./views/Dashboard";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
