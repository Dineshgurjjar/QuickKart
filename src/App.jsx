import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import ProductListPage from './pages/ProductListPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';

function App() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* For pop-up notifications */}
      <Toaster position="bottom-center" />

      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<ProductListPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          {/* Add other routes for payment success, etc. */}
        </Routes>
      </main>
    </div>
  );
}

export default App;