import React, { useState } from "react";
//{ useState } permite utilizar el estado en componentes funcionales.
import "../App.css";

class MiFormulario extends React.Component {
  constructor(props) {
    super(props);
    //Constructores con los datos iniciales del formulario.
    this.state = {
      formularioData: {
        nombre: "",
        apellidos: "",
        email: "",
        img: null,
      },
      errors: {
        nombre: "",
        apellidos: "",
        email: "",
        img: "",
      },
      imageURL: null,
    };
  }
  //Maneja los cambios en el formulario.
  handleInputChange = (event) => {
    const { name, value, type, files } = event.target;

    if (type === "file") {
      const file = files[0];
      this.setState((prevState) => ({
        formularioData: {
          ...prevState.formularioData,
          [name]: file,
        },
      }));
      //lectura del archivo
      const reader = new FileReader();
      reader.onloadend = () => {
        this.setState({ imageURL: reader.result });
      };
      // Verifica si hay un archivo antes de intentar leerlo
      if (file) {
        reader.readAsDataURL(file);
      }
    } else {
      // Manejo para otros tipos de input (nombre, apellidos, email)
      this.setState((prevState) => ({
        formularioData: {
          ...prevState.formularioData,
          [name]: value,
        },
      }));
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const confirmation = window.confirm(
      `Confirmar envío con los siguientes datos:\n\nNombre: ${
        this.state.formularioData.nombre
      }\nApellidos: ${this.state.formularioData.apellidos}\nEmail: ${
        this.state.formularioData.email
      }\nImagen: ${this.state.formularioData.img ? "Adjunta" : "No adjunta"}`
    );

    if (confirmation) {
      console.log("Datos del formulario enviados:", this.state.formularioData);
      // Puedes enviar los datos al servidor aquí, por ejemplo, mediante una solicitud fetch() o axios
    } else {
      console.log("Envío cancelado");
    }
  };

  render() {
    const { imageURL } = this.state;

    return (
      <div className="center-container">
        <form onSubmit={this.handleSubmit}>
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
          <div className="form-group row">
            <label htmlFor="img" className="col-4 col-form-label">
              Foto:
            </label>
            <div className="col-8">
              <input
                id="img"
                name="img"
                type="file"
                className="form-control"
                onChange={this.handleInputChange}
              />
            </div>
          </div>

          {imageURL && (
            <div className="form-group row">
              <label className="col-4 col-form-label">
                Imagen seleccionada:
              </label>
              <div className="col-8">
                <img
                  src={imageURL}
                  alt="Imagen seleccionada"
                  style={{ maxWidth: "100%", marginTop: "10px" }}
                />
              </div>
            </div>
          )}

          <div className="form-group row">
            <div className="offset-4 col-8">
              <button type="submit" className="btn btn-primary">
                Enviar
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default MiFormulario;
