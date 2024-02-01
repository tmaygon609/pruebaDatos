import { useState} from 'react';

function Formulario() {

    const [form, setForm] = useState(
        {
            nombre: '',
            contrasena: '',
        }
    )

    const handleChange = (event) => {

        setForm(
            {
                ...form, 
                [event.target.name]: event.target.value,
            }
        )
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(form)
    }

    return (
        
        <form onSubmit = {handleSubmit}>
            <div>
                <h1>Formulario de contacto</h1>
            </div>
            <div>
                <label>Nombre</label>
                <input type="text" name="nombre" value={form.nombre} onChange= {handleChange}/>
            </div>
            <div>
                <label>Contraseña</label>
                <input type="password" name="contrasena" value={form.contrasena}  onChange= {handleChange}/>
            </div>
            <input type="submit" value="Enviar"/>
        </form>
    )
}

export default Formulario;