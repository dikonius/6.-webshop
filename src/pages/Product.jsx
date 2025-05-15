import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import { useProductStore } from "../data/store.js";
import { getProducts } from "../data/crud.js";
import "./Product.css";

const Product = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const products = useProductStore((state) => state.products);
  const setProducts = useProductStore((state) => state.setProducts);
  const addToCart = useProductStore((state) => state.addToCart); 

  useEffect(() => {
    if (products.length === 0) {
      getProducts(setProducts);
    }
  }, [products.length, setProducts]);

  const product = products.find((pr) => pr.id.toString() === productId);

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = () => {
    console.log("Add to cart clicked for product:", product); // Debug log
    addToCart(product);
    console.log("Cart after adding:", useProductStore.getState().cart); // Debug cart state
  };

  const handleBack = () => {
    navigate(-1); 
  };

  if (product.type === "console") {
    return (
      <main className="product-page">
        <div className="console-page-card">
          <img
            className="product-console-image"
            src={product.image}
            alt={product.title}
          />
        </div>
        <div className="info-container">
          <div className="description-container">
            <h3 className="product-page-title">{product.title}</h3>
            <p className="welcome-description">{product.description}</p>
          </div>
          <div className="purchase-info">
            <p className="product-card-price">€{product.price}</p>
            <p className="welcome-description">
              <span className="key-word">Free shipping</span>
            </p>
            <p className="welcome-description">
              Expected delivery: <span className="key-word">4-6 business days</span>
            </p>
            <div className="product-page-btn-container">
              <button className="back-btn" onClick={handleBack}>
                Back to list
              </button>
              <button className="add-to-cart-btn" onClick={handleAddToCart}>
                Add to cart
              </button>
            </div>
            <button className="product-cart-btn" onClick={() => navigate(`/cart/:cartId?`)}>Go to cart</button>
          </div>
        </div>
      </main>
    );
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
          <p className="welcome-description">
            <span className="key-word">Free shipping</span>
          </p>
          <p className="welcome-description">
            Expected delivery: <span className="key-word">4-6 business days</span>
          </p>
          <div className="product-page-btn-container">
            <button className="back-btn" onClick={handleBack}>
              Back to list
            </button>
            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              Add to cart
            </button>
          </div>
          <button className="product-cart-btn" onClick={() => navigate(`/cart/:cartId?`)}>Go to cart</button>
        </div>
      </div>
    </main>
  );
};

export default Product;