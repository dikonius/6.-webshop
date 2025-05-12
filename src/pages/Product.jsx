import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProductStore } from "../data/store.js";
import { getProducts } from "../data/crud.js";
import "../styles/product.css";

const Product = () => {
  const { productId } = useParams();
  const products = useProductStore((state) => state.products);
  const setProducts = useProductStore((state) => state.setProducts);


  useEffect(() => {
    if (products.length === 0) {
      getProducts(setProducts);
    }
  }, [products.length, setProducts]);

 
  const product = products.find((pr) => pr.id.toString() === productId);

 
  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <main className="product-page">

      <div className="product-card">
        <img className="product-image" src={product.image} alt={product.title} />
        <h3 className="product-title">{product.title}</h3>
      </div>

      <div className="info-container">
        <div className="description-container">
          <p className="welcome-description">{product.description}</p>
        </div>

        
        
        <div className="purchase-info">
          <p className="card-price">€{product.price}</p>
          <p className="welcome-description">Free shipping</p>
          <p className="welcome-description">Expected delivery:4-6 business days</p>
          <button className="header-btn"> Add to cart </button>
        </div>

      </div>
    </main>
  );
};

export default Product;