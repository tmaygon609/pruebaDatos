import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

//Componente funcional que muestra una tabla con datos de los alumnos y que permite borrarlos
const Tabla = () => {
    //Estados para almacenar los datos de la tabla, la fila seleccionada y los errores
    const [data, setData] = useState([]);
    const [filaSeleccionada, setFilaSeleccionada] = useState(null);
    const [errors, setErrors] = useState({});

    //Hook useEffect para realizar una llamada a la API y obtener los datos de la tabla de alumnos
    useEffect(() => {
        //Llamada a la API para obtener los datos de la tabla de alumnos
        axios.get('http://localhost:3001/alumnos', data)
          .then(response => { //Si la llamada es exitosa, actualiza el estado con los datos obtenidos
            setData(response.data);
          })
          .catch(error => { //Si la llamada falla, muestra un mensaje de error en la consola y actualiza el estado con el mensaje de error
            console.error('Error al obtener los datos de los alumnos:', error);
            setErrors({ message: 'Error al obtener los datos de los alumnos' });
          });
      }, []); //El segundo argumento ([]) es un array vacío para que useEffect se ejecute solo una vez 

    //Función para establecer el id de la fila seleccionada
    const handleBorrarFila = (id) => {
        setFilaSeleccionada(id); //establece el id de la fila seleccionada
    };

    //Función para borrar la fila seleccionada haciendo una petición DELETE con axios
    const handleConfirmarBorrado = () => {
        if (filaSeleccionada !== null && filaSeleccionada !== undefined) {
            //solicitud DELETE al servidor para eliminar el alumno
            axios.delete(`http://localhost:3001/eliminar/${filaSeleccionada}`)
              .then(response => { //Si la llamada es exitosa, muestra un mensaje de éxito en la consola
                console.log('Alumno eliminado correctamente:', response.data); //
                //actualiza el estado para reflejar la eliminación
                setData(data.filter(item => item.id !== filaSeleccionada));
                //después de eliminar, deselecciona la fila
                setFilaSeleccionada(null);
              })
              .catch(error => { //Si la llamada falla, muestra un mensaje de error en la consola
                console.error('Error al eliminar el alumno:', error);
              });
        } else { //Si no hay ninguna fila seleccionada, muestra un mensaje de error en la consola
            console.error('No se seleccionó ninguna fila para eliminar'); //
        }
    };

    //Función para cerrar el modal y deseleccionar la fila
    const handleCerrarModal = () => {
        setFilaSeleccionada(null); //deselecciona la fila
    };

    //Función que obtiene los datos de la fila seleccionada
    const getfilaSeleccionadaDatos = () => {
        const filaSeleccionadaDatos = data.find((item) => item.id === filaSeleccionada); //busca la fila seleccionada en el array de datos
        return filaSeleccionadaDatos; //devuelve los datos de la fila seleccionada
    };

    //Obtener los datos de la fila seleccionada para borrar
    const filaSeleccionadaDatos = getfilaSeleccionadaDatos(); //llama a la función getfilaSeleccionadaDatos para obtener los datos de la fila seleccionada

    //Tabla y modal para mostrar los datos de los alumnos y permitir borrarlos
    return (
        <div className='container mt-4'>
            <table className='table table-hover text-center align-middle caption-top'>
                <caption>Lista de alumnos</caption>
                <thead className='table-dark'>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellidos</th>
                        <th>Email</th>
                        <th>Borrar</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Uso del método map en el array data para crear una nuevas filas - Cada objeto fila en el array data, crea una nueva fila en la tabla */}
                    {data.map((fila) => (
                        <tr key={fila.id}> {/* Cada fila tiene una key única (id) que permite realizar un seguimiento de cada fila individualmente */}
                            <td>{fila.id}</td>
                            <td>{fila.nombre}</td>
                            <td>{fila.apellidos}</td>
                            <td>{fila.email}</td>
                            <td> {/* Botón para borrar la fila seleccionada, al hacer clic llama a la función handleBorrarFila con el id de la fila actual como argumento */}
                                <Button className='btn btn-danger' onClick={() => handleBorrarFila(fila.id)}> 
                                    <b>Eliminar</b>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal para confirmar el borrado de la fila seleccionada - Si filaSeleccionada es true, se muestra el modal  */}
            <Modal show={!!filaSeleccionada} onHide={handleCerrarModal}> {/* Se muestra el modal Si filaSeleccionada es true, es decir, no es nulo o undefined */}
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar borrado de alumno</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {filaSeleccionadaDatos && (
                        <p>
                            ¿Seguro que quiere eliminar a {filaSeleccionadaDatos.nombre}{' '}
                            {filaSeleccionadaDatos.apellidos} del sistema?
                        </p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button className='btn btn-secondary' onClick={handleCerrarModal}>
                        Cancelar
                    </Button>
                    <Button className='btn btn-danger' onClick={() => handleConfirmarBorrado(filaSeleccionada)}>
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Tabla;