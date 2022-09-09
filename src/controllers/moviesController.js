const { validationResult } = require('express-validator');
const db = require('../database/models');
const Movie = db.Movie;
const Genre = db.Genre

let moviesController = {

    //tomara de la base de datos todo el listado de pelicuas disponible y lo enviara a una vista
    list: (req, res) => {
        Movie.findAll({})
            .then(function (movies) {
                res.render("listMovie", { movies: movies });
            });
    },

    create: (req, res) => {
        Genre.findAll().then(function (genres) {
            return res.render('createMovie', {
                genres: genres,
            })
        })
    },

    save: async (req, res) => {
        const resultValidation = validationResult(req);

        //lets validate errors in the form and if exist one movie

        if (resultValidation.errors.length > 0) {
            return res.render('movies/create', {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        } else {
            let newMovie = req.body;
            let movieInDb = await Movie.findOne({
                where: {
                    title: newMovie.title
                }
            })
                .catch((error) => console.log(error));

            if (movieInDb) {
                return res.render('movies/create', {
                    errors: {
                        title: { msg: 'Esta pelicula ya fue creada' },
                    },
                    oldData: req.body
                });
            } else (
                Movie.create({
                    title: newMovie.title,
                    releaseData: newMovie.releaseData,
                    rating: newMovie.rating,
                    imageM: newMovie.image
                })
                    .then(() => {
                        return res.redirect('/movies')
                    })
                    .catch((error) => {
                        return res.send(error);
                    })
            )
        }

    },

    //Se le pedira a la bd que busque por pk la pelicula que queremos. La clave primaria (id) sera sacada de la URL (req.params.id). Puede llegar a tardar asi que tendra un .then de manera asincronica con un function que recibira una pelicula y devolvera con el metodo render una vista de detalle.
    //EN findByPk hay que incluir (include) las relaciones a traves de un objeto literal. Se usan los nombres cuando se definieron las relaciones.
    detail: (req, res) => {
        Movie.findByPk(req.params.id, {
            include: [{ association: "genres" }, { association: "characters" }],
        })
            .then(function (movies) {
                res.render("detailMovie", { movies: movies });
            });
    },

}

module.exports = moviesController