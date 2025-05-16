import './Footer.css';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../components/AuthContext.jsx';

const Footer = () => {
  const { isAuthenticated, logout } = useAuth();
  const facebookLogo = '/6.-webshop/src/assets/face-logo.png';
  const instagramLogo = '/6.-webshop/src/assets/inst-logo.png';
  const xLogo = '/src/assets/xcom-logo.jpeg';

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
        <a className="social-links" href="https://x.com/" target="_blank" rel="noopener noreferrer">
          <img className="social-logos" src={xLogo} alt="X.com logo" />
        </a>
        <a className="social-links" href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
          <img className="social-logos" src={instagramLogo} alt="Instagram logo" />
        </a>
        <a className="social-links" href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
          <img className="social-logos" src={facebookLogo}alt="Facebook logo" />
        </a>
      </div>

      {isAuthenticated ? (
        <button className="admin-btn" onClick={logout}>
          Logout
        </button>
      ) : (
        <NavLink to="/admin/" className="navlink-footer">
          <button className="admin-btn">Admin</button>
        </NavLink>
      )}
    </footer>
  );
};

export default Footer;