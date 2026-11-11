import { useState } from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav>
      <span > <Link to="/">
      Mi primera pagina 
      </Link>  </span>

      <button className="menu-hamburger" onClick={toggleMenu}>
        {isOpen ? '✕' : '☰'}
      </button>

      <ul className={isOpen ? 'nav-links active' : 'nav-links'}>
        <li><Link to="/" onClick={toggleMenu}>Inicio</Link></li>
        <li><Link to="/acercade" onClick={toggleMenu}>Acerca de</Link></li>
        <li><Link to="/contacto" onClick={toggleMenu}>Contacto</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
