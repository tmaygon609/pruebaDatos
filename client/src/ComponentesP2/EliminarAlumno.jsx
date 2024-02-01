import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

//Componente Tabla para almacenar los alumnos
const Tabla = () => {
    //Estado para almacenar los datos de la tabla
    //Define un estado llamado 'data' utilizando el hook useState.
    //'data' almacena la información de los alumnos en forma de un array de objetos.
    //'setData' es la función que se utiliza para actualizar el estado 'data'.
    //El estado inicial se establece con un array que contiene tres objetos, cada uno representando un alumno.
    const [data, setData] = useState([
        { id: 1, nombre: 'Pablo', apellidos: 'Márquez' },
        { id: 2, nombre: 'Marcos', apellidos: 'Gómez' },
        { id: 3, nombre: 'Andrea', apellidos: 'García' },
    ]);

    //Estado para almacenar la fila seleccionada
    //Define un estado llamado 'filaSeleccionada' utilizando el hook useState.
    //'filaSeleccionada' se utiliza para almacenar la identificación (id) de la fila seleccionada en la tabla.
    //'setFilaSeleccionada' es la función que se utiliza para actualizar el estado 'filaSeleccionada'.
    //El estado inicial se establece en 'null', indicando que inicialmente no hay ninguna fila seleccionada.
    const [filaSeleccionada, setFilaSeleccionada] = useState(null);

    //Define una función llamada 'handleBorrarFila' que usa un parámetro 'id'.
    //Esta función se utiliza para marcar la fila con el 'id' proporcionado como seleccionada.
    const handleBorrarFila = (id) => {
        //Utiliza 'setFilaSeleccionada' para actualizar el estado 'filaSeleccionada' con el 'id' proporcionado.
        //Esta acción indica que la fila con el 'id' proporcionado está marcada como seleccionada.
        setFilaSeleccionada(id);
    }

    //Define una función llamada 'handleConfirmarBorrado' sin parámetros.
    //Esta función se utiliza para confirmar el borrado de la fila seleccionada.
    const handleConfirmarBorrado = () => {
        //Filtra los datos para eliminar la fila seleccionada.
        //Utiliza el método 'filter' para crear un nuevo array ('updatedData') excluyendo la fila con 'id' igual a 'filaSeleccionada'.
        const updatedData = data.filter(item => item.id !== filaSeleccionada);

        //Actualiza el estado 'data' con el nuevo array que no contiene la fila seleccionada.
        setData(updatedData);

        //Después de borrar la fila, se establece 'filaSeleccionada' de nuevo en 'null'.
        //Esto indica que no hay ninguna fila seleccionada después del borrado.
        setFilaSeleccionada(null);
    }

    //Esta función se utiliza para cerrar el modal y restablecer el estado 'filaSeleccionada' a 'null'.
    const handleCerrarModal = () => {
        //Establece 'filaSeleccionada' en 'null'.
        //Indica que no hay ninguna fila seleccionada después de cerrar el modal.
        setFilaSeleccionada(null);
    }

    //Esta función se utiliza para obtener los datos de la fila seleccionada.
    const getFilaSeleccionadaData = () => {
        //Utiliza el método 'find' en el array 'data' para encontrar la fila con 'id' igual a 'filaSeleccionada'.
        //Almacena la fila encontrada en la variable 'filaSeleccionadaData'.
        const filaSeleccionadaData = data.find(item => item.id === filaSeleccionada);

        //Devuelve la 'filaSeleccionadaData'.
        return filaSeleccionadaData;
    }

    //Llama a la función 'getFilaSeleccionadaData' para obtener los datos de la fila seleccionada.
    //Almacena el resultado en la variable 'filaSeleccionadaData'.
    const filaSeleccionadaData = getFilaSeleccionadaData();

    //Define una función llamada 'handleMouseOver' que usa un parámetro 'id'.
    //Esta función se utiliza para manejar el evento cuando el ratón está sobre una fila.
    const handleMouseOver = (id) => {
        console.log(`El ratón está sobre la fila con ID ${id}`);
    }

    //Devuelve el JSX que representa la tabla y el modal para confirmar
    return (
        <div className='container mt-4'>
            <table className='table table-hover text-center align-middle caption-top'>
                <caption>Lista de alumnos</caption>
                <thead className='table-dark'>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellidos</th>
                        <th>Borrar</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Mapea los datos para crear filas de la tabla */}
                    {data.map((fila) => (
                        <tr key={fila.id} onMouseOver={() => handleMouseOver(fila.id)}>
                            <td>{fila.id}</td>
                            <td>{fila.nombre}</td>
                            <td>{fila.apellidos}</td>
                            <td>
                                {/* Botón para borrar la fila */}
                                <Button className='btn btn-danger' onClick={() => handleBorrarFila(fila.id)}>
                                    <b>Eliminar</b>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal para confirmar el borrado de la fila seleccionada */}
            {/* show determina si se muestra el modal(se pone true si hay una fila seleccionada) */}
            {/* onHide ejecuta la funcion para cerrar el modal */}
            <Modal show={!!filaSeleccionada} onHide={handleCerrarModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar borrado de alumno</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Verifica si 'filaSeleccionadaData' existe antes de renderizar el mensaje */}
                    {filaSeleccionadaData && (
                        <p>
                            {/* Muestra un mensaje con el nombre y apellidos de la fila seleccionada */}
                            ¿Seguro que quiere eliminar a {filaSeleccionadaData.nombre}{' '}{filaSeleccionadaData.apellidos} del sistema?
                        </p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    {/* Botón para cancelar el borrado y cerrar el modal */}
                    <Button className='btn btn-secondary' onClick={handleCerrarModal}>
                        Cancelar
                    </Button>
                    {/* Botón para confirmar el borrado de la fila seleccionada */}
                    <Button className='btn btn-danger' onClick={handleConfirmarBorrado}>
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Tabla;
