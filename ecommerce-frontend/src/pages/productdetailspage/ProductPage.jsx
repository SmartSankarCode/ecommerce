import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Header from '../../components/Header';
import ProductDetails from './ProductDetails';
import RecommendedProducts from './RecommendedProducts';
import ProductReviews from './ProductReviews';

import './ProductPage.css';

export default function ProductPage({cartQuantity, fetchCartQuantity}) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  useEffect(() => {
    axios.get(`/api/products/${id}`)
      .then(res => setProduct(res.data));
    axios.get(`/api/products?recommendationsFor=${id}`)
      .then(res => setRecommendedProducts(res.data));
  }, [id]);

  if (!product) return <p>Loading product...</p>;

  return (
    <>
      <Header cartQuantity={cartQuantity} />
      <ProductDetails product={product} fetchCartQuantity={fetchCartQuantity} />
      <RecommendedProducts products={recommendedProducts} />
      <ProductReviews rating={product.rating} />
    </>
  );
}
