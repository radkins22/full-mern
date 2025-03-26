import { Route, Routes } from "react-router-dom";
import Toast from "./Components/Toast";
import Home from "./views/Home";
import Dashboard from "./views/Dashboard";
import Book from "./views/Book";

function App() {
  return (
    <>
      <Toast />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/books/:_id" element={<Book />} />
      </Routes>
    </>
  );
}

export default App;
