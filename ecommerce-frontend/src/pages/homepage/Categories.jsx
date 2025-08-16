import { Link } from 'react-router-dom';

// Add as many categories in future 
const categoryData = [
  { name: 'Mens', path: 'mens', image: '/frontend-images/banners/Mens banner.jpg' },
  { name: 'Womens', path: 'womens', image: '/frontend-images/banners/Womens banner.jpg' },
  { name: 'Footwear', path: 'footwear', image: '/frontend-images/banners/Footwear banner.jpg' },
  { name: 'Home & Kitchen', path: 'home-kitchen', image: '/frontend-images/banners/Home-Kitchen banner.jpg' },
];

export default function Categories() {
  return (
    <div className="categories">
      {categoryData.map((category) => (
        <Link
          key={category.path}
          // to={`/category/${category.path}`} another way 
          to={`/category/?mainCategory=${category.path}`}
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
