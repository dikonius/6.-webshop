import "./Header.css";
import { NavLink } from "react-router-dom"; 
import { useProductStore } from "../data/store.js"; 

const Header = () => {
  const cart = useProductStore((state) => state.cart);
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0); 

  return (
    <nav className="nav-container">
      <div className="logo-games-container">
        <NavLink to="/" className="navlink-header">
          <img className="logo-btn" src="/6.-webshop/public/logo.png" alt="Logo" />
        </NavLink>
        <NavLink to="/games" className="navlink-header">
          <button className="header-btn">Games</button>
        </NavLink>
      </div>
      <div className="consoles-cart-container">
        <NavLink to="/consoles" className="navlink-header">
          <button className="header-btn">Consoles</button>
        </NavLink>
        <NavLink to="/cart" className="navlink-header">
          <div className="cart-icon-container">
            <img
              className="cart-btn"
              src="/6.-webshop/public/cart-icon.png"
              alt="Cart"
            />
            {cartItemCount > 0 && (
              <span className="cart-badge">{cartItemCount}</span>
            )}
          </div>
        </NavLink>
      </div>
    </nav>
  );
};

export default Header;