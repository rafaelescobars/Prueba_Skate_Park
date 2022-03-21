--Cambiarse a base postgres
\c postgres;

-- Create a new database called 'skatepark'
 CREATE DATABASE skatepark;

--Conexión base library
\c skatepark;

--Encoding UTF8
SET client_encoding TO 'UTF8';

--Extensión
--CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

--Crear Tablas
CREATE TABLE contenders(
  id SERIAL PRIMARY KEY,
  email VARCHAR(50) NOT NULL,
  nombre VARCHAR(50) NOT NULL,
  password VARCHAR(50) NOT NULL,
  anos_experiencia INT NOT NULL,
  especialidad VARCHAR(50) NOT NULL,
  foto VARCHAR(255) NOT NULL,
  estado BOOLEAN NOT NULL
);