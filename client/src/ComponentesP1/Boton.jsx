import React from 'react';

// Función que devuelve un componente de botón
const Boton = ({ onClick }) => {
  return (
    <button onClick={onClick}>
      {"Botón reutilizable"}
    </button>
  );
};

export default Boton;
