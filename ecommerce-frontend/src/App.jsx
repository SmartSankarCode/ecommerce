import { useState, useEffect } from 'react';
import axios from 'axios'
import Cookies from "js-cookie";
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/homepage/HomePage'
import CategoryPage from './pages/categorypage/CategoryPage'
import ProductPage from './pages/productdetailspage/ProductPage';
import LoginPage from './pages/authpage/LoginPage';
import RegisterPage from './pages/authpage/RegisterPage';
import CheckoutPage from './pages/Checkoutpage/CheckoutPage';
import OrdersPage from './pages/orderspage/OrdersPage';
import TrackingPage from './pages/trackingpage/TrackingPage';

import './App.css'

function App() {
  const [cartQuantity, setCartQuantity] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [user, setUser] = useState(null) // you can pass this instead of isloggedin

  // i setup cartqunatity in paymentsummary api in my backend
  async function fetchCartQuantity() {
    const res = await axios.get('/api/cart/summary', { withCredentials: true });
    setCartQuantity(res.data.cartQuantity || '');
  }

  async function checkAuth() {
    try {
      const res = await axios.get('/api/users/profile', { withCredentials: true });
      setUser(res.data);
      setIsLoggedIn(true);
      fetchCartQuantity();
    } catch {
      setIsLoggedIn(false);
      setUser(null);
    }
  }

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage cartQuantity={cartQuantity} isLoggedIn={isLoggedIn} />} />
        <Route path="/category" element={<CategoryPage cartQuantity={cartQuantity}
          isLoggedIn={isLoggedIn} />} />
        {/* <Route path="/search/:search" element={<CategoryPage cartQuantity={cartQuantity}
          isLoggedIn={isLoggedIn} />} />  another way*/}
        <Route path="/product/:id" element={<ProductPage cartQuantity={cartQuantity}
          isLoggedIn={isLoggedIn} fetchCartQuantity={fetchCartQuantity} />} />
        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn}
          fetchCartQuantity={fetchCartQuantity} />} />
        <Route path="/register" element={<RegisterPage setIsLoggedIn={setIsLoggedIn}
          fetchCartQuantity={fetchCartQuantity} />} />
        <Route path="/checkout" element={<CheckoutPage cartQuantity={cartQuantity}
          fetchCartQuantity={fetchCartQuantity} user={user} setCartQuantity={setCartQuantity}
          isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path='/orders' element={<OrdersPage cartQuantity={cartQuantity} isLoggedIn={isLoggedIn}
          fetchCartQuantity={fetchCartQuantity} />} />
        <Route path="/tracking/:orderId/:itemId" element={<TrackingPage
          cartQuantity={cartQuantity} isLoggedIn={isLoggedIn} />} />
      </Routes>
    </>
  )
}

export default App
