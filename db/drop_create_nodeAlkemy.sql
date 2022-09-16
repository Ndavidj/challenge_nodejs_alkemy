DROP DATABASE IF EXISTS `node_alkemy`;
CREATE DATABASE IF NOT EXISTS `node_alkemy`;
USE `node_alkemy`;

CREATE TABLE `characters` (
   `id` INT AUTO_INCREMENT,
   `name` VARCHAR(50) NOT NULL,
   `age` INT NOT NULL,
   `weight` INT NOT NULL,
   `history` VARCHAR(9999),
   `image` VARCHAR(255),
   PRIMARY KEY (`id`)
);

CREATE TABLE `movies` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `title` VARCHAR(255) NOT NULL,
   `releaseDate` DATE NOT NULL,
   `rating` DECIMAL NOT NULL,
   `image` VARCHAR(255),
   `genreId` INT,
   PRIMARY KEY (`id`)
);

CREATE TABLE `genres` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(255),
   `image` VARCHAR(255),
   PRIMARY KEY (`id`)
);

CREATE TABLE `users` (
   `id` INT AUTO_INCREMENT,
   `name` VARCHAR(50) NOT NULL,
   `email` VARCHAR(255) NOT NULL,
   `password` VARCHAR(255) NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `character_movie` (
   `id` INT NOT NULL,
   `movieId` INT NOT NULL,
   `characterId` INT NOT NULL,
   PRIMARY KEY (`id`)
);


ALTER TABLE `movies` ADD CONSTRAINT `FK_9b6475e3-d248-4c24-bc50-68dcb15450a0` FOREIGN KEY (`genreId`) REFERENCES `genres`(`id`)  ;

ALTER TABLE `character_movie` ADD CONSTRAINT `FK_6af24ab3-1504-4562-a00e-415debca7557` FOREIGN KEY (`movieId`) REFERENCES `movies`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `character_movie` ADD CONSTRAINT `FK_621d9ed3-00bd-46d2-87cd-417d0cdf0096` FOREIGN KEY (`characterId`) REFERENCES `characters`(`id`)  ;
