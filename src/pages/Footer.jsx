import "./Footer.css";
import { NavLink } from "react-router";

const Footer = () => {
    
  
  
  
    return (
      <footer className="footer-container">

            <NavLink to="/" className="navlink-footer">
                <button className="footer-btn">Home</button>
            </NavLink>

            <NavLink to="/games/" className="navlink-footer">
                <button className="footer-btn">Games</button>
            </NavLink>

            <NavLink to="/consoles/" className="navlink-footer">
                <button className="footer-btn">Consoles</button>
            </NavLink>

            <div className="socials-container">
              <a className="social-links" href="https://x.com/" target="_blank"><img className="social-logos" src="/src/assets/xcom-logo.jpeg" alt="X.com logo"/></a>
              <a className="social-links" href="https://www.instagram.com/" target="_blank"><img className="social-logos" src="/src/assets/inst-logo.png" alt="Instagram logo"/></a>
              <a className="social-links" href="https://www.facebook.com/" target="_blank"><img  className="social-logos" src="/src/assets/face-logo.png" alt="Facebook logo"/></a>
			      </div>
         
            <NavLink to="/admin/" className="navlink-footer">
            <button className="admin-btn">Admin</button>
            </NavLink>
            
      </footer>
    );
  };
  
  export default Footer;
  