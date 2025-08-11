import { useState, useEffect } from 'react';
import axios from 'axios'
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/homepage/HomePage'
import CategoryPage from './pages/categorypage/CategoryPage'
import ProductPage from './pages/productdetailspage/ProductPage';
import LoginPage from './pages/authpage/LoginPage';
import RegisterPage from './pages/authpage/RegisterPage';
import CheckoutPage from './pages/Checkoutpage/CheckoutPage';

import './App.css'

function App() {
  const [cartQuantity, setCartQuantity] = useState(0)
  // i setup cartqunatity in paymentsummary api in my backend
  async function fetchCartQuantity() {
    const res = await axios.get('/api/cart/summary');
    setCartQuantity(res.data.cartQuantity || 0);
  }

  useEffect(() => {

    fetchCartQuantity();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage cartQuantity={cartQuantity} />} />
        <Route path="/category/:categoryName" element={<CategoryPage cartQuantity={cartQuantity} />} />
        <Route path="/product/:id" element={<ProductPage cartQuantity={cartQuantity} fetchCartQuantity={fetchCartQuantity}/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/checkout" element={<CheckoutPage cartQuantity={cartQuantity} fetchCartQuantity={fetchCartQuantity} />} />
      </Routes>
    </>
  )
}

export default App
