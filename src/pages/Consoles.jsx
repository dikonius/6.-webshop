import { useEffect, useState } from 'react';
import { useProductStore } from '../data/store.js';
import { getProducts } from '../data/crud.js';
import { useNavigate } from 'react-router-dom';
import Search from '../components/Search.jsx';
import Sort from '../components/Sort.jsx';
import '../styles/games-consoles.css';

const Consoles = () => {
  const navigate = useNavigate();
  const products = useProductStore((state) => state.products);
  const setProducts = useProductStore((state) => state.setProducts);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (products.length === 0) {
      getProducts(setProducts);
    }
  }, [products, setProducts]);

  useEffect(() => {
    setFilteredProducts(products.filter((pr) => pr.type === 'console'));
  }, [products]);

  return (
    <main className="consoles-page">
      <div className="controls-container">
        <Search products={products.filter((pr) => pr.type === 'console')} setFilteredProducts={setFilteredProducts} />
        <Sort products={products.filter((pr) => pr.type === 'console')} setFilteredProducts={setFilteredProducts} />
      </div>
      <section className="games-container">
        {filteredProducts.map((pr) => (
          <div key={pr.id} onClick={() => navigate(`/product/${pr.id}`)} className="console-card">
            <img className="console-image" src={pr.image} alt={pr.title} />
            <h3 className="console-title">{pr.title}</h3>
            <p className="console-price">€{pr.price}</p>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Consoles;