import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProductStore } from "../data/store.js";
import { getProducts } from "../data/crud.js";
import "./Product.css";

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

  else if (product.type === "console") {
    return (
      <main className="product-page">

      <div className="console-page-card">
        <img className="product-console-image" src={product.image} alt={product.title} />
        
      </div>

      <div className="info-container">
        <div className="description-container">
          <h3 className="product-page-title">{product.title}</h3>
          <p className="welcome-description">{product.description}</p>
        </div>

        
        
        <div className="purchase-info">
          <p className="product-card-price">€{product.price}</p>
          <p className="welcome-description"><span      className="key-word">Free shipping</span></p>
          <p className="welcome-description">Expected delivery: <span className="key-word">4-6 business days</span></p>
          <div className="product-page-btn-container">
            <button className="back-btn"> Back to list </button>
            <button className="add-to-cart-btn"> Add to cart </button>

          </div>
          
        </div>

      </div>
    </main>
    )
  }

  return (
    <main className="product-page">

        <img className="product-game-image" src={product.image} alt={product.title} />


      <div className="info-container">
        <div className="description-container">
          <h3 className="product-page-title">{product.title}</h3>
          <p className="welcome-description">{product.description}</p>
        </div>

        
        
        <div className="purchase-info">
          <p className="product-card-price">€{product.price}</p>
          <p className="welcome-description"><span      className="key-word">Free shipping</span></p>
          <p className="welcome-description">Expected delivery: <span className="key-word">4-6 business days</span></p>
          <div className="product-page-btn-container">
            <button className="back-btn"> Back to list </button>
            <button className="add-to-cart-btn"> Add to cart </button>

          </div>
          
        </div>

      </div>
    </main>
  );
};

export default Product;