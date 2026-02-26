import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import AdminProductPage from "./pages/AdminProductPage";

function App() {
  return (
    <Router>
      <Routes>
  
        <Route path="/" element={<AdminPage />} />
        <Route path="/Adminproducts" element={<AdminProductPage />} />
      </Routes>
    </Router>
  );
}

export default App;