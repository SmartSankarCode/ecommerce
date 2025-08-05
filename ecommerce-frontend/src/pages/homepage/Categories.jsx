import { Link } from 'react-router-dom';

// Add as many categories in future 
const categoryData = [
  { name: 'Mens', path: 'mens', image: '/images/banners/Mens banner.jpg' },
  { name: 'Womens', path: 'womens', image: '/images/banners/Womens banner.jpg' },
  { name: 'Footwear', path: 'footwear', image: '/images/banners/Footwear banner.jpg' },
  { name: 'Home & Kitchen', path: 'home-kitchen', image: '/images/banners/Home-Kitchen banner.jpg' },
];

export default function Categories() {
  return (
    <div className="categories">
      {categoryData.map((category) => (
        <Link
          key={category.path}
          to={`/category/${category.path}`}
          className="category-box"
        >
          <img
            src={category.image}
            alt={category.name}
            className="category-image"
          />
          <span>{category.name}</span>
        </Link>
      ))}
    </div>
  );
}
