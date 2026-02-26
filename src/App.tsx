import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import AdminProductPage from "./pages/AdminProductPage";
import Order from "./pages/Order";

function App() {
  return (
    <Router>
      <Routes>
  
        <Route path="/" element={<AdminPage />} />
        <Route path="/Adminproducts" element={<AdminProductPage />} />
        <Route path="/orders" element={<Order />} />
      </Routes>
    </Router>
  );
}

export default App;