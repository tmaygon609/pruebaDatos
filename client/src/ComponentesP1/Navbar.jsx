import React from 'react';

//import mi archivo css
import './styles/NavBar.css';

const NavBar = () => {
  //Declaro una variable donde voy a almacenar la ruta de la imagen que quiero mostrar
  const brand =
    'https://f.hubspotusercontent10.net/hub/20044066/hubfs/raw_assets/public/kong/images/logo.png?width=190&name=logo.png';
  //la lógica va siempre antes del return
  return (
    <header className="header">
      {/* logo de la marca */}
      <div className="logo-container">
        <img src={brand} alt="logo" />
      </div>

      {/* links de navegación */}
      <nav>
        <ul className="nav-container">
          <li>
            <a href="/">Inicio</a>
          </li>
          <li>
            <a href="/">Productos</a>
          </li>
          <li>
            <a href="/">Blog</a>
          </li>
          <li>
            <a href="/">Contacto</a>
          </li>
        </ul>
      </nav>

      {/* selector de lenguaje */}
      <select className="select-language">
        <option value="" selected disabled>
          Language
        </option>
        <option value="">Español</option>
        <option value="">日本語</option>
      </select>
    </header>
  );
};

export default NavBar;