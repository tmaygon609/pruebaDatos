import { useState } from 'react';

function FormularioNotas() {

    //Declaración de estado para el componente funcional form
    //Crea oun objeto de estado y una función para actualizar ese estado
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

    //Declaración de estado para el componente funcional form
    //Crea oun objeto de estado y una función para actualizar ese estado
    const [errors, setErrors] = useState({ //Crea un estado llamado "errors" y una funcion "setErrors" para actualizar ese estado
        alumno: '', //El estado "errors" es un objeto que se utiliza para almacenar los errores y que se inicializa vacío
        descripcion: '',
        trimestre: '',
        tarea: '',
        nota: '',
    });

    const [errors2, setErrors2] = useState({
        alumno_calc: '',
        trimestre_calc: '',
    });

    //Crea un estado llamado "notas" y una funcion "setNotas" para actualizar ese estado
    //El estado "notas" es un array que se utilixa para almacenar las notas y que se inicializa vacío
    const [notas, setNotas] = useState([]);

    //Manejador de evento que se ejecuta cada vez que se actualiza el valor de algún campo del formulario
    const handleChange = (event) => {
        setForm({
            ...form, //Copia el contenido del estado "form"
            [event.target.name]: event.target.value, //Actualiza el valor del campo que ha cambiado
        });
    };

    const handleChange2 = (event) => {
        setForm2({
            ...form2,
            [event.target.name]: event.target.value,
        });
    };

    //Manejador de evento que se ejecuta cuando se envía el formulario
    //Añade una nueva nota al array de notas
    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) { //Valida el formulario
            const nuevaNota = { //Crea un objeto con los datos del formulario
                alumno: form.alumno,
                trimestre: form.trimestre,
                nota: parseFloat(form.nota),
            };
            
            setNotas([...notas, nuevaNota]); //Añade la nueva nota al array de notas
            setForm({ //Resetea el formulario
                alumno: '',
                descripcion: '',
                trimestre: '',
                tarea: '',
                nota: '',
            });
            alert("Nota introducida correctamente");
        }
    };

    //Manejador de evento que se ejecuta cuando se envía el formulario
    //Calcula la nota media de un alumno en un trimestre
    const handleSubmit2 = (event) => {
        event.preventDefault(); //Evita que se recargue la página
        if (validateForm2()) { //Valida el formulario
            const notaMedia = calcularNotaMedia(form2.alumno_calc, form2.trimestre_calc); //Calcula la nota media
            alert(notaMedia);
        }
    };

    //Valida el formulario
    const validateForm = () => {
        let isValid = true;
        let newErrors = { ...errors };

        if (form.alumno.trim() === '') {
            newErrors.alumno = 'Seleccione un aluno/a';
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

        setErrors(newErrors); //Actualiza el estado "errors"
        return isValid;
    };

    //Valida el formulario
    const validateForm2 = () => {
        let isValid = true;
        let newErrors = { ...errors2 };

        if (form2.alumno_calc.trim() === '') {
            newErrors.alumno_calc = 'Seleccione un aluno/a';
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

        setErrors2(newErrors); //Actualiza el estado "errors"
        return isValid;
    };

    //Calcula la nota media de un alumno en un trimestre
    const calcularNotaMedia = (alumno, trimestre) => {
        const notasAlumnoTrimestre = notas.filter( //Filtra las notas del alumno y trimestre seleccionados
            (nota) => nota.alumno === alumno && nota.trimestre === trimestre //Devuelve true si la nota cumple la condición
        );
    
        if (notasAlumnoTrimestre.length === 0) {
            return "No hay notas para el alumno y trimestre seleccionados.";
        }
    
        
        const sumaNotas = notasAlumnoTrimestre.reduce((total, nota) => total + nota.nota, 0); //Suma las notas del alumno y trimestre seleccionados
        const notaMedia = sumaNotas / notasAlumnoTrimestre.length; //Calcula la nota media
    
        return `Nota media del trimestre ${trimestre} para ${alumno}: ${notaMedia.toFixed(2)}`; //Devuelve la nota media y con toFixed(2) se limita a dos decimales
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
                                <option value="alicia">Alicia</option>
                                <option value="adrian">Adrián</option>
                                <option value="carmen">Carmen</option>
                                <option value="joseantonio">José Antonio</option>
                                <option value="pablo">Pablo</option>
                                <option value="tibu">Tibu</option>
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
                                <option value="primero">Primer Trimestre</option>
                                <option value="segundo">Segundo Trimestre</option>
                                <option value="tercero">Tercer Trimestre</option>
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
                                <option value="p_ind">Práctica individual</option>
                                <option value="p_grup">Práctica grupal</option>
                                <option value="ex_teor">Examen teórico</option>
                                <option value="ex_pract">Examen práctico</option>
                                <option value="expo">Exposición</option>
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
                    <br/>
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
                                <option value="alicia">Alicia</option>
                                <option value="adrian">Adrián</option>
                                <option value="carmen">Carmen</option>
                                <option value="joseantonio">José Antonio</option>
                                <option value="pablo">Pablo</option>
                                <option value="tibu">Tibu</option>
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
                                <option value="primero">Primer Trimestre</option>
                                <option value="segundo">Segundo Trimestre</option>
                                <option value="tercero">Tercer Trimestre</option>
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