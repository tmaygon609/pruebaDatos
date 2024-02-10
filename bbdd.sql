CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255),
    apellidos VARCHAR(255),
    departamento VARCHAR(255),
    usuario VARCHAR(255),
    password VARCHAR(255)
);

CREATE TABLE alumnos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255),
    apellidos VARCHAR(255),
    email VARCHAR(255),
    foto BLOB
);
 
CREATE TABLE trimestre (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255)
);

CREATE TABLE tareas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255)
);

CREATE TABLE notas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    idAlumno INT,
    idTrimestre INT,
    idTarea INT,
    descripcion VARCHAR(255),
    nota DECIMAL(5,2),
    FOREIGN KEY (idAlumno) REFERENCES alumnos(id) ON DELETE CASCADE,
    FOREIGN KEY (idTrimestre) REFERENCES trimestre(id),
    FOREIGN KEY (idTarea) REFERENCES tareas(id)
);

INSERT INTO trimestre (nombre) VALUES 
('Primer Trimestre'), 
('Segundo Trimestre'), 
('Tercer Trimestre');

INSERT INTO tareas (nombre) VALUES 
('Práctica individual'), 
('Práctica grupal'), 
('Examen teórico'), 
('Examen práctico'), 
('Exposicion');