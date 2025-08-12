import { useState, useEffect } from 'react';
import axios from 'axios'
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/homepage/HomePage'
import CategoryPage from './pages/categorypage/CategoryPage'
import ProductPage from './pages/productdetailspage/ProductPage';
import LoginPage from './pages/authpage/LoginPage';
import RegisterPage from './pages/authpage/RegisterPage';
import CheckoutPage from './pages/Checkoutpage/CheckoutPage';
import OrdersPage from './pages/orderspage/OrdersPage';

import './App.css'

function App() {
  const [cartQuantity, setCartQuantity] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null)

  // i setup cartqunatity in paymentsummary api in my backend
  async function fetchCartQuantity() {
    try {
      const res = await axios.get('/api/cart/summary', { withCredentials: true });
      setCartQuantity(res.data.cartQuantity || '');
    } catch {
      setCartQuantity(''); // Reset if unauthorized
    }
  }

  async function checkAuth() {
    try {
      const res = await axios.get('/api/users/profile', { withCredentials: true });
      setIsLoggedIn(true);
      setUser(res.data);
    } catch {
      setIsLoggedIn(false);
      setUser(null);
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      checkAuth();
      fetchCartQuantity();
    }
  }, [isLoggedIn]);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage cartQuantity={cartQuantity} isLoggedIn={isLoggedIn} />} />
        <Route path="/category/:categoryName" element={<CategoryPage cartQuantity={cartQuantity}
          isLoggedIn={isLoggedIn} />} />
        <Route path="/product/:id" element={<ProductPage cartQuantity={cartQuantity}
          isLoggedIn={isLoggedIn} fetchCartQuantity={fetchCartQuantity} />} />
        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn}
          fetchCartQuantity={fetchCartQuantity} />} />
        <Route path="/register" element={<RegisterPage setIsLoggedIn={setIsLoggedIn}
          fetchCartQuantity={fetchCartQuantity} />} />
        <Route path="/checkout" element={<CheckoutPage cartQuantity={cartQuantity}
          fetchCartQuantity={fetchCartQuantity} user={user} setCartQuantity={setCartQuantity}
          isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path='/orders' element={<OrdersPage />} />
      </Routes>
    </>
  )
}

export default App
