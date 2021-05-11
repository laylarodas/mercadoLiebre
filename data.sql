-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-05-2021 a las 20:03:28
-- Versión del servidor: 10.4.18-MariaDB
-- Versión de PHP: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `mercado_db`
--
CREATE DATABASE IF NOT EXISTS `mercado_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `mercado_db`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

--
-- RELACIONES PARA LA TABLA `categories`:
--

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'En oferta', NULL, NULL),
(2, 'Ultimos agregados', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories_users`
--

DROP TABLE IF EXISTS `categories_users`;
CREATE TABLE IF NOT EXISTS `categories_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

--
-- RELACIONES PARA LA TABLA `categories_users`:
--

--
-- Volcado de datos para la tabla `categories_users`
--

INSERT INTO `categories_users` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'Electro', NULL, NULL),
(2, 'Moda', NULL, NULL),
(3, 'Hogar', NULL, NULL),
(4, 'Jugueteria', NULL, NULL),
(5, 'Vida Sana', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,0) DEFAULT NULL,
  `discount` decimal(10,0) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `categoryId` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_products_categories_idx` (`categoryId`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4;

--
-- RELACIONES PARA LA TABLA `products`:
--   `categoryId`
--       `categories` -> `id`
--

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `discount`, `image`, `categoryId`, `createdAt`, `updatedAt`) VALUES
(1, 'Macbook Pro 2022', 'Macbook Pro 2019 Mpxq2ll/a Intel Core i5 2.3 Ghz 8gb RAM 128gb SSD Pantalla 13.3\" Retina Apple Nueva Original. Importada de USA. Se entrega con la factura de compra para contar con la garantía del fabricante', '500', '3', 'img-macbook-pro-2019.jpg', 1, NULL, NULL),
(2, 'Samsung Galaxy S10', 'Experiencia visual excepcional. Mirá tus series y películas favoritas con la mejor definición.Tendrás colores brillantes y detalles precisos en todos tus contenidos.Disfrutá aún más del mejor entretenimiento gracias a su vasta pantalla y ángulos de visión amplios.', '72999', '5', 'img-samsung-galaxy-s10.jpg', 1, NULL, NULL),
(3, 'Heladera no frost Whirlpool WRM45A', 'Disfrutá de la frescura de tus alimentos y almacenalos de manera práctica y cómoda en tu heladera Whirlpool, la protagonista de tu cocina. Su sistema no frost evita la generación de escarcha y te permitirá conservar el sabor y las propiedades nutritivas de los productos.A su vez, su freezer cuenta con una capacidad de 86 litros, que facilitará la distribución y el orden de tus congelados para que no te preocupes por la falta de espacio.', '47900', '10', 'img-heladera-whirpool.jpg', 1, NULL, NULL),
(4, 'Nikon Reflex D3500 - Kit', 'Incluye la cámara D3500, el objetivo zoom AF-P DX NIKKOR 18-55mm y el superteleobjetivo zoom compacto AF-P DX NIKKOR 70-300mm. Ambos objetivos enfocan de forma rápida y silenciosa, lo que resulta ideal para grabar metraje de vídeo sin que se escuche apenas el ruido del accionamiento.', '53000', '20', 'img-camara-nikon.jpg', 1, NULL, NULL),
(5, 'Aire Acondicionado 3200w Frio / Calor', 'AIRE SPLIT 3200W TACA-3200WCHSA/KC FC TCL. Capacidad frio 3200 Watts. Capacidad calor 3300 Watts. Potencia Electrica(W)frio 996. Potencia Electrica(W)calor 1028. Eficiencia energética calor C. Eficiencia energética frio A. Frigorias 2750 UNIDAD INTERIOR. Peso Bruto 10kg. Peso Neto 7 kg', '20999', '12', 'img-aire-acondicionado.jpg', 1, NULL, NULL),
(6, 'Notebook Lenovo I3 Intel 8gb Ram ', 'PROCESADOR / CHIPSET. CPU: Intel Core i3(8a generación) 8130U / 2.2 GHz. Velocidad turbo máxima: 3, 4 GHz. Numero de núcleos: Doble núcleo. Cache: 4 MB. Arquitectura de 64 bit: ss. MEMORIA CACHÉ. Tamaño instalada: 4 MB. ALMACENAMIENTO. Interfaz Serial ATA - 600', '36700', '20', 'img-laptop-lenovo.jpg', 1, NULL, '2021-05-11 18:00:27'),
(7, 'Apple iPhone 11 Pro Dual SIM 256 GB', '¡El nuevo smartphone que lo tiene todo! Con este lanzamiento, Apple ha superado todos sus récords. Su diseño se destaca por sus líneas finas y distinguidas a partir de una sola hoja de vidrio resistente, combinada con aluminio de excelente calidad.', '148000', '2', 'img-iphone-11.jpg', 1, NULL, NULL),
(8, 'Teclado Apple Magic Inalámbrico', 'El teclado mágico combina un diseño elegante con una batería recargable incorporada y funciones clave mejoradas. Con un mecanismo de tijera estable debajo de cada tecla, así como un recorrido de teclas optimizado y un perfil bajo, el Teclado Mágico ofrece una experiencia de escritura notablemente cómoda y precisa.', '15000', '0', 'img-apple-magic-keyboard.jpg', 2, NULL, NULL),
(9, 'Mouse Inalámbrico Logitech M280', 'Uso más cómodo para la mano derecha gracias a la forma contorneada con recubrimiento de goma blanda. Duración de las pilas hasta 18 meses, gracias al diseño para ahorrar energía.El M280 entra automáticamente en estado de suspensión cuando no se está usando.', '1200', '10', 'img-mouse-logitech.jpg', 2, NULL, NULL),
(10, 'Parlante Inalámbrico Bose Soundtouch 10', 'Parlante Inalámbrico Bose Soundtouch 10. SoundTouch®.La manera más sencilla de reproducir música en todo su hogar de forma inalámbrica. Características. » Marca: Bose. » Modelo: SoundTouch. » Color: Negro', '29990', '12', 'img-parlante-bose.jpg', 2, NULL, NULL),
(11, 'Home Theatre Sony Bdv-e4100', 'El sonido Surround de 5.1 canales y 1000 W proporciona un audio de verdadero impacto en los efectos especiales de películas y efectos de sonido de música y deportes. Con la tecnología Near Field Communication(NFC) podés disfrutar de Sonido One- Touch para reproducir música de forma instantánea', '32990', '0', 'img-home-theater-sony.jpg', 2, NULL, NULL),
(12, 'Smart TV Samsung 4K 50', 'Con el Smart TV Samsung UN50MU6100, viví una nueva experiencia visual con la resolución 4K, que te presentará imágenes con gran detalle y de alta calidad. Ahora todo lo que veas cobrará vida con brillo y colores más reales. Gracias a su tamaño de 50\", podrás transformar tu espacio en una sala de cine y transportarte a donde quieras.', '34990', '0', 'img-tv-samsung-smart.jpg', 2, NULL, NULL),
(13, 'Sony S6700 Reproductor De Blu-ray', 'Disfruta de tus películas favoritas con hasta cuatro veces más detalles que Full HD, gracias a la conversión de señales 4K. Cuando se conecta a un televisor compatible,un procesador de video avanzado convierte el video estándar en una señal cercana a la resolución 4K (3840 x 2160). Con ocho millones de píxeles, obtendrás imágenes más nítidas y detalladas, y la mayor calidad de la image te permite sentarte más cerca de la pantalla para que te sientas como en el cine.', '10999', '5', 'img-sony-blueray.jpg', 2, NULL, NULL),
(14, 'Bicicleta Mountain Bike Fierce Rodado 29', 'Bicicleta Mountain Bike Fierce Rodado 29 21 velocidades. Tipo: Mountain Bike. Rodado: 29. Material Cuadro: Aluminio. Talle: 18. Suspensión: Delantera. Velocidades: 21 - Shimano. Sistema de Freno: Disco Mecánico. Llantas: Doble pared.', '15979', '12', 'img-bicicleta-fierce.jpg', 2, NULL, NULL),
(15, 'Sony Srs-xb12 Parlante Bluetooth Portátil', 'Deja que la música dance cobre vida con EXTRA BASS™ Anima el ambiente con EXTRA BASS™1. Un radiador pasivo trabaja con el parlante monoaural para potenciar los tonos bajos y mejorar los graves, a pesar del tamaño compacto.', '4699', '5', 'img-parlante-bose.jpg', 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profiles`
--

DROP TABLE IF EXISTS `profiles`;
CREATE TABLE IF NOT EXISTS `profiles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

--
-- RELACIONES PARA LA TABLA `profiles`:
--

--
-- Volcado de datos para la tabla `profiles`
--

INSERT INTO `profiles` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'Comprador', NULL, NULL),
(2, 'Vendedor', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
CREATE TABLE IF NOT EXISTS `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- RELACIONES PARA LA TABLA `sequelizemeta`:
--

--
-- Volcado de datos para la tabla `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20210511173925-create-users.js'),
('20210511174059-create-profiles.js'),
('20210511174149-create-categories-users.js'),
('20210511174647-create-products.js'),
('20210511182451-create-categories.js');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fullName` varchar(255) DEFAULT NULL,
  `userName` varchar(255) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `profileId` int(11) DEFAULT NULL,
  `category_user_id` int(11) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `fk_categories_users_idx` (`category_user_id`),
  KEY `fk_profiles_users_idx` (`profileId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

--
-- RELACIONES PARA LA TABLA `users`:
--   `category_user_id`
--       `categories_users` -> `id`
--   `profileId`
--       `profiles` -> `id`
--

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `fullName`, `userName`, `date`, `address`, `profileId`, `category_user_id`, `email`, `password`, `avatar`, `createdAt`, `updatedAt`) VALUES
(1, 'Layla Rodas', 'Layla', '1993-12-06 00:00:00', 'Jujuy 1470', 1, 2, 'rodas.layla@gmail.com', 'hola123', 'default-image.png', NULL, NULL);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `fk_products_categories` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_categories_users` FOREIGN KEY (`category_user_id`) REFERENCES `categories_users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_profiles_users` FOREIGN KEY (`profileId`) REFERENCES `profiles` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
