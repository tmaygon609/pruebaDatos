import React, { useState } from 'react';
import './styles/Actualizacion.css';

function Actualizacion() {

  // Registros de la tabla de actualización

  const data = [
    { id: 1, nombre: 'Ana Alicia', apellidos: 'Lopez Vazquez', editing: false },
    { id: 2, nombre: 'Pablo', apellidos: 'Marquez Gomez', editing: false },
    { id: 3, nombre: 'Jose Antonio', apellidos: 'Vergara Sanchez', editing: false },
    { id: 4, nombre: 'Carmen', apellidos: 'Sanchez Martín', editing: false },
    { id: 5, nombre: 'Adrían', apellidos: 'Martinez Segura', editing: false },
    { id: 6, nombre: 'Tibu', apellidos: 'Mayo González', editing: false },
  ];

  /* 
    Estado para manejar los estados de los campos del formulario
    y los errores de validación de los campos de texto
  */

  const [formData, setFormData] = useState(data);
  const [errors, setErrors] = useState({});

  /*
    La funcion handleEdit se ejecuta cuando se hace click en Editar o en Guardar. Cuando se hace click en Editar, 
    el valor de editing del registro pasa a ser true, y cuando se hace click en Guardar, el valor de editing pasa 
    a ser false. Si el valor de editing es true, se muestra el campo editable, y si es false, se muestra el campo
    no editable.
  */

    /*
    La funcion tiene como parametro el id del registro que se quiere editar, y dentro, se llama a la funcion setFormData
    que recibe como parametro una funcion que tiene como parametro el estado anterior. Dentro de esta funcion, se llama
    al metodo map que recorre el array prevData. Si el id del registro es igual al id que se pasa como parametro, se
    cambia el valor de la propiedad editing. Si el id del registro es distinto al id que se pasa como parametro, se
    devuelve el registro sin modificar.
    */

  const handleEdit = (id) => {
    setFormData((prevData) =>
      prevData.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            editing: !item.editing,
          };
        } else {
          return item;
        }
      })
    );
  };

  /*
    La funcion handleInputChange se ejecuta cuando se hace un cambio en los campos de texto. Se usa en el evento onChange de los inputs del 
    formulario. Además, se manejan los errores de validación de los campos, en este caso, solo se admiten caracteres alfabéticos en los 
    campos nombre y apellidos.
  */

    /*
    La funcion tiene como parametros el evento y el id del registro que se quiere editar. Luego se recupera el nombre y el valor del input
    que ha cambiado. Después, se llama a la funcion setFormData que recibe como parametro una funcion que tiene como parametro el estado
    anterior. Dentro de esta funcion, se llama al metodo map que recorre el array prevData. Si el id del registro es igual al id que se
    pasa como parametro, se devuelve el registro con el valor del campo que ha cambiado. Si el id del registro es distinto al id que se
    pasa como parametro, se devuelve el registro sin modificar.
    */

    /*
    Si el nombre del campo es nombre o apellidos, se crea una expresión regular que solo permite caracteres alfabéticos. Si el valor del campo 
    de entrada coincide con la expresión regular, se actualiza el estado errors con un mensaje de error para ese campo. Si el valor del campo
    de entrada no coincide con la expresión regular, crea una variable rest que contiene el estado errors sin el campo que ha cambiado y asi 
    se elimina el mensaje de error para ese campo.
    */

  const handleInputChange = (event, id) => {
    const { name, value } = event.target;
    setFormData((prevData) =>
      prevData.map((item) => {
        if (item.id === id) {
          return { ...item, [name]: value };
        }
        return item;
      })
    );

    // Validación de los campos de texto
    if (name === 'nombre' || name === 'apellidos') {
      if (/[^a-zA-Z\s]/.test(value)) {        
            setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: 'Solo se admiten caracteres alfabéticos',
        }));
      } else {
        setErrors((prevErrors) => {
          //
          const { [name]: _, ...rest } = prevErrors;
          return rest;
        });
      }
    }
  };

  /*Función handleChange que se ejecuta cuando se hace click sobre Guardar. 
    Tiene como parámetro el id del registro a editar. Busca el registro con el id que se pasa 
    como parámetro y accede a sus propiedades nombre y apellidos para mostrarlos en la consola y ejecutar la sentencia SQL de actualización.
    Por último, se llama a la función handleEdit para cambiar el valor de editing a false para ese registro
    y que sus campos no sean editables.
  */

  const handleSave = (id) => {
    const item = formData.find((item) => item.id === id);
    console.log(`UPDATE alumnos SET nombre = '${item.nombre}', apellidos = '${item.apellidos}' WHERE id = ${id};`);
    handleEdit(id);
  };

  return (
    <div className='main'>
      <div className='container'>
        <br />
        <h1>Edición de usuarios</h1>
        <br />
        <table className="table">
          <thead>
            <tr>
              <th className="th-nombre">Nombre</th>
              <th className="th-apellido">Apellidos</th>
              <th className="th-editar">Editar</th>
            </tr>
          </thead>
          <tbody>
            {/* Recorre el array formData y crea una fila por cada objeto del array */}
            {formData.map((item) => (
              // A cada fila le asigna como key el id del objeto
              <tr key={item.id}>
                <td>
                  {/* Si la propiedad editing del objeto es true, muestra el campo editable */}
                  {item.editing ? (
                    <>
                      <input
                        type="text"
                        name="nombre"
                        value={item.nombre}
                        onChange={(e) => handleInputChange(e, item.id)}
                        onKeyDown={(e) => console.log(`Tecla presionada: ${e.key}`)}
                        style={{ width: '100%' }}
                      />
                        {/* Si existe un error para el campo 'nombre', se muestra el mensaje de error */}
                      {errors.nombre && <p>{errors.nombre}</p>}
                    </>
                  ) : (
                    // Si la propiedad editing del objeto es false, muestra el campo no editable
                    item.nombre
                  )}
                </td>
                <td>
                  {/* Si la propiedad editing del objeto es true, muestra el campo editable */}
                  {item.editing ? (
                    <>
                      <input
                        type="text"
                        name="apellidos"
                        value={item.apellidos}
                        onChange={(e) => handleInputChange(e, item.id)}
                        style={{ width: '100%' }}
                        onKeyDown={(e) => console.log(`Tecla presionada: ${e.key}`)}
                      />
                        {/* Si existe un error para el campo 'nombre', se muestra el mensaje de error */}
                      {errors.apellidos && <p>{errors.apellidos}</p>}
                    </>
                  ) : (
                    // Si la propiedad editing del objeto es false, muestra el campo no editable
                    item.apellidos
                  )}
                </td>
                <td>
                {/*Cuando el ítem está en modo de guardar, el botón muestra 'Guardar' y al hacer clic en él, se llama a la función handleSave. 
                Cuando el item está en modo de editar, el botón muestra 'Editar' y al hacer clic en él, se llama a la función handleEdit.
                Depende de si la edicion está activada o no. 
                */}
                  <button
                    className="btn btn-primary"
                    onClick={() => (item.editing ? handleSave(item.id) : handleEdit(item.id))}
                  >
                    {item.editing ? 'Guardar' : 'Editar'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Actualizacion;
