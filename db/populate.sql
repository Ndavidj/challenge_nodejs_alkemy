------------------------------------------------ Borrar todo ------------------------------------------------

-- MOVIES --
DELETE FROM node_alkemy.movies;
ALTER TABLE node_alkemy.movies AUTO_INCREMENT=1;

-- CHARACTERS --
DELETE FROM node_alkemy.characters;
ALTER TABLE node_alkemy.characters AUTO_INCREMENT=1;

-- GENRES --
DELETE FROM node_alkemy.genres;
ALTER TABLE node_alkemy.genres AUTO_INCREMENT=1;

-- USERS --
DELETE FROM node_alkemy.users;
ALTER TABLE node_alkemy.users AUTO_INCREMENT=1;



------------------------------------------------ Poblar todo ------------------------------------------------

-- genres --
INSERT INTO node_alkemy.genres (id, name, image) VALUES
(1, "Fantasia", 'fantasia.jpg'), (2, "Accion", 'accion.jpg'), (3, "Suspenso", 'suspenso.jpg');

-- movies --
INSERT INTO node_alkemy.movies (id, titmoviesle, releaseDate, rating, image, genreId) VALUES 
(1, "Spider Man: Sin camino a casa", "2021-12-17", 5, "SpiderManSinCaminoACasa.jpg", "1"),
(2, "Asesino sin memoria", "2022-04-29", 4, "asesinosinmemoria.jpg", "2"),
(3, "Last night in Soho", "2021-09-4", 3, "lastnightinsoho.jpg", "3");

-- characters --
INSERT INTO node_alkemy.characters (id, name, age, weight, history, image) VALUES 
(1, "Peter Parker", 26, 65, 'Peter Benjamin Parker, es un antiguo estudiante de la Escuela de Ciencia y Tecnología de Midtown que, después de adquirir sus habilidades a causa de la mordida de una araña radiactiva, eligió combatir el crimen como el Hombre Araña.', "peterparker.jpg"),
(2, "Alex Lewis", 70, 85, 'Alex Lewis (Liam Neeson) es un experto asesino con una reputación de discreta precisión. Cuando Alex se niega a completar un trabajo para una peligrosa organización criminal, se convierte en un objetivo y debe ir a la caza de quienes lo quieren muerto', "alexlewis.jpg"),
(3, "Alexandra Sandie Collins", 26, 55, 'Alexandra Sandie Collins, una aspirante a cantante en el Londres de los años 60.', "sandiecollins.jpg");

-- users --
INSERT INTO node_alkemy.users (id, name, email, password) VALUES 
(1, "Admin", "admin@challenge.com.ar", "$2a$12$0a.pwY7sEmoEOJfXmvR6du7frjT8CfzVvWMBSTXzEee6G2mM2TYta"),
(2, "Cliente", "cliente@challenge.com.ar", "$2a$12$/iEIHkW756A025eKoD8PD.xyHVsohSoEgBiD61Q.sDxIc0bLyC56i");

