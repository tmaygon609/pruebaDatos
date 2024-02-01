import React, { useState } from 'react';
import './styles.css';

const AreaTriangulo = () => {
  //Crea un estado para los componentes
  const [base, setBase] = useState(0);
  const [altura, setAltura] = useState(0);
  const [area, setArea] = useState(0);

  //Manejador de eventos
  const handleEdit = (event) => {
    //No recarga la pagina
    event.preventDefault();
    setArea((base * altura) / 2);
  };

  return (
    <div className="recuadro">
      <h1>Calcular el área de un triángulo</h1>
      <form onSubmit={handleEdit} className="form">
        <label>
          Base:
          {/*Llama a las funciones y le asigna el valor*/}
          <input type="number" value={base} onChange={(e) => setBase(e.target.value)} className="input" />
        </label>
        <label>
          Altura:
          <input type="number" value={altura} onChange={(e) => setAltura(e.target.value)} className="input" />
        </label>
        <button type="submit" className="button btn btn-primary">Calcular</button>
      </form>
      {/*Se le muestra el valor*/}
      <p>El área del triángulo es: {area}</p>
      <p><i>La fórmula para calcular el área de un triagulo es: <b>base * altura /2</b></i></p>
    </div>
  );
};

export default AreaTriangulo;