import { useEffect, useState } from 'react';
import { useProductStore } from '../data/store.js';
import { getProducts } from '../data/crud.js';
import { useNavigate } from 'react-router-dom';
import Search from '../components/Search.jsx';
import Sort from '../components/Sort.jsx';
import './Admin.css';
import '../styles/adminForm.css';
import ImportProductsButton from '../components/ImportProductsButton.jsx';
import DeleteProduct from '../components/DeleteProduct.jsx';

const Admin = () => {
  const products = useProductStore((state) => state.products);
  const setProducts = useProductStore((state) => state.setProducts);
  const navigate = useNavigate();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (!products || products.length === 0) {
      getProducts(setProducts);
    }
  }, [products, setProducts]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  return (
    <main className="admin-page">
      <div className="controls-container">
        <Search products={products} setFilteredProducts={setFilteredProducts} />
        <Sort products={products} setFilteredProducts={setFilteredProducts} />
      </div>
      <button className="add-edit-button" onClick={() => navigate('/add-product')}>
        Add new product
      </button>
      {/* <ImportProductsButton /> */}
      <div className="admin-products-container">
        {Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
          filteredProducts.map((pr) => (
            <div key={pr.id} className="admin-product-card">
              <img className="product-image-admin" src={pr.image} alt={pr.title} />
              <h3 className="product-title-admin">{pr.title}</h3>
              <p className="card-price-admin">€{pr.price}</p>
              <button
                className="add-edit-button"
                onClick={() => navigate(`/edit-product/${pr.id}`)}
              >
                Edit
              </button>
              <DeleteProduct productId={pr.id} />
            </div>
          ))
        ) : (
          <p className="form-title-admin">No products available.</p>
        )}
      </div>
    </main>
  );
};

export default Admin;