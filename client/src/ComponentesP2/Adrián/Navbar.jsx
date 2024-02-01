import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navbar" style={{ marginLeft: '50px' }}>
      <div className="btn-group">
        <Link to="/practica2/adrian/triangulo" className="btn btn-dark">
          Área Triángulo
        </Link>
        <Link to="/practica2/adrian/login" className="btn btn-dark">
          Iniciar sesión
        </Link>
      </div>
    </div>
  );
};

export default Navbar;