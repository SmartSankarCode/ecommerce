import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/homepage/HomePage'
import CategoryPage from './pages/categorypage/CategoryPage'
import ProductPage from './pages/productdetailspage/ProductPage';
import LoginPage from './pages/authpage/LoginPage';
import RegisterPage from './pages/authpage/RegisterPage';
import CheckoutPage from './pages/Checkoutpage/CheckoutPage';

import './App.css'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </>
  )
}

export default App
