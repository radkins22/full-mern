import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Toast from "./Components/Toast";
import Home from "./views/Home";
import Dashboard from "./views/Dashboard";

function App() {
  const [user, setUser] = useState(null);

  const handleUserAuth = (userData) => setUser(userData);

  return (
    <>
      <Toast />
      <Routes>
        <Route
          exact
          path="/"
          element={<Home handleUserAuth={handleUserAuth} />}
        />
        <Route path="/dashboard" element={<Dashboard user={user} />} />
      </Routes>
    </>
  );
}

export default App;
