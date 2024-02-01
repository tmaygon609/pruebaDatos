import React, { useState } from 'react';
import './styles.css';

const Login = () => {
  //Crea un estado para los componentes
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  //Manejador de eventos
  const handleEdit = (event) => {
    //No recarga la pagina
    event.preventDefault();
    alert(`Username: ${username}, Password: ${password}`);
  };

  return (
    <div className='recuadro'>
      <h1>Inicio de sesión</h1>
    <form onSubmit={handleEdit} className="form">
      <label>
        Usuario:
        {/*Llama a las funciones y le asigna el valor*/}
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className='input' />
      </label>
      <label>
        Contraseña:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='input'/>
      </label>
      <button type="submit" className='button btn btn-primary'>Iniciar sesión</button>
    </form>
    </div>
  );
};

export default Login;