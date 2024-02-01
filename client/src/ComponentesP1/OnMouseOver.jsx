/*Importamos React y la función useState desde la biblioteca React. 
useState se utiliza para gestionar el estado del componente funcional.*/
import React, {useState} from "react";

const CambioColorEnMouse = () => {
  // Estado para controlar el color del componente
  // Esto seria una variable que se llamara en el style
  const [color, setColor] = useState('blue');

  // Manejador para el evento onMouseOver
  const handleMouseOver = () => {
    setColor('red');
  };

  // Manejador para el evento onMouseOut
  
  const handleMouseOut = () => {
    setColor('blue');
  };

  return (
    <p
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      style={{ backgroundColor: color, padding: '20px', color: 'white' }}
    >
      Soy el componente, Pasa el ratón sobre mí
    </p>
  );
};

export default CambioColorEnMouse;
