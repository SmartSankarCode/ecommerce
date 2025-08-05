import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/homepage/HomePage'
import CategoryPage from './pages/categorypage/CategoryPage'
import ProductPage from './pages/productdetailspage/ProductPage';
import './App.css'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
    </>
  )
}

export default App
