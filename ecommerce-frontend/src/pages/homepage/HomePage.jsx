import { useEffect, useState } from 'react';
import axios from 'axios';

import Header from '../../components/Header';
import Categories from './Categories';
import ProductList from '../../components/ProductList';

import './HomePage.css';

export default function HomePage({ cartQuantity }) {
  const [trendingProducts, setTrendingProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/products?isTrending=true')
      .then((res) => setTrendingProducts(res.data));
  }, []);

  return (
    <>
      <Header cartQuantity={cartQuantity} />
      <Categories />
      <div className="trending-products">
        <h2>Trending Products</h2>

        <ProductList products={trendingProducts} />
      </div>
    </>
  );
}
