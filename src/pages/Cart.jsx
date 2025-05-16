
import { useProductStore } from "../data/store.js"; 
import "./Cart.css";
import "../styles/adminForm.css";
import TotalPrice from "../components/TotalPrice.jsx";

const Cart = () => {
  
  const cart = useProductStore((state) => state.cart); 
  const updateCartQuantity = useProductStore((state) => state.updateCartQuantity); 

  const handleIncrement = (productId) => {
    const item = cart.find((item) => item.id === productId);
    if (item) {
      updateCartQuantity(productId, item.quantity + 1);
    }
  };

  const handleDecrement = (productId) => {
    const item = cart.find((item) => item.id === productId);
    if (item) {
      updateCartQuantity(productId, item.quantity - 1);
    }
  };

  const handleCheckout = () => {
    
    console.log("Proceeding to checkout...");
  };

  return (
    <main className="cart-page">
      <div className="cart-products-container">
        {Array.isArray(cart) && cart.length > 0 ? (
          cart.map((pr) => (
            <div key={pr.id} className="cart-product-card">
              <img
                className="product-image-cart"
                src={pr.image}
                alt={pr.title}
              />
              <h3 className="product-title-cart">{pr.title}</h3>
              <p className="card-price-cart">€{pr.price}</p>
              <div className="quantity-controls">
                <button
                  className="minus-button"
                  onClick={() => handleDecrement(pr.id)}
                >
                  -
                </button>
                <span className="quantity">{pr.quantity}</span>
                <button
                  className="plus-button"
                  onClick={() => handleIncrement(pr.id)}
                >
                  +
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="form-title-cart">Your cart is empty</p>
        )}
      </div>
      <div className="price-info">
        <TotalPrice cart={cart} />
        <p className="cart-item-description">(VAT included)
        </p>
        <p className="cart-item-description">
          <span className="key-word">Free shipping</span>
        </p>
        <p className="cart-item-description">
          Expected delivery: <span className="key-word">4-6 business days</span>
        </p>
        <button className="pay-btn" onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </main>
  );
};

export default Cart;