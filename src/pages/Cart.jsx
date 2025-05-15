import { useNavigate } from "react-router-dom";
import "./Admin.css";
import "./Cart.css";
import "../styles/adminForm.css";


const Cart = () => {
  const navigate = useNavigate();



  return (
    <main className="cart-page">
      
      
      <div className="cart-products-container">
        {Array.isArray(products) && products.length > 0 ? (
          products.map((pr) => (
            <div key={pr.id} className="cart-product-card">
              <img className="product-image-cart" src={pr.image} alt={pr.title} />
              <h3 className="product-title-cart">{pr.title}</h3>
              <p className="card-price-cart">€{pr.price}</p>
              <button className="plus-button"> + </button>
              <button className="minus-button"> - </button>
            </div>
          ))
        ) : (
          <p className="form-title-cart">Your cart is empty</p>
        )}
      </div>
      <div className="price-info">
          <p className="cart-price">€{product.price} (VAT included)</p>
          <p className="cart-item-description"><span      className="key-word">Free shipping</span></p>
          <p className="cart-item-description">Expected delivery: <span className="key-word">4-6 business days</span></p>
          
            
            <button className="pay-btn"> Checkout </button>

          
          
        </div>
    </main>
  );
};

export default Cart;