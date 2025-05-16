import { useState } from 'react';
import './Sort.css';

const Sort = ({ products, setFilteredProducts }) => {
  const [sortOption, setSortOption] = useState('');

  const handleSort = (e) => {
    const option = e.target.value;
    setSortOption(option);

    let sorted = [...products];
    switch (option) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'title-asc':
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'title-desc':
        sorted.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        sorted = products;
        break;
    }
    setFilteredProducts(sorted);
  };

  return (
    <div className="sort-container">
      <select value={sortOption} onChange={handleSort} className="sort-select">
        <option value="">Sort by</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
        <option value="title-asc">Title: A-Z</option>
        <option value="title-desc">Title: Z-A</option>
      </select>
    </div>
  );
};

export default Sort;