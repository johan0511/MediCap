CREATE DATABASE medicap;

USE medicap;

CREATE TABLE CitasMedicas (
    citaId INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    idNumber VARCHAR(20) NOT NULL,
    phoneNumber VARCHAR(15) NOT NULL,
    gender ENUM(
        'Masculino',
        'Femenino',
        'Otro'
    ) NOT NULL,
    appointmentType VARCHAR(50) NOT NULL,
    appointmentDate DATE NOT NULL,
    appointmentTime TIME NOT NULL,
    symptoms TEXT NOT NULL
);

-- Tabla de pacientes
CREATE TABLE pacientes (
    id_paciente INT AUTO_INCREMENT PRIMARY KEY,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    numero_identificacion VARCHAR(20) UNIQUE NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    genero ENUM(
        'Masculino',
        'Femenino',
        'Otro'
    ) NOT NULL
);

-- Insertar algunos datos de ejemplo
INSERT INTO
    pacientes (
        nombres,
        apellidos,
        numero_identificacion,
        telefono,
        genero
    )
VALUES (
        'Juan',
        'Pérez',
        '1234567890',
        '1234567890',
        'Masculino'
    ),
    (
        'María',
        'Gómez',
        '9876543210',
        '9876543210',
        'Femenino'
    );