import { NavLink } from "react-router";

const Header = () => {
    
  
    // const toggleDropdown = () => {
    //   setIsOpen((prev) => {
    //     if (!prev) setHamburgerOpen(false);
    //     return !prev;
    //   });
    // };
  
    // const toggleHamburger = () => {
    //   setHamburgerOpen((prev) => {
    //     if (!prev) setIsOpen(false);
    //     return !prev;
    //   });
    // };
  
    // useOutsideClick(dropdownRef, () => {
    //   setIsOpen(false);
    // });
  
    return (
      <header className="header-container">
        <nav className="nav-container">

        
            <NavLink to="/" className="navlink-header">
              <img className="logo-btn" src="/src/assets/logo.png"></img>
            </NavLink>
            
            {/* <NavLink to="/pages/games/" className="navlink">
                <button className="hamburger-menu">Meny</button>
            </NavLink> */}

            <NavLink to="/games/" className="navlink-header">
                <button className="header-btn">Games</button>
            </NavLink>

            <NavLink to="/consoles/" className="navlink-header">
                <button className="header-btn">Consoles</button>
            </NavLink>
         
            <NavLink to="cart/:cartId?" className="navlink-header">
            <button className="header-btn">Cart
                {/* {cartCount > 0 && (
                <span className="cart-count">{cartCount}</span>
                )}
                <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                >
                <g opacity="0.3">
                    <path
                    d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    />
                    <path
                    d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    />
                    <path
                    d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    />
                </g>
                </svg> */}
            </button>
            </NavLink>
            
        </nav>
      </header>
    );
  };
  
  export default Header;
  