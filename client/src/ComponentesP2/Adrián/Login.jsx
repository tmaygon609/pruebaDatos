import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import './styles.css';

const Login = () => {
  //Crea un estado para los componentes
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleEdit = (event) => {
    event.preventDefault();

    // Enviar una solicitud POST al servidor
    const user = { username, password };

    axios.post('http://localhost:3001/routeLoginUsuario', user)
      .then(response => {
        if(response.data === 'ok'){
          alert("Inicio de sesión exitoso, hay que redirigir hacia la página de inicio");
          //navigate("/inicio");  -- Hay que redirigir hacia la página de inicio
        }else{
          alert("Datos incorrectos");
        }
      })
      .catch(error => {
        console.error('Error en la consulta: ', error);
      });
  };

  return (
    <div className='recuadro'>
      <h1>Inicio de sesión</h1>
    <form onSubmit={handleEdit} className="form">
      <label>
        Usuario:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className='input' required/>
      </label>
      <label>
        Contraseña:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='input'required/>
      </label>
      <button type="submit" className='button btn btn-primary'>Iniciar sesión</button>
    </form>
    <p>No tienes una cuenta? <Link to="/practica2/tibu">Regístrate aquí</Link></p> 
    </div>
  );
};

export default Login;