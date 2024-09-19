import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductDetail from "./Components/ProductDetail"; // Make sure it's ProductDetailPage.js
import './styles/styles.css';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Route for the homepage */}
          <Route path="/" element={<HomePage />} />
          
          {/* Route for the product detail page */}
          <Route path="/product/:barcode" element={<ProductDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

