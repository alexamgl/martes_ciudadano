-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-02-2025 a las 15:37:52
-- Versión del servidor: 10.11.1-MariaDB
-- Versión de PHP: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sec_particular`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `nueva_incidencia`
--

CREATE TABLE `nueva_incidencia` (
  `id_incidencia` int(10) NOT NULL,
  `folio_cus` int(50) NOT NULL,
  `tipo_solicitante` varchar(100) NOT NULL,
  `origen` varchar(100) NOT NULL,
  `motivo` varchar(100) NOT NULL,
  `secretaria` varchar(100) NOT NULL,
  `coordinacion` varchar(100) NOT NULL,
  `departamento` varchar(100) NOT NULL,
  `tipo_incidencia` varchar(100) NOT NULL,
  `colonia` varchar(100) NOT NULL,
  `direccion` varchar(100) NOT NULL,
  `referencia` varchar(100) NOT NULL,
  `comentarios` varchar(200) NOT NULL,
  `fecha_creacion` timestamp NULL DEFAULT current_timestamp(),
  `estatus` varchar(100) DEFAULT 'Pendiente'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `nueva_incidencia`
--

INSERT INTO `nueva_incidencia` (`id_incidencia`, `folio_cus`, `tipo_solicitante`, `origen`, `motivo`, `secretaria`, `coordinacion`, `departamento`, `tipo_incidencia`, `colonia`, `direccion`, `referencia`, `comentarios`, `fecha_creacion`, `estatus`) VALUES
(1, 1, 'Presidente de Colonos', 'Brigadistas Juntos Contigo', 'Informes', 'Secretaría Particular', 'Dirección de Atención Ciudadana', 'Jefatura Oficialía de Partes', 'Seleccione...', 'Seleccione...', 'hfd', 'jghv', 'gjvbn', '2025-02-23 21:52:39', 'Pendiente');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `nueva_incidencia`
--
ALTER TABLE `nueva_incidencia`
  ADD PRIMARY KEY (`id_incidencia`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `nueva_incidencia`
--
ALTER TABLE `nueva_incidencia`
  MODIFY `id_incidencia` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
