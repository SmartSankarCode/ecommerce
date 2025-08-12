import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../components/Header';
import ProductList from '../../components/ProductList';

import './CategoryPage.css'

export default function CategoryPage({ cartQuantity, isLoggedIn }) {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`/api/products?mainCategory=${categoryName}`)
      .then(res => setProducts(res.data));
  }, [categoryName]);

  return (
    <>
      <Header cartQuantity={cartQuantity} isLoggedIn={isLoggedIn} />

      <div className="category-page">
        <div className="breadcrumb">
          <span>Home</span> &gt;{' '}
          <span>Categories</span> &gt;{' '}
          <span>{categoryName}</span> &gt;{' '}
        </div>

        <ProductList products={products} />
      </div>
    </>
  );
}
