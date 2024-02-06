import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FormularioNotas() {
    // Función para enviar la nueva nota al servidor
    const enviarNotaAlServidor = async (nuevaNota) => {
        try {
            const response = await axios.post('http://localhost:3001/notas', nuevaNota);
            console.log('Respuesta del servidor:', response.data);
        } catch (error) {
            console.error('Error al enviar la nota al servidor:', error);
        }
    };
// Función para enviar la solicitud de cálculo al servidor
const enviarSolicitudCalculoAlServidor = async (idAlumno, idTrimestre) => {
    try {
        const response = await axios.get(`http://localhost:3001/notas/${idAlumno}/${idTrimestre}`);
        console.log('Respuesta del servidor:', response.data);
        calcularNotaMedia(response.data); // Calcular la nota media con la respuesta del servidor
    } catch (error) {
        console.error('Error al enviar la solicitud de cálculo al servidor:', error);
    }
};


    // Función para calcular la nota media del alumno
    const calcularNotaMedia = (notas) => {
        // Sumar todas las notas
        const sumaNotas = notas.reduce((total, nota) => total + nota.nota, 0);

        // Calcular la nota media
        const notaMedia = sumaNotas / notas.length;

        alert(`La nota media del alumno es: ${notaMedia}`);
        // Lógica adicional aquí, como mostrar la nota media en la interfaz de usuario, etc.
    };
    
    // Función para cargar los alumnos en los select
    const [alumnos, setAlumnos] = useState([]);

    const cargarAlumnos = async () => {
        try {
            const response = await axios.get('http://localhost:3001/notasAlumnos');
            setAlumnos(response.data);
        } catch (error) {
            console.error('Error al cargar los alumnos:', error);
        }
    };

    useEffect(() => {
        cargarAlumnos();
    }, []);

    // Declaración de estado para el componente funcional form
    const [form, setForm] = useState({
        alumno: '',
        descripcion: '',
        trimestre: '',
        tarea: '',
        nota: '',
    });

    const [form2, setForm2] = useState({
        alumno_calc: '',
        trimestre_calc: '',
    });

    const [errors, setErrors] = useState({
        alumno: '',
        descripcion: '',
        trimestre: '',
        tarea: '',
        nota: '',
    });

    const [errors2, setErrors2] = useState({
        alumno_calc: '',
        trimestre_calc: '',
    });

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    };

    const handleChange2 = (event) => {
        setForm2({
            ...form2,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateForm()) {
            const nuevaNota = {
                alumno: form.alumno,
                descripcion: form.descripcion,
                trimestre: form.trimestre,
                tarea: form.tarea,
                nota: parseFloat(form.nota),
            };
            
            try {
                await enviarNotaAlServidor(nuevaNota);
                alert('Nota agregada exitosamente');
                resetForm();
            } catch (error) {
                console.error('Error al enviar la nota al servidor:', error);
            }
        }
    };

    const handleSubmit2 = async (event) => {
        event.preventDefault();
        if (validateForm2()) {

            const idAlumno = form2.alumno_calc;
            const idTrimestre = form2.trimestre_calc;
            
            try {
                await enviarSolicitudCalculoAlServidor(idAlumno, idTrimestre);
                resetForm2();
            } catch (error) {
                console.error('Error al enviar la nota al servidor:', error);
            }
        }
    };

    // const handleSubmit2 = async (event) => {
    //     event.preventDefault();
    //     if (validateForm2()) {
    //         try {
    //             // Obtener los valores del formulario
    //             const idAlumno = form2.alumno_calc;
    //             const idTrimestre = form2.trimestre_calc;
    
    //             // Realizar la solicitud GET incluyendo los parámetros en la URL
    //             const response = await axios.get(`http://localhost:3001/notas/${idAlumno}/${idTrimestre}`);
    //             console.log('Respuesta del servidor:', response.data);
    //             // Alerta con los datos obtenidos del servidor
    //             alert(JSON.stringify(response.data));
    
    //             // Llamar a la función para enviar la solicitud de cálculo al servidor
    //             enviarSolicitudCalculoAlServidor(idAlumno, idTrimestre);
    
    //             // Llamar a la función para resetear el formulario
    //             resetForm2();
    
    //             // También puedes realizar otras acciones aquí, como mostrar una alerta o redirigir al usuario
    //         } catch (error) {
    //             console.error('Error al enviar la solicitud de cálculo al servidor:', error);
    //         }
    //     }
    // };

    const validateForm = () => {
        let isValid = true;
        let newErrors = { ...errors };

        if (form.alumno.trim() === '') {
            newErrors.alumno = 'Seleccione un alumno/a';
            isValid = false;
        } else {
            newErrors.alumno = '';
        }

        if (form.descripcion.trim() === '') {
            newErrors.descripcion = 'La descripción es requerida';
            isValid = false;
        } else {
            newErrors.descripcion = '';
        }

        if (form.trimestre.trim() === '') {
            newErrors.trimestre = 'Seleccione un trimestre';
            isValid = false;
        } else {   
            newErrors.trimestre = '';
        }

        if (form.tarea.trim() === '') {
            newErrors.tarea = 'Seleccione una tarea';
            isValid = false;
        } else {
            newErrors.tarea = '';
        }

        if (form.nota.trim() === '' || isNaN(form.nota) || form.nota < 0 || form.nota > 10) {
            newErrors.nota = 'Ingrese una nota válida entre 0 y 10';
            isValid = false;
        } else {
            newErrors.nota = '';
        }

        setErrors(newErrors);
        return isValid;
    };

    const validateForm2 = () => {
        let isValid = true;
        let newErrors = { ...errors2 };

        if (form2.alumno_calc.trim() === '') {
            newErrors.alumno_calc = 'Seleccione un alumno/a';
            isValid = false;
        } else {
            newErrors.alumno_calc = '';
        }
        
        if (form2.trimestre_calc.trim() === '') {
            newErrors.trimestre_calc = 'Seleccione un trimestre';
            isValid = false;
        } else {   
            newErrors.trimestre_calc = '';
        }

        setErrors2(newErrors);
        return isValid;
    };

    const resetForm = () => {
        setForm({
            alumno: '',
            descripcion: '',
            trimestre: '',
            tarea: '',
            nota: '',
        });
        setErrors({
            alumno: '',
            descripcion: '',
            trimestre: '',
            tarea: '',
            nota: '',
        });
    };

    const resetForm2 = () => {
        setForm2({
            alumno_calc: '',
            trimestre_calc: ''
        });
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div htmlFor="alumno" className="col-md-6">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <h1>Añadir nota</h1>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Alumno</label>
                            <select
                                name="alumno"
                                value={form.alumno}
                                onChange={handleChange}
                                className="form-select"
                            >
                                <option value="" disabled defaultValue>Selecciona un alumno</option>
                                {alumnos.map((alumno) => (
                                    <option key={alumno.id} value={alumno.id}>{alumno.nombre} {alumno.apellidos}</option>
                                ))}
                            </select>
                            {errors.alumno && <span>{errors.alumno}</span>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="descripcion" className="form-label">Descripción</label>
                            <input
                                placeholder='Escriba una descripción'
                                type="text"
                                name="descripcion"
                                value={form.descripcion}
                                onChange={handleChange}
                                className="form-control"
                            />
                            {errors.descripcion && <span>{errors.descripcion}</span>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="trimestre" className="form-label">Trimestre</label>
                            <select
                                name="trimestre"
                                value={form.trimestre}
                                onChange={handleChange}
                                className="form-select"
                            >
                                <option value="" disabled defaultValue>Selecciona un trimestre</option>
                                <option value="1">Primer Trimestre</option>
                                <option value="2">Segundo Trimestre</option>
                                <option value="3">Tercer Trimestre</option>
                            </select>
                            {errors.trimestre && <span>{errors.trimestre}</span>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="tarea" className="form-label">Tarea</label>
                            <select
                                name="tarea"
                                value={form.tarea}
                                onChange={handleChange}
                                className="form-select"
                            >
                                <option value="" disabled defaultValue>Selecciona una tarea</option>
                                <option value="1">Práctica individual</option>
                                <option value="2">Práctica grupal</option>
                                <option value="3">Examen teórico</option>
                                <option value="4">Examen práctico</option>
                                <option value="5">Exposición</option>
                            </select>
                            {errors.tarea && <span>{errors.tarea}</span>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="nota" className="form-label">Nota</label>
                            <input
                                type="number"
                                name="nota"
                                min={0}
                                max={10}
                                step={0.1}
                                value={form.nota}
                                onChange={handleChange}
                                className="form-control"
                            />
                            {errors.nota && <span>{errors.nota}</span>}
                        </div>
                        <div className='mb-3'>
                            <button type="submit" className="btn btn-primary">Añadir</button>
                        </div>
                    </form>
                    <br />
                    <form onSubmit={handleSubmit2}>
                        <div className="mb-3">
                            <h1>Calcular nota</h1>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="alumno" className="form-label">Alumno</label>
                            <select
                                name="alumno_calc"
                                value={form2.alumno_calc}
                                onChange={handleChange2}
                                className="form-select"
                            >
                                <option value="" disabled selected>Selecciona un alumno</option>
                                {alumnos.map((alumno) => (
                                    <option key={alumno.id} value={alumno.id}>{alumno.nombre} {alumno.apellidos}</option>
                                ))}
                            </select>
                            {errors2.alumno_calc && <span>{errors2.alumno_calc}</span>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="trimestre" className="form-label">Trimestre</label>
                            <select
                                name="trimestre_calc"
                                value={form2.trimestre_calc}
                                onChange={handleChange2}
                                className="form-select"
                            >
                                <option value="" disabled selected>Selecciona un trimestre</option>
                                <option value="1">Primer Trimestre</option>
                                <option value="2">Segundo Trimestre</option>
                                <option value="3">Tercer Trimestre</option>
                            </select>
                            {errors2.trimestre_calc && <span>{errors2.trimestre_calc}</span>}
                        </div>
                        <div className="mb-3">
                            <button type="submit" className="btn btn-primary">Calcular</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default FormularioNotas;
