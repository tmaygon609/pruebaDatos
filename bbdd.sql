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
    idTrimestre INT,
    nombre VARCHAR(255),
    FOREIGN KEY (idTrimestre) REFERENCES trimestre(id)
);

CREATE TABLE notas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    idAlumno INT,
    idTrimestre INT,
    idTarea INT,
    nota DECIMAL(5,2),
    FOREIGN KEY (idAlumno) REFERENCES alumnos(id),
    FOREIGN KEY (idTrimestre) REFERENCES trimestre(id),
    FOREIGN KEY (idTarea) REFERENCES tareas(id)
);
