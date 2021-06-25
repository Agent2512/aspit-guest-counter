-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Vært: 127.0.0.1
-- Genereringstid: 25. 06 2021 kl. 13:37:54
-- Serverversion: 10.4.11-MariaDB
-- PHP-version: 7.2.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `aspit-guest-counter`
--

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Data dump for tabellen `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `isAdmin`) VALUES
(19, 'testUser', '$2y$10$n0Bhaov61q34MIyP/ZcayONA2H2VGxPceueB1Vl/CjuYS5pu/V1Su', 0);

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `visitters`
--

CREATE TABLE `visitters` (
  `id` int(11) NOT NULL,
  `location` varchar(100) NOT NULL,
  `form_zipcode` varchar(6) NOT NULL,
  `form_city` varchar(100) NOT NULL,
  `guests` int(11) NOT NULL,
  `students` int(11) NOT NULL,
  `createdby` varchar(255) NOT NULL,
  `dateTime` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Data dump for tabellen `visitters`
--

INSERT INTO `visitters` (`id`, `location`, `form_zipcode`, `form_city`, `guests`, `students`, `createdby`, `dateTime`) VALUES
(3, 'odense', '4660', 'Store Heddinge', 1, 0, 'testUser', '2019-06-23T11:16'),
(5, 'odense', '4660', 'Store Heddinge', 1, 0, 'testUser', '2021-06-23T11:30'),
(6, 'odense', '4660', 'Store Heddinge', 1, 0, 'testUser', '2021-07-23T11:30');

--
-- Begrænsninger for dumpede tabeller
--

--
-- Indeks for tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indeks for tabel `visitters`
--
ALTER TABLE `visitters`
  ADD PRIMARY KEY (`id`);

--
-- Brug ikke AUTO_INCREMENT for slettede tabeller
--

--
-- Tilføj AUTO_INCREMENT i tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Tilføj AUTO_INCREMENT i tabel `visitters`
--
ALTER TABLE `visitters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
