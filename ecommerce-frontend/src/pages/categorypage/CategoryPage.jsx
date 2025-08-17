import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../components/Header';
import ProductList from '../../components/ProductList';

import './CategoryPage.css'

export default function CategoryPage({ cartQuantity, isLoggedIn }) {
  /*
  const { categoryName, search } = useParams(); another way
  const [products, setProducts] = useState([]); another way
  */
  const [products, setProducts] = useState(null);
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search');
  const categoryName = searchParams.get('mainCategory')

  useEffect(() => {

    let url = search
      ? `/api/products?keyword=${search}`
      : `/api/products?mainCategory=${categoryName}`
    axios.get(url)
      .then(res => setProducts(res.data));

  }, [categoryName, search]);

  return (
    <>
      <title>Items</title>
      <Header cartQuantity={cartQuantity} isLoggedIn={isLoggedIn} />

      {products && <div className="category-page">
        {categoryName && (
          <div className="breadcrumb">
            <span>Home</span> &gt;{' '}
            <span>Categories</span> &gt;{' '}
            <span>{categoryName}</span> &gt;{' '}
          </div>
        )}
        {search && products.length < 1 && (
          <div style={{ padding: 10 }}
          >No products matched your search.</div>
        )}
        <ProductList products={products} />
      </div>}
    </>
  );
}
