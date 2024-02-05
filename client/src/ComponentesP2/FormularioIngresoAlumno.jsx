import React from "react";
import axios from "axios";
import "../App.css";

class MiFormulario extends React.Component {
  constructor(props) {
    super(props);
    // Constructores con los datos iniciales del formulario.
    this.state = {
      formularioData: {
        nombre: "",
        apellidos: "",
        email: "",
      },
      errors: {
        nombre: "",
        apellidos: "",
        email: "",
      },
    };
  }

  // Maneja los cambios en el formulario.
  handleInputChange = (event) => {
    const { name, value } = event.target;

    // Manejo para otros tipos de input (nombre, apellidos, email)
    this.setState((prevState) => ({
      formularioData: {
        ...prevState.formularioData,
        [name]: value,
      },
      errors: {
        ...prevState.errors,
        [name]: "", // Limpiar el mensaje de error al cambiar el valor
      },
    }));
  };

  // Función para validar el formato del correo electrónico
  validateEmailFormat = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validaciones antes de enviar el formulario
  validateForm = () => {
    const { nombre, apellidos, email } = this.state.formularioData;
    const errors = {};

    if (!nombre.trim()) {
      errors.nombre = "El nombre no puede estar vacío";
    }

    if (!apellidos.trim()) {
      errors.apellidos = "Los apellidos no pueden estar vacíos";
    }

    if (!email.trim()) {
      errors.email = "El correo electrónico no puede estar vacío";
    } else if (!this.validateEmailFormat(email)) {
      errors.email = "El formato del correo electrónico no es válido";
    }

    // Puedes agregar más validaciones según tus necesidades

    return errors;
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const errors = this.validateForm();

    // Verificar si hay errores antes de enviar el formulario
    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
      return;
    }

    const confirmation = window.confirm(
      `Confirmar envío con los siguientes datos:\n\nNombre: ${
        this.state.formularioData.nombre
      }\nApellidos: ${this.state.formularioData.apellidos}\nEmail: ${
        this.state.formularioData.email
      }`
    );

    if (confirmation) {
      try {
        // Datos a enviar al servidor
        const { nombre, apellidos, email } = this.state.formularioData;

        // Enviar datos al servidor
        const response = await axios.post('http://localhost:3001/api/insert', {
          nombre,
          apellidos,
          email,
        });

        console.log('Datos del formulario enviados correctamente', response.data);
      } catch (error) {
        console.error('Error al enviar los datos del formulario:', error.message);
      }
    } else {
      console.log('Envío cancelado');
    }
  };

  render() {
    return (
      <div className="center-container">
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>Ingrese Nuevo Alumno</legend>
            <div className="form-group row">
              <label htmlFor="nombre" className="col-4 col-form-label">
                Nombre:
              </label>
              <div className="col-8">
                <div className="input-group">
                  <input
                    id="nombre"
                    name="nombre"
                    placeholder="Ingrese nombre del alumno..."
                    type="text"
                    className="form-control"
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="apellidos" className="col-4 col-form-label">
                Apellidos:
              </label>
              <div className="col-8">
                <input
                  id="apellidos"
                  name="apellidos"
                  placeholder="Ingrese apellidos del alumno..."
                  type="text"
                  className="form-control"
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="email" className="col-4 col-form-label">
                Email:
              </label>
              <div className="col-8">
                <input
                  id="email"
                  name="email"
                  placeholder="Ingrese email del alumno..."
                  type="email"
                  className="form-control"
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
            {/* Agrega aquí otros campos del formulario si los necesitas */}
            <div className="form-group row">
              <div className="offset-4 col-8">
                <button type="submit" className="btn btn-primary">
                  Enviar
                </button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default MiFormulario;
