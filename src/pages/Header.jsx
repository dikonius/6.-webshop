
import "./Header.css"
import { NavLink } from "react-router";

const Header = () => {
  
    return (
      
        <nav className="nav-container">

          <div className="logo-games-container">
            <NavLink to="/" className="navlink-header">
              <img className="logo-btn" src="/src/assets/logo.png"/>
            </NavLink>

            <NavLink to="/games/" className="navlink-header">
                <button className="header-btn">Games</button>
            </NavLink>

          </div>
            
          <div className="consoles-cart-container">
              <NavLink to="/consoles/" className="navlink-header">
                <button className="header-btn">Consoles</button>
            </NavLink>
         
            <NavLink to="cart/:cartId?" className="navlink-header">
                <img className="cart-btn" src="/src/assets/cart-icon.png"/>
            </NavLink>
          </div>
            
            
        </nav>
      
    );
  };
  
  export default Header;
  